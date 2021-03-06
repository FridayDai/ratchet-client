var flight = require('flight');
var WithDatepicker = require('../common/WithDatepicker');
var Utility = require('../../utils/Utility');
var STRINGs = require('../../constants/Strings');
var PARAMs = require('../../constants/Params');
var moment = require('moment');

function ToolBarAppointmentDateFilter() {

    this.getEventDateTime = function () {
        return this.$node.val();
    };

    this.setEventDateTime = function (date) {
        this.$node.val(date);
        this.$choice.find('.placeholder').text(Utility.parseAbsoluteEvent(date, 'MMM D, YYYY') || 'Appointment: All');

    };

    this.initAppointment = function () {
        var that = this;
        this.$choice = this.$node.closest('.ms-parent').find('.ms-choice');
        this.$drop = this.$node.closest('.ms-drop');

        this.$choice.on('click', function () {
            that.$drop.show();
            that.$choice.addClass('active');
        });

        $(document).click(function (e) {
            if ($(e.target)[0] === that.$choice[0] ||
                $(e.target).parents('.ms-choice')[0] === that.$choice[0]) {
                return;
            }
            if (($(e.target)[0] === that.$drop[0] ||
                $(e.target).parents('.ms-drop')[0] !== that.$drop[0])) {
                that.$drop.hide();
                that.$choice.removeClass('active');
            }
        });

        this.addValidation();
    };

    this.addValidation = function () {
        $.validator.addMethod('DateFormatNotStrictCheck', function (value) {
            if(!value) {
                return true;
            }

            return _.some(PARAMs.DATE_FORMAT, function (format) { return moment(value, format, true).isValid(); });
        }, STRINGs.WRONG_DATE_FORMAT);

        this.$node.rules('remove', 'DateFormatCheck DateMinCheck DateMaxCheck');
        this.$node.rules('add', {
            DateFormatNotStrictCheck: true,
            required: false
        });
    };

    this.after('initialize', function () {
        var me = this;
        this.initAppointment();

        this.$node.on('dp.hide', function() {
            var date = $(this).val();

            if($(this).closest('form').valid()) {
                var appointmentDate = Utility.toVancouverTime(date);
                me.$choice.find('.placeholder').text(Utility.parseAbsoluteEvent(date) || 'Appointment: All');
                me.trigger('selectAppointmentDateForPatientTable', {appointmentDate: appointmentDate});
            }
        });

    });
}

module.exports = flight.component(WithDatepicker, ToolBarAppointmentDateFilter);
