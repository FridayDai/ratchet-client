require('jquery');
require('momentTZ');

var moment = require('moment');

var $window = $(window);
var IS_OLD_IE = window.navigator.userAgent.indexOf("MSIE ") > 0;

var PARAMs = require('../constants/Params');

function guessDateFormat (dateStr) {
    var validFormat = _.filter(PARAMs.DATE_FORMAT,
        function (format) {
            return moment(dateStr, format, true).isValid();
        });

    if (validFormat.length > 0) {
        return validFormat[0];
    } else {
        return null;
    }
}

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
        if (time) {
            var validFormat = guessDateFormat(time);

            if (!validFormat) {
                return moment.tz(time, validFormat, "America/Vancouver").format('x');
            } else {
                return null;
            }
        } else {
            return null;
        }
    },

    toVancouverTimeHour: function (time) {
        if (time) {
            return moment(time).tz("America/Vancouver").format('MMM D, YYYY h:mm:ss A');
        } else {
            return null;
        }
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

    durationInDays: function (targetDateStr, compareDateStr) {
       var targetValidFormat = guessDateFormat(targetDateStr);
       var compareValidFormat = guessDateFormat(compareDateStr);

        if (!targetValidFormat || !compareValidFormat) {
            return null;
        } else {
            return moment(compareDateStr, compareValidFormat)
                .diff(moment(targetDateStr, targetValidFormat), 'days');
        }
    }
};
