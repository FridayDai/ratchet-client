var flight = require('flight');
var WithChildren = require('../../common/WithChildren');
var URLs = require('../../../constants/Urls');

var ToolCombobox = require('./ToolbarToolCombobox');

function ToolbarPanel() {
    this.attributes({
        toolFieldSelector: '.tool-filter'
    });

    this.children({
        toolFieldSelector: ToolCombobox
    });

    this.initIds = function () {
        var nodeData = this.$node.data();

        this.patientId = nodeData.patientId;
        this.medicalRecordId = nodeData.medicalRecordId;
    };

    this.onToolSelect = function (e, data) {
        // Note: Since we cached all treatments nodes in browser,
        // events maybe trigger when treatment nodes not available.
        if (this.$node.is(':visible')) {
            this.search(data.toolId);
        }
    };

    this.onToolClear = function () {
        // Note: Since we cached all treatments nodes in browser,
        // events maybe trigger when treatment nodes not available.
        if (this.$node.is(':visible')) {
            this.trigger('clearTreatmentScoreChart');
        }
    };

    this.search = function (toolId) {
        var me = this;

        this.trigger('clearTreatmentScoreChart');

        $.ajax({
            url: URLs.GET_INDIVIDUAL_REPORT.format(this.patientId, this.medicalRecordId, toolId),
            success: function (data) {
                me.trigger('renderTreatmentScoreChart', data);
            }
        });
    };

    this.after('initialize', function () {
        this.initIds();

        this.on(document, 'selectToolForIndividualReport', this.onToolSelect);
        this.on(document, 'clearToolForIndividualReport', this.onToolClear);
    });
}

module.exports = flight.component(WithChildren, ToolbarPanel);
