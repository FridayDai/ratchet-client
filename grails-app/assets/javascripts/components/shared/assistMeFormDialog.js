var flight = require('flight');
var WithFormDialog = require('../common/WithFormDialog');
var Utility = require('../../utils/Utility');
var STRINGS = require('../../constants/Strings');

function AssistMeFormDialog() {
    this.attributes({
        formSelector: '.'
    });

    this.options({
        title: 'ASSIST ME',
        height: 300,
        width: 800,
        buttons: ['Send']
    });

    this.setExtraData = function () {
        return {
            browser: window.navigator.userAgent,
            url: window.location.href
        }
    };

    this.onSendAssistMeSuccess = function () {
        Utility.showFadeOutMsg(STRINGS.SEND_ASSIST_ME_SUCCESS);
    };

    this.onShow = function () {
        this.$node.removeClass('ui-hidden');
        this.dialogEl.dialog('open');
    };

    this.after('initialize', function () {
        this.on(document, 'showAssistMeDialog', this.onShow);
        this.on('formSuccess', this.onSendAssistMeSuccess)
    });
}

module.exports = flight.component(WithFormDialog, AssistMeFormDialog);
