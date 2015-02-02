(function ($, undefined) {
    'use strict';

    var overview = RC.pages.overview = RC.pages.overview || {};

    /**
     * init overview chart
     * @private
     */
    function _initChart(element) {
        //Width and height
        var w = 500;
        var h = 300;
        var padding = 30;

        var scores = [
            {
                name: "grape",
                score: 12,
                time: 1
            },
            {
                name: "kiwi",
                score: 98,
                time: 2
            },
            {
                kind: "banana",
                score: 60,
                time: 10
            },
            {
                kind: "banana",
                score: 50,
                time: 12
            }
        ];


        //Create scale functions
        var xScale = d3.scale.linear()
            .domain([0, d3.max(scores, function(d) { return d.time; })])
            .range([padding, w - padding * 2]);

        var yScale = d3.scale.linear()
            .domain([0, d3.max(scores, function(d) { return d.score; })])
            .range([h - padding, padding]);

        var rScale = d3.scale.linear()
            .domain([0, d3.max(scores, function(d) { return d.score; })])
            .range([2, 5]);

        //Define X axis
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom")
            .ticks(5);

        //Define Y axis
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left")
            .ticks(5);

        var chartElement = element.find(".charts");
        //Create SVG element
        var svg = d3.select(chartElement.selector)
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("class", "chart");

        //Create circles
        svg.selectAll("circle")
            .data(scores)
            .enter()
            .append("circle")
            .attr("cx", function(d) {
                return xScale(d.time);
            })
            .attr("cy", function(d) {
                return yScale(d.score);
            })
            .attr("r", function(d) {
                return rScale(d.score);
            });

        //Create labels
        svg.selectAll("text")
            .data(scores)
            .enter()
            .append("text")
            .text(function(d) {
                return d.time + "," + d.score;
            })
            .attr("x", function(d) {
                return xScale(d.time);
            })
            .attr("y", function(d) {
                return yScale(d.score);
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "white");

        //Create X axis
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + (h - padding) + ")")
            .call(xAxis);

        //Create Y axis
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + padding + ",0)")
            .call(yAxis);

    }
    /**
     * patientTeam page Initialization
     * @private
     */
    function _init(element) {
        _initChart(element);
    }

    $.extend(overview, {
        init: function(element){
            _init(element);
        }
    });

})(jQuery);
