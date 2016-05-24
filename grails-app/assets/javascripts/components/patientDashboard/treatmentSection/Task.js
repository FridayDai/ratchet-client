var flight = require('flight');

var Notifications = require('../../common/Notification');
var URLs = require('../../../constants/Urls');
var STRINGs = require('../../../constants/Strings');
var WithChildren = require('../../common/WithChildren');
var FilterTaskStatusSelectbox = require('./FilterTaskStatusSelectbox');

var DELETE_TASK_TITLE = '<strong>{0}</strong>';

function TaskSection() {

    this.attributes({
        contentSelector: '.content',
        treatmentToolbarSelector: '.treatment-tool-bar',
        taskStatusFilterFieldSelector: '#task-status',

        taskInfoHiddenSelector: '.task-info-hidden',
        noActiveItemLabelSelector: '.no-active-item',
        boxItemsSelector: '.box-item',
        archivedItemSelector: '.box-item.archived',
        deleteTaskButtonSelector: '.box-item .delete',
        beginTaskButtonSelector: '.box-item .begin-task',
        callTaskButtonSelector: '.box-item .call-task',
        filterButtonSelector: '.quick-filter-button'
    });

    this.children({
        taskStatusFilterFieldSelector: {
            child: FilterTaskStatusSelectbox
        }
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
                    //me.updateTaskBoxAndFilter($taskBox, $taskRow);
                    //me.countActiveTasks();
                    //me.checkIfHasTasks($taskRow);
                    Notifications.showFadeOutMsg(STRINGs.TASK_DELETE.format(taskTitle));

                    me.trigger('deleteTaskSuccessful');
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

    this.onMedicalRecordListClick = function (event, data) {
        var id = data.medicalRecordId;
        $('.box-item[medical-record-id =' + id + ']').show();
        $('.box-item[medical-record-id !=' + id + ']').hide();
    };

    this.initDefaultTasks = function () {
        this.filterTask = [];
        this.filterTask.total = this.select('boxItemsSelector').length;

        this.select('archivedItemSelector').hide();
    };

    this.after('initialize', function () {
        this.initDefaultTasks();
        this.on(document, 'medicalRecordListSelected', this.onMedicalRecordListClick);
        this.on(document, 'feedbackPhoneNumberStatus', this.onPhoneNumberFeedback);
        this.on(document, 'phoneNumberUpdated', this.onPhoneNumberFeedback);

        this.on('click', {
            deleteTaskButtonSelector: this.onTaskDeleteButtonClicked,
            beginTaskButtonSelector: this.onTaskBeginButtonClicked,
            callTaskButtonSelector: this.onTaskVoiceCallButtonClicked,
            filterButtonSelector: this.onFilterButtonClicked
        });
        this.checkPhoneNumberStatus();
    });
}

module.exports = flight.component(WithChildren, TaskSection);
