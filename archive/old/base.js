var margin = { top: 10, right: 20, bottom: 10, left: 80 };
var w = 900, h = 350;
var width = w - margin.right - margin.left;
var height = h - margin.right - margin.left;
var mindomain_bg = 0, maxdomain_bg = 0.1;
var mindomain_pc = 0, maxdomain_pc = 100;
var mindomain_bg2 = 0, maxdomain_bg2 = 0.2;
var mindomain_pc2 = 0, maxdomain_pc2 = 275;
var budget_axis = "Percent of total budget", population_axis = "Fine per capita (rands)";

var selectWidget = d3.select('select.city');
var provinceWidget = d3.select('select.province');


var BUDGET_VIEW = 0;
var POPULATION_VIEW = 1;

var x = d3.scale.linear()
    .domain([0, 11])
    .range([0, width]);

var yView0 = d3.scale.linear()
    .domain([mindomain_bg, maxdomain_bg])
    .range([height, 0]);

var yView1 = d3.scale.linear()
    .domain([mindomain_pc, maxdomain_pc])
    .range([height, 0]);

var yView0a = d3.scale.linear()
    .domain([mindomain_bg2, maxdomain_bg2])
    .range([height, 0]);

var yView1a = d3.scale.linear()
    .domain([mindomain_pc2, maxdomain_pc2])
    .range([height, 0]);

var clamped_axis = true;

var xAxisGenerator = d3.svg.axis()
    .orient('bottom')
    .tickFormat(function(d) {
        var labels = [
            "Sep 2011", "Dec 2011", "Mar 2012",
            "Jun 2012", "Sep 2012", "Dec 2012",
            "Mar 2013", "Jun 2013", "Sep 2013",
            "Dec 2013", "Mar 2014",
        ]
        return labels[d];
     })
    .scale(x);

var yAxisGeneratorView0 = d3.svg.axis()
    .orient('left')
    .tickSize(-width)
    .tickFormat(d3.format('%,'))
    .scale(yView0);

var yAxisGeneratorView1 = d3.svg.axis()
    .orient('left')
    .tickSize(-width)
    .tickFormat(function(x) {
        return "R" + d3.format(',')(x);
    })
    .scale(yView1);

var yAxisGeneratorView0a = d3.svg.axis()
    .orient('left')
    .tickSize(-width)
    .tickFormat(d3.format('%,'))
    .scale(yView0a);

var yAxisGeneratorView1a = d3.svg.axis()
    .orient('left')
    .tickSize(-width)
    .tickFormat(function(x) {
        return "R" + d3.format(',')(x);
    })
    .scale(yView1a);

yActiveProperty = function(year) {
    return 'r' + year;
};

var svg = d3.select('.chart').append('svg')
    .attr('width', w)
    .attr('height', h)
    .append('g')
        .attr('transform', 'translate(' + self.margin.left + ',' + self.margin.top + ')');

var yActiveScale = yView0;
var isTransitioning = false;

var data = d3.csv('budgetnorm.csv')
    .row(function(d) { return new FineRevenue(d); })
    .get(function(error, rows) {

        /*
        _.each(rows, function(d) {
            selectWidget.append('option')
                .attr('value', d.citySlug)
                .text(d.city);
        });
        */

        var graph = new Graph(rows);
        graph.draw(BUDGET_VIEW, true);
        var buttons = new IndicatorButtons(graph);
        var stepper = new Stepper(1, 5);    
        var finelines = new FineLines("home-rate-selected");
        var highlight_finelines = new FineLines("home-province");
        var story = new Story(graph, buttons, highlight_finelines);
        var tooltip = new Tooltip();
        stepper.add_listener(function(state) {story.start_story(state)});
        story.begin();
        graph.listeners.push(function(d) {
            //selectWidget.property('selectedIndex', index);
            finelines.disable_all();
            finelines.enable_municipality(d.citySlug);
            tooltip.setTooltip(d);
        });

        /*
        d3.select('.home-rate-' + rows[selectWidget.property('selectedIndex')].citySlug)
            .classed('home-rate-active', true);
        */

        //selectCity(rows[200]);

    });

