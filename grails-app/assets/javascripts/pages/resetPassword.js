(function ($, undefined) {
    'use strict';

    $(".password-form").validate({});

    $("#btn-reset").click(function() {
        var newPassword = $("#newPassword").val();
        var confirmPassword = $("#confirmPassword").val();
        if(newPassword !== confirmPassword) {
            $(".error-area").text(RC.constants.confirmPassword);
            return false;
        }
    });

})(jQuery);
