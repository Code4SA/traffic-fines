var margin = { top: 10, right: 20, bottom: 10, left: 80 };
var w = 900, h = 500;
var width = w - margin.right - margin.left;
var height = h - margin.right - margin.left;
var mindomain_bg = 0, maxdomain_bg = 0.1;
var mindomain_pc = 0, maxdomain_pc = 100;
var budget_axis = "Percent of total budget", population_axis = "Fine per capita (rands)";

var selectWidget = d3.select('select.city');
var provinceWidget = d3.select('select.province');

var tooltip = d3.select('.chart-wrapper .tooltip');
var tooltipFines = d3.select('.tooltip .fines');
var tooltipCity = tooltip.select('.city');
var tooltipRate2013 = tooltip.select('.rate-2013');
var tooltipRelativeRate2013 = tooltip.select('.relative-rate-2013');
var tooltipAgainstAverageChange2013 = tooltip.select('.against-average-change-2013');
var tooltipBetterWorse = tooltip.select('.better-worse');

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

yActiveProperty = function(year) {
    return 'r' + year;
};

var svg = d3.select('.chart').append('svg')
    .attr('width', w)
    .attr('height', h)
    .append('g')
        .attr('transform', 'translate(' + self.margin.left + ',' + self.margin.top + ')');

var data = d3.csv('budgetnorm.csv')
    .row(function(d) {
        var r = {
            city: d.Name,
            citySlug: d.Municipality,
            prefix: d.Municipality.substr(0, 2),
            population: d.Population,
            r2004: d['Sep 2011'], r2005: d['Dec 2011'], r2006: d['Mar 2012'],
            r2007: d['Jun 2012'], r2008: d['Sep 2012'], r2009: d['Dec 2012'],
            r2010: d['Mar 2013'], r2011: d['Jun 2013'], r2012: d['Sep 2013'],
            r2013: d['Dec 2013'], r2014: d['Mar 2014'],
            total: d['Total'] * 100,
            p2004: d['Sep 2011P'], p2005: d['Dec 2011P'], p2006: d['Mar 2012P'],
            p2007: d['Jun 2012P'], p2008: d['Sep 2012P'], p2009: d['Dec 2012P'],
            p2010: d['Mar 2013P'], p2011: d['Jun 2013P'], p2012: d['Sep 2013P'],
            p2013: d['Dec 2013P'], p2014: d['Mar 2014P']
        };

        return r;
    })
   .get(function(error, rows) {
        var national_average = _.find(rows, function(d) {
            return d.citySlug === 'Summary';
        });

        _.each(rows, function(d) {
            selectWidget.append('option')
                .attr('value', d.citySlug)
                .text(d.city);
        });


        var yActiveScale = yView0;
        var activeIndex = 0;
        var isTransitioning = false;

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

        var axes = svg.append('g')
            .attr('class', 'axes');

        var xAxis = axes.append('g')
            .attr('class', 'xAxis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxisGenerator);

        var yAxis = axes.append('g')
            .attr('class', 'yAxis')
            .call(yAxisGeneratorView0);

        var line = d3.svg.line()
            .x(function(d, i) { return x(0 + i); })
            .y(function(d) { return yActiveScale(d); });

        var selectCity = function(index) {
            activeIndex = index;

            var d = rows[index];

            selectWidget.property('selectedIndex', index);

            d3.selectAll('.home-rate-selected').classed('home-rate-selected', false);
            d3.select('.home-rate-' + d.citySlug).classed('home-rate-selected', true);

            setTooltip(d);
        };

        var paths = svg.append('g')
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
                    if (isTransitioning) return;
                    selectCity(i);
                })
                .on('click', function(d, i) {
                    if (isTransitioning) return;
                    selectCity(i);
                });

        var getLineData = function(view, d) {

            var lineData = [];
            if (view === BUDGET_VIEW) {
                var clean = function(x) {
                    if (isNaN(x)) return 0;
                    if (!isFinite(x)) return 0;
                    if (x > maxdomain_bg) return maxdomain_bg;
                    if (x < mindomain_bg) return mindomain_bg;
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
                    if (x > maxdomain_pc) return maxdomain_pc;
                    if (x < mindomain_pc) return mindomain_pc;
                    return x;
                }

                lineData.push(clean(d.p2004)); lineData.push(clean(d.p2005)); lineData.push(clean(d.p2006));
                lineData.push(clean(d.p2007)); lineData.push(clean(d.p2008)); lineData.push(clean(d.p2009));
                lineData.push(clean(d.p2010)); lineData.push(clean(d.p2011)); lineData.push(clean(d.p2012));
                lineData.push(clean(d.p2013)); lineData.push(clean(d.p2014));
             }

            return lineData;
        }

        var draw = function(view, initialCall) {
            console.log("Drawing");
            isTransitioning = true;

            d3.selectAll('.annotations .view-0, .annotations .view-1, .annotations .view-2')
                .style('fill-opacity', 0)
                .style('stroke-opacity', 0);

            if (view == BUDGET_VIEW) {
                yActiveScale = yView0; /* ????? */
                axisGeneratorView = yAxisGeneratorView0;
                yActiveProperty = function(year) {
                    return 'r' + year;
                };
                d3.select(".yaxis").text(budget_axis);
            } else if (view == POPULATION_VIEW) {
                yActiveScale = yView1; /* ????? */
                axisGeneratorView = yAxisGeneratorView1;
                yActiveProperty = function(year) {
                    return 'p' + year;
                };
                d3.select(".yaxis").text(population_axis);
            }


            duration = [1500, 500];
            if (initialCall) duration = [0, 0];

            yAxis.transition()
                .duration(duration[0])
                .call(axisGeneratorView)
                .each('end', function() {
                    d3.selectAll('.annotations .view-0')
                        .transition(duration[1])
                        .style('fill-opacity', 1)
                        .style('stroke-opacity', 1)
                        .each('end', function() {
                            isTransitioning = false;
                        });
                });

            paths.transition()
                .duration(1500)
                .attr('d', function(d) {
                    return line(getLineData(view, d));
                });
        }

        var annotations = svg.append('g').attr('class', 'annotations');
        var annotationsView0 = annotations.append('g').attr('class', 'view-0');

        annotationsView0.append('line')
            .attr('class', 'baseline')
            .attr('x1', 0)
            .attr('y1', yView0(0))
            .attr('x2', width)
            .attr('y2', yView0(0))


        draw(BUDGET_VIEW, true);

        var buttons = d3.selectAll('.button');
        buttons.data([0, 1])
        buttons.on('click', function(d) {
            if (isTransitioning) return;
            draw(d);

            d3.selectAll('.button.active').classed('active', false);
            d3.select(this).classed('active', true);
        });

    selectWidget.on('change', function() {
      if (isTransitioning) return;

      selectCity(selectWidget.property('selectedIndex'));
    });

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

    d3.select('.home-rate-' + rows[selectWidget.property('selectedIndex')].citySlug)
        .classed('home-rate-active', true);

        selectCity(0);

    });

    var setTooltip = function(d) {
        var val = yActiveProperty(2014);
        if (d[val] < 0.025)
            d[val] = 0.025;

        if (d[val] > 0.1)
            d[val] = 0.1;
        
        tooltip.style('top', (yView0(d[val]) - 30) + 'px');

        tooltipCity.text(d.city);

        var fmt = d3.format('.2f');
        var nfmt = d3.format(',');
        var string = fmt(d.total);
        tooltip.select(".population").html(nfmt(d.population));
        tooltipFines.html(string);
    };

