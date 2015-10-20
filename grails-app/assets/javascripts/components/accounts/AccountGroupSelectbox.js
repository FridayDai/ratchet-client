var flight = require('flight');
var WithSelectbox = require('../common/WithSelectbox');
var URLs = require('../../constants/Urls');

function AccountGroupSelectbox() {
    this.options({
        url: URLs.GET_ALL_GROUPS
    });

    this.onClear = function () {
        this.clear();
    };

    this.after('initialize', function () {
        this.on(document, this.attr.clearEvent, this.onClear);
    });
}

module.exports = flight.component(WithSelectbox, AccountGroupSelectbox);
