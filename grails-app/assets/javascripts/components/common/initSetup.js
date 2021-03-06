require('./WithString');

var Utility = require('../../utils/Utility');
var Strings = require('../../constants/Strings');
var Notifications = require('./Notification');

window.$ = require('jquery');

$.ajaxSetup({
    beforeSend: function (jqXHR, settings) {
        if (!settings.dropProcess) {
            Utility.progress(true);
            jqXHR.progressing = true;
        }
    },
    complete: function (jqXHR) {
        if (jqXHR.progressing) {
            Utility.progress(false);
            jqXHR.progressing = false;
        }
    },
    global: true,
    cache: false,
    error: function (jqXHR) {
        if (!this.ignoreError) {
            if (jqXHR.status === 401) {
                window.location.href = "/login";
            } else if (jqXHR.status === 506) {
                Notifications.error({
                    title: Strings.ERROR_TITLE,
                    message: Strings.ERROR_MESSAGE_506
                }, {
                    buttons: {
                        'Ok': function () {
                            window.location.href = "/login";
                        }
                    }
                });
            } else if (jqXHR.status === 500) {
                Notifications.error({
                    title: Strings.ERROR_TITLE_500,
                    message: Strings.ERROR_MESSAGE_500
                });
            } else if (jqXHR.status === 400) {
                Notifications.error({
                    title: Strings.ERROR_TITLE,
                    message: Strings.ERROR_MESSAGE_CHECK_BELOW,
                    errorMessage: jqXHR.responseText
                });
            } else if (jqXHR.status >= 403) {
                Notifications.error({
                    title: Strings.ERROR_TITLE,
                    message: Strings.ERROR_MESSAGE_COMMON
                });
            }
        }
    }
});
