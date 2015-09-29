var flight = require('flight');
var WithChildren = require('./WithChildren');
var WithPageDialog = require('./WithPageDialog');

function WithLayout() {
    flight.compose.mixin(this, [
        WithChildren,
        WithPageDialog
    ]);
}

module.exports = WithLayout;
