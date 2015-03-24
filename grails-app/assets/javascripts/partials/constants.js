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
        updateAccountTitle: "EDIT ACCOUNT",
        confirmTreatmentTitle: "ADD TREATMENT",
        editGiverTitle: "Edit a Care Giver",
        editPatientTitle: "EDIT PATIENT",
        updateSurgeryTimeTitle: "EDIT TREATMENT",
        confirmContent: "",
        loadingContent: "This is loading content",
        changePasswordTitle: "CHANGE PASSWORD",
        editSurgeonTitle: "EDIT SURGEON",

        //SUCCESS
        invitePatientSuccess: "An invitation e-mail has been sent.",
        inviteAccountSuccess: "An invitation e-mail has been sent.",
        activeAccountSuccess: "The account is activated.",
        deactiveAccountSuccess: "The account is deactivated.",
        sendTaskEmailSuccess: "The task has been sent.",
        sendAssistMessageSuccess: "Message Sent!",

        //WARNING
        warningTipTitle: "Are you sure you want to remove the current Agent?",
        deleteTeamWaringTitle: "Are you sure you want to remove the current Care Team?",
        deleteGiverWaringTitle: "DELETE EMERGENCY CONTACT",
        deleteGiverWarningMsg: "Are you sure you want to remove the current emergency contact?",
        archivedTreatmentWarningMsg: "ARCHIVE TREATMENT",
        archivedMessage: "Warning: This action cannot be undone.",
        warningTip: "Click “PROCEED” to go to remove the agent.",
        waringMessageProvider: "Please enter your provider",
        waringMessageAgent: "Please enter your agent",
        waringMessageEmail: "Please enter a valid email address",


        //ERROR
        errorTitle: "ERROR",
        errorTitle404: "ERROR : 404",
        errorTip: "Something has gone wrong. Please try again!",
        errorMessage: "Couldn't load this tab. We'll try to fix this as soon as possible.",
        errorMessageAction: "Something wrong, Please check messages below.",
        confirmPassword: "Your passwords don't match. Please enter them again."
    });
})(jQuery);
