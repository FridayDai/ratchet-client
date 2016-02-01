var flight = require('flight');
var WithDatepicker = require('../../common/WithDatepicker');

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

    this.after('initialize', function () {
        this.on(document, this.attr.groupSelectEvent, this.onReset);
        this.on(document, this.attr.groupClearEvent, this.onReset);
        this.on(document, this.attr.treatmentSelectEvent, this.onTreatmentSelected);
        this.on(document, this.attr.treatmentClearEvent, this.onReset);
        this.on(document, this.attr.resetEvent, this.onReset);
    });
}

module.exports = flight.component(WithDatepicker, PatientSurgeryDate);
