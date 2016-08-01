var flight = require('flight');
var WithMutipleSelect = require('../common/WithMutipleSelect');
var URLs = require('../../constants/Urls');

function ToolbarProviderMutipleSelect() {
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
                text: data.firstName + " " + data.lastName,
                value: data.id
            };
        },
        placeholder: "Provider: All",
        clearItem: true
    });

    this.attributes({
        selectDataKey: 'surgeonId',
        selectEvent: 'selectProviderForPatientTable',
        clearEvent: 'clearProviderForPatientTable'
    });
}

module.exports = flight.component(WithMutipleSelect, ToolbarProviderMutipleSelect);
