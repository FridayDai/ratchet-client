require('jquery');
require('moment');

var $window = $(window);

module.exports = {
    getWindowSize: function () {
        return {
            width: $window.width(),
            height: $window.height()
        };
    },

    toVancouverTime: function (time) {
        return moment.tz(time, "MMM D, YYYY", "America/Vancouver").format('x');
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
