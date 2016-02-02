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
            };
        },
        itemFormat: function (data) {
            return {
                label: data.firstName + " " + data.lastName,
                value: data.id
            };
        }
    });

    this.attributes({
        selectDataKey: 'surgeonId',
        selectEvent: 'selectProviderForPatientTable',
        clearEvent: 'clearProviderForPatientTable'
    });
}

module.exports = flight.component(WithCombobox, ToolbarProviderCombobox);
