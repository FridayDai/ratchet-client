require('jquery-ui-datepicker');

var flight = require('flight');

function PatientSurgeryDate() {
    this._initDatePicker = function () {
        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
            $(this.$node).datepicker({
                dateFormat: 'MM d, yy',

                /* fix buggy IE focus functionality */
                fixFocusIE: false,

                /* blur needed to correctly handle placeholder text */
                onSelect: function () {
                    this.fixFocusIE = true;
                    $(this).blur().change().focus();
                },
                onClose: function () {
                    this.fixFocusIE = true;
                    this.focus();
                },
                beforeShow: function () {
                    var result = /MSIE (\d+\.\d+);/.test(navigator.userAgent) ? !this.fixFocusIE : true;
                    this.fixFocusIE = false;
                    return result;
                }
            });
        } else {
            this.$node.datepicker({
                dateFormat: 'MM d, yy'
            });
        }
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
