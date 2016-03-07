require('../../components/layout/Main');

var flight = require('flight');
var WithPage = require('../../components/common/WithPage');

var ToolbarPanel = require('../../components/report/outcome/ToolbarPanel');
var ChartPanel = require('../../components/report/outcome/TreatmentScoreChart');

function OverviewPage() {
    this.attributes({
        toolbarPanelSelector: '.tool-bar',
        chartPanelSelector: '.chart-panel'
    });

    this.children({
        toolbarPanelSelector: ToolbarPanel,
        chartPanelSelector: ChartPanel
    });
}

flight.component(WithPage, OverviewPage).attachTo('#main');
