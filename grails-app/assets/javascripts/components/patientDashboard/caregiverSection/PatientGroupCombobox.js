var flight = require('flight');
var WithCombobox = require('../../common/WithCombobox');
var URLs = require('../../../constants/Urls');

function PatientGroupCombobox() {
    this.options({
        url: URLs.GET_MY_GROUPS,
        requestData: function (val) {
            return {
                name: val,
                treatmentId: this.getTreatmentId(),
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

    this.setTreatmentId = function (treatmentId) {
        this.__treatmentId = treatmentId;
    };

    this.getTreatmentId = function () {
        return this.__treatmentId;
    };
}

module.exports = flight.component(WithCombobox, PatientGroupCombobox);
