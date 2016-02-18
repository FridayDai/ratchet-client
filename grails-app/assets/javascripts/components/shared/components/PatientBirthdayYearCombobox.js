var flight = require('flight');
var WithCombobox = require('../../common/WithCombobox');
var moment = require('moment');
var currentYear = moment().year();

var BIRTHDAY_YEAR = [];

for (var i = 0; i <= 150; i++) {
    BIRTHDAY_YEAR.push({label: currentYear - i, value: currentYear - i});
}

function PatientBirthdayYearCombobox() {
    this.options({
        appendTo: ".container",
        source: BIRTHDAY_YEAR,
        hideNoResult: true
    });
}

module.exports = flight.component(WithCombobox, PatientBirthdayYearCombobox);
