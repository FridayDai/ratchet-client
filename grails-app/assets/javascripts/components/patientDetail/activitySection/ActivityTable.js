var flight = require('flight');
var WithDataTable = require('../../common/WithDataTable');
var URLs = require('../../../constants/Urls');
var moment = require('moment');

function ActivityTable() {
    this.options({
        order: [[2, 'desc']],
        columnDefs: [
            {
                targets: 0,
                data: "description",
                width: "70%",
                orderable: false
            }, {
                targets: 1,
                data: 'createdBy',
                width: "14%",
                orderable: false
            }, {
                targets: 2,
                data: 'lastUpdated',
                render: function (data, type, full) {
                    var dateCreated = data === undefined ? full.dateCreated : data;

                    return moment(dateCreated).tz("America/Vancouver").format('MMM D, YYYY, h:mm:ss A');
                },
                width: "16%"
            }
        ]
    });

    this.getUrl = function () {
        var data = this.$node.data();

        return URLs.GET_ACTIVITIES.format(data.patientId, data.clientId, data.medicalRecordId);
    };
}

module.exports = flight.component(WithDataTable, ActivityTable);
