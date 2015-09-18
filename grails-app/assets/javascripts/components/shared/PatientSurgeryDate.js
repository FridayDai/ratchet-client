require('jquery-ui-datepicker');

var flight = require('flight');

function PatientSurgeryDate() {
    this._initDatePicker = function () {
        this.$node.datepicker({
            dateFormat: 'MM d, yy'
        });
    };

    this.onTreatmentSelected = function (e, data) {
        this.clear();
        this.$node.prop("disabled", false);
        this.$node.datepicker('option', 'minDate', new Date(data.surgeryDate));
    };

    this.onReset = function () {
        this.clear();
        this.$node.prop("disabled", true);
    };

    this.clear = function () {
        this.$node.val('');
    };

    this.after('initialize', function () {
        this._initDatePicker();

        this.on(document, this.attr.treatmentSelectEvent, this.onTreatmentSelected);
        this.on(document, this.attr.treatmentClearEvent, this.onReset);
        this.on(document, this.attr.resetEvent, this.onReset);
    });

    this.before('teardown', function () {
        this.$node.datepicker('destroy');
    });
}

module.exports = flight.component(PatientSurgeryDate);
