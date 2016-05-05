var flight = require('flight');
var WithChildren = require('../../common/WithChildren');

var ToolbarPanel = require('./ToolbarPanel');
var ChartPanel = require('./ScoreChart');

function ReportSection() {
    this.attributes({
        toolbarPanelSelector: '.tool-bar',
        chartPanelSelector: '.chart-panel'
    });

    this.children({
        toolbarPanelSelector: ToolbarPanel,
        chartPanelSelector: ChartPanel
    });
}

module.exports = flight.component(WithChildren, ReportSection);
