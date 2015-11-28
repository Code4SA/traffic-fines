var create_tooltip = function(data) {
    var fmtr = function(x) {
        if (isNaN(x))
            return "N/A"
        return "R" + round2(x).toLocaleString();
    }

    var fmtp = function(x) {
        if (isNaN(x))
            return "N/A"
        return Math.round(x * 100) + "%";
    }

    var round2 = function(x) {
        return Math.round(x * 100) / 100;
    }

    var fmttimes = function(x) {
        if (isNaN(parseInt(x))) 
            return "N/A"
        return Math.round(x) + " times"
    }

    data["fpopulation"] = parseInt(data["population"]).toLocaleString();
    data["ftotal_fines"] = fmtr(data["total_fines"])
    data["ftotal_budget"] = fmtr(data["total_budget"])
    data["fperc_fines"] = fmtp(data["perc_fines"])
    data["ffines_per_capita"] = fmtr(data["fines_per_capita"])
    data["fnat_per_capita"] = fmttimes(data["nat_per_capita"]);
    data["fnat_perc_budget"] = fmttimes(data["nat_perc_budget"]);
    return tmpl("tt_template", data);
}

var BubbleFuncs = function(national, ctx) {
    this.national = national;
    this.ctx = ctx || {};
    this.r_max = this.ctx.r_max || 55;
    this.r_min = this.ctx.r_min || 0.1;
    this.nat_fines_per_capita = this.calc_fines_per_capita_month(national);
    this.nat_perc_budget = this.calc_perc_fines(this.national);
}

BubbleFuncs.prototype = {
    calc_fines_per_capita_month : function(datum) {
        return datum["Total Fines"] / datum["Population"];
    },
    calc_perc_fines : function(datum) {
        return datum["Total Fines"] / datum["Total Budget"];
    },
    transition_radius : function(element, value) {
        var me = this;
        var calc_radius = function(value) {
            if (isNaN(parseInt(value)) || value < me.r_min)
                value = me.r_min;

            var radius = Math.sqrt(value) * 8;
            if (radius > me.r_max)
                return me.r_max
            else if (radius < me.r_min)
                return me.r_min
            return radius
        }

        var radius = calc_radius(value);
        var code = d3.select(element).attr("data-munic");

        d3.select(element).select("circle").transition().attr("r", radius);
        d3.select(element).selectAll("text").text(function(el, idx) {
            value = Math.round(value)
            if (value < 3) return ""
            return value + "x"
        });
        if (isNaN(parseInt(value))) {
            d3.select(element).classed("no_data", true);
        }
    },
    process_datum : function(datum) {
        perc_fines = this.calc_perc_fines(datum);
        fines_per_capita = this.calc_fines_per_capita_month(datum);

        datum["population"] = datum["Population"];
        datum["total_fines"] = datum["Total Fines"];
        datum["total_budget"] = datum["Total Budget"];
        datum["perc_fines"] = perc_fines;
        datum["fines_per_capita"] = fines_per_capita;
        datum["nat_per_capita"] = fines_per_capita / this.nat_fines_per_capita;
        datum["nat_perc_budget"] = perc_fines / this.nat_perc_budget;
    },
}

var FinesViz = function(ctx) {
    this.ctx = ctx || {};
    this.buttons_enabled = this.ctx.buttons_enabled || false;
    this.per_capita = this.ctx.per_capita || "Per Capita";
    this.perc_budget = this.ctx.perc_budget || "Percentage Budget";
    this.onload = this.ctx.onload || function() {};
}

FinesViz.prototype = {
    _enable_buttons: function(parent_container) {
        var enable_button = function(button) {
            button.classed("btn-primary", false).classed("btn-default", true);
        }
        var disable_button = function(button) {
            button.classed("btn-primary", true).classed("btn-default", false);
        }
        var make_button = function(container, text, transition_value) {
            var me = this;
            var button = container.append("button")
                .attr("type", "button")
                .text(text)
                .classed("btn", true)
                .on("click", function(button_el) {
                    parent_container.selectAll("g.bubble").each(function(bubble) {
                        me.bubble_funcs.transition_radius(this, bubble[transition_value]);
                    });
                    container.selectAll(".buttons button")
                        .each(function(el) {
                            disable_button(d3.select(this));
                        })
                    enable_button(d3.select(this));
                })
                .classed("btn-primary", true)
            return button;
        }

        var button_container = parent_container.append("div").classed("buttons", true);

        btn_per_capita = make_button(button_container, this.per_capita, "nat_per_capita")
        btn_perc_budget = make_button(button_container, this.perc_budget, "nat_perc_budget")
        enable_button(btn_per_capita);
    },
    _csv2dict : function(arr) {
        data = {};
        for (var idx in arr) {
            var row = arr[idx];
            var mcode = row["Municipality"]
            data[mcode] = row;
            row["Total Fines"] = +row["Total Fines"];
            row["Total Budget"] = +row["Total Budget"];
            row["Population"] = +row["Population"];
        }
        return data;
    },
    load_data : function(container, svgfile, datafile) {

        var viz = this;
        if (this.buttons_enabled) {
            this._enable_buttons(container);
        }

        var svg_element = container[0][0];

        queue()
            .defer(d3.xml, svgfile)
            .defer(d3.csv, datafile)
            .await(function(error, xml, csv) {
                var importedNode = document.importNode(xml.documentElement, true);
                var img = svg_element.appendChild(importedNode.cloneNode(true));
                var data = viz._csv2dict(csv);
                var national = data["Summary"]
                this.bubble_funcs = new BubbleFuncs(national);


                var tooltip = new D3Tooltip(d3);
                d3.selectAll("g.windows").on("click", function() {tooltip.hide();});
                d3.select(".d3-tooltip").on("click", function() {tooltip.hide();});
                container.selectAll("g.bubble")
                    .each(function() {
                        var me = d3.select(this);
                        var code = me.attr("data-munic");
                        var datum = data[code];
                        me[0][0].__data__ = datum;

                        bubble_funcs.process_datum(datum);
                    })
                    .on("click", function(el) {
                        tooltip.html(create_tooltip(el));
                        tooltip.show();
                        viz.onload();
                    })
                    .each(function(el) {
                        bubble_funcs.transition_radius(this, el["nat_per_capita"]);
                    });
                viz.onload();
        })
    }
}
