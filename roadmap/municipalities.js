var roadmap = roadmap || {}
roadmap.municipalities = roadmap.municipalities || {}

roadmap.municipalities = (function() {
    var self = {}
    self.Municipalities = function(munics) {
        this.munics = munics;
    }

    self.Municipalities.prototype = {
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

            return new self.Municipalities(new_munics);
        }
    }
    return self;
})();

