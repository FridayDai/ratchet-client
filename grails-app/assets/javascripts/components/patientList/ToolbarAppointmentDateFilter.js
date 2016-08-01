var flight = require('flight');
var WithDatepicker = require('../common/WithDatepicker');
var Utility = require('../../utils/Utility');

function ToolBarAppointmentDateFilter() {

    this.getEventDateTime = function () {
        return this.$node.val();
    };

    this.setEventDateTime = function (date) {
        this.$node.val(date);
    };

    this.after('initialize', function () {
        var me = this;

        this.$node.on('dp.hide', function() {
            var appointmentDate = Utility.toVancouverTime($(this).val());
            me.trigger('selectAppointmentDateForPatientTable', {appointmentDate: appointmentDate});
        });
    });
}

module.exports = flight.component(WithDatepicker, ToolBarAppointmentDateFilter);
