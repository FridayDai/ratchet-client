var flight = require('flight');

var WithChildren = require('../../common/WithChildren');
var FilterTaskStatusSelectbox = require('./FilterTaskStatusSelectbox');
var taskItemBox = require('./TaskItemBox');

var ResolveUndoAlerts = require('../../shared/functional/ResolveUndoAlerts');
var TaskTimeLine = require('./TaskTimeLine');

function TaskSection() {

    this.attributes({
        contentSelector: '.content',
        treatmentToolbarSelector: '.treatment-tool-bar',
        taskStatusFilterFieldSelector: '#task-status',
        noTaskFiledSelector: '#no-tasks',
        taskListFiledSelector: '#tasks-list',
        taskItemBoxSelector: '.box-item',

        taskInfoHiddenSelector: '.task-info-hidden',

        todayItemSelector: '.today-item',
        allBoxItemSelector: '.box-item',
        boxItemsSelector: '.box-item:not(.archived)',
        archivedItemSelector: '.box-item.archived',

        filterCountFiledSelector: '#filter-count',
        clearFilterButtonSelector: '#clear-filter',
        alertFilterButtonSelector: '#btn-filter-alert',
        alertButtonNumberSelector: '#btn-alert-number',
        alertButtonTextSelector: '#filter-alert-text',
        visibleTaskCountSelector: '#visible-number',
        totalTaskCountSelector: '#total-number',

        alertEditEmailButtonSelector: '.patient-level-attention .edit-email-link',
        alertResolveLinkSelector: '.patient-level-attention .resolve-link',
        alertUndoLinkSelector: '.patient-level-attention .undo-link'
    });

    this.children({
        taskStatusFilterFieldSelector: {
            child: FilterTaskStatusSelectbox
        },
        taskItemBoxSelector: {
            child: taskItemBox
        }
    });

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
        var total = this.select('allBoxItemSelector').length;
        this.select('totalTaskCountSelector').text(total);
    };

    this.updateAlertTaskNumber = function (e, data) {
        var number = this.select('alertButtonNumberSelector').text();

        if (data.isResolved) {
            --number;
        } else {
            ++number;
        }

        if (number > 0) {
            if (number === 1) {
                this.select('alertButtonTextSelector').text('Alert');
            } else {
                this.select('alertButtonTextSelector').text('Alerts');
            }
            this.select('alertButtonNumberSelector').text(number).show();
        } else {
            this.select('alertButtonNumberSelector').text(0).hide();
        }
    };

    this.filterTasks = function () {
        var medicalRecordId = this.filter.currentMedicalRecordId;
        var status = this.filter.taskStatus;
        var alert = this.filter.alert;

        function taskAlert(ele) {
            if (!alert) {
                return true;
            } else {
                return $(ele).data('alert');
            }
        }

        function medicalRecord(ele) {
            if (!medicalRecordId) {
                return true;
            } else {
                return +$(ele).attr('medical-record-id') === +medicalRecordId;
            }
        }

        function taskStatus(ele) {
            if (status === 'ALL') {
                return true;
            } else {
                return _.indexOf(status, $(ele).data('status')) > -1 && !$(ele).data('isAbsolute');
            }
        }

        this.select('noTaskFiledSelector').hide();
        this.select('taskListFiledSelector').show();
        this.select('filterCountFiledSelector').show();

        if (taskAlert() && medicalRecord() && taskStatus()) {
            this.clearTaskFilter();
        } else {
            this.select('boxItemsSelector').hide().filter(function (index, ele) {
                return taskAlert(ele) && medicalRecord(ele) && taskStatus(ele);
            }).show();

            this.checkNoTask();
            this.countVisibleTasks();

            this.checkTimeLine();
        }
    };

    this.onMedicalRecordListClick = function (event, data) {

        if (data && data.medicalRecordId) {

            this.filter.currentMedicalRecordId = data.medicalRecordId;

            if (data.archived) {
                this.attr.boxItemsSelector = '.box-item';
            } else {
                this.attr.boxItemsSelector = '.box-item:not(.archived)';
                this.select('archivedItemSelector').hide();
            }
        } else {
            this.attr.boxItemsSelector = '.box-item:not(.archived)';
            this.select('archivedItemSelector').hide();
            this.filter.currentMedicalRecordId = null;
        }

        this.filterTasks();
    };

    this.filterTaskByStatus = function (e, data) {
        if(this.filter.taskStatus !== data.status) {
            this.filter.taskStatus = data.status;
            this.filterTasks();
        }
    };

    this.alertButtonClick = function () {
        var $button = this.select('alertFilterButtonSelector');
        $button.toggleClass('active');
        this.filter.alert = $button.hasClass('active');
        this.filterTasks();
    };

    this.inactiveAlert = function () {
        this.select('alertFilterButtonSelector').removeClass('active');
    };

    this.updateFilterCount = function () {
        this.checkNoTask();
        this.countTotalTasks();
        this.countVisibleTasks();
    };

    this.clearTaskFilter = function (e) {
        if (e) {
            e.preventDefault();
        }

        this.attr.boxItemsSelector = '.box-item:not(.archived)';
        this.archived = false;

        this.select('noTaskFiledSelector').hide();
        this.select('taskListFiledSelector').show();
        this.select('boxItemsSelector').show();
        this.select('archivedItemSelector').hide();

        this.initFilter();
        this.inactiveAlert();
        this.trigger('taskStatusClearFilter');

        this.checkTimeLine();
    };

    this.scrollToday = function () {
        var $taskList = this.select('taskListFiledSelector');

        if ($taskList.length) {
            var taskListHeight = $taskList.height();
            var taskListElement = $taskList.get(0);
            var todayOffsetTop = this.select('todayItemSelector').get(0).offsetTop;
            var externalTop = 60;

            taskListElement.scrollTop = todayOffsetTop - taskListHeight + externalTop;
        }
    };

    this.onAlertEditEmailButtonClick = function () {
        this.trigger('triggerEditPatientFormDialog');
    };

    this.initFilter = function () {
        this.filter = {
            currentMedicalRecordId: null,
            taskStatus: "ALL",
            alert: null
        };

        this.select('filterCountFiledSelector').hide();
    };

    this.initDefaultTasks = function () {
        this.select('archivedItemSelector').hide();

        this.initFilter();
        this.countTotalTasks();
        this.scrollToday();
    };

    this.initTaskListHeight = function () {
        var $taskList = this.select('taskListFiledSelector');

        if ($taskList.length) {
            var containerTop = this.$node.offset().top;
            var containerHeight = this.$node.height();
            var taskListTop = $taskList.offset().top;

            $taskList.outerHeight(containerHeight - taskListTop + containerTop);
        }
    };

    this.resolveSuccessCallback = function () {
        this.initTaskListHeight();
    };

    this.after('initialize', function () {
        this.initTaskListHeight();
        this.initDefaultTasks();

        this.on(document, 'medicalRecordListSelected', this.onMedicalRecordListClick);
        this.on('alertHasBeenUpdated', this.updateAlertTaskNumber);

        this.on('taskStatusFilterSelected', this.filterTaskByStatus);
        this.on('deleteTaskSuccessful', this.updateFilterCount);
        this.on('updateTaskFilterStatus', this.filterTasks);

        this.on('click', {
            clearFilterButtonSelector: this.clearTaskFilter,
            alertFilterButtonSelector: this.alertButtonClick,
            alertEditEmailButtonSelector: this.onAlertEditEmailButtonClick,
            alertResolveLinkSelector: this.onResolveButtonClicked,
            alertUndoLinkSelector: this.onUndoButtonClicked
        });
    });
}

module.exports = flight.component(
    TaskTimeLine,
    ResolveUndoAlerts,
    WithChildren,
    TaskSection
);
