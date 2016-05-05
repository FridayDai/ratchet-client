var flight = require('flight');
var WithCombobox = require('../common/WithCombobox');
var PARAMs = require('../../constants/Params');

function ToolbarTaskStatusCombobox() {
    this.options({
        appendTo: ".container",
        source: PARAMs.TASK_STATUS_FILTER
    });

    this.attributes({
        selectDataKey: 'taskStatus',
        selectEvent: 'selectTaskStatusForPatientTable',
        clearEvent: 'clearTaskStatusForPatientTable'
    });
}

module.exports = flight.component(WithCombobox, ToolbarTaskStatusCombobox);

