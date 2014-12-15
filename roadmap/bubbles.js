var roadmap = roadmap || {}
roadmap.bubbles = roadmap.bubbles || {}

roadmap.bubbles = (function() {
    var self = {}
    var max_radius = 30, min_radius = 2;

    self.perc_budget_calculator = function(datum) {
        return datum["Total Fines"] / datum["Total Budget"];
    }

    self.per_capita_calculator = function(datum) {
        if (datum["Total Fines"] <= 0) return 1;
        var monthly = datum["Total Fines"] / datum["Population"] / 12;
        return monthly
    }

    self.MunicBubble = function(ctx) {
        if (ctx.element === undefined) {
            throw Error("Expected root element")
        }
        this.element = ctx.element;

        if (ctx.data === undefined) {
            throw Error("Expected data element")
        }
        this.data = ctx.data;

        this.r_min = ctx.min_radius || min_radius;
        this.r_max = ctx.max_radius || max_radius;
        this.relative = ctx.relative || 1;
        this.margin = ctx.margin || 10;
        this.layout = ctx.layout || new self.HorizontalLayout(this.margin);
        this.ratio_threshold = ctx.ratio_threshold || 3;
        this.calculator = ctx.calculator || self.perc_budget_calculator;

        this.click_observers = [];
        this.radius = 0;

        var me = this;
        var ratio = this.calculator(this.data) / this.relative;

        var calc_radius = function(ratio) {
            var radius = Math.sqrt(ratio) * 8;
            if (radius > me.r_max)
                return me.r_max
            else if (radius < me.r_min)
                return me.r_min
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

        if (ratio > this.ratio_threshold) {
            this.setLabel(this.data["Name"])
            this.setCenterLabel(Math.round(ratio) + "x");
        }
        this.element.selectAll("text").on("click", function(el, idx) {
            me.onClick(el, idx);
        });
    };


    self.MunicBubble.prototype = {
        style : function() {},
        setLabel : function(text, idx) {
            var me = this;
            var labelx = me.radius;
            var labely = -(me.radius + this.margin)
            var coords = this.layout.coordinates(me.radius);

            this.element.append("text")
                .text(text)
                .style("text-anchor", this.layout.text_anchor)
                .attr("transform", function(el, i) {
                    return "translate(" + coords.x + ", " + coords.y + ")"
                })
                .classed("munic-label", true)

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
    return self;
})()

