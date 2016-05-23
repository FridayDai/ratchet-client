var flight = require('flight');
var WithDialog = require('../../common/WithFormDialog');
var WithChildren = require('../../common/WithChildren');

var ScheduleTaskDatePicker = require('./ScheduleTasksDatePicker');

var URLs = require('../../../constants/Urls');
var Utility = require('../../../utils/Utility');
var Notifications = require('../../common/Notification');

var TASK_ELEMENT_TEMPLATE = [
    '<li class="task-item" data-tool-id="{0}">',
    '<label>',
    '<input type="checkbox" />',
    '<span></span>',
    '</label>',
    '<div class="title">{1}</div>',
    '<div class="description">{2}</div>',
    '</li>'
].join('');

var ON_SURGERY_DAY = 'ON SURGERY DAY';
var BEFORE_SURGERY_DAYS = '{0} DAYS BEFORE SURGERY';
var ONE_DAY_BEFORE_SURGERY_DAY = '1 DAY BEFORE SURGERY';
var AFTER_SURGERY_DAYS = '{0} DAYS AFTER SURGERY';
var ONE_DAY_AFTER_SURGERY_DAY = '1 DAY AFTER SURGERY';
var SELECT_ALL = 'Select all';
var DESELECT_ALL = 'Deselect all';
var TASKS_ADDED = '{0} tasks have been added';
var ONE_TASK_ADDED = '1 task has been added';

var availableTasksCache = {};

