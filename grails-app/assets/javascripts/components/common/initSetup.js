var Utility = require('../../utils/Utility');
var Strings = require('../../constants/Strings');

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
    error: function (jqXHR) {
        if (jqXHR.status === 401) {
            window.location.href = "/login";
        } else if (jqXHR.status === 400) {
            Utility.showErrorDialog({
                title: Strings.ERROR_TITLE,
                message: Strings.ERROR_MESSAGE_COMMON,
                errorMessage: jqXHR.responseText
            });
        } else if (jqXHR.status === 403 || jqXHR.status >= 404) {
            Utility.showErrorDialog({
                title: Strings.ERROR_TITLE_404,
                message: Strings.ERROR_MESSAGE_404
            });
        }
    }
});


String.prototype.format = function () {
    var str = this;
    if (arguments.length === 0) {
        return str;
    }

    for (var i = 0; i < arguments.length; i++) {
        var re = new RegExp('\\{' + i + '\\}', 'gm');
        if (arguments[i] !== undefined || arguments[i] !== null) {
            str = str.replace(re, arguments[i]);
        } else {
            str = str.replace(re, '');
        }
    }
    return str;
};
