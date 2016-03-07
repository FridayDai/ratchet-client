require('jquery');
require('momentTZ');

var moment = require('moment');

var $window = $(window);
var IS_OLD_IE = window.navigator.userAgent.indexOf('MSIE ') > 0;

var PARAMs = require('../constants/Params');


module.exports = {
    isOldIE: function () {
        return IS_OLD_IE;
    },

    guessDateFormat: function (dateStr) {
        var validFormat = _.filter(PARAMs.DATE_FORMAT,
            function (format) {
                return moment(dateStr, format, true).isValid();
            });

        if (validFormat.length > 0) {
            return validFormat[0];
        } else {
            return null;
        }
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
            return moment.tz(str, 'MMM D, YYYY', 'America/Vancouver').format('YYYY-MM-DD');
        } else {
            return '';
        }
    },

    toBirthday: function (str) {
        if (str) {
            return moment.tz(str, 'MMM Do, YYYY', 'America/Vancouver').format('YYYY-MM-DD');
        } else {
            return '';
        }
    },

    toVancouverTime: function (time) {
        if (time) {
            var validFormat = this.guessDateFormat(time);

            if (validFormat) {
                return moment.tz(time, validFormat, "America/Vancouver").format('x');
            } else {
                return null;
            }
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

    durationInDays: function (targetDateStr, compareDateStr) {
       var targetValidFormat = this.guessDateFormat(targetDateStr);
       var compareValidFormat = this.guessDateFormat(compareDateStr);

        if (!targetValidFormat || !compareValidFormat) {
            return null;
        } else {
            return moment(compareDateStr, compareValidFormat)
                .diff(moment(targetDateStr, targetValidFormat), 'days');
        }
    },

    parseSecondsToMinutes: function (seconds) {
        var minute = Math.floor(seconds / 60),
            second = seconds - minute * 60;

        var result = '';

        if (minute === 1) {
            result += '1 minute';
        } else if (minute > 1) {
            result += '{0} minutes'.format(minute);
        }

        if (result) {
            result += ' ';
        }

        if (second === 1) {
            result += '1 second';
        } else if (second > 1) {
            result += '{0} seconds'.format(second);
        }

        return result;
    }
};
