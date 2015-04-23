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
        updateSurgeryTimeTitle: "EDIT SURGERY TIME",
        confirmContent: "",
        loadingContent: "This is loading content",
        changePasswordTitle: "CHANGE PASSWORD",
        addGroupTitle: "NEW GROUP",
        editGroupTitle: "EDIT GROUP",
        editSurgeonTitle: "EDIT GROUP AND PROVIDER",
        importFormTitle: "BULK IMPORT",

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
        deleteGroupWaringTitle:"DELETE GROUP",
        warningTip: "Click “PROCEED” to go to remove the agent.",
        waringMessageProvider: "Please enter your provider",
        waringMessageAgent: "Please enter your agent",
        waringMessageEmail: "Please enter a valid email address",
        surgeryTimeEditWaringTitle: "EDIT SURGERY TIME",
        surgeryTimeEditWaringMessage: "Are you sure? All results will be cleared and all tasks will be rescheduled.",

        //ERROR
        errorTitle: "ERROR",
        errorTitle404: "ERROR : 404",
        groupErrorTip:"CANNOT DELETE GROUP",
        errorTip: "Something has gone wrong. Please try again!",
        errorMessage: "Couldn't load this tab. We'll try to fix this as soon as possible.",
        errorMessageAction: "Something wrong, Please check messages below.",
        confirmPassword: "Your passwords don't match. Please enter them again.",
        formatError: "We are not able to process this file due to a format problem. Please verify the file you uploaded.",
        dataError: "We are not able to process this file due to a data problem. Please download and fix the error file and try again.",

        //OTHERS
        patientIdExist: "ID already exists",
        emailExist: "Email already exists"
    });
})(jQuery);
