var min_radius = 2;
var max_radius = 150;
var width = "100%", height = 200;

d3.selection.prototype.moveToFront = function() {
  return this.each(function(el) {
      this.parentNode.appendChild(this)
  });
};

var click_pie = function(el, idx) {
    d3.select("#pie_label").selectAll("p").remove()    
    d3.select("#pie_label").append("p").text(el["Name"]);
}

bubbles = roadmap.bubbles;
roadlayout = roadmap.roadlayout;
municipalities = roadmap.municipalities;

bubbles.MunicBubble.prototype.style = function() {
    this.element.select("circle")
        .style("fill", "#ff2b2b")
        .style("stroke", "#343434")
        .style("stroke-width", "1.0")
        .style("cursor", "pointer")

    this.element.selectAll("text")
        .style("font-family", "'Helvetica Neue', Helvetica, Arial, sans-serif")
        .style("cursor", "pointer")

    return this;
}

roadlayout.RoadLayout.prototype.style = function() {
    this.element.selectAll(".road")
        .style("stroke", "#343434")
        .style("stroke-width", "2")
        .style("fill", "#000000")

    colors = {
        "WC" : "#435678", "NC" : "#862346", "FS" : "#125743",
        "GT" : "#642376", "EC" : "#73418", "MP" : "#b168af",
        "NW" : "#38ab3f", "KZN" : "#bac423", "LIM" : "#54bde1",
    }
    for (pr in colors) {
        this.element.selectAll("rect[data-province=" + pr + "]")
            .style("fill", colors[pr])
            .style("opacity", "0.4")
    }
}

layout_factory = roadmap.layouts.factories.VerticalLayoutFactory;
layout_factory = roadmap.layouts.factories.HorizontalLayoutFactory;

var add_route = function(route, row, national_average) {
    var charts = row
            .append("svg")
                .attr("width", width)
                .attr("height", height)

    var road_layout = new roadlayout.RoadLayout({
        bubble_factory : layout_factory.bubblefactory(national_average, min_radius, max_radius),
        roadmap_layout_factory : layout_factory.map,
        data : route.munics,
        height : height,
        width : width
    }, charts)

    return road_layout;
}

d3.csv("data.csv", function(data) {
    var all = new municipalities.Municipalities(data);
    var natdata = all.subset(["Summary"]).munics[0];
    var national_ratio = (natdata["Total Fines"] / natdata["Total Budget"]) * 100;

    add_route(all.subset(n1_cpt_jhb), d3.select("#n1-jhbcpt"), national_ratio);
    add_route(all.subset(n2_cpt_plet), d3.select("#n2-cptplet"), national_ratio);
    add_route(all.subset(n3_jhb_eth), d3.select("#n3-jhbeth"), national_ratio);
});
