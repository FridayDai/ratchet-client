(function ($, undefined) {
    'use strict';
    //var login = RC.pages.login = RC.pages.login || {};


    var loginLimit = function () {

        function _forbidLogin() {
            $("#btnLogin").attr("disabled", "disabled").addClass("disabled");
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
                $("#error-login").attr("rateLimit", "");
            }
        }

        return _initLoginLimit();
    };

    /**
     * add login input valid
     */
    function _validLogin() {

        $("#btnLogin").click(function () {
            var storedEmail = $('.email').val();
            $(".login-form").valid();
            localStorage.setItem('storedEmail', storedEmail);
        });

        if (localStorage.getItem('storedEmail')) {
            $('.email').val(localStorage.getItem('storedEmail'));
        }

        $(".input-control").each(function () {
            $(this).change(function () {
                $("#error-login").css("display", "none");
            });
        });
    }


    /**
     * set validate
     * @private
     */
    function _setValidate() {
        $(".login-form").validate({
            rules: {
                email: {
                    email: true
                }
            }
        });
    }

    /**
     * page Initialization
     * @private
     */
    function _init() {
        _setValidate();
        _validLogin();
        loginLimit();
    }

    _init();

})(jQuery);
