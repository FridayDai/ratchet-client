var flight = require('flight');
var WithCombobox = require('../common/WithCombobox');
var PARAMs = require('../../constants/Params');

function ToolbarEmailStatusCombobox() {
    this.options({
        appendTo: ".container",
        source: PARAMs.EMAIL_STATUS_FILTER
    });

    this.attributes({
        selectDataKey: 'emailStatus',
        selectEvent: 'selectEmailStatusForPatientTable'
    });
}

module.exports = flight.component(WithCombobox, ToolbarEmailStatusCombobox);
