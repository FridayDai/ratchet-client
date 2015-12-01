require('jquery-ui-datepicker');

var Utility = require('../../utils/Utility');

$.datepicker.setDefaults({
    /* fix buggy IE focus functionality */
    fixFocusIE: false,

    /* blur needed to correctly handle placeholder text */
    onClose: function () {
        this.fixFocusIE = true;
    },

    beforeShow: function () {
        var result = Utility.isOldIE() ? !this.fixFocusIE : true;
        this.fixFocusIE = false;
        return result;
    }
});

function WithDatepicker() {
    this._initDatePicker = function () {
        var me = this;

        this.$node.datepicker({
            dateFormat: 'MM d, yy',
            onSelect: function () {
                this.fixFocusIE = true;

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
