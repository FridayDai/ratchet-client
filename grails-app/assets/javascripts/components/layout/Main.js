var flight = require('flight');
var WithLayout = require('../common/WithLayout');

var NavigationPanel = require('../navigation/NavigationPanel');
var HeaderPanel = require('./HeaderPanel');
var AssistMeFormDialog = require('../shared/components/AssistMeFormDialog');
var MaintenanceTip = require('../shared/components/MaintenanceTip');

function Main() {
    this.attributes({
        maintenanceTipSelector: '#maintenance',
        navigationPanelSelector: '#menu',
        assistMeDialogSelector: '#assist-form',
        headerSelector: '#layout-header'
    });

    this.children({
        maintenanceTipSelector: MaintenanceTip,
        navigationPanelSelector: NavigationPanel,
        headerSelector: HeaderPanel
    });

    this.dialogs({
        selector: 'assistMeDialogSelector',
        event: 'showAssistMeDialog',
        dialog: AssistMeFormDialog
    });
}

flight.component(WithLayout, Main).attachTo('body');
