require('jquery-ui-datepicker');

var flight = require('flight');
var Utility = require('../../utils/Utility');
var WithElementValidation = require('./WithElementValidation');

function validate(dateText, inst) {
    var $input = inst.input;

    if ($input) {
        var $form = $input.closest('form');
        var validator = $form.data('validator');

        if (validator) {
            validator.element($input);
        }
    }
}

$.datepicker.setDefaults({
    /* fix buggy IE focus functionality */
    fixFocusIE: false,

    /* blur needed to correctly handle placeholder text */
    onClose: function () {
        this.fixFocusIE = true;
    },

    onSelect: function (dateText, inst) {
        validate(dateText, inst);
    },

    beforeShow: function () {
        var result = Utility.isOldIE() ? !this.fixFocusIE : true;
        this.fixFocusIE = false;
        return result;
    }
});

function WithDatepicker() {
    flight.compose.mixin(this, [
        WithElementValidation
    ]);

    this._initDatePicker = function () {
        var me = this;

        this.$node.datepicker({
            dateFormat: 'MM d, yy',
            onSelect: function (dateText, inst) {
                this.fixFocusIE = true;

                validate(dateText, inst);

                me.trigger('rc.datePickerSelect');
            }
        });
    };

    this.after('initialize', function () {
        this._initDatePicker();
    });

    this.before('teardown', function () {
        this.$node.datepicker('destroy');
    });
}

module.exports = WithDatepicker;
