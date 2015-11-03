var flight = require('flight');
var WithForm = require('./WithForm');
var WithDialog = require('./WithDialog');
var WithChildren = require('./WithChildren');

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
        if (_.isArray(options.buttons) && options.buttons.length <= 2) {
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

    this.onInputFieldFocus = function (e) {
        var $element = $(e.target);

        $element
            .data('placeholder', $element.attr('placeholder'))
            .attr('placeholder', '');
    };

    this.onInputFieldBlur = function (e) {
        var $element = $(e.target);

        $element.attr('placeholder', $element.data('placeholder'));
    };

    this.after('initialize', function () {
        this.on('dialogbeforeclose', this._onDialogBeforeClose);
        this.on('formSuccess', this.closeDialog);

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
