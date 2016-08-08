var flight = require('flight');
var WithChildren = require('../../common/WithChildren');
var ClearTabCache = require('../../shared/functional/ClearTabCache');

var ToolbarPanel = require('./ToolbarPanel');
var ChartPanel = require('./ScoreChart');

var REPORT_TAB_EFFECT_EVENTS = [
    'addTreatmentSuccess',
    'deleteTreatmentSuccess',
    'editSurgeryDateSuccess'
    //'archiveTreatmentSuccess'
];

function ReportSection() {
    this.attributes({
        clearCacheEvents: REPORT_TAB_EFFECT_EVENTS,

        toolbarPanelSelector: '.tool-bar',
        chartPanelSelector: '.chart-panel'
    });

    this.children({
        toolbarPanelSelector: ToolbarPanel,
        chartPanelSelector: ChartPanel
    });

    this.showTabSection = function () {
        this.$node.children(':first').css('visibility', 'visible');
    };

    this.after('initialize', function () {
        this.showTabSection();
    });
}

module.exports = flight.component(
    ClearTabCache,
    WithChildren,
    ReportSection
);
