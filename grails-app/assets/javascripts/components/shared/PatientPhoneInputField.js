var flight = require('flight');
var WithIntlTelInput = require('../common/WithIntlTelInput');

function PatientPhoneInputField() {
    this.onInput = function () {
        var val = this.$node.val(),
            firstNum,
            secondNum;

        if (val.substring(0, 2) === "11" || val.substring(0, 2) === "10") {
            firstNum = val.charAt(0);
            secondNum = val.charAt(1);
            val = firstNum + ' ' + secondNum + val.substring(2, val.length);

            this.$node.val(val);
        }
    };

    this.after('initialize', function () {
        this.on('input', this.onInput);
    });
}

module.exports = flight.component(WithIntlTelInput, PatientPhoneInputField);
