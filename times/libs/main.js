var trafficfines = trafficfines || {}
!function() {
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

    trafficfines.FinesViz = function(ctx) {
        var ctx = ctx || {};
        var buttons_enabled = ctx.buttons_enabled || false;
        var per_capita = per_capita || "Per capita";
        var perc_budget = ctx.perc_budget || "Percentage budget";
        var onload = ctx.onload || function() {};
        var bubble_funcs = undefined;

        var enable_buttons = function(parent_container) {
            var disable_button = function(button) {
                button.classed("btn-primary", false).classed("btn-default", true);
            }
            var enable_button = function(button) {
                button.classed("btn-primary", true).classed("btn-default", false);
            }
            var make_button = function(container, text, transition_value) {
                var button = container.append("button")
                    .attr("type", "button")
                    .text(text)
                    .classed("btn", true)
                    .on("click", function(button_el) {
                        parent_container.selectAll("g.bubble").each(function(bubble) {
                            bubble_funcs.transition_radius(this, bubble[transition_value]);
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

            btn_per_capita = make_button(button_container, per_capita, "nat_per_capita")
            btn_perc_budget = make_button(button_container, perc_budget, "nat_perc_budget")
            enable_button(btn_per_capita);
            disable_button(btn_perc_budget);
        }

        var csv2dict = function(arr) {
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
        }

        var setup_tooltip_hide = function(tooltip) {
            d3.selectAll("g.windows").on("click", function() {tooltip.hide();});
            d3.select(".d3-tooltip").on("click", function() {tooltip.hide();});
        }

        return function(container, svgfile, datafile) {

            if (buttons_enabled) {
                enable_buttons(container);
            }

            var svg_element = container[0][0];

            queue()
                .defer(d3.xml, svgfile)
                .defer(d3.csv, datafile)
                .await(function(error, xml, csv) {
                    var importedNode = document.importNode(xml.documentElement, true);
                    var img = svg_element.appendChild(importedNode.cloneNode(true));
                    var data = csv2dict(csv);
                    var national = data["Summary"]
                    bubble_funcs = trafficfines.BubbleFuncs(national);

                    var tooltip = new trafficfines.D3Tooltip(d3);
                    setup_tooltip_hide(tooltip);
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
                            onload();
                        })
                        .each(function(el) {
                            bubble_funcs.transition_radius(this, el["nat_per_capita"]);
                        });
                    onload();
            })
        }
    }
}()
