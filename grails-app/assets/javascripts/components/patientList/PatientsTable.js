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
                name: 'patientId',
                render: function (data, type, full) {
                    var id = data === undefined ? full.patientId : data;
                    return '<p class="source-id">' + id + '</p>';
                },
                width: "10%"
            }, {
                targets: 1,
                name: 'firstName',
                render: function (data, type, full) {
                    return data === undefined ? (full.firstName + " " + full.lastName) : data;
                },
                width: "20%"
            }, {
                targets: 2,
                name: 'email',
                render: function (data, type, full) {
                    return data === undefined ? full.email : data;
                },
                width: "26%"
            }, {
                targets: 3,
                name: 'phoneNumber',
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
                name: 'lastUpdated',
                render: function (data, type, full) {
                    var lastUpdate = data === undefined ? full.lastUpdate : data;
                    return moment(lastUpdate).tz("America/Vancouver").format('MMM D, YYYY h:mm:ss A');
                },
                width: "19%"
            }, {
                targets: 5,
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
