if (document.location.hostname == "localhost") {
    var baseurl = "";
} else {
    var baseurl = "http://code4sa.org/traffic-fines/times/";
}

document.write('<script type="text/javascript" src="' + baseurl + 'assets/pym.js"></script>')

elements = ["n1", "n2", "n3", "n1h", "n2h"];
document.write("<script>");
for (idx in elements) {
    var el = elements[idx];
    if (document.getElementById(el))
        document.write('var pymParent = new pym.Parent("' + el + '", "' + baseurl + 'route.html?route=' + el + '", {});')
}
document.write("</script>");
