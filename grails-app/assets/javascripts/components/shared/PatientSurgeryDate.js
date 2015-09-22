require('jquery-ui-datepicker');

var flight = require('flight');

function PatientSurgeryDate() {
    this._initDatePicker = function () {
        var el = $(this.$node);
        var options = { dateFormat: 'MM d, yy'};

        if (/(MSIE |Trident\/|Edge\/)(\d+\.\d+);/.test(navigator.userAgent)) {
            /* fix buggy IE focus functionality */
            options.fixFocusIE = false;

            /* blur needed to correctly handle placeholder text */
            options.onSelect = function () {
                this.fixFocusIE = true;
                $(this).blur().change().focus();
            };
            options.onClose = function () {
                this.fixFocusIE = true;
                this.focus();
            };
            options.beforeShow = function () {
                var result =  !this.fixFocusIE ;
                this.fixFocusIE = false;
                return result;
            };

            /* help datepicker also can show when focusing the field for second time in IE */
            el.blur(function() {
                options.fixFocusIE = false;
            });
        }

        el.datepicker(options);
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
