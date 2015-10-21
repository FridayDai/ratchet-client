require('../components/layout/Main');

var flight = require('flight');
var WithPage = require('../components/common/WithPage');

var HeaderPanel = require('../components/groups/HeaderPanel');
var ToolbarPanel = require('../components/groups/ToolbarPanel');
var GroupsTable = require('../components/groups/GroupsTable');

var GroupFormDialog = require('../components/groups/GroupFormDialog');

function GroupsPage() {
    this.attributes({
        headerPanelSelector: '#header-panel',
        toolbarPanelSelector: '#groups-toolbar',
        groupsTableSelector: '#groupsTable',
        groupDialogSelector: '#group-form'
    });

    this.children({
        headerPanelSelector: HeaderPanel,
        toolbarPanelSelector: ToolbarPanel,
        groupsTableSelector: GroupsTable
    });

    this.dialogs([
        {
            selector: 'groupDialogSelector',
            event: 'showGroupFormDialog',
            dialog: GroupFormDialog
        }
    ]);
}

flight.component(WithPage,GroupsPage).attachTo('#main');
