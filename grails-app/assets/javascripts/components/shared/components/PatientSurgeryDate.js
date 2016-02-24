var flight = require('flight');
var WithDatepicker = require('../../common/WithDatepicker');
var PatientSurgeryDateValidation = require('../validation/PatientSurgeryDateValidation');

function PatientSurgeryDate() {
    this.onTreatmentSelected = function (e, data) {
        this.clear();
        this.$node.prop("disabled", false);

        if (data.surgeryDateRequired) {
            this.showElementGroup();
        } else {
            this.hideElementGroup();
        }
    };

    this.showElementGroup = function () {
        if (!this.$node.is(':visible')) {
            this.$node.parent()
                .show();
        }
    };

    this.hideElementGroup = function () {
        if (this.$node.is(':visible')) {
            this.$node.parent()
                .hide();
        }
    };

    this.onReset = function () {
        this.clear();
        this.$node
            .val('')
            .prop("disabled", true);
        this.hideElementGroup();
    };

    this.clear = function () {
        this.$node.val('');
        this.hideElementGroup();
    };

    this.__surgeryDateInit = function () {
        this.$node.datepicker('option', {
            minDate: new Date(2015, 0, 1),
            maxDate: "+1y"
        });

        this.__setValidation(PatientSurgeryDateValidation.rules);
    };

    this.after('initialize', function () {
        this.__surgeryDateInit();
        this.on(document, this.attr.groupSelectEvent, this.onReset);
        this.on(document, this.attr.groupClearEvent, this.onReset);
        this.on(document, this.attr.treatmentSelectEvent, this.onTreatmentSelected);
        this.on(document, this.attr.treatmentClearEvent, this.onReset);
        this.on(document, this.attr.resetEvent, this.onReset);
    });
}

module.exports = flight.component(WithDatepicker, PatientSurgeryDate);
