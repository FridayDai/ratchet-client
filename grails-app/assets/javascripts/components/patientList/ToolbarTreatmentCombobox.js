var flight = require('flight');
var WithMultipleSelect = require('../common/WithMultipleSelect');
var URLs = require('../../constants/Urls');

function ToolbarTreatmentMultipleSelect() {
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
                text: data.title + ' ' + data.tmpTitle,
                value: data.id
            };
        },
        placeholder: "Treatment: All",
        clearItem: true
    });

    this.attributes({
        selectDataKey: 'treatmentId',
        selectEvent: 'selectTreatmentForPatientTable',
        clearEvent: 'clearTreatmentForPatientTable'
    });
}

module.exports = flight.component(WithMultipleSelect, ToolbarTreatmentMultipleSelect);
