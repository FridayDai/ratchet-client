var flight = require('flight');
var WithCombobox = require('../common/WithCombobox');
var PARAMs = require('../../constants/Params');

function ToolbarAttentionStatusCombobox() {
    this.options({
        appendTo: ".container",
        source: PARAMs.ATTENTION_STATUS_FILTER
    });

    this.attributes({
        selectDataKey: 'attentionStatus',
        selectEvent: 'selectAttentionStatusForPatientTable',
        clearEvent: 'clearAttentionStatusForPatientTable'
    });
}

module.exports = flight.component(WithCombobox, ToolbarAttentionStatusCombobox);

