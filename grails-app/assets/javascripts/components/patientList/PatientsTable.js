require('momentTZ');

var flight = require('flight');
var WithDataTable = require('../common/WithDataTable');
var URLs = require('../../constants/Urls');
var Notifications = require('../common/Notification');
var STRINGs = require('../../constants/Strings');
var PARAMs = require('../../constants/Params');
var Utility = require('../../utils/Utility');
var moment = require('moment');


var ALL_ACTIVE_PATIENT_FILTER = [
    '<div class="all-active-patient-filter">',
        '<div class="inner">',
            '<span class="filter" data-active-treatment-only="false">All</span>',
            ' - ',
            '<span class="filter active" data-active-treatment-only="true">Active Patients</span>',
        '</div>',
    '</div>'
].join('');

var NOT_AVAILABLE_TEMP = '<span class="not-available">Not Available</span>';
var NO_APPOINTMENT_TIME_TEMP = '<span class="not-available">N/A</span>';

var STATUS_ICON_MAPPING = {
    'UNVERIFIED': 'fa-exclamation-circle',
    'UNDELIVERABLE': 'fa-times-circle',
    'DECLINED': 'fa-ban'
};

var EMAIL_COLUMN = 'emailAddress';
var PHONE_NUMBER_COLUMN = 'phoneNumber';
var SURGERY_COLUMN = 'surgery';
var TASK_STATUS_COLUMN = 'taskStatus';
var APPOINTMENT_COLUMN = 'appointment';

var COLUMN_TARGET = {
    "emailAddress": 2,
    "phoneNumber": 3,
    "taskStatus": 6,
    "surgery": 5,
    "appointment": 7,
    "provider": 8
};

var STATUS_TEMPLATE = [
    '<div class="email-block">{0}</div>',
    '<span class="state">',
        '<i class="fa {2} {1}" aria-hidden="true"></i>',
        '<span class="email-status">{1}</span>',
    '</span>'
].join('');

var TABLE_SEARCH_EVENTS = [
    'selectTreatmentForPatientTable',
    'clearTreatmentForPatientTable',
    'selectProviderForPatientTable',
    'clearProviderForPatientTable',
    'selectEmailStatusForPatientTable',
    'clearEmailStatusForPatientTable',
    'selectTreatmentStatusForPatientTable',
    'clearTreatmentStatusForPatientTable',
    'selectTaskStatusForPatientTable',
    'clearTaskStatusForPatientTable',
    'selectPatientIDNameForPatientTable',
    'selectAppointmentDateForPatientTable'
];


