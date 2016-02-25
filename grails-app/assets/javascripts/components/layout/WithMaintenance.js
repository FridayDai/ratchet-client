var flight = require('flight');
var WithLayout = require('../common/WithLayout');

var MaintenanceTip = require('../shared/components/MaintenanceTip');

function Main() {
    this.attributes({
        maintenanceTipSelector: '#maintenance'
    });

    this.children({
        maintenanceTipSelector: MaintenanceTip
    });
}

flight.component(WithLayout, Main).attachTo('body');
