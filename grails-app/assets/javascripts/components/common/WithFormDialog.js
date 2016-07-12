var flight = require('flight');
var WithForm = require('./WithForm');
var WithDialog = require('./WithDialog');
var WithChildren = require('./WithChildren');

function setPreviousValue($el) {
    var previousValue = $el.data("previousValue") || {
            valid: true,
            origin: $el.val(),
            old: $el.val()
        };

    $el.data('previousValue', previousValue);
}

function WithFormDialog() {
    this.attributes({
        inputFieldSelector: '.form-group input'
    });

    flight.compose.mixin(this, [
        WithChildren,
        WithForm,
        WithDialog
    ]);

    this.options = function (options) {
        if (_.isArray(options.buttons) &&
            options.buttons.length <= 2 &&
            _.every(options.buttons, function(item) { return !_.isPlainObject(item);})
        ) {
            var originButtons = options.buttons;
            var primaryButtonStr = originButtons[0];

            options.buttons = {};

            options.buttons[primaryButtonStr] = function () {
                this.formEl.submit();
            };

            var secondaryButtonStr = originButtons[1];
            if (secondaryButtonStr) {
                options.buttons[secondaryButtonStr] = function () {
                    this.closeDialog();
                };
            }
        }

        this._options = options;
    };

    this._onDialogBeforeClose = function () {
        this.formEl.validate().resetForm();
    };

    this.closeDialog = function () {
        var me = this;

        setTimeout(function() {
            me.dialogEl.dialog('close');
        }, 0);
    };

    this.savePlaceholder = function () {
        this.select('inputFieldSelector')
            .each(function (index, element) {
                var $element = $(element);

                $element.data('placeholder', $element.attr('placeholder'));
            });
    };

    this.onInputFieldFocus = function (e) {
        var $element = $(e.target);

        $element.attr('placeholder', '');

        setPreviousValue($element);
    };

    this.onInputFieldBlur = function (e) {
        var $element = $(e.target);

        $element.attr('placeholder', $element.data('placeholder'));
    };

    this.__onDialogOpen = function () {
        this.formEl.find(":text, [type='password'], [type='file'], select, textarea, " +
        "[type='number'], [type='search'] ,[type='tel'], [type='url'], " +
        "[type='email'], [type='datetime'], [type='date'], [type='month'], " +
        "[type='week'], [type='time'], [type='datetime-local'], " +
        "[type='range'], [type='color'], [type='radio'], [type='checkbox']").each(function () {
            var $element = $(this);

            if ($element.is(':visible')) {
                setPreviousValue($element);
            }
        });
    };

    this.after('initialize', function () {
        this.savePlaceholder();

        this.on('dialogbeforeclose', this._onDialogBeforeClose);
        this.on('formSuccess', this.closeDialog);
        this.on('dialogopen', this.__onDialogOpen);

        // TODO: can't use flight style to set focus and blur
        this.select('inputFieldSelector')
            .on('focus', this.onInputFieldFocus)
            .on('blur', this.onInputFieldBlur);
    });

    this.before('teardown', function () {
        this.select('inputFieldSelector').off('focus blur');
    });
}

module.exports = WithFormDialog;
