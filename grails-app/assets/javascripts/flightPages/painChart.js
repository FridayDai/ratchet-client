require('../components/layout/Main');

var flight = require('flight');
var snap = require('snapsvg');
var WithPage = require('../components/common/WithPage');


function PainChartPage() {
    this.attributes({
        painToggleSelector: '#painToggle',
        painChoiceSelector: '#svg-choice-result'
    });

    this.activeArmPattern = function (path, svg) {
        var s = snap(svg);

        var p = s.path("M10-5-10,15M15,0,0,15M0-5-20,15").attr({
            fill: "none",
            stroke: "#e82831",
            strokeWidth: 2
        });
        p = p.pattern(0, 0, 10, 10);

        snap(path).attr({
            fill: p
        }).addClass('active-part');
    };

    this.addSymptomsText = function (element, data) {
        var snapElement = snap(element);
        var $ele = $(element);
        var parameter = $ele.data("parameter");
        var gx = parameter[0];
        var gy = parameter[1];
        var offset = parameter[2] || 0;
        var rowLength = parameter[3] || 2;

        for (var i = 0; i < data.length; i++) {
            var square = snapElement.rect(0, 0, 14, 14).attr({
                fill: "red"
            });
            var inlineText = snapElement.text(7, 11, data[i]).attr({
                fill: "#fff",
                "text-anchor": "middle",
                "font-size": "13px"
            });
            var x = gx + Math.floor(i % rowLength) * 20 + Math.floor(i / rowLength) * offset;
            var y = gy + Math.floor(i / rowLength) * 20;
            snapElement.g(square, inlineText).attr({
                transform: snap.format("tanslate({x},{y})", {x: x, y: y})
            });
        }

    };

    this.drawPainChart = function () {
        var self = this;
        _.forEach(this.select('painChoiceSelector').find('input'), function (ele) {
            var resultValue = $(ele).val();
            var id = ele.id.replace(/-hidden/, '');

            if (resultValue) {
                var path = $('#{0}'.format(id));
                var svg = path.closest('svg').get(0);
                var symptomTags = resultValue.split(',');
                self.activeArmPattern(path.get(0), svg);
                self.addSymptomsText(path.closest('.part-group').get(0), symptomTags);
            }
        });
    };

    this.disabledChart = function () {
        _.forEach($('.human'), function (svg) {
            var s = snap(svg);
            _.forEach($.merge($('.body'), ($('.body-inline'))), function (ele) {
                snap(ele).attr({
                    fill: '#E6E6E6'
                });
            });
        });

    };

    this.disabledPercentage = function () {
        _.forEach($(".pain-percent"), function (ele) {
            $(ele).text('- -');
        });
    };

    this.initPainChart = function () {
        var checked = this.select('painToggleSelector').get(0).checked;
        if (checked) {
            this.disabledChart();
            this.disabledPercentage();
        } else {
            this.drawPainChart();
        }
    };

    this.after('initialize', function () {
        this.initPainChart();
    });
}

flight.component(WithPage, PainChartPage).attachTo('#main');

