var flight = require('flight');
var d3 = require('d3');

var PARAMs = require('../../../../constants/Params');

var SCORE_TEMPLATE = '<span class="score-item score-item-{1}" data-index="{1}">{0}</span>';
var LINE_GROUP_SELECTOR = '.line-group-{0}';
var UNSUPPORTED = 'UNSUPPORTED';

var Y_TICK_OFFSET_ARRAY = [1, 5, 10];

function ToolbarPanel() {
    this.attributes({
        chartGroupSelector: '.chart-group',
        chartSelector: '.chart',
        scoreBarSelector: '.view-score-bar',
        scoreItemSelector: '.score-item',
        noAvailableSelector: '.not-available',
        noDataSelector: '.no-data',
        lineGroupSelector: '.line-group'
    });

    this.chartObject = null;

    this.chartSize = {
        chartWidth: 0,
        chartHeight: 0
    };

    this.scales = {
        x: null,
        y: null
    };

    this.setXScale = function (data) {
        if (!_.isArray(data)) {
            throw 'x scale domain input should be array';
        }

        var newDomain = data.slice();
        var first = _.first(data);

        if (first < 0) {
            newDomain.unshift(first * 2);
        } else {
            newDomain.unshift(-50);
        }

        newDomain.push(_.last(data) + 200);

        // 5 fixed points: [1st, -45, 0, 30, ..., last]
        var domainSize = newDomain.length,
            regularSize = domainSize - 5,
            rangArray = [0, 100, 200, 275],
            regularWidth = (this.chartSize.chartWidth - 350) / regularSize;

        for (var i = 0; i < regularSize; i++) {
            rangArray.push(_.last(rangArray) + regularWidth);
        }

        rangArray.push(this.chartSize.chartWidth);

        this.scales.x = d3.scale.linear()
            .domain(newDomain)
            .range(rangArray);

        return this.scales.x;
    };

    this.drawFrame = function (xDomain, yVal) {
        var margin = {top: 50, right: 70, bottom: 140, left: 70},
            svgWidth = this.$node.width(),
            svgHeight = this.$node.height(),
            chartWidth = this.chartSize.chartWidth = svgWidth - margin.left - margin.right,
            chartHeight = this.chartSize.chartHeight = svgHeight - margin.top - margin.bottom;

        var xScale = this.setXScale(xDomain);

        var yScale = this.scales.y = d3.scale.linear()
            .domain([0, yVal])
            .range([chartHeight, 0]);

        var xScaleDomain = xScale.domain();

        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient('bottom')
            .tickValues(xScaleDomain)
            .tickFormat(function (d) {
                var tick = '';

                switch (d) {
                    case xScaleDomain[1]:
                        tick = 'Baseline';
                        break;

                    case 0:
                        tick = 'Surgery Date';
                        break;

                    case _.first(xScaleDomain):
                    case _.last(xScaleDomain):
                        tick = '';
                        break;

                    default:
                        tick = d;
                }

                return tick;
            });

        var yAxis = d3.svg.axis()
            .scale(yScale)
            .tickSize(chartWidth)
            .orient('right')
            .tickValues(this.getYTickValues(yVal));

        var svg = this.chartObject = d3.select(this.$node.find(this.attr.chartSelector).get(0))
            .append('svg')
            .attr('class', 'axis')
            .attr('width', svgWidth)
            .attr('height', svgHeight)
            .append('g')
            .attr('transform', 'translate({0}, {1})'.format(margin.left, margin.top));

        // Insert SCORE/DAY point
        var axisUnit = svg.append('g')
            .classed('axis-unit', true)
            .attr('transform', 'translate(-38, {0})'.format(chartHeight + 24));

        axisUnit.append('text')
            .text('SCORE');

        axisUnit.append('line')
            .attr('x1', 3)
            .attr('y1', 6)
            .attr('x2', 34)
            .attr('y2', 6);

        axisUnit.append('text')
            .text('DAY')
            .attr('y', 20)
            .attr('x', 6);

        var gy = svg.append('g')
            .attr('class', 'y axis')
            .call(yAxis);

        gy.selectAll('text')
            .attr('x', -30)
            .attr('transform', function (d) {
                return 'translate({0}, 0)'.format(4 * (3 - String(d).length));
            });

        gy.insert('line', ':first-child')
            .attr('x1', -18)
            .attr('y1', 0)
            .attr('x2', -18)
            .attr('y2', chartHeight);

        var gx = svg.append('g')
            .attr('class', 'x axis')
            .call(xAxis)
            .attr('transform', 'translate(0, {0})'.format(chartHeight));

        gx.selectAll('text')
            .attr('y', 34);

        gx.insert('line', ':first-child')
            .attr('x1', 0)
            .attr('y1', 39)
            .attr('x2', chartWidth)
            .attr('y2', 39);

        // Setup Surgery Date
        var surgeryDateX = gx.selectAll('g')
            .filter(function (d) { return d === 0;})
            .classed('surgery-date-x', true);

        surgeryDateX.insert('rect', ':first-child')
            .attr('width', 10)
            .attr('height', 6)
            .attr('x', -5)
            .attr('y', 36);

        surgeryDateX.select('line')
            .attr('x1', 0)
            .attr('y1', -chartHeight)
            .attr('x2', 0)
            .attr('y2', 60);

        surgeryDateX.select('text')
            .attr('x', 0)
            .attr('y', 75);

        surgeryDateX.append('path')
            .classed('triangle', true)
            .attr('transform', 'translate(0, 60)')
            .attr('d', d3.svg.symbol()
                .size(24)
                .type('triangle-up'));

        // Insert white rect for each text
        svg.selectAll('text').each(function () {
            var bbox = this.getBBox();
            var transformAttr = $(this).attr('transform');
            var vPadding = 2;
            var hPadding = 4;
            var color = 'white';

            if (this.textContent === 'Surgery Date') {
                vPadding = 4;
                hPadding = 10;
                color = '#305e6e';
            }

            if (bbox.width) {
                d3.select($(this).parent().get(0))
                    .insert('rect', 'text')
                    .attr('x', bbox.x - hPadding)
                    .attr('y', bbox.y - vPadding)
                    .attr('width', bbox.width + hPadding * 2)
                    .attr('height', bbox.height + vPadding * 2)
                    .attr('transform', transformAttr)
                    .style('fill', color);
            }
        });

        $(gy[0][0]).clone().insertAfter($(gy[0][0]))
            .attr('transform', 'translate({0}, 0)'.format(chartWidth + 30))
            .addClass('right-one');
    };

    this.drawLineGroup = function (data, index) {
        var me = this,
            lineGroup = this.chartObject.insert('g', 'g.tip-group')
                .classed('line-group line-group-{0}'.format(index), true)
                .datum(index);

        this.chartObject.append('g')
            .classed('tip-group tip-group-{0}'.format(index), true)
            .datum(0);

        lineGroup.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'point')
            .attr('cx', function (d) { return me.scales.x(d.offset); })
            .attr('cy', function (d) { return me.scales.y(d.score); })
            .attr('r', 3)
            .each(function (d) {
                var cx = me.scales.x(d.offset),
                    cy = me.scales.y(d.score);

                var lineGroup = d3.select($(this).parent().get(0));

                var tip = me.chartObject.select('g.tip-group-{0}'.format(lineGroup.datum()))
                    .append('g')
                    .classed('tip', true);

                var textGroup = tip.append('g')
                    .classed('tip-text-group', true);

                var scoreText = textGroup.append('text')
                    .text('Score: {0}'.format(d.score));

                var scoreTextBBox = scoreText.node().getBBox();
                var textPadding = 10;

                textGroup.append('text')
                    .text('Data Count: {0}'.format(d.count))
                    .attr('x', scoreTextBBox.width + textPadding);

                var textGroupBBox = textGroup.node().getBBox();
                var textGroupHPadding = 8;
                var textGroupVPadding = 4;

                tip.insert('rect', 'g.tip-text-group')
                    .attr('width', textGroupBBox.width + textGroupHPadding * 2)
                    .attr('height', textGroupBBox.height + textGroupVPadding * 2)
                    .attr('x',  textGroupBBox.x - textGroupHPadding)
                    .attr('y', textGroupBBox.y - textGroupVPadding);

                var tipGroupMargin = 20;
                var halfTipGroupWidth = tip.node().getBBox().width / 2;

                tip
                    .append('line')
                    .attr('x1', halfTipGroupWidth)
                    .attr('y1', 0)
                    .attr('x2', halfTipGroupWidth)
                    .attr('y2', tipGroupMargin - 4);

                tip.attr('transform', 'translate({0}, {1})'.format(cx - halfTipGroupWidth, cy - tipGroupMargin));
            });

        var line = d3.svg.line()
            .x(function(d) { return me.scales.x(d.offset); })
            .y(function(d) { return me.scales.y(d.score); });

        lineGroup.insert('path', ':first-child')
            .datum(data)
            .attr('class', 'average-line')
            .attr('d', line);

        lineGroup.selectAll('circle, path')
            .on('mouseover', function (d, i) {
                me.onLineMouseover(d, i, $(this).parent().get(0));
            })
            .on('mouseout', function (d, i) {
                me.onLineMouseout(d, i, $(this).parent().get(0));
            })
            .on('click', function (d, i) {
                me.onLineClicked(d, i, $(this).parent().get(0));
            });
    };

    this.onLineMouseover = function (d, i, elem) {
        var lineGroup = d3.select(elem);

        if (!lineGroup.classed('disable')) {
            lineGroup
                .classed('active', true)
                .selectAll('circle')
                .attr('r', 4);

            $('.line-group')
                .filter(function () {
                    return !$(this).hasClass('active');
                })
                .addClass('disable');

            d3.select('g.tip-group-{0}'.format(lineGroup.datum()))
                .classed('active', true);
        }
    };

    this.onLineMouseout = function (d, i, elem) {
        var lineGroup = d3.select(elem);

        if (!lineGroup.classed('hold') && !lineGroup.classed('disable')) {
            this.resetLines(lineGroup);
        }
    };

    this.getYTickValues = function (val) {
        var minOffset = 100;

        _.each(Y_TICK_OFFSET_ARRAY, function (offset) {
            var number = val / offset;

            if (number <= 10 && number < minOffset) {
                minOffset = number;
            }
        });

        var result = _.range(0, val, minOffset);
        result.push(val);

        return result;
    };

    this.resetLines = function (d3LineGroup) {
        d3LineGroup
            .classed('active', false)
            .selectAll('circle')
            .attr('r', 3);

        $('.line-group.disable')
            .removeClass('disable');

        d3.select('g.tip-group-{0}'.format(d3LineGroup.datum()))
            .classed('active', false);
    };

    this.onLineClicked = function (d, i, elem) {
        var lineGroup = d3.select(elem);

        lineGroup.classed('hold', !lineGroup.classed('hold'));
    };

    this.drawScoreBar = function (types) {
        var $bar = this.select('scoreBarSelector');

        if (types.length > 0) {
            $bar.show();

            _.each(types, function (type, index) {
                $bar.append(SCORE_TEMPLATE.format(PARAMs.SCORE_TYPE[type], index));
            });

            $(this.attr.scoreItemSelector).click(_.bind(this.onScoreItemClicked, this));
        }
    };

    this.onScoreItemClicked = function (e) {
        var $target = $(e.target),
            index = $target.data('index'),
            $lineGroup = $(LINE_GROUP_SELECTOR.format(index));

        if ($target.hasClass('inactive')) {
            $target.removeClass('inactive');
            this.toggleLineGroup($lineGroup, true);
        } else {
            $target.addClass('inactive');
            this.toggleLineGroup($lineGroup, false);
        }
    };

    this.toggleLineGroup = function ($elem, letShow) {
        if ($elem.hasClass('hold')) {
            this.resetLines(d3.select($elem.get(0)));
        }

        if (letShow) {
            $elem.show();
        } else {
            $elem.hide();
        }
    };

    this.clearSVG = function () {
        d3.selectAll(this.attr.lineGroupSelector)
            .selectAll('circle, path')
            .on('mouseover', null)
            .on('mouseout', null)
            .on('click', null);

        this.select('scoreItemSelector').off('click').remove();

        this.$node.find('svg').remove();
    };

    this.onRender = function (e, data) {
        this.$node.show();

        if (data.xRange === UNSUPPORTED) {
            this.select('noAvailableSelector').show();
        } else {
            this.select('chartGroupSelector').show();

            this.drawFrame(data.xRange, data.yRange);

            if (!data.dataSet && !data.items) {
                this.select('noDataSelector').show();
            } else if (data.items) {
                this.drawLineGroup(data.items, 0);
            } else {
                this.select('scoreBarSelector').show();
                this.drawScoreBar(_.map(data.dataSet, 'type'));

                _.each(data.dataSet, function (dataGroup, index) {
                    this.drawLineGroup(dataGroup.items, index);
                }, this);
            }
        }
    };

    this.onClear = function () {
        this.$node.hide();
        this.clearSVG();
        this.select('noAvailableSelector').hide();
        this.select('chartGroupSelector').hide();
        this.select('noDataSelector').hide();
        this.select('scoreBarSelector').hide();
    };

    this.after('initialize', function () {
        this.on(document, 'getProviderAverageOverviewSuccessful', this.onRender);
        this.on(document, 'startGettingProviderAverageOverview', this.onClear);
    });
}

module.exports = flight.component(ToolbarPanel);
