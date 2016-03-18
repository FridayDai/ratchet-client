var flight = require('flight');
var CheckArchivedWindowSize = require('../../shared/functional/CheckArchivedWindowSize');

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

function TaskSection() {
    flight.compose.mixin(this, [
        CheckArchivedWindowSize
    ]);

    this.attributes({
        contentSelector: '.content',

        activeItemsContainerSelector: '#task-row-active',
        activeItemBoxSelector: '#task-row-active .box-item',
        activeRowSelector: '#task-row-active',
        closedRowSelector: '#task-row-closed',
        scheduleItemsContainerSelector: '#task-row-schedule',

        notifyButtonSelector: '.btn-notify.task-email',
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

    this.onEmailStatusUpdated = function () {
        this.select('notifyButtonSelector').hide();
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
        var $taskBox = $(e.target).closest('.box-item');
        var taskId = $taskBox.find('.id').text();
        this.callTask(taskId);
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

                    var item = $taskRow.get(0).id.replace(/.*-(\w+)$/, "$1");

                    _.remove(me.taskBoxData[item].all, function (n) {
                        return n === +taskId;
                    });

                    if (_.indexOf(me.taskBoxData[item].voice, taskId) > 0) {
                        _.remove(me.taskBoxData[item].voice, function (n) {
                            return n === +taskId;
                        });
                    }

                    $taskBox.remove();
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
            }

            $taskRow.append(noMoreItemTemp);
        }
    };

    //Filter component
    this.onFilterButtonClicked = function (e) {
        var me = this;
        var button = $(e.target);
        var item = button.closest('.task-row').get(0).id;

        var tasks = this.taskBoxData[item.replace(/.*-(\w+)$/, "$1")];
        button.toggleClass('active');

        if (this.filterClicked) {
            this.filterClicked = false;
            me.renderTaskBox(tasks.all, tasks.all);
        } else {
            this.filterClicked = true;
            me.renderTaskBox(tasks.all, tasks.voice);
        }
    };

    this.renderTaskBox = function (all, show) {
        var showBox, hideBox;
        if (all === show) {
            showBox = _.reduce(_.map(all, function (id) {
                return $('#' + id);
            }), function (pre, current) {
                return $.merge(pre, current);
            });

            if (showBox) {
                showBox.show();
            }
        } else {
            var exclude = _.difference(all, show);
            hideBox = _.reduce(_.map(exclude, function (id) {
                return $('#' + id);
            }), function (pre, current) {
                return $.merge(pre, current);
            });

            if (hideBox) {
                hideBox.hide();
            }
        }

    };

    this.storeTaskBox = function () {
        this.taskBoxData = {};
        this.taskBoxData.active = {
            all: this.select('activeRowSelector').data('tasksId'),
            voice: this.select('activeRowSelector').data('tasksVoice')
        };

        this.taskBoxData.closed = {
            all: this.select('closedRowSelector').data('tasksId'),
            voice: this.select('closedRowSelector').data('tasksVoice')
        };

        this.taskBoxData.schedule = {
            all: this.select('scheduleItemsContainerSelector').data('tasksId'),
            voice: this.select('scheduleItemsContainerSelector').data('tasksVoice')
        };
    };


    this.after('initialize', function () {
        this.setBasicIds();
        this.checkActiveItemStatus();
        this.storeTaskBox();

        this.on(document, 'emailStatusUpdated', this.onEmailStatusUpdated);

        this.on('click', {
            deleteTaskButtonSelector: this.onTaskDeleteButtonClicked,
            beginTaskButtonSelector: this.onTaskBeginButtonClicked,
            callTaskButtonSelector: this.onTaskVoiceCallButtonClicked,
            filterButtonSelector: this.onFilterButtonClicked
        });
    });
}

module.exports = flight.component(TaskSection);
