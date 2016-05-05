require('jquery-mask');

var flight = require('flight');

function PatientBirthday() {
    this.onReset = function () {
        this.clear();
    };

    this.clear = function () {
        this.$node.val('');
    };

    this.after('initialize', function () {
        this.$node.mask('00/00/0000');
    });
}

module.exports = flight.component(PatientBirthday);
