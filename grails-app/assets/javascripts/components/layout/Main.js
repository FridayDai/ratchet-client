var flight = require('flight');
var WithLayout = require('../common/WithLayout');

var HeaderPanel = require('./HeaderPanel');
var FooterPanel = require('./FooterPanel');
var AssistMeFormDialog = require('../shared/components/AssistMeFormDialog');
var MaintenanceTip = require('../shared/components/MaintenanceTip');

function Main() {
    this.attributes({
        maintenanceTipSelector: '#maintenance',
        assistMeDialogSelector: '#assist-form',
        headerSelector: '#layout-header',
        footerSelector: '#footer'
    });

    this.children({
        maintenanceTipSelector: MaintenanceTip,
        headerSelector: HeaderPanel,
        footerSelector: FooterPanel
    });

    this.dialogs({
        selector: 'assistMeDialogSelector',
        event: 'showAssistMeDialog',
        dialog: AssistMeFormDialog
    });
}

flight.component(WithLayout, Main).attachTo('body');
