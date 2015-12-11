//based on: http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html

var trafficfines = trafficfines || {}
!function() {
    var ttCounter = 0

    function D3Tooltip (d3, ctx) {
        this.d3 = d3
        this.id = 'd3-tooltip-' + ttCounter
        this.class = 'd3-tooltip'
        this.$el =    d3.select('body').append('div')
            .attr('class', this.class)
            .attr('id', this.id)
            .style('opacity', 0)
            .style('position', 'absolute')
            .style('pointer-events', 'none')

        this.ctx = ctx || {};
        this.y_offset = this.ctx.y_offset || 28;
        this.fadeout_delay = this.ctx.fadeout_delay || 500;
        this.fadein_delay = this.ctx.fadein_delay || 200;
        this.opacity = this.ctx.opacity || 0.9;
        this.left_margin = this.ctx.left_margin || 5;

        this.visible = false;
        ttCounter += 1
    }

    D3Tooltip.prototype.html = function(html) {
        this.$el.html(html)
    }

    D3Tooltip.prototype.show = function() {
        var screen_width = window.innerWidth;
        var page_x = this.d3.event.pageX;
        
        if (page_x < screen_width / 2) {
            this.$el.style('left', this.d3.event.pageX + 'px')
        } else {
            var rect = this.$el[0][0].getBoundingClientRect()
            var x = this.d3.event.pageX - rect.width
            if (x < 0) x = this.left_margin;
            this.$el.style('left', x + 'px')
        }
        this.$el.style('top', (this.d3.event.pageY - this.y_offset) + 'px')
        this.visible = true;
        this.$el.transition().duration(this.fadein_delay).style('opacity', this.opacity)
    }

    D3Tooltip.prototype.hide = function() {
        this.$el.transition().duration(this.fadeout_delay).style('opacity', 0)
        this.visible = false;
    }

    D3Tooltip.prototype.toggle = function() {
            if (this.visible)
                this.hide();
            else
                this.show();
    }
    trafficfines.D3Tooltip = D3Tooltip;
}()
