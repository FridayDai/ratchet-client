var flight = require('flight');
var moment = require('moment');
var WithDatetimepicker = require('../../common/WithDatetimepicker');
var PatientAbsoluteEventDateValidation = require('../validation/PatientAbsoluteEventDateValidation');
var STRINGs = require('../../../constants/Strings');

function PatientAbsoluteEventDate() {
    this.onTreatmentSelected = function (e, data) {
        this.clear();
        this.$node.prop("disabled", false);

        if (data.isAbsoluteEventBased) {
            this.showElementGroup(data.absoluteEventType);
        } else {
            this.hideElementGroup();
        }
    };

    this.showElementGroup = function (eventType) {
        if (eventType) {
            var $label = this.$node.prev();

            var placeholder = STRINGs.ABSOLUTE_EVENT_DATE_PLACEHOLDER.format(eventType.toLowerCase());

            $label.html(STRINGs.ABSOLUTE_EVENT_DATE_LABEL.format(eventType.toUpperCase()));
            this.$node.attr('placeholder', placeholder);
            this.$node.data('placeholder', placeholder);
        }

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
        this.clearDate();
        this.hideElementGroup();
    };

    this.__surgeryDateInit = function () {
        this.$node.data("DateTimePicker").minDate(moment('2015-01-01', 'YYYY-MM-DD'));
        this.$node.data("DateTimePicker").maxDate(moment().add(1, 'y'));

        this.setElementValidation(this.$node, PatientAbsoluteEventDateValidation.rules);
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

module.exports = flight.component(WithDatetimepicker, PatientAbsoluteEventDate);
