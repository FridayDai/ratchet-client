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
        noTaskFiledSelector: '#no-tasks',
        taskListFiledSelector: '#tasks-list',

        taskInfoHiddenSelector: '.task-info-hidden',
        noActiveItemLabelSelector: '.no-active-item',
        todayItemSelector: '.today-item',
        boxItemsSelector: '.box-item:not(.archived)',
        archivedItemSelector: '.box-item.archived',
        deleteTaskButtonSelector: '.box-item .delete',
        beginTaskButtonSelector: '.box-item .begin-task',
        callTaskButtonSelector: '.box-item .call-task',
        taskIndicatorSelector: '.box-item .task-treatment-indicate',

        filterCountFiledSelector: '#filter-count',
        clearFilterButtonSelector: '#clear-filter',
        visibleTaskCountSelector: '#visible-number',
        totalTaskCountSelector: '#total-number'
    });

    this.children({
        taskStatusFilterFieldSelector: {
            child: FilterTaskStatusSelectbox
        }
    });

    //task item function

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

    //task panel function
    this.onMedicalRecordListClick = function (event, data) {

        if (data && data.medicalRecordId) {
            var id = data.medicalRecordId;
            var medicalTasks = $('.box-item[medical-record-id =' + id + ']');
            this.currentMedicalRcordId = id;

            if (medicalTasks.length) {
                this.select('noTaskFiledSelector').hide();
                this.select('taskListFiledSelector').show();

                medicalTasks.show();
                $('.box-item[medical-record-id !=' + id + ']').hide();
            } else {
                this.select('taskListFiledSelector').hide();
                this.select('noTaskFiledSelector').show();
            }

            if (data.archived) {
                this.attr.boxItemsSelector = '.box-item';
            } else {
                this.attr.boxItemsSelector = '.box-item:not(.archived)';
            }

            this.select('filterCountFiledSelector').show();
            this.countVisibleTasks();

        } else {
            this.onClearTaskFilter();
        }
    };

    this.checkNoTask = function () {
        if ($('.box-item:visible').length === 0) {
            this.select('taskListFiledSelector').hide();
            this.select('noTaskFiledSelector').show();
        }
    };

    this.countVisibleTasks = function () {
        var visible = $('.box-item:visible').length;
        this.select('visibleTaskCountSelector').text(visible);
    };

    this.countTotalTasks = function () {
        var total = this.select('boxItemsSelector').length;
        this.select('totalTaskCountSelector').text(total);
    };

    this.filterTaskByStatus = function (e, data) {
        var status = data.status;
        var medicalRecordId = this.currentMedicalRcordId;

        this.select('noTaskFiledSelector').hide();
        this.select('taskListFiledSelector').show();
        this.select('filterCountFiledSelector').show();

        if (medicalRecordId) {
            this.select('boxItemsSelector').hide().filter(function (index, ele) {
                return _.indexOf(status, $(ele).data('status')) > -1 &&
                    +$(ele).attr('medical-record-id') === +medicalRecordId;
            }).show();
        } else {
            this.select('boxItemsSelector').hide().filter(function (index, ele) {
                return _.indexOf(status, $(ele).data('status')) > -1;
            }).show();
        }

        this.checkNoTask();
        this.countVisibleTasks();
    };

    this.onClearTaskFilter = function () {
        this.select('noTaskFiledSelector').hide();
        this.select('taskListFiledSelector').show();
        this.select('archivedItemSelector').hide();

        this.attr.boxItemsSelector = '.box-item:not(.archived)';
        this.currentMedicalRcordId = null;
        this.archived = false;

        this.trigger('taskStatusClearFilter');
    };

    this.scrollToday = function () {
        var position = this.select('todayItemSelector').position();

        if (position.top > 210) {
            this.select('taskListFiledSelector').scrollTop(position.top - 210);
        }
    };

    this.initDefaultTasks = function () {
        this.select('archivedItemSelector').hide();
        this.countTotalTasks();
        this.scrollToday();
    };

    this.after('initialize', function () {
        this.initDefaultTasks();
        this.on(document, 'medicalRecordListSelected', this.onMedicalRecordListClick);
        this.on(document, 'feedbackPhoneNumberStatus', this.onPhoneNumberFeedback);
        this.on(document, 'phoneNumberUpdated', this.onPhoneNumberFeedback);
        this.on('taskStatusFilterSelected', this.filterTaskByStatus);

        this.on('click', {
            deleteTaskButtonSelector: this.onTaskDeleteButtonClicked,
            beginTaskButtonSelector: this.onTaskBeginButtonClicked,
            callTaskButtonSelector: this.onTaskVoiceCallButtonClicked,
            clearFilterButtonSelector: this.onClearTaskFilter,
            taskIndicatorSelector: this.onTaskIndicatorClicked
        });

        this.checkPhoneNumberStatus();
    });
}

module.exports = flight.component(WithChildren, TaskSection);
