require('d3');

function BarChart(selector, options) {
    var defaultOptions = {
        chartWidth: 500,
        chartHeight: 300,
        barHeight: 32,
        barOffset: 30,
        lastBarOffset: 36,
        rectOffset: 10
    };

    var definedColor = {
        cyan: '#35c2d1',
        gray: '#c6cfd3',
        darkGreen: '#335d70'
    };

    var svg, x, opts;

    var instance = {};

    function init(selector, options) {
        opts = _.assign(defaultOptions, options);
        svg = d3.select(selector)
            .append("svg")
            .attr("width", opts.chartWidth)
            .attr("height", opts.chartHeight);
        return instance;
    }

    instance.render = function (data, maxDomain) {
        var dataName = _.keys(data);
        var dataSet = _.values(data);

        x = d3.scale.linear()
            .domain([0, maxDomain? maxDomain: d3.max(dataSet)])
            .range([0, opts.chartWidth - 150]);

        var chartGroup = svg.append('g')
            .attr("transform", "translate(100,0)");

        var barGroup = chartGroup.selectAll("g")
            .data(dataSet)
            .enter().append('g')
            .attr("transform", function (d, i) {
                var Offset = i === 4 ? opts.lastBarOffset : opts.barOffset;
                return "translate(0," + i * Offset + ")";
            });

        barGroup.append("rect")
            .attr("width", 3)
            .attr("height", opts.barHeight)
            .style("fill", definedColor.darkGreen);

        barGroup.append("rect")
            .attr("class", "bar-rect")
            .attr("x", 3)
            .attr("y", opts.rectOffset / 2)
            .attr("width", x)
            .attr("height", opts.barHeight - opts.rectOffset)
            .style("fill", function (d, i) {
                return i === 0 ? definedColor.cyan : definedColor.gray;
            });

        barGroup.append("text")
            .attr("class", "text-number")
            .attr("x", function (d) {
                return x(d) + 10;
            })
            .attr("dy", '1.5em')
            .text(function (d) {
                return d;
            });

        barGroup.data(dataName)
            .append('text')
            .attr("class", "text-legend")
            .attr("dx", "-1.5em")
            .attr("dy", "1.5em")
            .attr("text-anchor", "end")
            .text(function (d) {
                return d.toUpperCase();
            });

        return instance;
    };

    instance.update = function (data) {
        var dataSet = _.values(data);
        svg.selectAll(".bar-rect")
            .data(dataSet)
            .transition()
            .duration(500)
            .ease("linear")
            .attr("x", 3)
            .attr("y", opts.rectOffset / 2)
            .attr("width", x)
            .attr("height", opts.barHeight - opts.rectOffset);

        svg.selectAll(".text-number")
            .data(dataSet)
            .transition()
            .duration(500)
            .ease("linear")
            .attr("x", function (d) {
                return x(d) + 10;
            })
            .attr("dy", '1.5em')
            .text(function (d) {
                return d;
            });
        return instance;
    };

    return init(selector, options);

}

module.exports = BarChart;
