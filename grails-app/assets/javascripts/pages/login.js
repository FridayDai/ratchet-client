(function ($, undefined) {
    'use strict';
    //var login = RC.pages.login = RC.pages.login || {};

    var secondsValue = $("#error_login").attr("rateLimit");

    function _forbidLogin() {
        $("#btn_login").attr("disabled", "disabled");
    }

    function _allowLogin() {
        $("#btn_login").removeAttr("disabled");
    }

    if (secondsValue) {
        var milliseconds = secondsValue * 1000;
        _forbidLogin();

        setTimeout(_allowLogin, milliseconds);
        $("#error_login").attr("rateLimit", "");
    }

})(jQuery);
