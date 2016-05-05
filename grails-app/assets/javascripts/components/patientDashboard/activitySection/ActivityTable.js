var flight = require('flight');
var WithDataTable = require('../../common/WithDataTable');
var URLs = require('../../../constants/Urls');
var Utility = require('../../../utils/Utility');

function ActivityTable() {
    this.options({
        order: [[2, 'desc']],
        columnDefs: [
            {
                targets: 0,
                data: "description",
                width: "60%",
                orderable: false
            }, {
                targets: 1,
                data: 'createdBy',
                width: "16%",
                orderable: false
            }, {
                targets: 2,
                data: 'lastUpdated',
                render: function (data, type, full) {
                    var dateCreated = data === undefined ? full.dateCreated : data;

                    return Utility.toVancouverTimeHour(dateCreated);
                },
                width: "24%"
            }
        ]
    });

    this.getUrl = function () {
        var data = this.$node.data();

        return URLs.GET_ACTIVITIES.format(data.patientId, data.clientId, data.medicalRecordId);
    };
}

module.exports = flight.component(WithDataTable, ActivityTable);
