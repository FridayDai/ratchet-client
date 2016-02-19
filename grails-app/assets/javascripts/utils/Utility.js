require('jquery');
require('momentTZ');

var moment = require('moment');

var $window = $(window);
var IS_OLD_IE = window.navigator.userAgent.indexOf('MSIE ') > 0;

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

    parseBirthdayFromSeparate: function (str) {
        if (str) {
            return moment.tz(str, 'MMM D, YYYY', 'America/Vancouver').format('MMM Do, YYYY');
        } else {
            return '';
        }
    },

    parseBirthday: function (dataStr) {
        if (dataStr) {
            return moment(dataStr, 'YYYYMMDD').format('MMM Do, YYYY');
        } else {
            return '';
        }
    },

    toBirthdayMoment: function (str) {
        if (str) {
            return moment.tz(str, 'MMM Do, YYYY', 'America/Vancouver');
        } else {
            return null;
        }
    },

    toBirthdayFromSeparate: function (str) {
        if (str) {
            return moment.tz(str, 'MMM D, YYYY', 'America/Vancouver').format('YYYYMMDD');
        } else {
            return '';
        }
    },

    toBirthday: function (str) {
        if (str) {
            return moment.tz(str, 'MMM Do, YYYY', 'America/Vancouver').format('YYYYMMDD');
        } else {
            return '';
        }
    },

    toVancouverTime: function (time, format) {
        format = format || 'MMM D, YYYY';

        if (time) {
            return moment.tz(time, format, 'America/Vancouver').format('x');
        } else {
            return null;
        }
    },

    toVancouverTimeHour: function (time, format) {
        format = format || 'MMM D, YYYY h:mm:ss A';

        if (time) {
            return moment(time).tz('America/Vancouver').format(format);
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

        var $process = $('#msg-process');

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
