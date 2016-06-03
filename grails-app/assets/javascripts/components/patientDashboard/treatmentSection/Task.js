var flight = require('flight');

var Notifications = require('../../common/Notification');
var URLs = require('../../../constants/Urls');
var STRINGs = require('../../../constants/Strings');
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

    this.onMedicalRecordListClick = function (event, data) {

        if (data && data.medicalRecordId) {
            var id = data.medicalRecordId;
            var medicalTasks = $('.box-item[medical-record-id =' + id + ']');
            this.filter.currentMedicalRecordId = id;

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
            this.trigger('taskStatusToDefault');
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
        this.filter.taskStatus = data.status;
        var status = this.filter.taskStatus;
        var medicalRecordId = this.filter.currentMedicalRecordId;

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

        this.filterTasks();

        this.checkNoTask();
        this.countVisibleTasks();
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
            return _.indexOf(status, $(ele).data('status')) > -1
        }

        this.select('noTaskFiledSelector').hide();
        this.select('taskListFiledSelector').show();

        this.select('boxItemsSelector').hide().filter(function (index, ele) {
            return taskAlert(ele) && medicalRecord(ele) && taskStatus(ele)
        }).show();

        this.checkNoTask();
        this.countVisibleTasks();
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

        this.on('taskStatusFilterSelected', this.filterTaskByStatus);
        this.on('click', {
            clearFilterButtonSelector: this.onClearTaskFilter,
            alertFilterButtonSelector: this.alertButtonClick
        });
    });
}

module.exports = flight.component(WithChildren, TaskSection);
