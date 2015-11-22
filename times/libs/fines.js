if (document.location.hostname == "localhost") {
    var baseurl = "";
} else {
    var baseurl = "http://code4sa.org/traffic-fines/times/";
}

document.write('<script type="text/javascript" src="' + baseurl + 'assets/pym.js"></script>')

elements = ["n1", "n2", "n3"];
for (idx in elements) {
    var el = elements[idx];
    if (document.getElementById(el))
        document.write('<script>\
            var pymParent = new pym.Parent("' + el + '", baseurl + "' + el + '.html", {});</script>')
}
