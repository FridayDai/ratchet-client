var flight = require('flight');
var CheckArchivedWindowSize = require('../../shared/functional/CheckArchivedWindowSize');
var AttentionResolveTip = require('./AttentionResolveTip');

var Notifications = require('../../common/Notification');
var URLs = require('../../../constants/Urls');
var STRINGs = require('../../../constants/Strings');

var DELETE_TASK_TITLE = '<strong>{0}</strong>';
var NO_MORE_IN_ACTIVE = [
    '<div class="no-item center no-item-sent no-active-item" id="no-active-item">',
    '<p>There are no active items</p>',
    '</div>'
].join('');
var NO_MORE_IN_SCHEDULE = [
    '<div class="no-item center no-item-schedule">',
    '<p>No item has been scheduled yet.</p>',
    '</div>'
].join('');
var NO_MORE_IN_CLOSED = [
    '<div class="no-item center no-item-sent">',
    '<p>There are no closed items</p>',
    '</div>'
].join('');

function TaskSection() {
    flight.compose.mixin(this, [
        CheckArchivedWindowSize,
        AttentionResolveTip
    ]);

    this.attributes({
        contentSelector: '.content',

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

    this.getActiveItemCount = function () {
        return this.select('activeItemBoxSelector').size();
    };

    this.setBasicIds = function () {
        var $taskInfoHidden = this.select('taskInfoHiddenSelector');

        if (!this.patientId) {
            this.patientId = $taskInfoHidden.data('patientId');
            this.medicalRecordId = $taskInfoHidden.data('medicalRecordId');
        }
    };

    this.checkActiveItemStatus = function () {
        if (this.select('noActiveItemLabelSelector').length >= 1) {
            this.trigger('noActiveTask');
        }
    };

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
                }
            }
        });
    };

    this.checkIfHasTasks = function ($taskRow) {
        if (!$taskRow.find('.box-item').length) {
            var noMoreItemTemp = '';

            if ($taskRow.is(this.attr.activeItemsContainerSelector)) {
                noMoreItemTemp = NO_MORE_IN_ACTIVE;
            } else if ($taskRow.is(this.attr.scheduleItemsContainerSelector)) {
                noMoreItemTemp = NO_MORE_IN_SCHEDULE;
            } else {
                noMoreItemTemp = NO_MORE_IN_CLOSED;
            }

            $taskRow.html(noMoreItemTemp);
        }
    };

    //Filter component
    this.onFilterButtonClicked = function (e) {
        var button = $(e.target);
        button.toggleClass('active');
        button.blur();

        var typeValue = button.data('type');
        var item = button.closest('.task-row').get(0).id.replace(/.*-(\w+)$/, "$1");

        if (button.hasClass('active')) {
            this.filterActiveStatus[item].push(typeValue);
        } else {
            _.remove(this.filterActiveStatus[item], function (n) {
                return n === typeValue;
            });
        }

        this.renderTaskBox(this.taskBoxData[item], this.filterActiveStatus[item]);

    };

    this.mapTaskBox = function (array) {
        return _.reduce(_.map(array, function (id) {
            return $('#' + id);
        }), function (pre, current) {
            return $.merge(pre, current);
        });
    };

    this.renderTaskBox = function (tasks, showTypes) {

        var showArray = [], hideArray, showBox, hideBox;

        _.forEach(showTypes, function (type) {
            showArray = showArray.concat(tasks[type]);
        });

        hideArray = _.difference(tasks.all, showArray);

        showBox = this.mapTaskBox(showArray);
        hideBox = this.mapTaskBox(hideArray);

        if (showBox) {
            showBox.fadeIn(60);
            if (hideBox) {
                hideBox.fadeOut();
            }
        } else if(hideBox) {
            hideBox.fadeIn(60);
        }
    };

    this.renderFilter = function(tasks, type, $taskRow) {
        if(_.keys(tasks).length < 3) {
            $taskRow.find('.quick-filter').remove();
            return;
        }

        if (!tasks[type]) {
            $taskRow.find('.btn[data-type=' + type + ']').remove();
        }
    };

    this.updateTaskBoxAndFilter = function ($taskBox, $taskRow) {
        var item = $taskRow.get(0).id.replace(/.*-(\w+)$/, "$1");
        var type = $taskBox.data('taskType');
        var taskId = $taskBox.get(0).id;
        var tasks = this.taskBoxData[item];

        //remove taskId in taskBoxData
        _.remove(tasks.all, function (n) {
            return n === taskId;
        });

        _.remove(tasks[type], function (n) {
            return n === taskId;
        });

        //remove type in filter, when none of this type exist.
        if (tasks[type].length === 0) {
            delete tasks[type];

            _.remove(this.filterActiveStatus[item], function (n) {
                return n === +type;
            });
        }

        this.renderFilter(tasks, type, $taskRow);
        this.renderTaskBox(this.taskBoxData[item], this.filterActiveStatus[item]);
    };

    this.buildTaskIdList = function ($item) {
        var tasks = $item.find('.box-item');
        var taskIdList = {};
        var allArr = [];
        var taskTypeArray = [];

        tasks.each(function () {
            allArr.push(this.id);

            var taskType = $(this).data('taskType');

            if (taskTypeArray.indexOf(taskType) === -1) {
                taskIdList[taskType] = [];
                taskTypeArray.push(taskType);
                taskIdList[taskType].push(this.id);
            } else {
                taskIdList[taskType].push(this.id);
            }
        });

        taskIdList.all = allArr;

        return taskIdList;
    };

    this.storeTaskBox = function () {
        this.taskBoxData = {};
        this.taskBoxData.active = this.buildTaskIdList(this.select('activeRowSelector'));
        this.taskBoxData.closed = this.buildTaskIdList(this.select('closedRowSelector'));
        this.taskBoxData.schedule = this.buildTaskIdList(this.select('scheduleItemsContainerSelector'));

    };

    this.initFilter = function () {
        this.filterActiveStatus = {};
        this.filterActiveStatus.active = [];
        this.filterActiveStatus.closed = [];
        this.filterActiveStatus.schedule = [];
    };


    this.countActiveTasks = function () {
        var tasks = this.select('activeItemsContainerSelector').find('.box-item') || [];
        var voiceTaskSize = 0;
        _.forEach(tasks, function (task) {
            if ($(task).data('toolType') === "VOICE") {
                voiceTaskSize++;
            }
        });

        if (tasks.length === voiceTaskSize) {
            this.trigger('onlyVoiceTaskInActive');
        }
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

    this.after('initialize', function () {
        this.setBasicIds();
        this.checkActiveItemStatus();
        this.countActiveTasks();

        this.storeTaskBox();
        this.initFilter();

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
