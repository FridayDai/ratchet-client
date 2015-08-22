require('momentTZ');

var flight = require('flight');
var WithDataTable = require('../common/WithDataTable');
var URLs = require('../../constants/Urls');

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
                    return data === undefined ? (full.firstName + " " + full.lastName) : data;
                },
                width: "20%"
            }, {
                targets: 2,
                data: 'email',
                render: function (data, type, full) {
                    return data === null ? 'Not Available' : data === undefined ? full.email : data;
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
            }
        ]
    });

    this.setRowClickUrl = function (data) {
        return URLs.PAGE_PATIENT_DETAIL.format(data.id);
    };

    this.onTreatmentSearch = function (e, data) {
        this.search(data);
    };

    this.onProviderSearch = function (e, data) {
        this.search(data);
    };

    this.onPatientIDNameSearch = function (e, data) {
        this.search(data);
    };

    this.onBulkImportSaved = function () {
        this.reload();
    };

    this.after('initialize', function () {
        this.on(document, 'selectTreatmentForPatientTable', this.onTreatmentSearch);
        this.on(document, 'selectProviderForPatientTable', this.onProviderSearch);
        this.on(document, 'selectPatientIDNameForPatientTable', this.onPatientIDNameSearch);
        this.on(document, 'bulkImportSavedSuccess', this.onBulkImportSaved);
    });
}

module.exports = flight.component(WithDataTable, PatientsTable);
