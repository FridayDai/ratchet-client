require('jquery-ui-dialog');
var flight = require('flight');

function withDialog() {
    /* jshint validthis:true */

    this.defaultOptions = {
        autoOpen: false,
        resizable: false,
        modal: true
    };

    this._init = function () {
        if (!this._options && $.isFunction(this.getOptions)) {
            this._options = this.getOptions();
        }

        this._options = flight.merge(this.defaultOptions, this._options);

        this.dialogEl = this.$node.dialog(this._options);
    };

    this.options = function (obj) {
        this._options = obj;
    };

    this.after('initialize', function () {
        this._init();
    });
}

module.exports = withDialog;
