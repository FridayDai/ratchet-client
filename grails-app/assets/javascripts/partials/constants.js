(function ($, undefined) {
    'use strict';
    var constants = RC.constants = RC.constants || {};

    $.extend(constants, {

        //URL
        baseUrl: "http://localhost:8080",

        //CONFIRM
        confirmTitle: "New Provider",
        confirmPatientTitle: "NEW PATIENT",
        confirmTaskTitle: "Add Outcome Task",
        confirmNoteTitle: "Edit Note",
        confirmTeamTitle: "Add a new Team Member",
        confirmGiverTitle: "ADD EMERGENCY CONTACT",
        confirmAccountTitle: "New Account",
        confirmTreatmentTitle: "ADD TREATMENT",
        editGiverTitle: "Edit a Care Giver",
        editPatientTitle: "EDIT PATIENT",
        updateSurgeryTimeTitle: "Edit TREATMENT",
        confirmContent: "",
        loadingContent: "This is loading content",
        changePasswordTitle: "CHANGE PASSWORD",
        editSurgeonTitle: "Update surgeon",

        //WARNING
        warningTipTitle: "Are you sure you want to remove the current Agent?",
        deleteTeamWaringTitle: "Are you sure you want to remove the current Care Team?",
        deleteGiverWaringTitle: "Are you sure you want to remove the current EMERGENCY CONTACT?",
        deleteGiverWarningMsg:"The information cannot be retrieved.",
        warningTip: "Click “PROCEED” to go to remove the agent.",
        waringMessageProvider: "Please enter your provider",
        waringMessageAgent: "Please enter your agent",
        waringMessageEmail: "Please enter a valid email address",
        waringMessageAction: "Something wrong, Please check messages below.",
        errorTip: "Something wrong, Please try again later.",


        //ERROR
        errorMessage: "Couldn't load this tab. We'll try to fix this as soon as possible."
    });
})(jQuery);
