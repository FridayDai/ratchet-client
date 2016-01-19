require('../../components/layout/Main');

var flight = require('flight');
var WithPage = require('../../components/common/WithPage');

var ChartPanel = require('../../components/report/taskCompletion/ChartPanel');
var ProviderFilter = require('../../components/report/taskCompletion/ProviderFilter');

function TaskCompletionPage() {
    this.attributes({
        chartPanelSelector: '#charts-panel',
        ProviderFilterSelector: '#selectSurgeon'
    });

    this.children({
        chartPanelSelector: ChartPanel,
        ProviderFilterSelector: ProviderFilter
    });
}

flight.component(WithPage,TaskCompletionPage).attachTo('#main');
