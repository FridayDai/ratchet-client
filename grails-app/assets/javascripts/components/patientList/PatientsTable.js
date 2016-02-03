require('momentTZ');

var flight = require('flight');
var WithDataTable = require('../common/WithDataTable');
var URLs = require('../../constants/Urls');
var Notifications = require('../common/Notification');
var STRINGs = require('../../constants/Strings');
var PARAMs = require('../../constants/Params');

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
                    return '<p class="source-id">' + id + '</p>';
                },
                width: "10%"
            }, {
                targets: 1,
                data: 'firstName',
                render: function (data, type, full) {
                    return full.lastName ? (full.firstName + " " + full.lastName) : data;
                },
                width: "20%"
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
                width: "30%"
            }, {
                targets: 3,
                data: 'phoneNumber',
                render: function (data, type, full) {
                    var phoneNumber,
                        subNumber,
                        num;

                    num = data === undefined ? full.phoneNumber : data;

                    if (num.charAt(0) === '1') {
                        subNumber = num.slice(1, num.length);
                        phoneNumber = '1 ' + subNumber.replace(/(\d{3})(?=\d{2,}$)/g, '$1-');
                    } else {
                        phoneNumber = num.replace(/(\d{3})(?=\d{2,}$)/g, '$1-');
                    }

                    return phoneNumber;
                },
                width: "15%"
            }, {
                targets: 4,
                data: 'taskStatus',
                render: function (data, type, full) {
                    var taskStatus = data === undefined ? full.taskStatus : data;
                    if (taskStatus.indexOf("All complete") !== -1) {
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
                targets: 5,
                data: 'id',
                render: function (data, type, full) {
                    var id = data === undefined ? full.id : data;
                    return '<a href="/patients/' + id + '"class="view" data-id ="' + id + '"><span>View</span></a>';
                },
                width: "8%",
                orderable: false
            }, {
                targets: 6,
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
        patientIdOrName: null
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

    this.onPageInBackButtonStatus = function () {
        this.reload();
    };

    this.onLoadDataFromSessionRouter = function (e, data) {
        this.loadData(data.patientsTable);
    };

    this.after('initialize', function () {
        this.on(document, 'pageInBackButtonStatus', this.onPageInBackButtonStatus);
        this.on(document, 'selectTreatmentForPatientTable', this.onTriggerSearch);
        this.on(document, 'clearTreatmentForPatientTable', this.onTriggerSearch);
        this.on(document, 'selectProviderForPatientTable', this.onTriggerSearch);
        this.on(document, 'clearProviderForPatientTable', this.onTriggerSearch);
        this.on(document, 'selectEmailStatusForPatientTable', this.onTriggerSearch);
        this.on(document, 'clearEmailStatusForPatientTable', this.onTriggerSearch);
        this.on(document, 'selectPatientIDNameForPatientTable', this.onTriggerSearch);
        this.on(document, 'bulkImportSavedSuccess', this.onBulkImportSaved);
        this.on(document, 'loadDataFromSessionRouter', this.onLoadDataFromSessionRouter);
    });
}

module.exports = flight.component(WithDataTable, PatientsTable);
