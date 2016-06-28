var flight = require('flight');

var Notifications = require('../../common/Notification');
var URLs = require('../../../constants/Urls');
var STRINGs = require('../../../constants/Strings');
var ResolveUndoAlerts = require('../../shared/functional/ResolveUndoAlerts');

var DELETE_TASK_TITLE = '<strong>{0}</strong>';

var USER_TASK_WRAP = '<div class="content-middle"></div>';
var USER_TASK_SCORE = [
    '<span class="sub-item">',
        '<span class="score-label">{0}</span>',
        '<span class="score-number">{1}</span>',
    '</span>'
].join('');

var USER_TOOL_TITLE = {
    discharge: 'Discharge Plan',
    snf: 'SNF Follow Up'
};

function TaskItem() {

    this.attributes({
        boxItemContentSelector: '.box-item-content',
        deleteTaskButtonSelector: '.delete',
        beginTaskButtonSelector: '.begin-task',
        callTaskButtonSelector: '.call-task',
        startTaskButtonSelector: '.start-task',
        taskIndicatorSelector: '.task-treatment-indicate',
        resolveLinkSelector: '.resolve-link',
        undoLinkSelector: '.undo-link',
        taskTitleSelector: '.item-title'
    });

    this.onTaskDeleteButtonClicked = function (e) {
        var me = this;
        var deleteButton = $(e.target);
        var $taskBox = $(e.target).closest('.box-item');
        var taskTitle = $taskBox.find('.item-title').text();
        var taskId = $taskBox.find('.id').text();

        var patientId = deleteButton.data("patientId");
        var medicalRecordId = deleteButton.data("medicalRecordId");

        var urlParams = {
            patientId: patientId,
            medicalRecordId: medicalRecordId,
            taskId: taskId
        };

        Notifications.confirm({
            title: 'DELETE TASK',
            message: [
                'Are you sure you want to delete the following task?',
                DELETE_TASK_TITLE.format(taskTitle)
            ]
        }, {
            buttons: [
                {
                    text: 'Yes',
                    'class': 'btn-agree',
                    click: function () {
                        // Warning dialog close
                        $(this).dialog("close");

                        me.deleteTask(urlParams, taskTitle, $taskBox);
                    }
                }, {
                    text: 'Cancel',
                    click: function () {
                        $(this).dialog("close");
                    }
                }
            ]
        });
    };

    this.onTaskBeginButtonClicked = function (e) {
        e.preventDefault();

        var $button = $(e.target).closest('.begin-task');

        this.trigger('showFillQuestionnaireDialog', {
            taskUrl: $button.attr('href')
        });
    };

    this.onTaskStartButtonClicked = function () {
        var taskId = this.node.id;
        var title = this.select('taskTitleSelector').text().trim();
        if (title === USER_TOOL_TITLE.discharge) {
            this.trigger('showFillDischargeTaskDialog', {
                taskId: taskId
            });
        } else if (title === USER_TOOL_TITLE.snf) {
            this.trigger('showFillSNFTaskDialog', {
                taskId: taskId
            });
        }
    };

    this.onUserTaskCompleteSuccess = function (e, data) {
        if (this.node.id === data.taskId) {

            this.$node.removeClass('pending overdue expired').addClass('box-item complete')
                .data('status', 'complete')
                .find('.box-item-tool').children().not(':last').remove();

            var title = this.select('taskTitleSelector').text().trim();
            var scoreContent, report;
            if (title === USER_TOOL_TITLE.discharge) {
                report = ['', 'Home', 'Home with support', 'SNF'];
                scoreContent = USER_TASK_SCORE.format('Discharge plan:', report[data.choice.question1]);
            } else if (title === USER_TOOL_TITLE.snf) {
                report = ['', 'Yes', 'No'];
                scoreContent = USER_TASK_SCORE.format('Report received:', report[data.choice.question1]);
                scoreContent = scoreContent + USER_TASK_SCORE.format('LOS:', data.choice.question2);
            }

            $(scoreContent).appendTo($(USER_TASK_WRAP).appendTo(this.select('boxItemContentSelector')));
        }
    };

    this.onTaskVoiceCallButtonClicked = function (e) {
        e.preventDefault();
        var $target = $(e.target);
        var $taskBox = $target.closest('.box-item');
        var taskId = $taskBox.find('.id').text();

        var patientId = $target.data("patientId");
        var medicalRecordId = $target.data("medicalRecordId");

        if (!$target.hasClass('not-available')) {
            this.callTask(patientId, medicalRecordId, taskId);
        }
    };

    this.callTask = function (patientId, medicalRecordId, taskId) {
        $.ajax({
            url: URLs.CALL_TASK.format(patientId, medicalRecordId, taskId),
            type: "POST",
            success: function (data) {
                if (data === 'true') {
                    Notifications.showFadeOutMsg(STRINGs.TASK_CALL);
                }
            }
        });
    };

    this.deleteTask = function (urlParams, taskTitle, $taskBox) {
        var me = this;

        $.ajax({
            url: URLs.DELETE_TASK.format(urlParams.patientId, urlParams.medicalRecordId, urlParams.taskId),
            type: "POST",
            success: function (data) {
                if (data === 'true') {
                    $taskBox.hide();
                    me.trigger('deleteTaskSuccessful');
                    $taskBox.remove();

                    Notifications.showFadeOutMsg(STRINGs.TASK_DELETE.format(taskTitle));
                }
            }
        });
    };

    this.checkPhoneNumberStatus = function () {
        this.trigger('getPhoneNumberStatusFromPatientInfo');
    };

    this.onPhoneNumberFeedback = function (event, data) {
        var callButtons = this.select('callTaskButtonSelector');

        if (data.blank || this.$node.hasClass('archived')) {
            callButtons.addClass('not-available');
        } else {
            callButtons.removeClass('not-available');
        }
    };

    this.onTaskIndicatorClicked = function (e) {
        var medicalRecordId = $(e.target).closest('.box-item').attr('medical-record-id');
        this.trigger('taskIndicatorSelected', {medicalRecordId: medicalRecordId});
    };

    this.resolveSuccessCallback = function ($taskBox) {
        $($taskBox).data('alert', false);
        this.trigger('updateTaskFilterStatus');
    };

    this.after('initialize', function () {
        this.on(document, 'feedbackPhoneNumberStatus', this.onPhoneNumberFeedback);
        this.on(document, 'phoneNumberUpdated', this.onPhoneNumberFeedback);
        this.on(document, 'userTaskCompleteSuccess', this.onUserTaskCompleteSuccess);

        this.on('click', {
            deleteTaskButtonSelector: this.onTaskDeleteButtonClicked,
            beginTaskButtonSelector: this.onTaskBeginButtonClicked,
            callTaskButtonSelector: this.onTaskVoiceCallButtonClicked,
            startTaskButtonSelector: this.onTaskStartButtonClicked,
            taskIndicatorSelector: this.onTaskIndicatorClicked,
            resolveLinkSelector: this.onResolveButtonClicked,
            undoLinkSelector: this.onUndoButtonClicked
        });

        this.checkPhoneNumberStatus();
    });
}

module.exports = flight.component(
    ResolveUndoAlerts,
    TaskItem
);
