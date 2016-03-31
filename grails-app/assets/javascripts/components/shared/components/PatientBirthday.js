require('momentTZ');

var flight = require('flight');
var WithDatepicker = require('../../common/WithDatepicker');

function PatientBirthday() {
    this.onReset = function () {
        this.clear();
    };

    this.clear = function () {
        this.$node.val('');
    };

    this.after('initialize', function () {
        var now = new Date();

        this.$node.datepicker('option', {
            changeYear: true,
            changeMonth: true,
            dateFormat: 'M d, yy',
            maxDate: '0',
            defaultDate: new Date('1970-01-01'),
            yearRange: "1900:" + now.getFullYear()
        });
    });
}

module.exports = flight.component(WithDatepicker, PatientBirthday);
