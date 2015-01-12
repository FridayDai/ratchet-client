(function ($, undefined) {
    'use strict';
    var constants = RC.constants = RC.constants || {};

    $.extend(constants, {
        confirmTitle: "Add a new com.xplusz.ratchet.Provider",
        confirmContent: "",
        loadingContent: "This is loading content",
        warningTipTitle: "Are you sure you want to remove the current Agent?",
        warningTip: "Click “PROCEED” to go to remove the agent.",

        waringMessageProvider: "Please enter your provider",
        waringMessageAgent: "Please enter your agent",
        waringMessageEmail: "Please enter a valid email address",
        baseUrl: "http://localhost:8080/ratchet-v2-provider-desktop"

    });
})(jQuery);
