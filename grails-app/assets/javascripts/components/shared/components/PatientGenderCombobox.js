var flight = require('flight');
var WithCombobox = require('../../common/WithComplexCombobox');
var PARAMs = require('../../../constants/Params');


function PatientGenderCombobox() {
    this.options({
        appendTo: ".container",
        source: PARAMs.HUMAN_GENDER
    });
}

module.exports = flight.component(WithCombobox, PatientGenderCombobox);

