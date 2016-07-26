require('bootstrapDatetimepicker');

var flight = require('flight');
var WithElementValidation = require('./WithElementValidation');

function WithDatetimepicker() {
    flight.compose.mixin(this, [
        WithElementValidation
    ]);

    this._initDatePicker = function () {
        var that = this;

        this.$node.datetimepicker({
            format: 'MMM D, YYYY h:mm A',
            lazyFormat: 'MMM D, YYYY',
            timeZone: 'America/Vancouver',
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
            keepInvalid: true,
            stepping: 5,
            ignorePicker: true
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

        //change dateFormat to lazyFormat, ignore the time.
        this.$node.on('blur', function () {
            var timeRegex = /([01]?\d|2[0-3]):([0-5]\d)/;
            if(!timeRegex.test($(this).val())) {
                that.$node.data("DateTimePicker").lazyFormat();
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

module.exports = WithDatetimepicker;

