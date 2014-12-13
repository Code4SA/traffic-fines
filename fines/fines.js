var provinces = [
    { name: "Western Cape", code: "WC" },
    { name: "Eastern Cape", code: "EC" },
    { name: "Northern Cape", code: "NC" },
    { name: "Free State", code: "FS" },
    { name: "KwaZulu Natal", code: "KZN" },
    { name: "North West", code: "NW" },
    { name: "Limpopo", code: "LIM" },
    { name: "Gauteng", code: "GT" },
    { name: "Mpumalanga", code: "MP" }
]

var code_to_province = {
    WC : "Western Cape",
    EC : "Eastern Cape", 
    NC : "Northern Cape",
    FS : "Free State",
    KZN : "KwaZulu Natal",
    NW : "North West",
    LIM : "Limpopo",
    GT : "Gauteng",
    MP : "Mpumalanga"
}


var n1_munics = [
    "CPT", "WC023", "WC025", "WC051", "WC053", "NC071", "NC073", "NC072", 
    "FS162", "MAN", "FS181", "FS184", "FS201", "FS203", "GT421", "JHB",
    "TSH", "LIM366", "LIM365", "LIM364", "LIM367", "LIM354", "LIM353",
    "LIM344", "LIM341"
]

var n1_cpt_jhb = [
    "CPT", "WC023", "WC025", "WC051", "WC053", "NC071", "NC073", "NC072", 
    "FS162", "MAN", "FS181", "FS184", "FS201", "FS203", "GT421", "JHB"
]

var n2_cpt_plet = [
    "CPT", "WC031", "WC034", "WC042", "WC043", "WC044", "WC048", "WC047",
    "EC109", "NMA", "EC106", "EC104", "EC126", "BUF", "EC123", "EC122", "EC121", "EC157", "EC155", "EC156", "EC442",
    "KZN443", "KZN435", "KZN214", "KZN215", "KZN216", "KZN213", "KZN212", "ETH"
]

var n3_jhb_eth = [
    "JHB", "EKU", "GT423", "GT422", "MP306", "FS205", "FS195", "FS194", "KZN235", "KZN232", "KZN236", "KZN234", "KZN223", "KZN222", "KZN225", "KZN226", "ETH"
]

var max_radius = 30, min_radius = 2;

d3.selection.prototype.moveToFront = function() {
  return this.each(function(el) {
      this.parentNode.appendChild(this)
  });
};

var Municipalities = function(munics) {
    this.munics = munics;
}

Municipalities.prototype = {
    subset : function(codes) {
        var me = this;
        new_munics = [];
        for (idx in this.munics) {
            datum = this.munics[idx]
            munic_code = datum["Municipality"]
            if (codes.indexOf(munic_code) >= 0) {
                new_munics.push(datum);
            }
        }
        
        new_munics = new_munics.sort(function(a, b) {
            m1 = a["Municipality"];
            m2 = b["Municipality"];
            idx1 = codes.indexOf(m1);
            idx2 = codes.indexOf(m2);
            return idx1 - idx2;
        });

        return new Municipalities(new_munics);
    }
}

var MunicBubble = function(el, datum, relative, r_min, r_max) {
    if (typeof(r_min) === "undefined") r_min = min_radius;
    if (typeof(r_max) === "undefined") r_max = max_radius;

    this.click_observers = [];
    this.data = datum;
    this.element = el;
    this.radius = 0;

    var me = this;
    var ratio = (datum["Total Fines"] / datum["Total Budget"]) * 100 / relative;

    var calc_radius = function(ratio) {
        var radius = Math.sqrt(ratio) * 8;
        if (radius > r_max)
            return r_max
        else if (radius < r_min)
            return r_min
        return radius
    }

    this.radius = calc_radius(ratio);
    var circle = this.element.append("circle")
        .attr("r", me.radius)
        .attr("transform", function(el, i) {
            return "translate(" + me.radius + ", 0)"
        })
        .on("click", function(el, idx) {
            me.onClick(el, idx);
        })

    if (this.radius > 15) {
        this.setLabel(datum["Name"])
        this.setCenterLabel(Math.round(ratio) + "x");
    }
    this.element.selectAll("text").on("click", function(el, idx) {
        me.onClick(el, idx);
    });
};

MunicBubble.prototype = {
    style : function() {},
    setLabel : function(text, idx) {
        var me = this;
        var margin = 10;
        var labelx = me.radius;
        var labely = -(me.radius + margin)

        this.element.append("text")
            .text(text)
            .style("text-anchor", "middle")
            .attr("transform", function(el, i) {
                return "translate(" + labelx + ", " + labely + ")"
            })
    },
    setCenterLabel : function(text) {
        var me = this;
        this.element.append("text")
            .text(text)
            .style("text-anchor", "middle")
            .attr("dy", "0.35em")
            .attr("transform", function(el, i) {
                return "translate(" + me.radius + ", " + 0 + ")"
            })
    },
    onClick : function(el, idx) {
        for (oidx in this.click_observers) {
            var o = this.click_observers[oidx];
            o(el, idx);
        }
    },
    addClickObserver : function(o) {
        this.click_observers.push(o);
        return this;
    }
}

