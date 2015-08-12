require('jquery-ui-dialog');
require('velocity');
require('velocity-ui');

var flight = require('flight');
var WithOptions = require('./WithOptions');

$.Velocity
    .RegisterEffect("ratchet.slideDownIn", {
        defaultDuration: 700,
        calls: [
            [ { opacity: [ 1, 0 ], translateY: [ 0, -80 ], translateZ: 0 } ]
        ]
    }).RegisterEffect("ratchet.slideUpOut", {
        defaultDuration: 700,
        calls: [
            [ { opacity: [ 0, 1 ], translateY: -80, translateZ: 0 } ]
        ],
        reset: { translateY: 0 }
    });

function WithDialog() {
    flight.compose.mixin(this, [
        WithOptions
    ]);

    this.__delayingClose = 0;

    this.defaultOptions = {
        autoOpen: false,
        resizable: false,
        modal: true,
        open: function() {
            this.dialogEl.parent().velocity('ratchet.slideDownIn');
        },
        beforeClose: function () {
            var me = this;
            var $dialog = this.dialogEl;

            if (this.__delayingClose !== 0) {
                this.__delayingClose = 0;

                return true;
            }

            $dialog.parent().velocity('ratchet.slideUpOut');

            setTimeout(function () {
                me.__delayingClose++;
                $dialog.dialog('close');
            }, 650);

            if (this.__delayingClose === 0) {
                return false;
            }
        }
    };

    this._initDialog = function () {
        this.dialogEl = this.$node.dialog(this.initOptions());
    };

    this.after('initialize', function () {
        this._initDialog();
    });
}

module.exports = WithDialog;
