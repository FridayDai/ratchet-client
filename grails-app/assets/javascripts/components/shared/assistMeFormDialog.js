var flight = require('flight');
var WithFormDialog = require('../common/WithFormDialog');
var STRINGS = require('../../constants/Strings');
var Notification = require('../common/Notification');

function AssistMeFormDialog() {
    this.attributes({
        formSelector: '.'
    });

    this.options({
        title: 'ASSIST ME',
        width: 800,
        buttons: ['Send']
    });

    this.setExtraData = function () {
        return {
            browser: window.navigator.userAgent,
            url: window.location.href
        };
    };

    this.onSendAssistMeSuccess = function () {
        Notification.showFadeOutMsg(STRINGS.SEND_ASSIST_ME_SUCCESS);
    };

    this.onShow = function () {
        this.$node.removeClass('ui-hidden');
        this.show();
    };

    this.after('initialize', function () {
        this.on('formSuccess', this.onSendAssistMeSuccess);
    });
}

module.exports = flight.component(WithFormDialog, AssistMeFormDialog);