function AddTasksDialog() {
    this.attributes({
        hasTasksContainerSelector: '.has-tasks',
        noTasksContainerSelector: '.no-tasks',
        tasksContainerSelector: '.task-list',
        taskItemSelector: '.task-item',

        selectAllButtonSelector: '.select-all',

        scheduleTaskFieldSelector: '[name=scheduleTaskDate]',
        scheduleDateHelpLabelSelector: '.surgery-date-relative-indicator'
    });

    this.children({
        scheduleTaskFieldSelector: {
            child: ScheduleTaskDatePicker,
            attributes: {
                resetEvent: 'addTasksReset'
            }
        }
    });

    this.onShow = function (e, basicIds) {
        this.prepareToShow();
        this.getAvailableTasks(basicIds);
    };

    this.prepareToShow = function () {
        this.select('selectAllButtonSelector').text(SELECT_ALL);
    };

    this.getAvailableTasks = function (params) {
        this.setupCurrentParams(params);

        var me = this;
        var cache = availableTasksCache[params.treatmentId];

        if (cache) {
            this.getAvailableTasksSuccess(cache);
        } else {
            $.ajax({
                url: URLs.GET_AVAILABLE_TASKS.format(params.treatmentId),
                method: "GET"
            }).done(function (data) {
                availableTasksCache[params.treatmentId] = data;

                me.getAvailableTasksSuccess(data);
            });
        }
    };

    this.setupCurrentParams = function (params) {
        this.patientId = params.patientId;
        this.medicalRecordId = params.medicalRecordId;
        this.surgeryDateStr = params.currentSurgeryDate;
    };

    this.getAvailableTasksSuccess = function (data) {
        if (data && data.length) {
            this.select('hasTasksContainerSelector').show();
            this.select('noTasksContainerSelector').hide();

            this.select('tasksContainerSelector')
                .html(_.reduce(data, function (result, item) {
                    return result + TASK_ELEMENT_TEMPLATE.format(item.id, item.title, item.description);
                }, ''));
        } else {
            this.select('hasTasksContainerSelector').hide();
            this.select('noTasksContainerSelector').show();
        }

        this.$node.removeClass('ui-hidden');
        this.show();
    };

    this.clickTaskItemBody = function (e) {
        var $target = $(e.target);
        var $checkbox;

        if (!$target.closest('label').length) {
            $checkbox = $target.closest(this.attr.taskItemSelector)
                .find('[type=checkbox]');

            $checkbox.prop('checked', !$checkbox.prop('checked'));
        }

        this.validate();
    };

    this.selectAllTasks = function (e) {
        e.preventDefault();

        var $button = this.select('selectAllButtonSelector');
        if ($button.text() === SELECT_ALL) {
            this.select('taskItemSelector')
                .find('[type=checkbox]')
                .prop('checked', true);

            $button.text(DESELECT_ALL);
        } else {
            this.select('taskItemSelector')
                .find('[type=checkbox]')
                .prop('checked', false);

            $button.text(SELECT_ALL);
        }

        this.validate();
    };

    this.validate = function () {
        var checkboxesValid = _.some(
            this.select('taskItemSelector').find('[type=checkbox]'),
            function ($checkbox) {
                return $($checkbox).prop('checked');
            });

        var dateValid = this.select('scheduleTaskFieldSelector').val();

        var $addButton = this.$node.closest('.ui-dialog').find('.add-button');

        if (checkboxesValid && dateValid) {
            $addButton.removeClass('disabled');
        } else {
            if (!$addButton.hasClass('disabled')) {
                $addButton.addClass('disabled');
            }
        }
    };

    this.cancelHandler = function (e) {
        e.preventDefault();

        this.close();
    };

    this.confirmHandler = function (e) {
        e.preventDefault();

        var $button = $(e.target).closest('button');
        var me = this;

        if (!$button.hasClass('disabled') && this.$node.valid()) {
            var toolIds = _.reduce(
                this.select('taskItemSelector'),
                function (result, item) {
                    var $item = $(item);

                    if ($item.find('[type=checkbox]').prop('checked')) {
                        result.push($item.data('toolId'));
                    }

                    return result;
                },
                []
            );

            var scheduleTime = Utility.toVancouverTime(this.select('scheduleTaskFieldSelector').val());

            $.ajax({
                url: URLs.ADD_AD_HOC_TASKS.format(this.patientId, this.medicalRecordId),
                method: "POST",
                data: {
                    toolIds: toolIds.join(','),
                    scheduleTime: scheduleTime
                }
            }).done(function () {
                me.addTaskSuccessful(toolIds.length);
            });
        }
    };

    this.addTaskSuccessful = function (taskSize) {
        Notifications.showFadeOutMsg(taskSize > 1 ? TASKS_ADDED.format(taskSize) : ONE_TASK_ADDED);

        this.trigger('addTasksSuccess');

        this.close();
    };

    this.onClose = function () {
        var $addButton = this.$node.closest('.ui-dialog').find('.add-button');

        if (!$addButton.hasClass('disabled')) {
            $addButton.addClass('disabled');
        }

        this.select('scheduleDateHelpLabelSelector').text('');

        this.trigger('addTasksReset');
    };

    this.onScheduleTasksDateSelected = function () {
        this.select('scheduleDateHelpLabelSelector').text(this.getSurgeryDateRelativeIndicator());

        this.validate();
    };

    function getIndicatorStr (days) {
        var result = '';

        if (days === 0) {
            result = ON_SURGERY_DAY;
        } else if (days === -1) {
            result = ONE_DAY_BEFORE_SURGERY_DAY;
        } else if (days === 1) {
            result = ONE_DAY_AFTER_SURGERY_DAY;
        } else if (days > 1) {
            result = AFTER_SURGERY_DAYS.format(days);
        } else if (days < -1) {
            result = BEFORE_SURGERY_DAYS.format(-days);
        }

        return result;
    }

    this.getSurgeryDateRelativeIndicator = function () {
        var result = '', days;

        if (this.surgeryDateStr) {
            days = Utility.durationInDays(this.surgeryDateStr, this.select('scheduleTaskFieldSelector').val());

            result = getIndicatorStr(days);
        }

        return result;
    };


    this.options({
        title: 'ADD TASKS',
        width: 986,
        buttons: [{
            text: 'Add',
            'class': 'add-button disabled',
            click: this.confirmHandler
        }, {
            text: 'Cancel',
            click: this.cancelHandler
        }]
    });

    this.after('initialize', function () {
        this.on(document, 'scheduleTasksDatePickerSelected', this.onScheduleTasksDateSelected);

        this.on('click', {
            taskItemSelector: this.clickTaskItemBody,
            selectAllButtonSelector: this.selectAllTasks
        });

        this.$node.find('[name=scheduleTaskDate]').blur(_.bind(this.onScheduleTasksDateSelected, this));

        this.on('dialogclose', this.onClose);
    });
}

module.exports = flight.component(
    WithChildren,
    WithDialog,
    AddTasksDialog
);

