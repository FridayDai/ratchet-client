(function ($, undefined) {
    'use strict';
    //var login = RC.pages.login = RC.pages.login || {};



    var loginLimit = function () {

        function _forbidLogin() {
            $("#btnLogin").attr("disabled", "disabled");
        }

        function _allowLogin() {
            $("#btnLogin").removeAttr("disabled");
        }

        function _initLoginLimit() {

            var secondsValue = $("#error-login").attr("rateLimit");

            if (secondsValue) {
                var milliseconds = secondsValue * 1000;
                _forbidLogin();

                setTimeout(_allowLogin, milliseconds);
                $("#errorLogin").attr("rateLimit", "");
            }
        }

        return _initLoginLimit();
    };

    /**
     * add login input valid
     */
    function _validLogin() {
        $("#btnLogin").click(function () {
            $(".login-form").valid();
        });
    }


    /**
     * set validate
     * @private
     */
    function _setValidate() {
        $(".login-form").validate({});
    }

    /**
     * page Initialization
     * @private
     */
    function _init() {
        _validLogin();
        _setValidate();
        loginLimit();
    }

    _init();

})(jQuery);
