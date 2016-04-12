var flight = require('flight');
var WithCombobox = require('../common/WithCombobox');
var PARAMs = require('../../constants/Params');

function ToolbarTreatmentStatusCombobox() {
    this.options({
        appendTo: ".container",
        source: PARAMs.TREATMENT_STATUS_FILTER
    });

    this.attributes({
        selectDataKey: 'treatmentStatus',
        selectEvent: 'selectTreatmentStatusForPatientTable',
        clearEvent: 'clearTreatmentStatusForPatientTable'
    });
}

module.exports = flight.component(WithCombobox, ToolbarTreatmentStatusCombobox);
