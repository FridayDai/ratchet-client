var flight = require('flight');
var WithDatepicker = require('../../common/WithDatepicker');

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

        this.on('rc.datePickerSelect', this.onDateSelect);
    });
}

module.exports = flight.component(WithDatepicker, PatientSurgeryDate);
