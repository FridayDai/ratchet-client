var flight = require('flight');
var WithMultipleSelect = require('../common/WithMultipleSelect');
var PARAMs = require('../../constants/Params');

function ToolbarEmailStatusMutipleSelect() {
    this.options({
        appendTo: ".container",
        source: PARAMs.EMAIL_STATUS_FILTER,
        placeholder: "Email status: All",
        clearItem: true
    });

    this.attributes({
        selectDataKey: 'emailStatus',
        selectEvent: 'selectEmailStatusForPatientTable',
        clearEvent: 'clearEmailStatusForPatientTable'
    });
}

module.exports = flight.component(WithMultipleSelect, ToolbarEmailStatusMutipleSelect);