var RoadLayout = function(ctx, element) {
    this.element = element;
    this.initialize(ctx);
    this.update();
}

RoadLayout.prototype = {
    style : function() {},
    initialize : function(ctx) {
        this.offset = ctx.offset || 100;
        this.ypos = ctx.ypos || 100;
        this.margin = ctx.margin || 15;
        this.height = ctx.height || 200;
        this.width = ctx.width || 400;
        this.bubbles = [];

        if (ctx.factory === undefined) {
            throw Error("Expected Factory")
        }
        this.factory = ctx.factory

        if (ctx.data === undefined) {
            throw Error("Expected Data")
        }
        this.data = ctx.data;
    },
    update : function() {
        var me = this;
        var offset = this.offset;

        this.element.selectAll("g.bubble")
            .data(this.data)
            .enter().append("g")
                .classed("bubble", true)
                .each(function(el, idx) {
                    a = me.factory(d3.select(this), el);
                    me.bubbles.push(a);
                    a.element
                        .attr("transform", function() {
                            a.xpos = offset;
                            a.ypos = me.ypos
                            str = "translate(" + offset + ", " + me.ypos + ")"
                            offset += a.radius * 2 + me.margin;
                            return str
                        })
                })
        var final = this
            .addEndpointLabels()
            .drawLine()
            .drawProvinceBoxes()
            //.addLegend()
            .style()
        this.element.selectAll("g.bubble").moveToFront();
        return final;
    },
    addEndpointLabels : function() {
        var first = this.bubbles[0];
        var last = this.bubbles[this.bubbles.length - 1];
        first.setLabel(first.data["Name"])
        last.setLabel(last.data["Name"])
        return this;
    },
    drawLine : function() {
        var start = this.bubbles[0];
        var end = this.bubbles[this.bubbles.length - 1]
        d = [{x:start.xpos, y:start.ypos}, {x:end.xpos,y:end.ypos}]
        var lineFunction = d3.svg.line()
            .x(function(d) { return d.x; })
            .y(function(d) { return d.y; })
            .interpolate("linear");

        var line = this.element.append("path")
            .attr("d", lineFunction(d))
            .classed("road", true)
        return this;
    },
    drawProvinceBoxes : function() {
        var me = this;
        var extents = [];
        var current_province = { province : "", provinces : [] };
        for (idx in this.bubbles) {
            bubble = this.bubbles[idx];
            data = bubble.data;
            province = data["Province"]
            if (extents.length == 0 || current_province.province != province) {
                extents.push(current_province);
                current_province = {
                    province : province,
                    start : bubble.xpos,
                    end : bubble.xpos + bubble.radius * 2
                };
            } else {
                current_province.end = bubble.xpos + bubble.radius * 2;
            }
        }
        extents.push(current_province);
        extents.shift();

        this.windows = this.element.selectAll("g.windows")
            .data(extents)
            .enter().append("g")
            .classed("windows", true)

        
        me
            ._add_windows(extents)
            ._add_labels(extents)

        return this;
    },
    addLegend : function() {
        this.element.append("circle")
            .attr("r", 10)
            .attr("transform", "translate(100, 200)")
            .style("fill", "red")
        return this;
    },
    _add_labels : function(extents) {
        var me = this;
        me.element.selectAll("g.windows").append("text")
            .text(function(el) { return code_to_province[el.province] })
            .style("text-anchor", "middle")
            .attr("transform", function(el, idx) {
                var middle = (el.end + el.start) / 2;
                if (idx == extents.length - 1)     
                    middle = (el.end + el.start + me.margin * 1.5) / 2
                    
                return "translate(" + middle + ", " + (me.height - me.margin) + ")"
            })
        return this;
    },
    _add_windows : function(extents) {
        var me = this;
        me.element.selectAll("g.windows").append("rect")
            .attr("x", function(el, idx) {
                var margin = me.margin / 2; 
                if (idx == 0) margin = me.margin * 2;
                return el.start - margin;
            })
            .attr("width", function(el, idx) {
                var margin = me.margin;
                if (idx == 0) margin = me.margin * 2 + me.margin/2;
                if (idx == extents.length - 1) margin = me.margin * 2.5;
                return el.end - el.start + margin;
                
            })
            .attr("y", function(el) { return 0; })
            .attr("height", function(el) { return me.height; })
            .attr("rx", 10)
            .attr("ry", 10)
            .style("fill", "none")
            .style("stroke", "000000")
            .attr("data-province", function(el) {
                return el.province;
            })
        return this;
    }
}
