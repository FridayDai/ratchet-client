var flight = require('flight');
var WithMultipleSelect = require('../common/WithMultipleSelect');
var PARAMs = require('../../constants/Params');

function ToolbarTreatmentStatusMultipleSelect() {
    this.options({
        appendTo: ".container",
        source: PARAMs.TREATMENT_STATUS_FILTER,
        placeholder: "Treatment Status: All",
        single: true
    });

    this.attributes({
        selectDataKey: 'treatmentStatus',
        selectEvent: 'selectTreatmentStatusForPatientTable',
        clearEvent: 'clearTreatmentStatusForPatientTable'
    });
}

module.exports = flight.component(WithMultipleSelect, ToolbarTreatmentStatusMultipleSelect);
