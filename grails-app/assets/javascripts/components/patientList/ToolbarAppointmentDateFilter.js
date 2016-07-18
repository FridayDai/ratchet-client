var flight = require('flight');
var WithDatepicker = require('../common/WithDatepicker');
var Utility = require('../../utils/Utility');

function ToolBarAppointmentDateFilter() {

    this.after('initialize', function () {
        var me = this;
        this.on(document, this.attr.resetEvent, this.onReset);

        this.$node.on('dp.hide', function() {
            var appointmentDate = Utility.toVancouverTime($(this).val());
            me.trigger('selectAppointmentDateForPatientTable', {appointmentDate: appointmentDate});
        });
    });
}

module.exports = flight.component(WithDatepicker, ToolBarAppointmentDateFilter);
