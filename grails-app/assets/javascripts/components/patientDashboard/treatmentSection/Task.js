var flight = require('flight');

var WithChildren = require('../../common/WithChildren');
var FilterTaskStatusSelectbox = require('./FilterTaskStatusSelectbox');
var taskItemBox = require('./TaskItemBox');

function TaskSection() {

    this.attributes({
        contentSelector: '.content',
        treatmentToolbarSelector: '.treatment-tool-bar',
        taskStatusFilterFieldSelector: '#task-status',
        noTaskFiledSelector: '#no-tasks',
        taskListFiledSelector: '#tasks-list',
        taskItemBoxSelector: '.box-item',

        taskInfoHiddenSelector: '.task-info-hidden',
        noActiveItemLabelSelector: '.no-active-item',
        todayItemSelector: '.today-item',
        boxItemsSelector: '.box-item:not(.archived)',
        archivedItemSelector: '.box-item.archived',
        filterCountFiledSelector: '#filter-count',
        clearFilterButtonSelector: '#clear-filter',
        alertFilterButtonSelector: '#btn-filter-alert',
        alertButtonNumberSelector: '#btn-alert-number',
        alertButtonTextSelector: '#filter-alert-text',
        visibleTaskCountSelector: '#visible-number',
        totalTaskCountSelector: '#total-number'
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
        var total = this.select('boxItemsSelector').length;
        this.select('totalTaskCountSelector').text(total);
    };

    this.updateAlertTaskNumber = function () {
        var number = this.select('alertButtonNumberSelector').text();

        if(--number > 0 ) {
            if(number === 1) {
                this.select('alertButtonTextSelector').text('Alert');
            } else {
                this.select('alertButtonTextSelector').text('Alerts');
            }
            this.select('alertButtonNumberSelector').text(number);
        } else {
            this.select('alertButtonNumberSelector').hide();
        }
    };

    this.filterTasks = function () {
        var medicalRecordId = this.filter.currentMedicalRecordId;
        var status = this.filter.taskStatus;
        var alert = this.filter.alert;

        function taskAlert(ele) {
            if(!alert) {
                return true;
            } else {
                return $(ele).data('alert');
            }
        }

        function medicalRecord(ele) {
            if(!medicalRecordId) {
                return true;
            } else {
                return +$(ele).attr('medical-record-id') === +medicalRecordId;
            }
        }

        function taskStatus (ele) {
            return _.indexOf(status, $(ele).data('status')) > -1;
        }

        this.select('noTaskFiledSelector').hide();
        this.select('taskListFiledSelector').show();

        this.select('boxItemsSelector').hide().filter(function (index, ele) {
            return taskAlert(ele) && medicalRecord(ele) && taskStatus(ele);
        }).show();

        this.checkNoTask();
        this.countVisibleTasks();
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

            this.select('filterCountFiledSelector').show();
            this.filterTasks();

        } else {
            this.onClearTaskFilter();
        }
    };

    this.filterTaskByStatus = function (e, data) {
        this.filter.taskStatus = data.status;

        this.filterTasks();
    };

    this.alertButtonClick = function () {
        var $button = this.select('alertFilterButtonSelector');
        $button.toggleClass('active');
        this.filter.alert = $button.hasClass('active');
        this.filterTasks();
    };

    this.onClearTaskFilter = function () {
        this.select('noTaskFiledSelector').hide();
        this.select('taskListFiledSelector').show();
        this.select('archivedItemSelector').hide();

        this.attr.boxItemsSelector = '.box-item:not(.archived)';
        this.filter.currentMedicalRecordId = null;
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
        this.filter = {
            currentMedicalRecordId: null,
            taskStatus: ["overdue", "pending", "expired", "schedule", "complete"],
            alert: null
        };

        this.select('archivedItemSelector').hide();
        this.countTotalTasks();
        this.scrollToday();
    };

    this.after('initialize', function () {
        this.initDefaultTasks();
        this.on(document, 'medicalRecordListSelected', this.onMedicalRecordListClick);
        this.on('alertHasBeenResolved', this.updateAlertTaskNumber);

        this.on('taskStatusFilterSelected', this.filterTaskByStatus);
        this.on('click', {
            clearFilterButtonSelector: this.onClearTaskFilter,
            alertFilterButtonSelector: this.alertButtonClick
        });
    });
}

module.exports = flight.component(WithChildren, TaskSection);
