var flight = require('flight');
var d3 = require('d3');

var PARAMs = require('../../../constants/Params');
var Utility = require('../../../utils/Utility');

var SCORE_TEMPLATE = '<span class="score-item score-item-{1}" data-index="{1}">{0}</span>';
var LINE_GROUP_SELECTOR = '.line-group-{0}';

var DATE_FORMAT = 'MMM D, YYYY';

function roundedRect(opts) {
    return 'M' + (opts.x + opts.radius) + ',' + opts.y +
        'h' + (opts.width - opts.radius * 2) +
        'a' + opts.radius + ',' + opts.radius + ' 0 0 1 ' + opts.radius + ',' + opts.radius +
        'v' + (opts.height - 2 * opts.radius) +
        'a' + opts.radius + ',' + opts.radius + ' 0 0 1 ' + -opts.radius + ',' + opts.radius +
        'h' + (2 * opts.radius - opts.width) +
        'a' + opts.radius + ',' + opts.radius + ' 0 0 1 ' + -opts.radius + ',' + -opts.radius +
        'v' + (2 * opts.radius - opts.height) +
        'a' + opts.radius + ',' + opts.radius + ' 0 0 1 ' + opts.radius + ',' + -opts.radius +
        'z';
}

function ScoreChart() {
    this.attributes({
        chartGroupSelector: '.chart-group',
        chartSelector: '.chart',
        scoreBarSelector: '.view-score-bar',
        scoreItemSelector: '.score-item',
        noAvailableSelector: '.not-available',
        defaultPanelSelector: '.default',
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
        y: null,
        meta: {
            xRange: [],
            maxY: 0,
            type: [],
            dataGroup: {}
        }
    };

    this.setXScale = function (data) {
        if (!_.isArray(data)) {
            throw 'x scale domain input should be array';
        }

        var newDomain = data.slice();
        newDomain.unshift(0);
        newDomain.push(1);

        this.scales.x = d3.scale.ordinal()
            .domain(newDomain)
            .rangePoints([0, this.chartSize.chartWidth]);

        return this.scales.x;
    };

    this.drawFrame = function (xDomain, yVal, yPace) {
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
            .tickFormat(function () {
                return '';
            });

        var yAxis = d3.svg.axis()
            .scale(yScale)
            .tickSize(chartWidth)
            .orient('right')
            .tickValues(this.getYTickValues(yVal, yPace));

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

    this.drawLineGroup = function (data, index, scoreType) {
        var me = this,
            lineGroup = this.chartObject.insert('g', 'g.status-tip-group')
                .classed('line-group line-group-{0}'.format(index), true)
                .datum(index);

        this.chartObject.append('g')
            .classed('status-tip-group status-tip-group-{0}'.format(index), true)
            .datum(0);

        var circleLength = data.length;

        lineGroup.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'point')
            .attr('cx', function (d) { return me.scales.x(d.date); })
            .attr('cy', function (d) { return me.scales.y(d.score); })
            .attr('r', 3)
            .each(function (d, i) {
                var cx = me.scales.x(d.date),
                    cy = me.scales.y(d.score);

                var lineGroup = d3.select($(this).parent().get(0));

                var statusTip = me.chartObject.select('g.status-tip-group-{0}'.format(lineGroup.datum()))
                    .append('g')
                    .classed('tip', true);

                var textGroup = statusTip.append('g')
                    .classed('tip-text-group', true);

                var dateText = textGroup.append('text')
                    .text(Utility.toVancouverTimeHour(d.date, DATE_FORMAT));

                var dateTextBBox = dateText.node().getBBox();
                var textPadding = 10;

                textGroup.append('text')
                    .text('Score: {0}'.format(d.score))
                    .attr('x', dateTextBBox.width + textPadding);

                var textGroupBBox = textGroup.node().getBBox();
                var textGroupHPadding = 8;
                var textGroupVPadding = 4;

                statusTip.insert('rect', 'g.tip-text-group')
                    .attr('width', textGroupBBox.width + textGroupHPadding * 2)
                    .attr('height', textGroupBBox.height + textGroupVPadding * 2)
                    .attr('x',  textGroupBBox.x - textGroupHPadding)
                    .attr('y', textGroupBBox.y - textGroupVPadding);

                var tipGroupMargin = 20;
                var halfTipGroupWidth = statusTip.node().getBBox().width / 2;

                statusTip
                    .append('line')
                    .attr('x1', halfTipGroupWidth)
                    .attr('y1', 0)
                    .attr('x2', halfTipGroupWidth)
                    .attr('y2', tipGroupMargin - 4);

                statusTip.attr('transform', 'translate({0}, {1})'.format(cx - halfTipGroupWidth, cy - tipGroupMargin));

                if (scoreType) {
                    if (i === 0) {
                        me.drawMark(scoreType, {
                            cx: cx,
                            cy: cy,
                            index: lineGroup.datum()
                        });
                    } else if (i === circleLength - 1) {
                        me.drawMark(scoreType, {
                            cx: cx,
                            cy: cy,
                            index: lineGroup.datum(),
                            isRight: true
                        });
                    }
                }
            });

        var line = d3.svg.line()
            .x(function(d) { return me.scales.x(d.date); })
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

    this.drawMark = function (text, opts) {
        var markTip = this.chartObject.select('g.status-tip-group-{0}'.format(opts.index))
            .append('g')
            .classed('mark-tip', true);

        var markText = markTip.append('text')
            .text(text);

        var markTextBBox = markText.node().getBBox();
        var markTextHPadding = 8;
        var markTextVPadding = 4;

        markTip.insert('path', 'text')
            .attr('d', roundedRect({
                x: markTextBBox.x - markTextHPadding,
                y: markTextBBox.y - markTextVPadding,
                width: markTextBBox.width + markTextHPadding * 2,
                height: markTextBBox.height + markTextVPadding * 2,
                radius: 3
            }));

        var markTipBBox = markTip.node().getBBox(),
            markTipWidth = markTipBBox.width,
            markTipMargin = 10;

        var x = opts.cx - markTipWidth - markTipMargin + markTextHPadding;

        if (opts.isRight) {
            x = opts.cx + markTipMargin + markTextHPadding;
        }

        markTip.attr('transform', 'translate({0}, {1})'.format(x, opts.cy + markTextBBox.height / 2));
    };

    this.drawSurgeryDate = function(surgeryDate) {
        var surgeryDateX = this.chartObject
            .append('g')
            .classed('surgery-date-x', true)
            .attr('transform', 'translate({0}, {1})'.format(this.scales.x(surgeryDate), this.chartSize.chartHeight));

        var vPadding = 4;
        var hPadding = 10;
        var color = '#305e6e';

        var textGroup = surgeryDateX.append('g')
            .classed('text-group', true)
            .attr('transform', 'translate({0}, {1})'.format(0, 45));

        var surgeryDateText = textGroup.append('text')
            .text('Surgery Date');

        var surgeryDateBBox = surgeryDateText.node().getBBox();

        textGroup.append('text')
            .text(Utility.toVancouverTimeHour(surgeryDate, DATE_FORMAT))
            .attr('y', surgeryDateBBox.height + 3)
            .attr('x', 0);

        var textGroupBBox = textGroup.node().getBBox();

        surgeryDateX.insert('rect', 'g')
            .attr('x', textGroupBBox.x - hPadding)
            .attr('y', textGroupBBox.y - vPadding)
            .attr('width', textGroupBBox.width + hPadding * 2)
            .attr('height', textGroupBBox.height + vPadding * 2)
            .attr('transform', 'translate({0}, {1})'.format(0, 45))
            .style('fill', color);

        surgeryDateX.append('line')
            .attr('x1', 0)
            .attr('y1', -this.chartSize.chartHeight)
            .attr('x2', 0)
            .attr('y2', 20);

        surgeryDateX.append('path')
            .classed('triangle', true)
            .attr('transform', 'translate(0, 20)')
            .attr('d', d3.svg.symbol()
                .size(24)
                .type('triangle-up'));

        var beforeSurgerySpace = this.scales.x(surgeryDate) - textGroupBBox.width / 2 - hPadding;

        if (beforeSurgerySpace >= 130) {
            this.chartObject
                .append('text')
                .text('BEFORE SURGERY')
                .classed('surgery-text before', true)
                .attr('x', beforeSurgerySpace / 2)
                .attr('y', this.chartSize.chartHeight + 65)
                .attr('dx', -55);
        }

        var afterSurgerySpace = this.chartSize.chartWidth -
                                    this.scales.x(surgeryDate) -
                                    textGroupBBox.width / 2 -
                                    hPadding;

        if (afterSurgerySpace >= 130) {
            this.chartObject
                .append('text')
                .text('AFTER SURGERY')
                .classed('surgery-text after', true)
                .attr('x', this.scales.x(surgeryDate) + afterSurgerySpace / 2)
                .attr('y', this.chartSize.chartHeight + 65);
        }
    };

    this.onLineMouseover = function (d, i, elem) {
        var lineGroup = d3.select(elem);

        if (!lineGroup.classed('disable')) {
            lineGroup
                .classed('active', true)
                .selectAll('circle')
                .attr('r', 4);

            this.$node.find('.line-group')
                .filter(function () {
                    return !$(this).hasClass('active');
                })
                .addClass('disable');

            d3.select(this.$node[0])
                .select('g.status-tip-group-{0}'.format(lineGroup.datum()))
                .classed('active', true);
        }
    };

    this.onLineMouseout = function (d, i, elem) {
        var lineGroup = d3.select(elem);

        if (!lineGroup.classed('hold') && !lineGroup.classed('disable')) {
            this.resetLines(lineGroup);
        }
    };

    this.getYTickValues = function (val, pace) {
        var result = _.range(0, val, pace);
        result.push(val);

        return result;
    };

    this.resetLines = function (d3LineGroup) {
        d3LineGroup
            .classed('active', false)
            .selectAll('circle')
            .attr('r', 3);

        this.$node.find('.line-group.disable')
            .removeClass('disable');

        d3.select(this.$node[0])
            .select('g.status-tip-group-{0}'.format(d3LineGroup.datum()))
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
                $bar.append(SCORE_TEMPLATE.format(type, index));
            });

            this.select('scoreItemSelector').click(_.bind(this.onScoreItemClicked, this));
        }
    };

    this.onScoreItemClicked = function (e) {
        var $target = $(e.target),
            index = $target.data('index'),
            $lineGroup = this.$node.find(LINE_GROUP_SELECTOR.format(index));

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
        d3.select(this.$node[0])
            .selectAll(this.attr.lineGroupSelector)
            .selectAll('circle, path')
            .on('mouseover', null)
            .on('mouseout', null)
            .on('click', null);

        this.select('scoreItemSelector').off('click').remove();

        this.$node.find('svg').remove();
    };

    this.organizeData = function(data) {
        var meta = this.scales.meta;
        var hasScoreType = false;
        var reportSetting = PARAMs.REPORT_CHART_SETTING[data.toolType];
        var availableTypes = reportSetting.type;
        var scoreAtType = reportSetting.scoreAt;

        if (availableTypes) {
            hasScoreType = true;

            _.each(availableTypes, function (type) {
                meta.dataGroup[type] = [];
            });
        } else {
            meta.dataGroup[scoreAtType] = [];
        }

        _.each(data.data, function(point) {
            if (!_.contains(meta.xRange, point.date)) {
                meta.xRange.push(point.date);
            }

            if (point.score > meta.maxY) {
                meta.maxY = point.score;
            }

            if (hasScoreType && _.contains(availableTypes, PARAMs.SCORE_TYPE[point.type])) {
                meta.dataGroup[PARAMs.SCORE_TYPE[point.type]].push(point);
            } else if (!hasScoreType && scoreAtType === point.type) {
                meta.dataGroup[scoreAtType].push(point);
            }
        });

        if (data.surgeryDate && !_.contains(meta.xRange, data.surgeryDate)) {
            meta.xRange.push(data.surgeryDate);
        }

        meta.xRange = _.sortBy(meta.xRange);

        _.each(meta.dataGroup, function (value, key) {
            meta.dataGroup[key] = _.sortBy(value, 'date');
        });
    };

    this.onRender = function (e, data) {
        if (this.$node.is(':visible')) {
            this.select('defaultPanelSelector').hide();

            var reportSetting = PARAMs.REPORT_CHART_SETTING[data.toolType];
            if (!data || !reportSetting) {
                this.select('noAvailableSelector').show();
            } else {
                this.select('chartGroupSelector').show();
                this.organizeData(data);

                this.drawFrame(this.scales.meta.xRange, reportSetting.maxScore, reportSetting.pace);

                var dataGroup = this.scales.meta.dataGroup;
                var availableTypes = reportSetting.type;
                var scoreAtType = reportSetting.scoreAt;

                if (data.data.length === 0) {
                    this.select('noDataSelector').show();
                } else {
                    if (!availableTypes) {
                        this.drawLineGroup(dataGroup[scoreAtType], 0);
                    } else {
                        this.select('scoreBarSelector').show();
                        this.drawScoreBar(availableTypes);

                        _.each(availableTypes, function (type, index) {
                            this.drawLineGroup(dataGroup[type], index, type);
                        }, this);
                    }
                }

                if (data.surgeryDate) {
                    this.drawSurgeryDate(data.surgeryDate);
                }
            }
        }
    };

    this.onClear = function () {
        if (this.$node.is(':visible')) {
            this.clearSVG();
            this.select('defaultPanelSelector').show();
            this.select('noAvailableSelector').hide();
            this.select('chartGroupSelector').hide();
            this.select('noDataSelector').hide();
            this.select('scoreBarSelector').hide();
        }
    };

    this.after('initialize', function () {
        this.on(document, 'renderTreatmentScoreChart', this.onRender);
        this.on(document, 'clearTreatmentScoreChart', this.onClear);
    });
}

module.exports = flight.component(ScoreChart);
