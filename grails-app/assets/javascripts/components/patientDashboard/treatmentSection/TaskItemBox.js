var flight = require('flight');

var Notifications = require('../../common/Notification');
var URLs = require('../../../constants/Urls');
var STRINGs = require('../../../constants/Strings');

var DELETE_TASK_TITLE = '<strong>{0}</strong>';

function TaskItem() {

    this.attributes({
        deleteTaskButtonSelector: '.delete',
        beginTaskButtonSelector: '.begin-task',
        callTaskButtonSelector: '.call-task',
        taskIndicatorSelector: '.task-treatment-indicate',
        resolveLinkSelector: '.resolve-link',
        undoLinkSelector: '.undo-link'
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

                    $taskBox.remove();
                    me.checkNoTask();
                    me.countTotalTasks();
                    me.countVisibleTasks();

                    Notifications.showFadeOutMsg(STRINGs.TASK_DELETE.format(taskTitle));

                    me.trigger('deleteTaskSuccessful');
                }
            }
        });
    };

    this.onResolveButtonClicked = function (e) {
        var $button = $(e.target).closest('.resolve-link');
        var $attention = $button.closest('.box-item-attention');
        var $taskBox = $button.closest('.box-item');
        var alertId = $taskBox.data('alert');
        var me = this;

        var dfd = this.dfd = $.Deferred();

        dfd.done(function() {
            $attention.hide();
        });

        if (!$button.hasClass('checked')) {
            $button.addClass('checked');

            this.updateAlertTask(alertId, 1, function () {
                $button.removeClass('checked');
                $attention.addClass('undo');

                setTimeout(function () {
                   dfd.resolve();
                    me.trigger('alertHasBeenResolved');
                }, 30000);
            });
        }
    };

    this.onUndoButtonClicked = function (e) {
        var $button = $(e.target).closest('.undo-link');
        var $attention = $button.closest('.box-item-attention');
        var $taskBox = $button.closest('.box-item');
        var alertId = $taskBox.data('alert');
        var dfd = this.dfd;

        if (!$button.hasClass('checked')) {
            $button.addClass('checked');

            this.updateAlertTask(alertId, 0, function () {
                $button.removeClass('checked');
                $attention.removeClass('undo');
                dfd.reject();
            });
        }

    };

    this.updateAlertTask = function (alertId, status, callback) {
        $.ajax({
            url: URLs.UPDATE_ALERTS.format(alertId),
            type: "POST",
            data: {
                status: status
            },
            success: function () {
                if (_.isFunction(callback)) {
                    callback();
                }
            }
        });
    };

    this.checkPhoneNumberStatus = function () {
        this.trigger('getPhoneNumberStatusFromPatientInfo');
    };

    this.onPhoneNumberFeedback = function (event, data) {
        var callButtons = this.select('callTaskButtonSelector');

        if (data.blank) {
            callButtons.addClass('not-available');
        } else {
            callButtons.removeClass('not-available');
        }
    };

    this.onTaskIndicatorClicked = function (e) {
        var medicalRecordId = $(e.target).closest('.box-item').attr('medical-record-id');
        this.trigger('taskIndicatorSelected', {medicalRecordId: medicalRecordId});
    };

    this.after('initialize', function () {
        this.on(document, 'feedbackPhoneNumberStatus', this.onPhoneNumberFeedback);
        this.on(document, 'phoneNumberUpdated', this.onPhoneNumberFeedback);

        this.on('click', {
            deleteTaskButtonSelector: this.onTaskDeleteButtonClicked,
            beginTaskButtonSelector: this.onTaskBeginButtonClicked,
            callTaskButtonSelector: this.onTaskVoiceCallButtonClicked,
            taskIndicatorSelector: this.onTaskIndicatorClicked,
            resolveLinkSelector: this.onResolveButtonClicked,
            undoLinkSelector: this.onUndoButtonClicked
        });

        this.checkPhoneNumberStatus();
    });
}

module.exports = flight.component(TaskItem);
