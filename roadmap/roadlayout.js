var roadmap = roadmap || {}
roadmap.roadlayout = roadmap.roadlayout || {}

roadmap.roadlayout = (function() {
    var self = {}

    self.RoadLayout = function(ctx, element) {
        this.element = element;
        this.initialize(ctx);
        this.update();
    }

    self.RoadLayout.prototype = {
        style : function() {},
        initialize : function(ctx) {
            this.offset = ctx.offset || 0;
            this.ypos = ctx.ypos || 0;
            this.margin = ctx.margin || 15;
            this.height = ctx.height || 200;
            this.width = ctx.width || 250;
            this.corner_radius = ctx.corner_radius || 10;
            this.bubbles = [];

            if (ctx.bubble_factory === undefined) {
                throw Error("Expected Bubble Factory")
            }
            this.bubble_factory = ctx.bubble_factory;

            this.roadmap_layout_factory = ctx.roadmap_layout_factory || roadmap.layouts.roadmap.HorizontalLayout;

            if (ctx.data === undefined) {
                throw Error("Expected Data")
            }
            this.data = ctx.data;
        },
        reset : function() {
            this.element.selectAll("*").remove();
            this.bubbles = [];
            this.layout = new this.roadmap_layout_factory({
                startx : this.offset,
                starty : this.ypos,
                margin : this.margin,
                height : this.height,
                width : this.width
            })
        },
        update : function() {
            this.reset();
            var final = this
                .addBubbles()
                .addEndpointLabels()
                .drawLine()
                .drawProvinceBoxes()
                //.addLegend()
                .style()
            this.element.selectAll("g.bubble").moveToFront();
            return final;
        },
        addBubbles : function() {
            var me = this;
            var offset = this.offset;
            this.element.selectAll("g.bubble")
                .data(this.data)
                .enter().append("g")
                    .classed("bubble", true)
                    .each(function(el, idx) {
                        bubble = me.bubble_factory(d3.select(this), el);
                        me.bubbles.push(bubble);
                        me.layout.addBubble(bubble);
                    })
            return this;
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
            d = this.layout.lineCoordinates(start, end);
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
            var current_province = { province : "", bubbles: [], provinces : [] };
            for (idx in this.bubbles) {
                bubble = this.bubbles[idx];
                var data = bubble.data;
                var province = data["Province"]
                if (extents.length == 0 || current_province.province != province) {
                    extents.push(current_province);
                    current_province = {
                        province : province,
                        bubbles : [bubble]
                    };
                } else {
                    current_province.bubbles.push(bubble)
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
                    
                    return me.layout.extentLabelTransform(el, idx);
                })
            return this;
        },
        _add_windows : function(extents) {
            var me = this;
            me.element.selectAll("g.windows").append("rect")
                .attr("x", function(extent, idx) { return me.layout.extentX(extent, idx)})
                .attr("width", function(extent, idx) { return me.layout.extentWidth(extent, idx)})
                .attr("y", function(extent, idx) { return me.layout.extentY(extent, idx)})
                .attr("height", function(extent, idx) { return me.layout.extentHeight(extent, idx)})
                .attr("rx", me.corner_radius)
                .attr("ry", me.corner_radius)
                .style("fill", "none")
                .style("stroke", "000000")
                .attr("data-province", function(el) {
                    return el.province;
                })
            return this;
        }
    }
    return self;
})();