var Stepper = function(initial_state, num_states) {
    this.state = initial_state;
    this.num_states = num_states;
    this.listeners = [];
    that = this;

    d3.select(".stepper-next")
        .on("click", function(el) {
            that.next();
        })

    d3.select(".stepper-previous")
        .on("click", function(el) {

            that.prev();
        })
}

Stepper.prototype = {
    next : function() {
        if (this.state < this.num_states) {
            this.state++;
            this._activate(this.state);
        }
    },
    prev : function() {
        if (this.state > 1) {
            this.state--;
            this._activate(this.state);
        }
    },
    add_listener : function(listener) {
        this.listeners.push(listener);
    },
    _activate : function(state) {
        d3.selectAll(".step").classed("step-selected", false);
        var el = d3.select(".step-" + this.state).classed("step-selected", true);
        d3.selectAll(".stepperButton").classed("stepper-disabled", false);
        if (this.state == 1)
            d3.select(".stepper-previous").classed("stepper-disabled", true);
        if (this.state == this.num_states)
            d3.select(".stepper-next").classed("stepper-disabled", true);

        for (l in this.listeners) {
            fn = this.listeners[l];
            fn(this.state);
        }

    }
};

var Story = function(graph, buttons, finelines) {
    this.graph = graph
    this.buttons = buttons;
    this.finelines = finelines;
}

Story.prototype = {
    begin : function() {
        return this.start_story(1);
    },
    start_story : function(state) {
        fn = this["_story" + state]();
        this._activate(state);
    },
    _story1 : function() {
        clamped_axis = true;
        this.finelines.disable_all();
        this.graph.draw(this.buttons.current_view, true);
    },
    _story2 : function() {
        clamped_axis = true;
        this.finelines.enable_province("WC");
        this.graph.draw(this.buttons.current_view, true);
    },
    _story4 : function() {
        clamped_axis = false;
        this.finelines.enable_municipality("NC071");
        this.graph.draw(this.buttons.current_view, true);
    },
    _story3 : function() {
        clamped_axis = true;
        var n1 = ["CPT", "WC024", "WC023", "WC025", "WC051", "WC052", "WC053", "NC071", "NC073", "NC072", "FS162", "MAN", "FS181", "FS184", "FS201", "FS203", "GT421", "JHB", "TSH", "LIM366", "LIM365", "LIM364", "LIM354", "LIM353", "LIM344", "LIM341"]
        for (i in n1) 
            this.finelines.enable_municipality(n1[i]);

        this.graph.draw(this.buttons.current_view, true);
    },
    _story5 : function() {
        clamped_axis = true;
        this.finelines.enable_province("KZ");
        this.graph.draw(this.buttons.current_view, true);
    },
    _activate : function(state) {
        d3.selectAll(".explainer").style("display", "none");
        d3.selectAll(".explainer-" + state).style("display", "block")
    }
}

var FineLines = function(selected_class) {
    this.selected_class = selected_class;
}

FineLines.prototype = {
    enable_province : function(province) {
        this.disable_all();

        d3.selectAll('.home-rate[data-province="' + province + '"]')
            .classed(this.selected_class, true)
    },
    enable_municipality : function(municipality) {
        d3.select('.home-rate-' + municipality).classed(this.selected_class, true)
    },
    disable_municipality : function(municipality) {
        d3.select('.home-rate-' + municipality).classed(this.selected_class, false)
    },
    disable_all : function() {
      d3.selectAll('.home-rate')
          .classed(this.selected_class, false)
    }
}

var NationalAverage;
var FineRevenue = function(row) {
    this.city = row.Name
    this.citySlug = row.Municipality,
    this.prefix = row.Municipality.substr(0, 2),
    this.population = row.Population,
    this.r2004 = row['Sep 2011'], this.r2005 = row['Dec 2011'], this.r2006 = row['Mar 2012'],
    this.r2007 = row['Jun 2012'], this.r2008 = row['Sep 2012'], this.r2009 = row['Dec 2012'],
    this.r2010 = row['Mar 2013'], this.r2011 = row['Jun 2013'], this.r2012 = row['Sep 2013'],
    this.r2013 = row['Dec 2013'], this.r2014 = row['Mar 2014'],
    this.total = row['Total'] * 100,
    this.p2004 = row['Sep 2011P'], this.p2005 = row['Dec 2011P'], this.p2006 = row['Mar 2012P'],
    this.p2007 = row['Jun 2012P'], this.p2008 = row['Sep 2012P'], this.p2009 = row['Dec 2012P'],
    this.p2010 = row['Mar 2013P'], this.p2011 = row['Jun 2013P'], this.p2012 = row['Sep 2013P'],
    this.p2013 = row['Dec 2013P'], this.p2014 = row['Mar 2014P']
    if (this.city == "National Average") {
        NationalAverage = this;
    }
}

