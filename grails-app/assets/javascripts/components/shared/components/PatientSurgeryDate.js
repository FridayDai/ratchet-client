var flight = require('flight');
var WithDatepicker = require('../../common/WithDatepicker');

function PatientSurgeryDate() {
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
        this.on(document, this.attr.treatmentSelectEvent, this.onTreatmentSelected);
        this.on(document, this.attr.treatmentClearEvent, this.onReset);
        this.on(document, this.attr.resetEvent, this.onReset);
    });
}

module.exports = flight.component(WithDatepicker, PatientSurgeryDate);
