require('../common/initSetup');

var flight = require('flight');
var router = require('./WithSessionRouter');
var WithChildren = require('./WithChildren');
var WithPageDialog = require('./WithPageDialog');

function WithPage() {
    flight.compose.mixin(this, [
        router,
        WithChildren,
        WithPageDialog
    ]);
}

module.exports = WithPage;
