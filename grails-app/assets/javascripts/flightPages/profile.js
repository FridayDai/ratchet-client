require('../components/layout/Main');

var flight = require('flight');
var WithPage = require('../components/common/WithPage');

var ToolbarPanel = require('../components/profile/ToolbarPanel');
var ChangePasswordFormDialog = require('../components/profile/ChangePasswordFormDialog');

function ProfilePage() {
    this.attributes({
        toolbarPanelSelector: '.middle-content',
        passwordDialogSelector: '#updatePassword'
    });

    this.children({
        toolbarPanelSelector: ToolbarPanel
    });

    this.dialogs([
        {
            selector: 'passwordDialogSelector',
            event: 'showChangePasswordFormDialog',
            dialog: ChangePasswordFormDialog
        }
    ]);
}

flight.component(WithPage,ProfilePage).attachTo('#main');
