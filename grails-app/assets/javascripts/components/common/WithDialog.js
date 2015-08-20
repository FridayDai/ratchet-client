require('jquery-ui-dialog');
require('../../libs/dialog/dialog');
require('velocity');
require('velocity-ui');

var flight = require('flight');
var WithOptions = require('./WithOptions');

function WithDialog() {
    flight.compose.mixin(this, [
        WithOptions
    ]);

    this.defaultOptions = {
        autoOpen: false,
        height: 'auto',
        resizable: false,
        modal: true
    };

    this._setAnimation = function ($element) {
        $element
            .on('dialogopen', function () {
                var $parent = $(this).parent();

                $parent.velocity('ratchet.slideDownIn');
            })
            .on('dialogprepareclose', function () {
                var $parent = $(this).parent();

                $parent.velocity('ratchet.slideUpOut');
            });
    };

    this._initDialog = function () {
        this.dialogEl = this.$node.dialog(this.initOptions());

        this._setAnimation(this.$node);
    };

    this.show = function () {
        this.dialogEl.dialog('open');
    };

    this.close = function () {
        this.dialogEl.dialog('close');
    };

    this.after('initialize', function () {
        this._initDialog();
    });
}

module.exports = WithDialog;
