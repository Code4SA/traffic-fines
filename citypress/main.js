var w = "100%", h = "100%";
var nat_fines_per_capita = 1024433163 / 51770563 / 12;
var nat_perc_budget = 1024424063 / 229937135530 * 100;
var r_max = 55, r_min = 2;

var csv2dict = function(arr) {
    data = {};
    for (var idx in arr) {
        var row = arr[idx];
        var mcode = row["Municipality"]
        data[mcode] = row;
    }
    return data;
}

var create_tooltip = function(data) {
    perc_fines = data["Total Fines"] / data["Total Budget"] * 100
    fines_per_capita = data["Total Fines"] / data["Population"] / 12;

    data["fpopulation"] = parseInt(data["population"]).toLocaleString();
    data["ftotal_fines"] = "R" + parseInt(data["total_fines"]).toLocaleString();
    data["ftotal_budget"] = "R" + parseInt(data["total_budget"]).toLocaleString();
    data["fperc_fines"] = Math.round(data["perc_fines"]);
    data["ffines_per_capita"] = "R" + Math.round(data["fines_per_capita"] * 100) / 100;
    data["fnat_per_capita"] = Math.round(data["nat_per_capita"] * 100) / 100;
    data["fnat_perc_budget"] = Math.round(data["nat_perc_budget"] * 100) / 100;
    return tmpl("tt_template", data);
}

var calc_radius = function(value) {
    var radius = Math.sqrt(value) * 8;
    if (radius > r_max)
        return r_max
    else if (radius < r_min)
        return r_min
    return radius
}

var transition_radius = function(element, value) {
    var radius = calc_radius(value);
    var code = d3.select(element).attr("data-munic");

    d3.select(element).select("circle").transition().attr("r", radius);
    d3.select(element).selectAll("text").text(function(el, idx) {
        if (idx == 0) return d3.select(this).text();
        return Math.round(value) + "x";
    });
}

var load_data = function(container, svgfile) {
    var button_pc = container.append("button")
        .text("Per Capita")
        .on("click", function(el) {
            container.selectAll("g.bubble").each(function(el) {
                transition_radius(this, el["nat_per_capita"]);
            });
        })

    var button_perc = container.append("button")
        .text("Percentage Budget")
        .on("click", function(el) {
            container.selectAll("g.bubble").each(function(el) {
                transition_radius(this, el["nat_perc_budget"]);
            });
        })

    var svg = container.append("svg")
        .attr("width", w)
        .attr("height", h);

    var svg_element = svg[0][0];

    queue()
        .defer(d3.xml, svgfile)
        .defer(d3.csv, "data.csv")
        .await(function(error, xml, csv) {
            var importedNode = document.importNode(xml.documentElement, true);
            var img = svg_element.appendChild(importedNode.cloneNode(true));

            var data = csv2dict(csv);
            var tooltip = new D3Tooltip(d3);
            d3.selectAll("g.windows").on("click", function() {tooltip.toggle();});
            d3.selectAll("g.bubble")
                .style("cursor", "pointer")
                .each(function() {
                    var me = d3.select(this);
                    var code = me.attr("data-munic");
                    var datum = data[code];
                    me[0][0].__data__ = datum;
                    perc_fines = datum["Total Fines"] / datum["Total Budget"] * 100
                    fines_per_capita = datum["Total Fines"] / datum["Population"] / 12;

                    datum["population"] = datum["Population"];
                    datum["total_fines"] = datum["Total Fines"];
                    datum["total_budget"] = datum["Total Budget"];
                    datum["perc_fines"] = perc_fines;
                    datum["fines_per_capita"] = fines_per_capita;
                    datum["nat_per_capita"] = fines_per_capita / nat_fines_per_capita;
                    datum["nat_perc_budget"] = perc_fines / nat_perc_budget;
                })
                .on("click", function(el) {
                    tooltip.html(create_tooltip(el));
                    tooltip.show();
                })
    })
}
