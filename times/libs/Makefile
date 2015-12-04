LIBRARY_FILES = \
    misc.js \
    queue.v1.min.js \
    template.js \
    d3/src/start.js \
    d3/src/selection/selection.js \
    d3/src/selection/attr.js \
    d3/src/selection/append.js \
    d3/src/selection/style.js \
    d3/src/dsv/dsv.js \
    d3/src/dsv/csv.js \
    d3/src/xhr/xhr.js \
    d3/src/xhr/xml.js \
    d3/src/transition/transition.js \
    d3/src/transition/duration.js \
    d3/src/event/event.js \
    d3/src/end.js \
    d3-tooltip.js \
    bubble_funcs.js \
    main.js \

lib.js: $(LIBRARY_FILES) Makefile
	/usr/local/bin/smash $(LIBRARY_FILES) | /usr/local/bin/uglifyjs - -c -m -o $@

no_uglify: $(LIBRARY_FILES) Makefile
	/usr/local/bin/smash $(LIBRARY_FILES) > lib.js
