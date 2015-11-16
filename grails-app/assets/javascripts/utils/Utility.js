require('jquery');
require('momentTZ');

var moment = require('moment');

var $window = $(window);
var IS_OLD_IE = window.navigator.userAgent.indexOf("MSIE ") > 0;

module.exports = {
    isOldIE: function () {
        return IS_OLD_IE;
    },

    getWindowSize: function () {
        return {
            width: $window.width(),
            height: $window.height()
        };
    },

    toVancouverTime: function (time) {
        return moment.tz(time, "MMM D, YYYY", "America/Vancouver").format('x');
    },

    toVancouverTimeHour: function (time) {
        return moment(time).tz("America/Vancouver").format('MMM D, YYYY h:mm:ss A');
    },

    progress: function (hide) {
        var elementStr = [
                '<div id="msg-process">',
                '<div class="msg-process-background ui-tips ui-tips-center"></div>',
                '<span class="msg-process-loading"></span>',
                '</div>'
            ].join('');

        var $process = $("#msg-process");

        if (hide === undefined || hide === false) {
            if ($process.length > 0) {
                $process.hide();
            }
        } else {
            if ($process.length === 0) {
                $process = $(elementStr);

                $(document.body).append($process);
            }

            $process.show();
        }
    },

    durationInDays: function (targetDateStr, compareDateStr, format) {
        format = format || 'MMM D, YYYY';

        return moment(compareDateStr, format).diff(moment(targetDateStr, format), 'days');
    }
};
