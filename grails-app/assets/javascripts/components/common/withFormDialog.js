var flight = require('flight');
var WithForm = require('./WithForm');
var WithDialog = require('./WithDialog');

function WithFormDialog() {
    flight.compose.mixin(this, [
        WithForm,
        WithDialog
    ]);

    this.options = function (options) {
        if (options.buttons && _.isArray(options.buttons) && options.buttons.length === 1) {
            var buttonStr = options.buttons[0];

            options.buttons = {};

            options.buttons[buttonStr] = function () {
                this.formEl.submit();
            };
        }

        this._options = options;
    };

    this._onDialogBeforeClose = function () {
        this.formEl.validate().resetForm();
    };

    this.closeDialog = function () {
        this.dialogEl.dialog('close');
    };

    this.after('initialize', function () {
        this.on('dialogbeforeclose', this._onDialogBeforeClose);
        this.on('formSuccess', this.closeDialog)
    });
}

module.exports = WithFormDialog;
