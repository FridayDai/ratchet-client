var flight = require('flight');
var WithChildren = require('../../common/WithChildren');

var ActivityTable = require('./ActivityTable');

function ActivitySection() {

    this.attributes({
        contentSelector: '.content',
        activityTableSelector: '#activity-table'
    });

    this.children({
        activityTableSelector: ActivityTable
    });
}

module.exports = flight.component(WithChildren, ActivitySection);
