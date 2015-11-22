var baseurl = "http://code4sa.org/traffic-fines/times/";
var baseurl = "";

document.write('<script type="text/javascript" src="' + baseurl + 'assets/pym.js"></script>')
document.write(
    '<script> \
        var pymParent1 = new pym.Parent("n1", baseurl + "n1.html", {}); \
        var pymParent2 = new pym.Parent("n2", baseurl + "n2.html", {}); \
        var pymParent3 = new pym.Parent("n3", baseurl + "n3.html", {}); \
        var pymParent4 = new pym.Parent("n1p", baseurl + "n1-polokwane.html", {}); \
    </script>');
