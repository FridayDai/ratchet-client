var flight = require('flight');
var WithCombobox = require('../common/WithCombobox');
var URLs = require('../../constants/Urls');

function ToolbarTreatmentCombobox() {
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
                value: data.id
            }
        }
    });

    this.onClear = function () {
        this.select();
    };

    this.onSelect = function (e, ui) {
        this.select(ui.item.value);
    };

    this.select = function (id) {
        this.trigger('selectTreatmentForPatientTable', {
            treatmentId: id
        });
    };

    this.after('initialize', function () {
        this.on('autocompleteselect', this.onSelect);
        this.on('autocompleteclear', this.onClear);
    });
}

module.exports = flight.component(WithCombobox, ToolbarTreatmentCombobox);
