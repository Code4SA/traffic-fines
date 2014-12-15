var min_radius = 2;
var max_radius = 150;
var width = "100%", height = 200

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


var add_route = function(layout_factory, width, height, route, row, national_average) {
    if (roadmap.orientation == "H") {
        view_width = width;
        view_height = height;
    }
    else {
        view_width = height;
        view_height = width;
    }

    var charts = row.append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "0 0 " + view_width + " " + view_height)
        .attr("preserveAspectRatio", "xMinYMax meet")
        .classed("roadmap", true)

    var road_layout = new roadlayout.RoadLayout({
        bubble_factory : layout_factory.bubblefactory(national_average, min_radius, max_radius),
        roadmap_layout_factory : layout_factory.map,
        data : route.munics,
        height : height,
        width : width,
    }, charts)

    return road_layout;
}

function setup_roadmap(data, layout_factory) {
    d3.selectAll("svg.roadmap").remove();
    var all = new municipalities.Municipalities(data);
    var natdata = all.subset(["Summary"]).munics[0];
    var national_ratio = (natdata["Total Fines"] / natdata["Total Budget"]) * 100;

    add_route(layout_factory, 800, height, all.subset(n1_cpt_jhb), d3.select("#n1-jhbcpt"), national_ratio);
    add_route(layout_factory, 1000, height, all.subset(n2_cpt_plet), d3.select("#n2-cptplet"), national_ratio);
    add_route(layout_factory, 600, height, all.subset(n3_jhb_eth), d3.select("#n3-jhbeth"), national_ratio);
}

function updateWindow(){
    var factories = roadmap.layouts.factories;
    var w = window;
    var x = w.innerWidth || e.clientWidth || g.clientWidth;
    var y = w.innerHeight|| e.clientHeight|| g.clientHeight;

    if (Math.abs(window.orientation) == 90) {
        roadmap.orientation = "H";
        setup_roadmap(roadmap.data, factories.HorizontalLayoutFactory);
    } else if (window.orientation == 0 || window.orientation == 180) {
        roadmap.orientation = "V";
        setup_roadmap(roadmap.data, factories.VerticalLayoutFactory);
    } else {
        roadmap.orientation = "H";
        setup_roadmap(roadmap.data, factories.HorizontalLayoutFactory);
    }
    window.orientationchange = updateWindow;
}

d3.csv("data.csv", function(data) {
    roadmap.data = data;
    updateWindow();

    window.addEventListener('orientationchange', updateWindow, false);
    window.addEventListener('onresize', updateWindow, false);

});
