require('../components/layout/Main');

var flight = require('flight');
var WithPage = require('../components/common/WithPage');

var HeaderPanel = require('../components/accounts/HeaderPanel');
var ToolbarPanel = require('../components/accounts/ToolbarPanel');
var AccountsTable = require('../components/accounts/AccountsTable');
var NewAccountFormDialog = require('../components/accounts/NewAccountFormDialog');

function AccountsPage() {
    this.attributes({
        headerPanelSelector: '#header-panel',
        toolbarPanelSelector: '#accounts-toolbar',
        accountsTableSelector: '#accountsTable',
        newAccountDialogSelector: '#add-account-form'
    });

    this.children({
        headerPanelSelector: HeaderPanel,
        toolbarPanelSelector: ToolbarPanel,
        accountsTableSelector: AccountsTable
    });

    this.dialogs([
        {
            selector: 'newAccountDialogSelector',
            event: 'showNewAccountDialog',
            dialog: NewAccountFormDialog
        }
    ]);
}

flight.component(WithPage, AccountsPage).attachTo('#main');
