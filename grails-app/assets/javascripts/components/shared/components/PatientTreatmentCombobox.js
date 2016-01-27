var flight = require('flight');
var WithCombobox = require('../../common/WithCombobox');
var URLs = require('../../../constants/Urls');

function PatientTreatmentCombobox() {
    this.options({
        url: URLs.GET_TREATMENTS,
        requestData: function (val) {
            return {
                treatmentTitle: val,
                max: 1000
            };
        },
        itemFormat: function (data) {
            return {
                label: data.title + ' ' + data.tmpTitle,
                value: data.id,
                surgeryDateRequired: data.surgeryTimeRequired,
                timeStamp: data.sendTimeOffset,
                surgeryDate: data.surgeryDate
            };
        },
        appendTo: ".container"
    });

    this.onSelect = function (e, ui) {
        this.trigger(this.attr.selectEvent, {
            surgeryDate: ui.item.surgeryDate,
            surgeryDateRequired: ui.item.surgeryDateRequired
        });
    };

    this.onClear = function () {
        this.trigger(this.attr.clearEvent);
    };
}

module.exports = flight.component(WithCombobox, PatientTreatmentCombobox);
