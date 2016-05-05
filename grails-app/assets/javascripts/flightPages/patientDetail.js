require('../components/layout/Main');
require('jquery-ui-tabs');

var flight = require('flight');
var WithPage = require('../components/common/WithPage');
var STRINGs = require('../constants/Strings');
var PAGEs = require('../constants/Pages');
var Utility = require('../utils/Utility');

var PatientInfoSection = require('../components/patientDetail/patientInfoSection/PatientInfoSection');
var TreatmentList = require('../components/patientDetail/treatmentSection/TreatmentList');
var PatientLevelTabToolbar = require('../components/patientDetail/PatientLevelTabToolbar');
var GroupSection = require('../components/patientDetail/groupSection/GroupSection');
var TeamSection = require('../components/patientDetail/careGiverSection/CareGiverSection');
var ReportSection = require('../components/patientDetail/reportSection/ReportSection');
var ActivitySection = require('../components/patientDetail/activitySection/ActivitySection');
var EditPatientFormDialog = require('../components/patientDetail/patientInfoSection/EditPatientFormDialog');
var AddEmailFormDialog = require('../components/patientDetail/patientInfoSection/AddEmailFormDialog');
var AddPhoneNumberFormDialog = require('../components/patientDetail/patientInfoSection/AddPhoneNumberFormDialog');
var DeletePatientFormDialog = require('../components/patientDetail/patientInfoSection/DeletePatientFormDialog');
var FillQuestionnaireDialog = require('../components/patientDetail/treatment/FillQuestionnaireDialog');
var AddTreatmentFormDialog = require('../components/patientDetail/treatmentSection/AddTreatmentFormDialog');
var DeleteTreatmentFormDialog = require('../components/patientDetail/treatment/DeleteTreatmentFormDialog');
var AddTasksDialog = require('../components/patientDetail/treatment/AddTasksDialog');
var InClinicCodeDialog = require('../components/patientDetail/InClinicCodeDialog');
var EditSurgeryDateFormDialog = require('../components/patientDetail/treatment/EditSurgeryDateFormDialog');
var CareGiverFormDialog = require('../components/patientDetail/careGiverSection/CareGiverFormDialog');
var GroupFormDialog = require('../components/patientDetail/groupSection/GroupFormDialog');

var TYPE_SECTION_MAPPING = {
    'Treatment': TreatmentList,
    'Report': ReportSection,
    'Group': GroupSection,
    'Caregiver': TeamSection,
    'Activities': ActivitySection
};

var NODE_NAME_TEMP = '{0}Node';

function PatientDetailPage() {
    this.setPath(PAGEs.PATIENT_DETAIL);

    this.attributes({
        patientInfoSectionSelector: '.patient-detail',
        tabsContainerSelector: '#top-tabs',
        tabTitleSelector: '#top-tabs .tab-treatment li',
        tabToolbarSelector: '#top-tabs .patient-tab-tool',

        editPatientDialogSelector: '#patient-form',
        addEmailDialogSelector: '#add-email-form',
        addPhoneNumberDialogSelector: '#add-phone-number-form',
        deletePatientDialogSelector: '#delete-patient-form',
        deleteTreatmentDialogSelector: '#delete-treatment-form',
        fillQuestionnaireDialogSelector: '#fill-questionnaire-dialog',
        addTreatmentDialogSelector: '#treatment-form',
        addTaskDialogSelector: '#add-tasks-dialog',
        inClinicCodeDialogSelector: '#generate-code-dialog',
        editSurgeryDateDialogSelector: '#treatment-time-form',
        addEmergencyContactDialogSelector: '#invite-emergency-contact-form',
        addGroupDialogSelector: '#add-group-form'
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
            selector: 'inClinicCodeDialogSelector',
            event: 'showGenerateCodeDialog',
            dialog: InClinicCodeDialog
        }, {
            selector: 'editSurgeryDateDialogSelector',
            event: 'showEditSurgeryDialog',
            dialog: EditSurgeryDateFormDialog
        }, {
            selector: 'addCareGiverDialogSelector',
            event: 'showCareGiverDialog',
            dialog: CareGiverFormDialog
        }, {
            selector: 'addGroupDialogSelector',
            event: 'showAddGroupDialog',
            dialog: GroupFormDialog
        }
    ]);

    this.initPatientLevelTabToolbar = function () {
        this.select('tabsContainerSelector').show();

        PatientLevelTabToolbar.attachTo(this.select('tabToolbarSelector'));
    };

    this.initTabs = function () {
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

                me.attachToTabs(ui.panel, ui.tab);
            }
        });

        this.initPatientLevelTabToolbar();
    };

    this.attachToTabs = function (panel, tab) {
        var type = tab.data('type');
        var clearTabEvent = 'clearTopTabsCache';

        if (!(type in TYPE_SECTION_MAPPING)) {
            throw 'Tab type is invalid in TYPE_SECTION_MAPPING';
        }

        this[NODE_NAME_TEMP.format(type.toLowerCase())] = panel.get(0);
        TYPE_SECTION_MAPPING[type].attachTo(panel, {
            'TabElement': tab[0],
            'type': type,
            'clearTabEvent': clearTabEvent
        });
    };

    this.after('initialize', function () {
        this.initTabs();
    });

    this.before('teardown', function () {
        var me = this;

        _.each(
            _.map(_.keys(TYPE_SECTION_MAPPING), function (key) {
                return me[NODE_NAME_TEMP.format(key.toLowerCase())];
            }),
            function (node) {
                if (node) {
                    var instances = flight.registry.findInstanceInfoByNode(node);

                    _.each(instances, function (instance) {
                        instance.instance.teardown();
                    });
                }
            });

        this.select('tabsContainerSelector').tabs('destroy');
    });
}

flight.component(WithPage, PatientDetailPage).attachTo('#main');
