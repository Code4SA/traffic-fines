var provinces = [
    { name: "Western Cape", code: "WC" },
    { name: "Eastern Cape", code: "EC" },
    { name: "Northern Cape", code: "NC" },
    { name: "Free State", code: "FS" },
    { name: "KwaZulu Natal", code: "KZN" },
    { name: "North West", code: "NW" },
    { name: "Limpopo", code: "LIM" },
    { name: "Gauteng", code: "GT" }
]

var n1_munics = [
    "CPT", "WC023", "WC025", "WC051", "WC053", "NC071", "NC073", "NC072", 
    "FS162", "MAN", "FS181", "FS184", "FS201", "FS203", "GT421", "JHB",
    "TSH", "LIM366", "LIM365", "LIM364", "LIM367", "LIM354", "LIM353",
    "LIM344", "LIM341"
]
var width = 60, height = 60, max_radius = 30, min_radius = 2;

var PieChart = function(el, datum) {
    this.data = datum;

    var ratio = datum["Total Fines"] / datum["Total Budget"]
    var values = [ratio, 1 - ratio];
    var pie = d3.layout.pie();
    var arc = d3.svg.arc().innerRadius(0);

    var g = el.selectAll(".arc")
        .data(function(el, i) {
            return pie(values)
        })
        .enter().append("g").attr("class", "arc")

    this.element = g.append("path")
        .attr("d", arc.outerRadius(function(el, i) {
            radius = ratio * 100 / 0.2;
            if (radius > max_radius)
                return max_radius
            else if (radius < min_radius)
                return min_radius
            return radius
        }))
        .attr("class", function(el, i) {
            if (i == 0) return "fine-slice"
            return "other-slice";
        })
        .attr("transform", function(el, i) {
            return "translate(" + width/2 + ", " + height/2 + ")"
        })
        .on("click", function(el) {
            pie_charts.highlight_province(datum["Province"])  
            d3.select("#detail p").remove()
            d3.select("#detail").append("p").text(datum["Municipality"]);
            console.log(datum["Municipality"])
        })
        .style("cursor", "pointer")
};

PieChart.prototype = {
    highlight : function(fine_slice_col, other_slice_col) {
        d3.select(this.element[0][0]).style("fill", fine_slice_col)
        d3.select(this.element[0][1]).style("fill", other_slice_col)
    }
}

var FinePieCharts = function() {
    this.pies = [];
}

FinePieCharts.prototype = {
    addChart : function(chart) {
        this.pies.push(chart);
    },
    highlight_province : function(province) {
        for (var p in this.pies) {
            var pie = this.pies[p];
            pie.highlight("#bbbbbb", "#bbbbbb");
            if (pie.data["Province"] == province) {
                pie.highlight("#ff0000", "rgb(115, 170, 238)");
            }
        }
    },
    highlight_set : function(set) {
        for (var p in this.pies) {
            var pie = this.pies[p];
            pie.highlight("#bbbbbb", "#bbbbbb");
            munic = pie.data["Municipality"]
            if (set.indexOf(munic) > 0)
                pie.highlight("#ff0000", "rgb(115, 170, 238)");
        }
    }
}

