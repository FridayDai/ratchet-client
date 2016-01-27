var flight = require('flight');
var WithCombobox = require('../../common/WithCombobox');
var URLs = require('../../../constants/Urls');

function PatientGroupCombobox() {
    this.options({
        url: URLs.GET_MY_GROUPS,
        requestData: function (val) {
            return {
                name: val,
                length: 1000
            };
        },
        itemFormat: function (data) {
            return {
                label: data.name,
                value: data.id
            };
        },
        appendTo: ".container"
    });

    this.attributes({
        selectDataKey: 'groupId'
    });
}

module.exports = flight.component(WithCombobox, PatientGroupCombobox);
