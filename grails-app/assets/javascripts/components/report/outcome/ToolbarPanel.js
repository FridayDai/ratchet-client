var flight = require('flight');
var WithChildren = require('../../common/WithChildren');
var URLs = require('../../../constants/Urls');

var TreatmentCombobox = require('./ToolbarTreatmentCombobox');
var ProviderCombobox = require('./ToolbarProviderCombobox');
var ToolCombobox = require('./ToolbarToolCombobox');
var YearCombobox = require('./ToolbarYearCombobox');

function ToolbarPanel() {
    this.attributes({
        treatmentFieldSelector: '#treatmentFilter',
        toolFieldSelector: '#toolFilter',
        providerFieldSelector: '#providerFilter',
        yearFieldSelector: '#yearFilter'
    });

    this.children({
        treatmentFieldSelector: TreatmentCombobox,
        toolFieldSelector: ToolCombobox,
        providerFieldSelector: ProviderCombobox,
        yearFieldSelector: YearCombobox
    });

    this.searchFields = {
        providerId: null,
        treatmentId: null,
        toolId: null,
        year: null
    };

    this.onProviderSelect = function (e, data) {
        this.triggerSearch(data);
    };

    this.onToolSelect = function (e, data) {
        this.triggerSearch(data);
    };

    this.onTreatmentSelect = function (e, data) {
        this.searchFields.toolId = null;
        this.searchFields.year = null;

        this.triggerSearch(data);

        this.trigger('clearTreatmentScoreChart');
    };

    this.onYearSelect = function (e, data) {
        this.triggerSearch(data);
    };

    this.triggerSearch = function (data) {
        _.assign(this.searchFields, data);

        var triggerSearch = _.every(this.searchFields, function (val, key) {
            return this.searchFields[key] !== null;
        }, this);

        if (triggerSearch) {
            this.search();
        }
    };

    this.search = function () {
        var me = this;

        this.trigger('clearTreatmentScoreChart');

        $.ajax({
            url: URLs.PROVIDER_AVERAGE_OVERVIEW,
            type: "POST",
            dataType: "json",
            data: this.searchFields,
            success: function (data) {
                me.trigger('renderTreatmentScoreChart', data);
            }
        });
    };

    this.onFilterClear = function () {
        this.trigger('clearTreatmentScoreChart');
    };

    this.after('initialize', function () {
        this.on(document, 'selectProviderForReportOverview', this.onProviderSelect);
        this.on(document, 'clearProviderForReportOverview', this.onFilterClear);
        this.on(document, 'selectToolForReportOverview', this.onToolSelect);
        this.on(document, 'clearToolForReportOverview', this.onFilterClear);
        this.on(document, 'selectTreatmentForReportOverview', this.onTreatmentSelect);
        this.on(document, 'clearTreatmentForReportOverview', this.onFilterClear);
        this.on(document, 'selectYearForReportOverview', this.onYearSelect);
        this.on(document, 'clearYearForReportOverview', this.onFilterClear);
    });
}

module.exports = flight.component(WithChildren, ToolbarPanel);
