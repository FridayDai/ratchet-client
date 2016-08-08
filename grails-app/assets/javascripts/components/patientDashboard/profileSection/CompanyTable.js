var flight = require('flight');
var WithDataTable = require('../../common/WithDataTable');
var Utility = require('../../../utils/Utility');

function CompanyTable() {
    this.options({
        paging: false,
        columnDefs: [
            {
                targets: 0,
                data: "name",
                width: "60%",
                orderable: false
            }, {
                targets: 1,
                data: 'policyNumber',
                width: "40%",
                orderable: false
            }
        ],
        ordering: false,
        language: {
            "emptyTable": "No insurance company yet."
        }
    });
}

module.exports = flight.component(WithDataTable, CompanyTable);

