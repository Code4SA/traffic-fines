var roadmap = roadmap || {}
roadmap.layouts = roadmap.layouts || {}
roadmap.layouts.roadmap = roadmap.layouts.roadmap || {}
roadmap.layouts.bubble = roadmap.layouts.bubble || {}
roadmap.layouts.factories = roadmap.layouts.factories || {}

roadmap.layouts.roadmap = (function() {
    var self = {};
    self.HorizontalLayout = function(ctx) {
        this.x = ctx.startx || 0;
        this.y = ctx.starty || 0;
        this.margin = ctx.margin || 15;
        this.height = ctx.height || 200;
    }

    self.HorizontalLayout.prototype = {
        addBubble : function(bubble) {
            var me = this;
            bubble.element
                .attr("transform", function() {
                    bubble.xpos = me.x;
                    bubble.ypos = me.y;
                    me.x += bubble.radius * 2 + me.margin;
                    str = "translate(" + bubble.xpos + ", " + bubble.ypos + ")"
                    return str
                })
        },
        lineCoordinates : function(start, end) {
            return [{x:start.xpos, y:start.ypos}, {x:end.xpos + end.radius, y:end.ypos}]
        },
        extentX : function(extent, idx) {
            var margin = this.margin / 2; 
            if (idx == 0) margin = this.margin * 2;
            a = extent.bubbles[0].xpos - margin;
            return a;
        },
        extentWidth : function(extent, idx) {
            var margin = this.margin;
            var end = extent.bubbles[extent.bubbles.length - 1];
            var start = extent.bubbles[0];
            if (idx == 0)
                margin = this.margin * 2 + this.margin/2;
            var width = end.xpos - start.xpos + end.radius * 2 + margin;
            return width;
        },
        extentY : function(extent, idx) {
            return 0;
        },
        extentHeight : function(extent, idx) {
            return this.height;
        },
        extentLabelTransform : function(extent, idx) {
            var left = this.extentX(extent, idx);
            var width = this.extentWidth(extent, idx);
            var height = this.extentHeight(extent, idx)
            var x = left + width / 2;
            var y = height - this.margin;

            return "translate(" + x + ", " + y + ")"
        }
    }

    self.VerticalLayout = function(ctx) {
        this.x = ctx.startx || 0;
        this.y = ctx.starty || 0;
        this.width = ctx.width || 200;
        this.margin = ctx.margin || 15;
    }

    self.VerticalLayout.prototype = {
        addBubble : function(bubble) {
            var me = this;
            bubble.element
                .attr("transform", function() {
                    bubble.xpos = me.x - bubble.radius;
                    bubble.ypos = me.y + bubble.radius;
                    me.y += bubble.radius * 2 + me.margin;
                    str = "translate(" + bubble.xpos + ", " + bubble.ypos + ")"
                    return str
                })
        },
        lineCoordinates : function(start, end) {
            return [{x:start.xpos + start.radius, y:start.ypos}, {x:end.xpos + end.radius, y:end.ypos}]
        },
        extentX : function(extent, idx) {
            return 0;
        },
        extentWidth : function(extent, idx) {
            return this.width;
        },
        extentY : function(extent, idx) {
            var start = extent.bubbles[0];
            return start.ypos - start.radius;
        },
        extentHeight : function(extent, idx) {
            var start = extent.bubbles[0];
            var end = extent.bubbles[extent.bubbles.length - 1];
            return end.ypos - this.extentY(extent, idx) + end.radius + this.margin
        },
        extentLabelTransform : function(extent, idx) {
            var left = this.extentX(extent, idx);
            var width = this.extentWidth(extent, idx);
            var top = this.extentY(extent, idx)
            var height = this.extentHeight(extent, idx)
            
            var x = left + this.margin;
            var y = top + height / 2

            return "translate(" + x + ", " + y + ") rotate(-90)"
        }
    }
    return self;
})();


roadmap.layouts.bubble = (function() {
    self = {}
    self.HorizontalLayout = function(margin) {
        this.margin = margin;
        this.text_anchor = "middle";
        this.coordinates = function(radius) {
            return {
                x : radius,
                y : -(radius + this.margin)
            }
        }
    }

    self.VerticalLayout = function(margin) {
        this.margin = margin;
        this.text_anchor = "left";
        
        this.coordinates = function(radius) {
            return {
                x : 2 * radius + this.margin,
                y : radius / 2
            }
        }
    }
    return self;
})()

roadmap.layouts.factories = (function() {
    self = {}
    self.VerticalLayoutFactory = {
        map :  roadmap.layouts.roadmap.VerticalLayout,
        bubblefactory : function(relative, min_radius, max_radius) {
            return function(root, datum) {
                return new bubbles.MunicBubble(
                {
                    element : root,
                    data : datum,
                    relative : relative,
                    min_radius : min_radius,
                    max_radius : max_radius,
                    layout : new roadmap.layouts.bubble.VerticalLayout(10)
                })
                .style()
                .addClickObserver(click_pie);
            }
        }
    }

    self.HorizontalLayoutFactory = {
        map : roadmap.layouts.roadmap.HorizontalLayout,
        bubblefactory : function(relative, min_radius, max_radius) {
            return function(root, datum) {
                return new bubbles.MunicBubble(
                {
                    element : root,
                    data : datum,
                    relative : relative,
                    min_radius : min_radius,
                    max_radius : max_radius,
                    layout : new roadmap.layouts.bubble.HorizontalLayout(10)
                })
                .style()
                // TODO need to figure out where this could be added
                .addClickObserver(click_pie);
            }
        }
    }
    return self;
})()

