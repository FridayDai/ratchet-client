require('../components/layout/Main');
require('jquery-ui-tabs');

var flight = require('flight');
var WithPage = require('../components/common/WithPage');
var STRINGs = require('../constants/Strings');
var PAGEs = require('../constants/Pages');
var Utility = require('../utils/Utility');

var PatientInfoSection = require('../components/patientDetail/patientInfoSection/PatientInfoSection');
var Treatment = require('../components/patientDetail/treatmentSection/Treatment');
var TreatmentPanel = require('../components/patientDetail/treatmentSection/TreatmentPanel');
var EditPatientFormDialog = require('../components/patientDetail/patientInfoSection/EditPatientFormDialog');
var AddEmailFormDialog = require('../components/patientDetail/patientInfoSection/AddEmailFormDialog');
var AddPhoneNumberFormDialog = require('../components/patientDetail/patientInfoSection/AddPhoneNumberFormDialog');
var DeletePatientFormDialog = require('../components/patientDetail/patientInfoSection/DeletePatientFormDialog');
var FillQuestionnaireDialog = require('../components/patientDetail/taskSection/FillQuestionnaireDialog');
var AddTreatmentFormDialog = require('../components/patientDetail/treatmentSection/AddTreatmentFormDialog');
var DeleteTreatmentFormDialog = require('../components/patientDetail/treatmentSection/DeleteTreatmentFormDialog');
var AddTasksDialog = require('../components/patientDetail/treatmentSection/AddTasksDialog');
var TreatmentCodeDialog = require('../components/patientDetail/treatmentSection/TreatmentCodeDialog');
var EditSurgeryDateFormDialog = require('../components/patientDetail/treatmentSection/EditSurgeryDateFormDialog');
var EditGroupProviderFormDialog = require('../components/patientDetail/teamSection/EditGroupProviderFormDialog');
var EmergencyContactFormDialog = require('../components/patientDetail/teamSection/EmergencyContactFormDialog');

var ARCHIVED_ICON_TEMPLATE = '<i class="icon-archived"></i>';

function PatientDetailPage() {
    this.setPath(PAGEs.PATIENT_DETAIL);

    this.attributes({
        patientInfoSectionSelector: '.patient-detail',
        tabsContainerSelector: '#tabs',
        tabTitleSelector: '#tabs .tab-treatment li',

        editPatientDialogSelector: '#patient-form',
        addEmailDialogSelector: '#add-email-form',
        addPhoneNumberDialogSelector: '#add-phone-number-form',
        deletePatientDialogSelector: '#delete-patient-form',
        deleteTreatmentDialogSelector: '#delete-treatment-form',
        fillQuestionnaireDialogSelector: '#fill-questionnaire-dialog',
        addTreatmentDialogSelector: '#treatment-form',
        addTaskDialogSelector: '#add-tasks-dialog',
        treatmentCodeDialogSelector: '#generate-code-dialog',
        editSurgeryDateDialogSelector: '#treatment-time-form',
        editGroupProviderDialogSelector: '#edit-group-provider-form',
        addEmergencyContactDialogSelector: '#invite-emergency-contact-form'
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
            selector: 'addPhoneNumberDialogSelector',
            event: 'showAddPhoneNumberDialog',
            dialog: AddPhoneNumberFormDialog
        }, {
            selector: 'deletePatientDialogSelector',
            event: 'showDeletePatientDialog',
            dialog: DeletePatientFormDialog
        }, {
            selector: 'fillQuestionnaireDialogSelector',
            event: 'showFillQuestionnaireDialog',
            dialog: FillQuestionnaireDialog
        }, {
            selector: 'addTreatmentDialogSelector',
            event: 'showAddTreatmentDialog',
            dialog: AddTreatmentFormDialog
        }, {
            selector: 'deleteTreatmentDialogSelector',
            event: 'showDeleteTreatmentDialog',
            dialog: DeleteTreatmentFormDialog
        }, {
            selector: 'addTaskDialogSelector',
            event: 'showAddTasksDialog',
            dialog: AddTasksDialog
        }, {
            selector: 'treatmentCodeDialogSelector',
            event: 'showGenerateCodeDialog',
            dialog: TreatmentCodeDialog
        }, {
            selector: 'editSurgeryDateDialogSelector',
            event: 'showEditSurgeryDialog',
            dialog: EditSurgeryDateFormDialog
        }, {
            selector: 'editGroupProviderDialogSelector',
            event: 'showEditGroupProviderDialog',
            dialog: EditGroupProviderFormDialog
        }, {
            selector: 'addEmergencyContactDialogSelector',
            event: 'showEmergencyContactDialog',
            dialog: EmergencyContactFormDialog
        }
    ]);

    this.initTreatmentSection = function () {
        var me = this;

        this.select('tabsContainerSelector').show();

        _.once(function() {
            TreatmentPanel.attachTo(me.select('tabsContainerSelector'));
        })();
    };

    this.initTreatmentTabs = function () {
        var me = this;

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

                Utility.progress(true);
            },
            load: function (e, ui) {
                Utility.progress(false);

                Treatment.attachTo(ui.panel);

                me.initTreatmentSection();
            }
        });

        if (!this.select('tabTitleSelector').length) {
            this.initTreatmentSection();
        }
    };

    this.onAddTasksSuccess = function () {
        this.updateTreatment();
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

        if (param) {
            var regexp = new RegExp('&{0}=[^&]*'.format(param.key), 'g');

            $activeTab.find('a').attr('href', oldUrl.replace(regexp, '&{0}={1}'.format(param.key, param.value)));
        }
    };

    this.onDeleteTreatmentSuccess = function () {
        var activeIndex = this.select('tabsContainerSelector').tabs('option', 'active');
        var $activeTab = $(this.select('tabTitleSelector').get(activeIndex));

        this.teardownTreatment($activeTab);

        var activeTabPanelId = $activeTab.attr('aria-controls');
        $activeTab.remove();
        $('#' + activeTabPanelId).remove();
        this.select('tabsContainerSelector').tabs('refresh');

        if (this.select('tabTitleSelector').length === 0) {
            this.trigger('refreshForNoMoreTreatmentTab');
        }
    };

    this.teardownTreatment = function ($activeTab) {
        var tabPanelId = $activeTab.attr('aria-controls');

        flight.registry.findInstanceInfoByNode($('#' + tabPanelId).get(0))[0].instance.teardown();
    };

    this.after('initialize', function () {
        this.on(document, 'addTasksSuccess', this.onAddTasksSuccess);
        this.on(document, 'editSurgeryDateSuccess', this.onEditSurgeryDateSuccess);
        this.on(document, 'archiveTreatmentSuccess', this.onArchiveTreatmentSuccess);
        this.on(document, 'deleteTreatmentSuccess', this.onDeleteTreatmentSuccess);

        this.initTreatmentTabs();
    });
}

flight.component(WithPage, PatientDetailPage).attachTo('#main');
