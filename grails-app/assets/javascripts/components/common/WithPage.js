require('../common/initSetup');

var flight = require('flight');
var WithChildren = require('./WithChildren');
var WithPageDialog = require('./WithPageDialog');

function WithPage() {
    flight.compose.mixin(this, [
        WithChildren,
        WithPageDialog
    ]);

    this.checkIfBackButton = function () {
        var $flag = $('#back-button-flag');

        if ($flag.val() === 'yes') {
            this.trigger('pageInBackButtonStatus');
        } else {
            $flag.val('yes');
        }
    };

    this.after('initialize', function () {
        this.checkIfBackButton();
    });
}

module.exports = WithPage;
