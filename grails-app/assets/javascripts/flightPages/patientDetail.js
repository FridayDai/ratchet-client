require('../components/layout/Main');
require('jquery-ui-tabs');

var flight = require('flight');
var WithPage = require('../components/common/WithPage');
var PatientInfoSection = require('../components/patientDetail/patientInfoSection/PatientInfoSection');
var Treatment = require('../components/patientDetail/treatmentSection/Treatment');
var TreatmentPanel = require('../components/patientDetail/treatmentSection/TreatmentPanel');
var EditPatientFormDialog = require('../components/patientDetail/patientInfoSection/EditPatientFormDialog');
var AddEmailFormDialog = require('../components/patientDetail/patientInfoSection/AddEmailFormDialog');
var AddTreatmentFormDialog = require('../components/patientDetail/treatmentSection/AddTreatmentFormDialog');
var TreatmentCodeDialog = require('../components/patientDetail/treatmentSection/TreatmentCodeDialog');
var EditSurgeryDateFormDialog = require('../components/patientDetail/treatmentSection/EditSurgeryDateFormDialog');
var STRINGs = require('../constants/Strings');

var ARCHIVED_ICON_TEMPLATE = '<i class="icon-archived"></i>';

function PatientDetailPage() {
    require('../components/layout/Main');

    this.attributes({
        patientInfoSectionSelector: '.patient-detail',
        tabsContainerSelector: '#tabs',
        tabTitleSelector: '#tabs .tab-treatment li',

        editPatientDialogSelector: '#patient-form',
        addEmailDialogSelector: '#add-email-form',
        addTreatmentDialogSelector: '#treatment-form',
        treatmentCodeDialogSelector: '#generate-code-dialog',
        editSurgeryDateDialogSelector: '#treatment-time-form'
    });

    this.children({
        patientInfoSectionSelector: PatientInfoSection
    });

    this.dialogs([
        {
            selector: 'editPatientDialogSelector',
            event: 'showEditPatientFormDialog',
            dialog: EditPatientFormDialog
        }, {
            selector: 'addEmailDialogSelector',
            event: 'showAddEmailDialog',
            dialog: AddEmailFormDialog
        }, {
            selector: 'addTreatmentDialogSelector',
            event: 'showAddTreatmentDialog',
            dialog: AddTreatmentFormDialog
        }, {
            selector: 'treatmentCodeDialogSelector',
            event: 'showGenerateCodeDialog',
            dialog: TreatmentCodeDialog
        }, {
            selector: 'editSurgeryDateDialogSelector',
            event: 'showEditSurgeryDialog',
            dialog: EditSurgeryDateFormDialog
        }
    ]);

    this.initTreatmentTabs = function () {
        var me = this;

        var treatmentPanelOnce = _.once(function(selector) {
            TreatmentPanel.attachTo(selector);
        });

        this.select('tabsContainerSelector').tabs({
            cache: true,
            ajaxOptions: {cache: true},
            beforeLoad: function (event, ui) {
                if (ui.tab.data("loaded")) {
                    event.preventDefault();
                    return;
                }

                ui.jqXHR.success(function () {
                    ui.tab.data("loaded", true);
                });

                ui.jqXHR.error(function () {
                    ui.panel.html(STRINGs.TAB_LOAD_ERROR);
                });
            },
            load: function (e, ui) {
                me.select('tabsContainerSelector').show();

                treatmentPanelOnce(ui.panel.context);
                Treatment.attachTo(ui.panel);
            }
        });
    };

    this.onEditSurgeryDateSuccess = function (e, data) {
        this.updateTreatment({
            key: 'surgeryTime',
            value: data.newDate
        });
    };

    this.onArchiveTreatmentSuccess = function () {
        var activeIndex = this.select('tabsContainerSelector').tabs('option', 'active');
        var $activeTab = $(this.select('tabTitleSelector').get(activeIndex));

        this.updateTreatment({
            key: 'archived',
            value: true
        });

        $activeTab
            .addClass('archived-treatment')
            .find('a')
            .prepend(ARCHIVED_ICON_TEMPLATE);
    };

    this.updateTreatment = function (param) {
        var activeIndex = this.select('tabsContainerSelector').tabs('option', 'active');
        var $activeTab = $(this.select('tabTitleSelector').get(activeIndex));

        this.updateTreatmentUrl($activeTab, param);
        this.teardownTreatment($activeTab);

        $activeTab.data("loaded", false);

        this.select('tabsContainerSelector').tabs('load', activeIndex);
    };

    this.updateTreatmentUrl = function ($activeTab, param) {
        var oldUrl = $activeTab.find('a').attr('href');
        var regexp = new RegExp('&{0}=[^&]*'.format(param.key), 'g');

        $activeTab.find('a').attr('href', oldUrl.replace(regexp, '&{0}={1}'.format(param.key, param.value)));
    };

    this.teardownTreatment = function ($activeTab) {
        var tabPanelId = $activeTab.attr('aria-controls');

        flight.registry.findInstanceInfoByNode($('#' + tabPanelId).get(0))[0].instance.teardown();
    };

    this.after('initialize', function () {
        this.on(document, 'editSurgeryDateSuccess', this.onEditSurgeryDateSuccess);
        this.on(document, 'archiveTreatmentSuccess', this.onArchiveTreatmentSuccess);

        this.initTreatmentTabs();
    });
}

flight.component(WithPage, PatientDetailPage).attachTo('#main');