var Tooltip = function() {
    this.tooltip_el = d3.select('.chart-wrapper .munic-tooltip');
    this.tooltipCity_el = this.tooltip_el.select('.city');
    this.times_national_el = this.tooltip_el.select('.times-national .worse');
    this.tooltipFines_el = d3.select('.munic-tooltip .fines');
}

Tooltip.prototype = {
    fmt : function(val) {
        if (val < 1) return "< 1";
        return Math.round(val)
    },
    fmt2 : function(val) {
        var fmt = d3.format('.1f');
        if (val < 1) {
            return fmt(val) + ' times less than';
        } else {
            return fmt(val) + ' times higher than';
        }
    },
    setTooltip : function(data) {
        var val = yActiveProperty(2014);
        if (data[val] < 0.025)
            data[val] = 0.025;

        if (data[val] > 0.1)
            data[val] = 0.1;
        

        var nfmt = d3.format(',');
        var string = this.fmt(data.total);
        this.tooltipCity_el.html(data.city);
        this.tooltip_el.select(".population").html(nfmt(data.population));
        this.tooltipFines_el.html(string);
        this.times_national_el.html(this.fmt2(data.total / NationalAverage.total, 1));
        this.times_national_el.select(".compare-national").classed("better", true).classed("worse", false);
    }
}

