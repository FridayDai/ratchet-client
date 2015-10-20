require('../components/layout/Main');

var flight = require('flight');
var WithPage = require('../components/common/WithPage');

var HeaderPanel = require('../components/accountDetail/HeaderPanel');
var InfoPanel = require('../components/accountDetail/InfoPanel');
var EditAccountFormDialog = require('../components/accountDetail/EditAccountFormDialog');

function AccountDetailPage() {
    this.attributes({
        headerPanelSelector: '#header-panel',
        infoPanelSelector: '.info-panel',
        editAccountDialogSelector: '#updateAccount'
    });

    this.children({
        headerPanelSelector: HeaderPanel,
        infoPanelSelector: InfoPanel
    });

    this.dialogs([
        {
            selector: 'editAccountDialogSelector',
            event: 'showEditAccountDialog',
            dialog: EditAccountFormDialog
        }
    ]);
}

flight.component(WithPage, AccountDetailPage).attachTo('#main');
