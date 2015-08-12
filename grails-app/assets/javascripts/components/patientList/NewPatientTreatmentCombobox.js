var flight = require('flight');
var WithCombobox = require('../common/WithCombobox');
var URLs = require('../../constants/Urls');

function NewPatientTreatmentCombobox() {
    this.options({
        url: URLs.GET_TREATMENTS,
        requestData: function (val) {
            return {
                treatmentTitle: val,
                max: 1000
            }
        },
        itemFormat: function (data) {
            return {
                label: data.title + ' ' + data.tmpTitle,
                value: data.id,
                surgeryTime: data.surgeryTimeRequired,
                timeStamp: data.sendTimeOffset,
                surgeryDate: data.surgeryDate
            }
        },
        appendTo: ".container"
    });

    this.onSelect = function (e, ui) {
        this.trigger('newPatientTreatmentSelected', {
            surgeryDate: ui.item.surgeryDate
        });
    };

    this.onClear = function () {
        this.trigger('newPatientTreatmentClear');
    };

    this.after('initialize', function () {
        this.on('autocompleteselect', this.onSelect);
        this.on('autocompleteclear', this.onClear);
    });
}

module.exports = flight.component(WithCombobox, NewPatientTreatmentCombobox);
