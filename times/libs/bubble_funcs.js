var trafficfines = trafficfines || {}
!function() {
    trafficfines.BubbleFuncs = function(national, ctx) {

        var calc_fines_per_capita_month = function(datum) {
            return datum["Total Fines"] / datum["Population"];
        }

        var calc_perc_fines = function(datum) {
            return datum["Total Fines"] / datum["Total Budget"];
        }

        var ctx = ctx || {};
        var r_max = ctx.r_max || 55;
        var r_min = ctx.r_min || 0.1;
        var nat_fines_per_capita = calc_fines_per_capita_month(national);
        var nat_perc_budget = calc_perc_fines(national);

        bubbles = {
            transition_radius : function(element, value) {
                var calc_radius = function(value) {
                    if (isNaN(parseInt(value)) || value < r_min)
                        value = r_min;

                    var radius = Math.sqrt(value) * 8;
                    if (radius > r_max)
                        return r_max
                    else if (radius < r_min)
                        return r_min
                    return radius
                }

                var radius = calc_radius(value);
                var code = d3.select(element).attr("data-munic");

                d3.select(element).select("circle").transition().attr("r", radius);
                d3.select(element).selectAll("text").text(function(el, idx) {
                    value = Math.round(value)
                    if (value < 3) return ""
                    return value + "x"
                });
                if (isNaN(parseInt(value))) {
                    d3.select(element).classed("no_data", true);
                }
            },
            process_datum : function(datum) {
                perc_fines = calc_perc_fines(datum);
                fines_per_capita = calc_fines_per_capita_month(datum);

                datum["population"] = datum["Population"];
                datum["total_fines"] = datum["Total Fines"];
                datum["total_budget"] = datum["Total Budget"];
                datum["perc_fines"] = perc_fines;
                datum["fines_per_capita"] = fines_per_capita;
                datum["nat_per_capita"] = fines_per_capita / nat_fines_per_capita;
                datum["nat_perc_budget"] = perc_fines / nat_perc_budget;
            }
        }
        return bubbles
    }
}();
