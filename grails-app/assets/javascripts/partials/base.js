/**
 * Created by sid on 12/11/14.
 */
;
(function ($, undefined) {
    'use strict';
    var RC = window.RC = window.RC || {};

    function getWindowSize() {
        var windowEI = $(window),
            documentEI = $(document);
        return {
            windowWidth: windowEI.width(),
            windowHeight: windowEI.height(),
            documentWidth: documentEI.width(),
            documentHeight: documentEI.height()
        }
    }

    // Set window and document width and height in RC namespace.
    $.extend(RC, getWindowSize());

    $(window).on('resize', function () {
        // Set window and document width and height in RC namespace when window resize.
        $.extend(RC, getWindowSize());
    });

    var share = {
        /**
         * share data api
         * @param {String} the name of save data
         * @param {Any} the save data value
         * **/
        data: function (name, value) {
            var top = window.top,
                cache = top['_CACHE'] || {};
            top['_CACHE'] = cache;
            return value !== undefined ? cache[name] = value : cache[name];
        },
        /**
         * remove share data api
         * @param {String} the name of remove share data
         * **/
        removeData: function (name) {
            var cache = window.top['_CACHE'];
            if (cache && cache[name]) {
                delete cache[name];
            }
        }
    };
    /**
     * global ajax set up
     */
    $.ajaxSetup({
        beforeSend: function () {
            self.progress(true);
        },
        complete: function () {
            self.progress(false);
        },
        success: function () {

        },
        global: true,
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 404) {
            } else if (jqXHR.status == 403) {
            } else if (jqXHR.status == 0) {
            }
            else {
            }
        }
    });

    /**
     * string format
     * **/
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
    }
    RC.pages = (function (self) {
        return self;
    }({}));

})(jQuery);