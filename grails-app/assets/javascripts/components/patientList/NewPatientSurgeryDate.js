require('jquery-ui-datepicker');

var flight = require('flight');

function NewPatientSurgeryDate() {
    this._initDatePicker = function () {
        $(this.$node).datepicker({
            dateFormat: 'MM d, yy'
        });
    };

    this.onTreatmentSelected = function (e, data) {
        this.clear();
        this.$node.prop("disabled", false);
        $(this.$node).datepicker('option', 'minDate', new Date(data.surgeryDate));
    };

    this.onReset = function () {
        this.clear();
        this.$node.prop("disabled", true);
    };

    this.clear = function () {
        $(this.$node).val('');
    };

    this.after('initialize', function () {
        this._initDatePicker();

        this.on(document, 'newPatientTreatmentSelected', this.onTreatmentSelected);
        this.on(document, 'newPatientTreatmentClear', this.onReset);
        this.on(document, 'newPatientReset', this.onReset);
    });
}

module.exports = flight.component(NewPatientSurgeryDate);
