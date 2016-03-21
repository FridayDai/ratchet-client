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
        if (jqXHR.status === 401) {
            window.location.href = "/login";
        } if (jqXHR.status === 506){
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
        } else if (jqXHR.status === 400) {
            Notifications.error({
                title: Strings.ERROR_TITLE,
                message: Strings.ERROR_MESSAGE_COMMON,
                errorMessage: jqXHR.responseText
            });
        } else if (jqXHR.status === 403 || jqXHR.status >= 404) {
            Notifications.error({
                title: Strings.ERROR_TITLE_404,
                message: Strings.ERROR_MESSAGE_404
            });
        }
    }
});
