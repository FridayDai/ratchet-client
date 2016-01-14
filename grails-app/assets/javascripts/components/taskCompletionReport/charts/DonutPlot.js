require('d3');

function DonutPlot(selector, options) {
    var defaultOptions = {
        width: 300,
        height: 300,
        donutWidth: 20
    };

    var definedColor = {
        cyan: '#35c2d1',
        gray: '#c6cfd3',
        darkGreen: '#335d70'
    };

    var svg, radius, arc, piePart, opts, current;

    var instance = {};

    function init(selector, options) {
        opts = _.assign(defaultOptions, options);
        radius = Math.min(opts.width, opts.height) / 2;
        svg = d3.select(selector)
            .append("svg")
            .attr("width", opts.width)
            .attr("height", opts.height)
            .append('g')
            .attr('transform', 'translate(' + (opts.width / 2) + ',' + (opts.height / 2) + ')');

        return instance;
    }

    instance.render = function (dataSet) {
        var legendVert = 8;
        var legendSpacing = 16;

        var color = d3.scale.ordinal()
            .range([definedColor.cyan, definedColor.gray]);

        arc = d3.svg.arc()
            .innerRadius(radius - opts.donutWidth)
            .outerRadius(radius);

        piePart = d3.layout.pie()
            .value(function (d) {
                return d;
            })
            .sort(null);

        svg.selectAll('path')
            .data(piePart(dataSet))
            .enter()
            .append('path')
            .attr('class', "arc")
            .attr('d', arc)
            .attr('fill', function (d, i) {
                return color(i);
            })
            .each(function (d) {
                current = d;
            });

        var legend = svg.append("g")
            .attr('class', 'legend')
            .attr('transform', function () {
                return "translate(0," + legendVert + ")";
            });

        legend.append('text')
            .attr("class", "percent-result")
            .attr('x', 0)
            .attr('y', -legendSpacing)
            .attr("text-anchor", "middle")
            .text(function () {
                return '' + (dataSet[0] / (dataSet[0] + dataSet[1]) * 100).toFixed(1) + '%';
            });

        legend.append('text')
            .attr("class", "middle-text")
            .attr('x', 0)
            .attr('y', legendVert)
            .attr("text-anchor", "middle")
            .text("DONE");

        return instance;
    };

    instance.update = function (dataSet) {
        // Store the displayed angles in _current.
        // Then, interpolate from _current to the new angles.
        // During the transition, _current is updated in-place by d3.interpolate.
        function arcTween(a) {
            var i = d3.interpolate(current, a);
            current = i(0);
            return function (t) {
                return arc(i(t));
            };
        }

        svg.selectAll(".arc")
            .data(piePart(dataSet))
            .transition()
            .duration(500)
            .ease("circle")
            .attrTween("d", arcTween);

        svg.selectAll(".percent-result")
            .transition()
            .delay(500)
            .text(function () {
                return '' + (dataSet[0] / (dataSet[0] + dataSet[1]) * 100).toFixed(1) + '%';
            });

        return instance;
    };

    return init(selector, options);

}

module.exports = DonutPlot;

