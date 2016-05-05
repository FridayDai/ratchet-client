var flight = require('flight');
var WithChildren = require('../../common/WithChildren');

var ActivityTable = require('./ActivityTable');
var CheckArchivedWindowSize = require('../../shared/functional/CheckArchivedWindowSize');

function ActivitySection() {
    flight.compose.mixin(this, [
        CheckArchivedWindowSize
    ]);

    this.attributes({
        contentSelector: '.content',

        activityTableSelector: '.activityTable'
    });

    this.children({
        activityTableSelector: ActivityTable
    });
}

module.exports = flight.component(WithChildren, ActivitySection);
