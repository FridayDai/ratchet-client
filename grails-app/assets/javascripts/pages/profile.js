// TODO: This code should be removed after refactor
/* jshint -W071 */
(function ($, undefined) {
    'use strict';

    var opts = {
        defaultConfirmArguments: {
            changePasswordFormArguments: {
                title: RC.constants.changePasswordTitle,
                content: RC.constants.confirmContent,
                width: 320
            }
        },
        urls: {
            updatePassword: "/profile/{0}/"
        }
    };

    /**
     * change account password
     * @private
     */
    function _changePassword() {

        $("#changePassword").on("click", function (e) {
            e.preventDefault();
            $(".update-password")[0].reset();

            var accountId = $(this).data("accountId");

            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.changePasswordFormArguments, {
                element: $(".update-password"),
                okCallback: function () {
                    if ($(".update-password").valid() && _isPasswordConsistent()) {

                        var oldPass = $("#oldPass").val();
                        var newPass = $("#newPass").val();
                        var confirmPass = $("#confirmPass").val();

                        var passwords = {
                            oldPassword: oldPass,
                            password: newPass,
                            confirmPassword: confirmPass
                        };

                        return $.when(_updatePassword(passwords, accountId))
                            .done(function () {

                            })
                            .fail(function () {
                                $('.ui-dialog #old-password-error').removeClass("hide").addClass("show");
                            });

                    } else {
                        return false;
                    }

                }
            }));

            _validatePasswordConsistent();
        });
    }

    /**
     * check password consistent
     * @private
     */
    function _isPasswordConsistent() {
        var password = $("#newPass").val();
        var confirmPassword = $("#confirmPass").val();

        if ($(".update-password").valid() && password !== confirmPassword) {
            //$(".error-area").text(RC.constants.passwordTip);
            $("#confirmPass-error").removeClass("hide").addClass("show");
            return false;
        }
        return true;
    }

    /**
     * bind inputs to validation method
     * @private
     */
    function _validatePasswordConsistent() {

        function _removeErrorMessage(element) {
            if (element.hasClass("show")) {
                element.removeClass("show").addClass("hide");
            }
        }

        $("#oldPass").on("input", function () {
            _removeErrorMessage($('#old-password-error'));
        });

        $("#confirmPass, #newPass").on("input", function () {
            _removeErrorMessage($('#confirmPass-error'));
        });
    }


    /**
     * update password
     * @param passwords
     * @private
     */
    function _updatePassword(passwords, accountId) {

        var deferred = $.Deferred();
        $.ajax({
            url: opts.urls.updatePassword.format(accountId),
            type: "POST",
            data: passwords,
            success: function () {
                deferred.resolve();
                setTimeout(function () {
                    RC.common.showMsg({
                        msg: RC.constants.changePasswordSuccess
                    });
                }, 1000);
            },
            error: function (jqXHR) {
                if (jqXHR.status === 400) {
                    deferred.reject();
                    return;
                }
                if (jqXHR.status === 401) {
                    window.location.href = "/login";
                }
                if (jqXHR.status === 403 || jqXHR.status >= 404) {
                    deferred.resolve();
                    RC.common.error({
                        title: RC.constants.errorTitle404,
                        message: RC.constants.errorTip
                    });
                }
            }
        });
        return deferred.promise();
    }

    function _init() {
        _changePassword();
    }

    _init();

})(jQuery);
/* jshint +W071 */
