require('../common/initSetup');

var NavigationPanel = require('../navigation/NavigationPanel'),
    AssistMeFormDialog = require('../shared/AssistMeFormDialog'),
    MaintenanceTip = require('../shared/MaintenanceTip');

MaintenanceTip.attachTo('#maintenance');
NavigationPanel.attachTo('#menu');
AssistMeFormDialog.attachTo('#assist-form');
