(function ($, undefined) {
    'use strict';
    //var login = RC.pages.login = RC.pages.login || {};

    var secondsValue = $("#error-login").attr("rateLimit");

    function _forbidLogin() {
        $("#btnLogin").attr("disabled", "disabled");
    }

    function _allowLogin() {
        $("#btnLogin").removeAttr("disabled");
    }

    if (secondsValue) {
        var milliseconds = secondsValue * 1000;
        _forbidLogin();

        setTimeout(_allowLogin, milliseconds);
        $("#errorLogin").attr("rateLimit", "");
    }

})(jQuery);
