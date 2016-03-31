var flight = require('flight');
var WithCombobox = require('../common/WithCombobox');
var URLs = require('../../constants/Urls');

function ToolbarTreatmentCombobox() {
    this.options({
        url: URLs.GET_TREATMENTS,
        requestData: function (val) {
            return {
                treatmentTitle: val,
                showAll: true,
                max: 1000
            };
        },
        itemFormat: function (data) {
            return {
                label: data.title + ' ' + data.tmpTitle,
                value: data.id
            };
        }
    });

    this.attributes({
        selectDataKey: 'treatmentId',
        selectEvent: 'selectTreatmentForPatientTable',
        clearEvent: 'clearTreatmentForPatientTable'
    });
}

module.exports = flight.component(WithCombobox, ToolbarTreatmentCombobox);
