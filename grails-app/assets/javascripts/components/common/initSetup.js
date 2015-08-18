require('velocity');
require('velocity-ui');

var Utility = require('../../utils/Utility');
var Strings = require('../../constants/Strings');
var Notification = require('./Notification');

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
            Notification.error({
                title: Strings.ERROR_TITLE,
                message: Strings.ERROR_MESSAGE_COMMON,
                errorMessage: jqXHR.responseText
            });
        } else if (jqXHR.status === 403 || jqXHR.status >= 404) {
            Notification.error({
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
    }).RegisterEffect("ratchet.bounceIn", {
        defaultDuration: 500,
        calls: [
            [ { opacity: [ 1, 0 ], scaleX: [ 1.05, 0.3 ], scaleY: [ 1.05, 0.3 ] }, 0.40 ],
            [ { scaleX: 0.9, scaleY: 0.9, translateZ: 0 }, 0.20 ],
            [ { scaleX: 1, scaleY: 1 }, 0.50 ]
        ]
    }).RegisterEffect("ratchet.expandOut", {
        defaultDuration: 500,
        calls: [
            [ { opacity: [ 0, 1 ], transformOriginX: [ "50%", "50%" ], transformOriginY: [ "50%", "50%" ], scaleX: 0.5, scaleY: 0.5, translateZ: 0 } ]
        ],
        reset: { scaleX: 1, scaleY: 1 }
    });
