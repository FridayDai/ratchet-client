var flight = require('flight');
var WithDataTable = require('../common/WithDataTable');
var moment = require('moment');

function BulkImportResultTable() {
    this.options({
        paging: false,
        searching: false,
        serverSide: false,
        ajax: false,
        columnDefs: [
            {
                "targets": 0,
                "render": function (data, type, full) {
                    return data === undefined ? full.patientId : data;
                },
                width: "90px"
            }, {
                "targets": 1,
                "render": function (data, type, full) {
                    return data === undefined ? (full.firstName + " " + full.lastName) : data;
                },
                width: "120px"
            }, {
                "targets": 2,
                "render": function (data, type, full) {
                    return data === undefined ? full.email : data;
                },
                width: "260px"
            }, {
                "targets": 3,
                "render": function (data, type, full) {
                    return data === undefined ? full.phone : data;
                },
                width: "120px"
            }, {
                "targets": 4,
                "render": function (data, type, full) {
                    return data === undefined ? full.groupName : data;
                },
                width: "200px"
            }, {
                "targets": 5,
                "render": function (data, type, full) {
                    return data === undefined ? full.providerName : data;
                },
                width: "150px"
            }, {
                "targets": 6,
                "render": function (data, type, full) {
                    return data === undefined ? full.treatmentName : data;
                },
                width: "150px"
            }, {
                "targets": 7,
                "render": function (data, type, full) {
                    var surgeryTime = data === undefined ? full.surgeryTime : data;

                    return moment(surgeryTime, 'D-MMM-YY').format('MMM D, YYYY');
                },
                width: "170px"
            }, {
                "targets": 8,
                "render": function (data, type, full) {
                    var emergencyName;
                    emergencyName = data === undefined ? ((full.emergencyFirstName ? full.emergencyFirstName : '') +
                    " " + (full.emergencyLastName ? full.emergencyLastName : '')) : data;
                    return emergencyName;
                },
                width: "180px"
            }, {
                "targets": 9,
                "render": function (data, type, full) {
                    return data === undefined ? full.relationshipName : data;
                },
                width: "100px"
            }, {
                "targets": 10,
                "render": function (data, type, full) {
                    return data === undefined ? full.emergencyEmail : data;
                },
                width: "260px"
            }
        ]
    });

    this.onSetData = function (e, data) {
        data = data.data;

        if (!_.isArray(data)) {
            data = [data];
        }

        this.tableEl.rows.add(data).draw();
    };

    this.onDialogReset = function () {
        this.tableEl
            .order([0, 'desc'])
            .clear()
            .draw();
    };

    this.after('initialize', function () {
        this.on(document, 'setDataForBulkImportResultTable', this.onSetData);
        this.on(document, 'bulkImportDialogReset', this.onDialogReset);
    });
}

module.exports = flight.component(WithDataTable, BulkImportResultTable);
