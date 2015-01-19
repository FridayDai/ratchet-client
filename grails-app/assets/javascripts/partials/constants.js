(function ($, undefined) {
    'use strict';
    var constants = RC.constants = RC.constants || {};

    $.extend(constants, {

        //URL
        baseUrl: "http://localhost:8080",

        //CONFIRM
        confirmTitle: "Add a new Provider",
        confirmPatientTitle: "Add a new Patient",
        confirmTaskTitle: "Add Task",
        confirmNoteTitle: "Edit Note",
        confirmTeamTitle: "Add a new Team Member",
        confirmGiverTitle: "Invite a new Care Giver",
        editGiverTitle: "Edit a Care Giver",
        confirmContent: "",
        loadingContent: "This is loading content",

        //WARNING
        warningTipTitle: "Are you sure you want to remove the current Agent?",
        deleteTeamWaringTitle: "Are you sure you want to remove the current Care Team?",
        deleteGiverWaringTitle: "Are you sure you want to remove the current Care Giver?",
        warningTip: "Click “PROCEED” to go to remove the agent.",
        waringMessageProvider: "Please enter your provider",
        waringMessageAgent: "Please enter your agent",
        waringMessageEmail: "Please enter a valid email address",

        //ERROR
        errorMessage: "Couldn't load this tab. We'll try to fix this as soon as possible."
    });
})(jQuery);
