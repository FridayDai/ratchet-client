var flight = require('flight');
var WithCombobox = require('../common/WithCombobox');
var URLs = require('../../constants/Urls');

function ToolbarProviderCombobox() {
    this.options({
        url: URLs.GET_PROVIDER,
        requestData: function (val) {
            return {
                name: val,
                type: 9,
                max: 1000
            }
        },
        itemFormat: function (data) {
            return {
                label: data.firstName + " " + data.lastName,
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
        this.trigger('selectProviderForPatientTable', {
            surgeonId: id
        });
    };

    this.after('initialize', function () {
        this.on('autocompleteselect', this.onSelect);
        this.on('autocompleteclear', this.onClear);
    });
}

module.exports = flight.component(WithCombobox, ToolbarProviderCombobox);
