(function ($, undefined) {
    'use strict';
    var constants = RC.constants = RC.constants || {};

    $.extend(constants, {

        //URL
        baseUrl: "http://localhost:8080",

        //CONFIRM
        confirmTitle: "Add a new Provider",
        confirmPatientTitle: "Add a new Patient",
        confirmContent: "",
        loadingContent: "This is loading content",

        //WARNING
        warningTipTitle: "Are you sure you want to remove the current Agent?",
        warningTip: "Click “PROCEED” to go to remove the agent.",
        waringMessageProvider: "Please enter your provider",
        waringMessageAgent: "Please enter your agent",
        waringMessageEmail: "Please enter a valid email address",


    });
})(jQuery);
