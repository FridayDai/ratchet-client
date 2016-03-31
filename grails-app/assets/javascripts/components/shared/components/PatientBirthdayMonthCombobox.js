var flight = require('flight');
var WithCombobox = require('../../common/WithCombobox');
var PARAMs = require('../../../constants/Params');

function PatientBirthdayMonthCombobox() {
    this.options({
        appendTo: ".container",
        source: PARAMs.BIRTHDAY_MONTH,
        hideNoResult: true
    });
}

module.exports = flight.component(WithCombobox, PatientBirthdayMonthCombobox);
