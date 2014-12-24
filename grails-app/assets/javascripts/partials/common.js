/**
 * Created by sid on 12/12/14.
 */
;
(function ($, undefined) {
    'use strict';
    var common = RC.common = RC.common || {};
    $.extend(common, {
        /**
         * show progress on pages
         * @param hide
         */
        progress: function (hide) {
            alert('I am work now!');
        },
        /**
         * show remind message
         * @param msg
         * @param remain
         */
        showMsg: function () {

        },
        /**
         * confirm dialogue
         * @param title
         * @param message
         * @param okCallback
         * @param cancelCallback
         */
        confirm: function (title, message, okCallback, cancelCallback) {

        },

        /**
         * waring dialogue
         * @param title
         * @param message
         * @param closeCallback
         */
        warning: function (title, message, closeCallback) {

        },

        /**
         * show error tip
         * @param element
         * @param showType
         */
        showErrorTip: function (element, showType) {

        },

        /**
         * hide error tip
         * @param element
         */
        hideErrorTip: function (element) {

        },

        /**
         * tooltip
         */
        tooltip: function () {

        }

    });
})(jQuery);