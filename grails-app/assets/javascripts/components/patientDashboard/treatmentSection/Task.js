var flight = require('flight');

var Notifications = require('../../common/Notification');
var URLs = require('../../../constants/Urls');
var STRINGs = require('../../../constants/Strings');

var DELETE_TASK_TITLE = '<strong>{0}</strong>';

function TaskSection() {

    this.attributes({
        contentSelector: '.content',

        treatmentToolbarSelector: '.treatment-tool-bar',

        activeItemsContainerSelector: '#task-row-active',
        activeItemBoxSelector: '#task-row-active .box-item',
        activeRowSelector: '#task-row-active',
        closedRowSelector: '#task-row-closed',
        scheduleItemsContainerSelector: '#task-row-schedule',

        taskInfoHiddenSelector: '.task-info-hidden',
        noActiveItemLabelSelector: '.no-active-item',
        deleteTaskButtonSelector: '.box-item .delete',
        beginTaskButtonSelector: '.box-item .begin-task',
        callTaskButtonSelector: '.box-item .call-task',
        filterButtonSelector: '.quick-filter-button'
    });

    this.onTaskDeleteButtonClicked = function (e) {
        var me = this;
        var $taskBox = $(e.target).closest('.box-item');
        var taskTitle = $taskBox.find('.item-title').text();
        var taskId = $taskBox.find('.id').text();

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

                        me.deleteTask(taskId, taskTitle, $taskBox);
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

        if (!$target.hasClass('not-available')) {
            this.callTask(taskId);
        }
    };

    this.callTask = function (taskId) {
        $.ajax({
            url: URLs.CALL_TASK.format(this.patientId, this.medicalRecordId, taskId),
            type: "POST",
            success: function (data) {
                if (data === 'true') {
                    Notifications.showFadeOutMsg(STRINGs.TASK_CALL);
                }
            }
        });
    };

    this.deleteTask = function (taskId, taskTitle, $taskBox) {
        var me = this;

        $.ajax({
            url: URLs.DELETE_TASK.format(this.patientId, this.medicalRecordId, taskId),
            type: "POST",
            success: function (data) {
                if (data === 'true') {
                    var $taskRow = $taskBox.closest('.task-row');

                    $taskBox.remove();
                    me.updateTaskBoxAndFilter($taskBox, $taskRow);
                    me.countActiveTasks();
                    me.checkIfHasTasks($taskRow);
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

    this.after('initialize', function () {
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

module.exports = flight.component(TaskSection);
