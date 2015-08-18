require('jquery');
require('moment');

var $window = $(window);
var WINDOW_WIDTH = $window.width();
var WINDOW_HEIGHT = $window.height();

module.exports = {
    getWindowSize: function () {
        return {
            width: WINDOW_WIDTH,
            height: WINDOW_HEIGHT
        }
    },

    toVancouverTime: function (time) {
        return moment.tz(time, "MMM D, YYYY", "America/Vancouver").format('x');
    },

    showFadeOutMsg: function (options) {
        if (_.isString(options)) {
            options = {
                msg: options
            };
        }

        var top = options.top || '33%',
            left = options.left || '50%',
            remain = options.remain || 2000,
            numRegExp = /\d+/,
            marginLeft;

        var $msgDiv = $("#msg-info");

        if ($msgDiv.length === 0) {
            $msgDiv = $('<div id="msg-info" class="ui-hide ui-tips ui-tips-center msg-info"></div>');

            $(document.body).append($msgDiv);
        }



        $msgDiv = $msgDiv.text(options.msg).css({
            position: 'fixed',
            top: top,
            left: left
        });

        marginLeft =
            (parseInt(numRegExp.exec($msgDiv.css('width')), 10) +
            parseInt(numRegExp.exec($msgDiv.css('padding-left')), 10)) / -2;

        $msgDiv.css({
            'margin-left':  marginLeft + 'px'
        });

        $msgDiv.fadeIn("slow");

        setTimeout(function () {
            $msgDiv.fadeOut("slow");
        }, remain);
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
    }
};
