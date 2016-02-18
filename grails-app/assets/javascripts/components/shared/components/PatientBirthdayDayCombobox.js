var flight = require('flight');
var WithCombobox = require('../../common/WithCombobox');

var BIRTHDAY_DAY = [];

for (var i = 1; i <= 31; i++) {
    BIRTHDAY_DAY.push({label: i, value: i});
}

function PatientBirthdayDayCombobox() {
    this.options({
        appendTo: ".container",
        source: BIRTHDAY_DAY,
        hideNoResult: true
    });
}

module.exports = flight.component(WithCombobox, PatientBirthdayDayCombobox);