var Graph = function(rows) {
    var me = this;
    this.listeners = [];
    this.isTransitioning = false;
    this.line = d3.svg.line()
        .x(function(d, i) { return x(0 + i); })
        .y(function(d) { return yActiveScale(d); });

    svg.append("text")
        .attr("class", "xaxis controls")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", height + 40)
        .text("End of quarter");

    svg.append("text")
        .attr("class", "yaxis controls")
        .attr("text-anchor", "end")
        .attr("y", 6)
        .attr("dy", "-3em")
        .attr("transform", "rotate(-90)")
        .text(budget_axis);

    var axes = svg.append('g').attr('class', 'axes');

    this.xAxis = axes.append('g')
        .attr('class', 'xAxis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxisGenerator);

    this.yAxis = axes.append('g')
        .attr('class', 'yAxis')
        .call(yAxisGeneratorView0);

    var annotations = svg.append('g').attr('class', 'annotations');
    var annotationsView0 = annotations.append('g').attr('class', 'view-0');

    annotationsView0.append('line')
        .attr('class', 'baseline')
        .attr('x1', 0)
        .attr('y1', yView0(0))
        .attr('x2', width)
        .attr('y2', yView0(0))

    this.paths = svg.append('g')
        .attr('class', 'paths')
        .selectAll('path')
        .data(rows)
        .enter().append('path')
            .attr('class', function(d) {
                  var s = 'home-rate';
                  s += ' home-rate-' + d.citySlug;
                  return s;
            })
            .attr('data-province', function(d) {
                prefix = d.citySlug.substring(0, 2)
                return prefix;
            })
            .on('mouseover', function(d, i) {
                for (l in me.listeners) {
                    me.listeners[l](d);
                }
            })
            .on('click', function(d, i) {
                for (l in me.listeners) {
                    me.listeners[l](d);
                }
            });
}

Graph.prototype = {
    draw : function(view, initialCall) {
        this.isTransitioning = true;

        d3.selectAll('.annotations .view-0, .annotations .view-1, .annotations .view-2')
            .style('fill-opacity', 0)
            .style('stroke-opacity', 0);

        if (view == BUDGET_VIEW) {
            if (clamped_axis) {
                yActiveScale = yView0;
                axisGeneratorView = yAxisGeneratorView0;
            } else {
                yActiveScale = yView0a;
                axisGeneratorView = yAxisGeneratorView0a;
            }
            yActiveProperty = function(year) {
                return 'r' + year;
            };
            d3.select(".yaxis").text(budget_axis);
        } else if (view == POPULATION_VIEW) {
            if (clamped_axis) {
                yActiveScale = yView1;
                axisGeneratorView = yAxisGeneratorView1;
            } else {
                yActiveScale = yView1a;
                axisGeneratorView = yAxisGeneratorView1a;
            }
            yActiveProperty = function(year) {
                return 'p' + year;
            };
            d3.select(".yaxis").text(population_axis);
        }


        duration = [1500, 500];
        if (initialCall) duration = [0, 0];

        this.yAxis.transition()
            .duration(duration[0])
            .call(axisGeneratorView)
            .each('end', function() {
                d3.selectAll('.annotations .view-0')
                    .transition(duration[1])
                    .style('fill-opacity', 1)
                    .style('stroke-opacity', 1)
                    .each('end', function() {
                        this.isTransitioning = false;
                    });
            });

        var me = this;
        this.paths.transition()
            .duration(1500)
            .attr('d', function(d) {
                return me.line(getLineData(view, d));
            });
    }
}

var IndicatorButtons = function(graph) {
    var me = this
    this.graph = graph;
    this.current_view = BUDGET_VIEW;
    var buttons = d3.selectAll('.button');
    buttons.data([0, 1])
    buttons.on('click', function(d) {
        me.set_view(d);
        // TODO move this into set_view
        d3.selectAll('.button.active').classed('active', false);
        d3.select(this).classed('active', true);
    });
}

IndicatorButtons.prototype = {
    set_view : function(view) {
        this.current_view = view;
        this.graph.draw(view, false);
    }
}

var getLineData = function(view, d) {

    var lineData = [];
    if (view === BUDGET_VIEW) {
        var clean = function(x) {
            if (isNaN(x)) return 0;
            if (!isFinite(x)) return 0;
            if (clamped_axis) {
                if (x > maxdomain_bg) return maxdomain_bg;
                if (x < mindomain_bg) return mindomain_bg;
            } else {
                if (x > maxdomain_bg2) return maxdomain_bg2;
                if (x < mindomain_bg2) return mindomain_bg2;
            }

            return x;
        }
        lineData.push(clean(d.r2004)); lineData.push(clean(d.r2005)); lineData.push(clean(d.r2006));
        lineData.push(clean(d.r2007)); lineData.push(clean(d.r2008)); lineData.push(clean(d.r2009));
        lineData.push(clean(d.r2010)); lineData.push(clean(d.r2011)); lineData.push(clean(d.r2012));
        lineData.push(clean(d.r2013)); lineData.push(clean(d.r2014));
     } else if (view === POPULATION_VIEW) {
        var clean = function(x) {
            if (isNaN(x)) return 0;
            if (!isFinite(x)) return 0;
            if (clamped_axis) {
                if (x > maxdomain_pc) return maxdomain_pc;
                if (x < mindomain_pc) return mindomain_pc;
            } else {
                if (x > maxdomain_pc2) return maxdomain_pc2;
                if (x < mindomain_pc2) return mindomain_pc2;
            }
            return x;
        }

        lineData.push(clean(d.p2004)); lineData.push(clean(d.p2005)); lineData.push(clean(d.p2006));
        lineData.push(clean(d.p2007)); lineData.push(clean(d.p2008)); lineData.push(clean(d.p2009));
        lineData.push(clean(d.p2010)); lineData.push(clean(d.p2011)); lineData.push(clean(d.p2012));
        lineData.push(clean(d.p2013)); lineData.push(clean(d.p2014));
     }

    return lineData;
}

    
/*
    provinceWidget.on('change', function(v) {

      idx = provinceWidget.property('selectedIndex');
      province = provinceWidget[0][0][idx].value;
      d3.selectAll('.home-rate')
          .classed('home-province', false)
          .classed('home-not-province', false)

      d3.selectAll('.home-rate[data-province="' + province + '"]')
          .classed('home-province', true)

      d3.selectAll('.home-rate[data-province="' + province + '"]')
          .classed('home-not-province', true)

    });
*/

/*
    selectWidget.on('change', function() {
      if (isTransitioning) return;

      selectCity(selectWidget.property('selectedIndex'));
    });
*/
