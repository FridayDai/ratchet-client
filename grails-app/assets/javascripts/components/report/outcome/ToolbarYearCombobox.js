var flight = require('flight');
var WithCombobox = require('../../common/WithCombobox');
var moment = require('moment');

var YEAR_ARRAY = [];

for (var i = 2015; i <= moment().year(); i++) {
    YEAR_ARRAY.push(i + '');
}

function ToolbarYearCombobox() {
    this.options({
        appendTo: ".container",
        source: YEAR_ARRAY
    });

    this.attributes({
        selectDataKey: 'year',
        selectEvent: 'selectYearForReportOverview'
    });
}

module.exports = flight.component(WithCombobox, ToolbarYearCombobox);
