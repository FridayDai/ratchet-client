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
        this.search(data.toolId);
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
    });
}

module.exports = flight.component(WithChildren, ToolbarPanel);
