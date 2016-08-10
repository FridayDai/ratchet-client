var flight = require('flight');
var WithChildren = require('../common/WithChildren');
var WithForm = require('../common/WithForm');
var appointmentDateFilter = require('./ToolbarAppointmentDateFilter');


function ToolAppointmentForm() {
    this.attributes({
        appointmentDateFieldSelector: '#appointmentDateFilter'
    });

    this.children({
        appointmentDateFieldSelector: appointmentDateFilter
    });
}

module.exports = flight.component(WithForm, WithChildren, ToolAppointmentForm);

