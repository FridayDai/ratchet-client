var flight = require('flight');
var withForm = require('./withForm');
var withDialog = require('./withDialog');

function withFormDialog() {
    /* jshint validthis:true */

    flight.compose.mixin(this, [
        withForm,
        withDialog
    ]);

    this._onDialogClose = function () {
        this.formEl[0].reset();
    };

    this.after('initialize', function () {
        this.on('dialogclose', this._onDialogClose)
    });
}

module.exports = withFormDialog;
