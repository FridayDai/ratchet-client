var flight = require('flight');
var WithMutipleSelect = require('../common/WithMutipleSelect');
var PARAMs = require('../../constants/Params');

function ToolbarTaskStatusMultipleSelect() {
    this.options({
        appendTo: ".container",
        source: PARAMs.TASK_STATUS_FILTER,
        placeholder: "Task Status: All",
        clearItem: true
    });

    this.attributes({
        selectDataKey: 'taskStatus',
        selectEvent: 'selectTaskStatusForPatientTable',
        clearEvent: 'clearTaskStatusForPatientTable'
    });
}

module.exports = flight.component(WithMutipleSelect, ToolbarTaskStatusMultipleSelect);

