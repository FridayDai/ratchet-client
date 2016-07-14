require('bootstrapDatetimepicker');

var flight = require('flight');
var WithElementValidation = require('./WithElementValidation');

function WithDatepicker() {
    flight.compose.mixin(this, [
        WithElementValidation
    ]);

    this._initDatePicker = function () {
        this.$node.datetimepicker({
            format: 'MMM D, YYYY',
            icons: {
                time: 'fa fa-clock-o',
                date: 'fa fa-calendar',
                up: 'fa fa-chevron-up',
                down: 'fa fa-chevron-down',
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-screenshot',
                clear: 'fa fa-trash',
                close: 'fa fa-remove'
            },
            widgetParent: 'body',
            keepInvalid: true
        });

        //Fix problem with the situation where the datepicker is inside a scrollable element
        this.$node.on('dp.show', function() {
            var datepicker = $('body').find('.bootstrap-datetimepicker-widget:last');
            var top, left;
            if (datepicker.hasClass('bottom')) {
                top = $(this).offset().top + $(this).outerHeight();
                left = $(this).offset().left;
                datepicker.css({
                    'top': top + 'px',
                    'bottom': 'auto',
                    'left': left + 'px'
                });
            }
            else if (datepicker.hasClass('top')) {
                top = $(this).offset().top - datepicker.outerHeight();
                left = $(this).offset().left;
                datepicker.css({
                    'top': top + 'px',
                    'bottom': 'auto',
                    'left': left + 'px'
                });
            }
        });
    };

    this.after('initialize', function () {
        this._initDatePicker();
    });

    this.before('teardown', function () {
        this.$node.destroy();
    });
}

module.exports = WithDatepicker;

