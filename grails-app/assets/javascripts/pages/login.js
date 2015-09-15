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

    var searchPair = {};

    function setEmailAddressInAdvance() {
        var searchStr = location.search;
        var tempArr;

        if (searchStr) {
            searchStr = searchStr.substring(1, searchStr.length);

            _.each(searchStr.split('&'), function (search) {
                tempArr = search.split('=');
                if (tempArr[0]) {
                    searchPair[tempArr[0]] = tempArr[1];
                }
            });
        }

        if (searchPair.email) {
            $('.email').val(searchPair.email);
        } else if (localStorage.getItem('storedEmail')) {
            $('.email').val(localStorage.getItem('storedEmail'));
        }
    }

    /**
     * add login input valid
     */
    function _validLogin() {

        $("#btnLogin").click(function () {
            $("#error-login").css("display", "none");
            var storedEmail = $('.email').val();
            $(".login-form").valid();
            localStorage.setItem('storedEmail', storedEmail);
        });

        $(".input-control").each(function () {
            $(this).on('input', function () {
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

    function _closeOptimizePrompt() {
        $(".btn-close").click(function () {
            $(".optimize-prompt").css("display", "none");
        });
    }

    /**
     * page Initialization
     * @private
     */
    function _init() {
        _setValidate();
        _validLogin();
        setEmailAddressInAdvance();
        loginLimit();
        _closeOptimizePrompt();
    }

    _init();

})(jQuery);
