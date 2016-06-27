require('../../components/layout/Main');

var flight = require('flight');
var WithPage = require('../../components/common/WithPage');

var ChartPanel = require('../../components/report/taskCompletion/ChartPanel');
var ToolbarPanel = require('../../components/report/taskCompletion/ToolbarPanel');


function TaskCompletionPage() {
    this.attributes({
        chartPanelSelector: '#charts-panel',
        toolbarPanelSelector: '#filter-panel'
    });

    this.children({
        chartPanelSelector: ChartPanel,
        toolbarPanelSelector: ToolbarPanel
    });
}

flight.component(WithPage,TaskCompletionPage).attachTo('#main');
