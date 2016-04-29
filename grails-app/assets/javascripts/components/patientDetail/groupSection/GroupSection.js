var flight = require('flight');
var WithChildren = require('../../common/WithChildren');

function GroupSection() {
    // flight.compose.mixin(this, [
    //     CheckArchivedWindowSize
    // ]);
    //
    // this.attributes({
    //     contentSelector: '.content',
    //
    //     activityTableSelector: '.activityTable'
    // });
    //
    // this.children({
    //     activityTableSelector: ActivityTable
    // });
}

module.exports = flight.component(WithChildren, GroupSection);
