var flight = require('flight');

var URLs = require('../../constants/Urls');
var barChart = require('./charts/BarChart');
var donutPlot = require('./charts/Donutplot');

function ChartPanel() {
    this.attributes({
        allPanelSelector: '#all-panel',
        emailPanelSelector: '#email-panel'
    });

    this.drawWithData = function (providerId, imple) {
        $.ajax({
            url: URLs.GET_TASK_COMPLETION,
            type: "POST",
            data: {
                providerId: providerId
            },
            success: function (data) {
                if (_.isFunction(imple)) {
                    imple(data);
                }
            }
        });
    };

    this.convertData = function (data) {
        return {
            "done": data.done || 0,
            "pending": data.pending || 0,
            "overdue": data.overdue || 0,
            "expired": data.expired || 0,
            "total": data.total ? +data.total - (data.schedule || 0) : 0
        };
    };

    this.pickToArray = function (data) {
        var completeList = [];
        if (data.total) {
            var total = data.total - (data.schedule || 0);
            completeList.push(data.done || 0);
            completeList.push(total - data.done || 0);
        } else {
            completeList = [0, 1];
        }

        return completeList;
    };

    this.init = function () {
        var self = this;
        this.drawWithData(null, function (data) {

            var barOption = {
                chartWidth: 600,
                chartHeight: 250,
                barOffset: 40,
                lastBarOffset: 50
            };

            var donutOption = {
                width: 200,
                height: 200,
                donutWidth: 16
            };

            var all = self.convertData(data.all);
            var maxDomain = all.total;

            self.allBar = barChart('#all-panel .bar', barOption).render(all);
            self.emailBar = barChart('#email-panel .bar', barOption).render(self.convertData(data.byEmail), maxDomain);

            self.allDonut = donutPlot('#all-panel .donut', donutOption).render(self.pickToArray(data.all));
            self.emailDonut = donutPlot('#email-panel .donut', donutOption).render(self.pickToArray(data.byEmail));
        });
    };

    this.updateChart = function (e, provider) {
        var self = this;

        this.drawWithData(provider.surgeonId, function (data) {
            self.allBar.update(self.convertData(data.all));
            self.emailBar.update(self.convertData(data.byEmail));
            self.allDonut.update(self.pickToArray(data.all));
            self.emailDonut.update(self.pickToArray(data.byEmail));
        });
    };

    this.after('initialize', function () {
        this.init();
        this.on(document, 'selectProviderForTaskCompletion', this.updateChart);
    });
}

module.exports = flight.component(ChartPanel);

