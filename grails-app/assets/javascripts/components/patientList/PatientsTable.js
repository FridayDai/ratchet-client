require('momentTZ');

var flight = require('flight');
var WithDataTable = require('../common/WithDataTable');
var URLs = require('../../constants/Urls');
var Notifications = require('../common/Notification');
var STRINGs = require('../../constants/Strings');
var PARAMs = require('../../constants/Params');
var Utility = require('../../utils/Utility');

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

var TABLE_SEARCH_EVENTS = [
    'selectTreatmentForPatientTable',
    'clearTreatmentForPatientTable',
    'selectProviderForPatientTable',
    'clearProviderForPatientTable',
    'selectEmailStatusForPatientTable',
    'clearEmailStatusForPatientTable',
    'selectAttentionStatusForPatientTable',
    'clearAttentionStatusForPatientTable',
    'selectTreatmentStatusForPatientTable',
    'clearTreatmentStatusForPatientTable',
    'selectTaskStatusForPatientTable',
    'clearTaskStatusForPatientTable',
    'selectPatientIDNameForPatientTable'
];

function PatientsTable() {
    this.attributes({
        url: URLs.GET_PATIENTS
    });

    this.options({
        columnDefs: [
            {
                targets: 0,
                data: 'patientId',
                render: function (data, type, full) {
                    var id = data === undefined ? full.patientId : data;

                    if (full.isAttentionNeeded === "true" || full.isAttentionNeeded === true) {
                        return [
                            '<div class="source-id">',
                            id,
                            '<div class="attention-icon"></div>',
                            '</div>'
                        ].join('');

                    }
                    return '<p class="source-id">' + id + '</p>';
                },
                width: "10%"
            }, {
                targets: 1,
                data: 'firstName',
                render: function (data, type, full) {
                    return full.lastName ? (full.firstName + " " + full.lastName) : data;
                },
                width: "18%"
            }, {
                targets: 2,
                data: 'email',
                render: function (data, type, full) {
                    if (!full.email) {
                        return '<span class="email-status not-available">{0}</span>'
                            .format(PARAMs.EMAIL_STATUS[full.status]);
                    } else if (PARAMs.EMAIL_STATUS[full.status]) {
                        return '{0}<span class="email-status abnormal {1}">{1}</span>'
                            .format(full.email, PARAMs.EMAIL_STATUS[full.status]);
                    } else {
                        return full.email;
                    }
                },
                width: "25%"
            }, {
                targets: 3,
                data: 'phoneNumber',
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
                render: function (data, type, full) {
                    var birthday = data === undefined ? full.birthday : data;
                    if (birthday) {
                        return Utility.parseBirthday(birthday);
                    } else {
                        return NOT_AVAILABLE_TEMP;
                    }
                },
                width: "10%"
            },
            {
                targets: 5,
                data: 'taskStatus',
                render: function (data, type, full) {
                    var taskStatus = data === undefined ? full.taskStatus : data;
                    if (taskStatus.indexOf("0 active item") !== -1) {
                        return '<span class="task-status all-complete-status">' + taskStatus + '</span>';
                    } else if (taskStatus.indexOf("Overdue") !== -1 && taskStatus.indexOf("Pending") !== -1) {
                        return '<span class="task-status overdue-status">' + taskStatus + '</span>';
                    } else if (taskStatus.indexOf("Pending") !== -1) {
                        return '<span class="task-status pending-status">' + taskStatus + '</span>';
                    } else {
                        return '<span class="task-status overdue-status">' + taskStatus + '</span>';
                    }
                },
                width: "15%",
                orderable: false
            }, {
                targets: 6,
                data: 'id',
                render: function (data, type, full) {
                    var id = data === undefined ? full.id : data;
                    return '<a href="/patients/' + id + '"class="view" data-id ="' + id + '"><span>View</span></a>';
                },
                width: "8%",
                orderable: false
            }, {
                targets: 7,
                data: 'status',
                "visible": false
            }, {
                targets: 8,
                data: 'isAttentionNeeded',
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
        attentionStatus: null,
        treatmentStatus: null,
        taskStatus: null,
        activeTreatmentOnly: true
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

    this.after('initialize', function () {
        this.initAllActivePatientFilter();

        this.on(document, 'refreshPatientsTable', this.onTableRefresh);
        this.on(document, 'bulkImportSavedSuccess', this.onBulkImportSaved);
        this.on(document, 'loadDataFromSessionRouter', this.onLoadDataFromSessionRouter);

        _.each(TABLE_SEARCH_EVENTS, function(event) {
            this.on(document, event, this.onTriggerSearch);
        }, this);
    });

    this.before('teardown', function () {
        this.allActivePatientFilter.find('.filter').off();
    });
}

module.exports = flight.component(WithDataTable, PatientsTable);
