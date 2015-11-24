require('momentTZ');

var flight = require('flight');
var WithDatepicker = require('../../common/WithDatepicker');
var moment = require('moment');

function PatientSurgeryDate() {
    this.onReset = function () {
        this.clear();
    };

    this.clear = function () {
        this.$node.val('');
    };

    this.onDateSelect = function () {
        this.trigger('scheduleTasksDatePickerSelected');
    };

    this.after('initialize', function () {
        this.on(document, this.attr.resetEvent, this.onReset);

        this.$node.datepicker('option', 'minDate', moment().tz("America/Vancouver").format('MMMM D, YYYY'));
        this.on('rc.datePickerSelect', this.onDateSelect);
    });
}

module.exports = flight.component(WithDatepicker, PatientSurgeryDate);