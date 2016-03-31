var flight = require('flight');
var WithCombobox = require('../../common/WithCombobox');
var URLs = require('../../../constants/Urls');

function ToolbarYearCombobox() {
    this.options({
        source: function (request, response) {
            $.ajax({
                dropProcess: true,
                url: URLs.GET_TREATMENT_AVAILABLE_YEARS.format(this.getTreatmentId())
            }).done(function (data) {
                response($.map(data, function (item) {
                    return {
                        label: item,
                        value: item
                    };
                }));
            });
        },
        appendTo: ".container"
    });

    this.attributes({
        selectDataKey: 'year',
        selectEvent: 'selectYearForReportOverview',
        clearEvent: 'clearYearForReportOverview',
        treatmentSelectEvent: 'selectTreatmentForReportOverview',
        treatmentClearEvent: 'clearTreatmentForReportOverview'
    });

    this._previousTreatmentId = null;
    this.onTreatmentSelected = function (e, data) {
        if (!this._previousTreatmentId) {
            this.$node.prop("disabled", false);
            this.$node.parent().find('.ui-button').removeClass('disable');
        }

        if (data.treatmentId !== this._previousTreatmentId) {
            this.clear();
            this.setTreatmentId(data.treatmentId);
            this._previousTreatmentId = data.treatmentId;
        }
    };

    this.setTreatmentId = function (id) {
        this._treatmentId = id;
    };

    this.getTreatmentId = function () {
        return this._treatmentId;
    };

    this.onReset = function () {
        this.clear();
        this.$node.prop("disabled", true);
        this.$node.parent().find('.ui-button').addClass('disable');
        this.setTreatmentId('');
        this._previousTreatmentId = null;
    };

    this.after('initialize', function () {
        this.onReset();

        this.on(document, this.attr.treatmentSelectEvent, this.onTreatmentSelected);
        this.on(document, this.attr.treatmentClearEvent, this.onReset);
    });
}

module.exports = flight.component(WithCombobox, ToolbarYearCombobox);