function PatientsTable() {
    this.attributes({
        url: URLs.GET_PATIENTS
    });

    this.isVisible = function(columnName) {
        var configData = $("#patientsTable").data('config');
        if(configData) {
            return (configData.indexOf(columnName) > -1);
        } else {
            return true;
        }
    };

    this.options({
        paging: true,
        columnDefs: [
            {
                targets: 0,
                data: 'patientId',
                visible: true,
                render: function (data, type, full) {
                    var id = data === undefined ? full.patientId : data;
                    return '<p class="source-id">' + id + '</p>';
                },
                width: "8%"
            }, {
                targets: 1,
                data: 'firstName',
                visible: true,
                render: function (data, type, full) {
                    return full.lastName ? (full.firstName + " " + full.lastName) : data;
                },
                width: "11%"
            }, {
                targets: 2,
                data: 'email',
                visible: this.isVisible(EMAIL_COLUMN),
                render: function (data, type, full) {
                    var emailStatus = PARAMs.EMAIL_STATUS[full.status];

                    if (!full.email) {
                        return '<span class="email-status not-available">Not Available</span>';

                    }else {
                        if (emailStatus && emailStatus !== 'Not Available') {
                            return STATUS_TEMPLATE.format(
                                full.email,
                                emailStatus,
                                STATUS_ICON_MAPPING[emailStatus.toUpperCase()]
                            );
                        } else {
                            return full.email;
                        }
                    }
                },
                width: "16%"
            }, {
                targets: 3,
                data: 'phoneNumber',
                visible: this.isVisible(PHONE_NUMBER_COLUMN),
                render: function (data, type, full) {
                    var phoneNumber,
                        subNumber,
                        num;

                    num = data === undefined ? full.phoneNumber : data;

                    if (num) {
                        if (num.charAt(0) === '1') {
                            subNumber = num.slice(1, num.length);
                            phoneNumber = '1 ' + subNumber.replace(/(\d{3})(?=\d{2,}$)/g, '$1-');
                        } else {
                            phoneNumber = num.replace(/(\d{3})(?=\d{2,}$)/g, '$1-');
                        }

                        return phoneNumber;
                    } else {
                        return NOT_AVAILABLE_TEMP;
                    }
                },
                width: "12%"
            }, {
                targets: 4,
                data: 'birthday',
                visible: true,
                render: function (data, type, full) {
                    var birthday = data === undefined ? full.birthday : data;
                    if (birthday) {
                        return Utility.parseBirthday(birthday);
                    } else {
                        return NOT_AVAILABLE_TEMP;
                    }
                },
                width: "9%"
            }, {
                targets: 5,
                data: 'nearestAbsoluteEventDate',
                visible: this.isVisible(SURGERY_COLUMN),
                render: function (data, type, full) {
                    var date = data === undefined ? full.nearestAbsoluteEventDate : data;
                    if (date) {
                        return moment.tz(parseInt(date, 10), 'America/Vancouver').format('MM/DD/YYYY');
                    } else {
                        return NOT_AVAILABLE_TEMP;
                    }
                },
                width: "9%"
            }, {
                targets: 6,
                data: 'taskStatus',
                visible: this.isVisible(TASK_STATUS_COLUMN),
                render: function (data, type, full) {
                    var taskStatus = data === undefined ? full.taskStatus : data;
                    if (taskStatus.indexOf("0 Active") !== -1) {
                        return '<span class="task-status all-complete-status">' + taskStatus + '</span>';
                    } else if (taskStatus.indexOf("Overdue") !== -1 && taskStatus.indexOf("Pending") !== -1) {
                        return '<span class="task-status overdue-status">' + taskStatus + '</span>';
                    } else if (taskStatus.indexOf("Pending") !== -1) {
                        return '<span class="task-status pending-status">' + taskStatus + '</span>';
                    } else {
                        return '<span class="task-status overdue-status">' + taskStatus + '</span>';
                    }
                },
                width: "10%",
                orderable: false
            }, {
                targets: 7,
                data: 'nearestAppoinmentDate',
                visible: this.isVisible(APPOINTMENT_COLUMN),
                render: function (data, type, full) {
                    var date = full.nearestAppoinmentDate;
                    if (date && date!== 'null') {
                        var time = moment.tz(parseInt(date, 10), 'America/Vancouver').format('MM/DD/YYYY h:mm a');
                        var appointmentDate = time.substring(0, 10);
                        var appointmentTime = time.substring(11, time.length);

                        return '<span class="appointment-time">{0}</span><span class="appointment-time">{1}</span>'
                            .format(appointmentDate, appointmentTime);
                    } else {
                        return NO_APPOINTMENT_TIME_TEMP;
                    }
                },
                width: "9%"
            }, {
                targets: 8,
                data: 'providerNames',
                visible: true,
                sortable: false,
                render: function (data, type, full) {
                    if(full.providerNames) {
                        var spans = [];
                        var providerNames = full.providerNames.split(',');
                        for(var i in providerNames) {
                            var name = providerNames[i];
                            spans.push('<span class="providerNames">{0}</span>'.format(name));
                        }
                        return spans;
                    } else {
                        return NOT_AVAILABLE_TEMP;
                    }


                },
                width: "10%"
            }, {
                targets: 9,
                data: 'id',
                visible: true,
                render: function (data, type, full) {
                    var id = data === undefined ? full.id : data;
                    return '<a href="/patients/' + id + '"class="view" data-id ="' + id + '"><span>View</span></a>';
                },
                width: "6%",
                orderable: false
            }, {
                targets: 10,
                data: 'status',
                "visible": false
            }
        ],
        createdRow: function (row, data) {
            var status = PARAMs.EMAIL_STATUS[data.status];

            if (data.email && status) {
                $(row).addClass('email-status-{0}'.format(status));
            }
        }
    });

    this.searchFields = {
        treatmentId: null,
        surgeonId: null,
        emailStatus: null,
        patientIdOrName: null,
        treatmentStatus: null,
        taskStatus: null,
        activeTreatmentOnly: true,
        appointmentDate: null
    };

    this.setRowClickUrl = function (data) {
        return URLs.PAGE_PATIENT_DETAIL.format(data.id);
    };

    this.onTriggerSearch = function (e, data) {
        this.search(_.assign(this.searchFields, data));
    };

    this.onBulkImportSaved = function (e, data) {
        this.reload();

        var msg = '';

        if (data.number === 1) {
            msg = STRINGs.BULK_IMPORT_ADD_SUCCESS_MESSAGE_SINGLE;
        } else {
            msg = STRINGs.BULK_IMPORT_ADD_SUCCESS_MESSAGE;
        }

        Notifications.showFadeOutMsg(msg.format(data.number));
    };

    this.onTableRefresh = function (e, data) {
        this.reload(data.callback);
    };

    this.onLoadDataFromSessionRouter = function (e, data) {
        this.loadData(data.patientsTable);

        this.setActivePatientFilter(data.patientsTable.searchFields.activeTreatmentOnly);

        this.searchFields = data.patientsTable.searchFields;
    };

    this.setActivePatientFilter = function (activeOnly) {
        this.allActivePatientFilter.find('.filter')
            .removeClass('active')
            .filter('[data-active-treatment-only={0}]'.format(activeOnly))
            .addClass('active');
    };

    this.getCurrentState = function () {
        return {
            data: this.tableEl.rows().data().splice(0),
            pageInfo: this.tableEl.page.info(),
            sorting: this.tableEl.order(),
            search: this.getSetting().aaRHSearch,
            searchFields: this.searchFields
        };
    };

    this.initAllActivePatientFilter = function () {
        var me = this;
        this.allActivePatientFilter = $(ALL_ACTIVE_PATIENT_FILTER);

        this.allActivePatientFilter.find('.filter')
            .click(function (e) {
                var $target = $(e.target);

                if (!$target.hasClass('active')) {
                    me.onTriggerSearch(e, {
                        activeTreatmentOnly: $target.data('activeTreatmentOnly')
                    });

                    $target
                        .addClass('active')
                        .siblings()
                        .removeClass('active');
                }
            });

        this.allActivePatientFilter.insertAfter(this.$node);
    };

    this.toggleTargetColumn = function (target, isVisible){
        this.$node.DataTable().column( target ).visible(isVisible);
    };

    this.initFilter = function () {
        this.filter = {
            columnStatus: "null"
        };
    };

    this.onTriggerColumnFilter = function (e, data){
        if(this.filter.columnStatus !== data.status) {
            this.filter.columnStatus = data.status;
            this.filterColumns();
        }
    };

    this.toggleColumns = function (column, target, status) {
        if($.inArray(column, status) > -1){
            this.toggleTargetColumn(target, true);
        }else {
            this.toggleTargetColumn(target, false);
        }
    };

    this.filterColumns = function (){
        var status = this.filter.columnStatus;

        for(var i in Object.keys(COLUMN_TARGET)) {
            this.toggleColumns(Object.keys(COLUMN_TARGET)[i], COLUMN_TARGET[Object.keys(COLUMN_TARGET)[i]], status);
        }
        //this.toggleColumns("appointment", 9, status);
    };

    this.after('initialize', function () {
        this.initAllActivePatientFilter();
        this.initFilter();

        this.on(document, 'refreshPatientsTable', this.onTableRefresh);
        this.on(document, 'bulkImportSavedSuccess', this.onBulkImportSaved);
        this.on(document, 'loadDataFromSessionRouter', this.onLoadDataFromSessionRouter);

        _.each(TABLE_SEARCH_EVENTS, function(event) {
            this.on(document, event, this.onTriggerSearch);
        }, this);

        this.on(document,'columnFilterSelected', this.onTriggerColumnFilter);
    });

    this.before('teardown', function () {
        this.allActivePatientFilter.find('.filter').off();
    });
}

module.exports = flight.component(WithDataTable, PatientsTable);
