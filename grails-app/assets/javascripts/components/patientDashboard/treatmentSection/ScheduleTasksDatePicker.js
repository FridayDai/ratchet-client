require('momentTZ');

var flight = require('flight');
var WithDatepicker = require('../../common/WithDatepicker');
var moment = require('moment');

function ScheduleTasksDatePicker() {
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
        this.$node.data("DateTimePicker").minDate(moment().startOf('day'));
        this.on('rc.datePickerSelect', this.onDateSelect);
    });
}

module.exports = flight.component(WithDatepicker, ScheduleTasksDatePicker);
