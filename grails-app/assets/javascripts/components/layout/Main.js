var flight = require('flight');
var WithPage = require('../common/WithPage');

var NavigationPanel = require('../navigation/NavigationPanel');
var AssistMeFormDialog = require('../shared/components/AssistMeFormDialog');
var MaintenanceTip = require('../shared/components/MaintenanceTip');

function Main() {
    this.attributes({
        maintenanceTipSelector: '#maintenance',
        navigationPanelSelector: '#menu',
        assistMeDialogSelector: '#assist-form'
    });

    this.children({
        maintenanceTipSelector: MaintenanceTip,
        navigationPanelSelector: NavigationPanel
    });

    this.dialogs({
        selector: 'assistMeDialogSelector',
        event: 'showAssistMeDialog',
        dialog: AssistMeFormDialog
    });
}

flight.component(WithPage, Main).attachTo('body');
