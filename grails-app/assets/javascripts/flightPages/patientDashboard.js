require('../components/layout/Main');
require('jquery-ui-tabs');

var flight = require('flight');
var WithPage = require('../components/common/WithPage');
var STRINGs = require('../constants/Strings');
var PAGEs = require('../constants/Pages');
var Utility = require('../utils/Utility');

var PatientInfoSection = require('../components/patientDashboard/patientInfoSection/PatientInfoSection');
var TreatmentList = require('../components/patientDashboard/treatmentSection/treatmentList/TreatmentList');
var PatientLevelTabToolbar = require('../components/patientDashboard/PatientLevelTabToolbar');
var GroupSection = require('../components/patientDashboard/groupSection/GroupSection');
var TeamSection = require('../components/patientDashboard/caregiverSection/CaregiverSection');
var ReportSection = require('../components/patientDashboard/reportSection/ReportSection');
var ProfileSection = require('../components/patientDashboard/profileSection/ProfileSection');
var ActivitySection = require('../components/patientDashboard/activitySection/ActivitySection');
var EditPatientFormDialog = require('../components/patientDashboard/patientInfoSection/EditPatientFormDialog');
var AddEmailFormDialog = require('../components/patientDashboard/patientInfoSection/AddEmailFormDialog');
var AddPhoneNumberFormDialog = require('../components/patientDashboard/patientInfoSection/AddPhoneNumberFormDialog');
var DeletePatientFormDialog = require('../components/patientDashboard/patientInfoSection/DeletePatientFormDialog');
var FillQuestionnaireDialog = require('../components/patientDashboard/treatmentSection/FillQuestionnaireDialog');
var AddTreatmentFormDialog = require('../components/patientDashboard/treatmentSection/AddTreatmentFormDialog');
var DeleteTreatmentFormDialog = require('../components/patientDashboard/treatmentSection/DeleteTreatmentFormDialog');
var AddTasksDialog = require('../components/patientDashboard/treatmentSection/AddTasksDialog');
var InClinicCodeDialog = require('../components/patientDashboard/InClinicCodeDialog');
var EditEventDateFormDialog = require('../components/patientDashboard/treatmentSection/EditEventDateFormDialog');
var CaregiverFormDialog = require('../components/patientDashboard/caregiverSection/CaregiverFormDialog');
var GroupFormDialog = require('../components/patientDashboard/groupSection/GroupFormDialog');
var FillDischargeTaskDialog = require('../components/patientDashboard/treatmentSection/task/FillDischargeTaskDialog');
var FillSNFTaskDialog = require('../components/patientDashboard/treatmentSection/task/FillSNFTaskDialog');

var TYPE_SECTION_MAPPING = {
    'Treatment': TreatmentList,
    'Report': ReportSection,
    'Group': GroupSection,
    'Caregiver': TeamSection,
    'Activities': ActivitySection,
    'Profile': ProfileSection
};

var NODE_NAME_TEMP = '{0}Node';

var STATUS_MAPPING = {
    'UNVERIFIED': ['email-state-icon-unverified', 'UNVERIFIED'],
    'DECLINED': ['email-state-icon-declined', 'DECLINED']
};

function PatientDetailPage() {
    this.setPath(PAGEs.PATIENT_DETAIL);

    this.attributes({
        patientInfoSectionSelector: '.patient-detail',
        tabsContainerSelector: '#top-tabs',
        tabTitleSelector: '#top-tabs .tab-list li',
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
        addCaregiverDialogSelector: '#invite-caregiver-form',
        addGroupDialogSelector: '#add-group-form',
        fillDischargeTaskSelector: '#answer-discharge-task',
        fillSNFTaskSelector: '#answer-snf-task'
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
            event: 'showEditTreatmentDialog',
            dialog: EditEventDateFormDialog
        }, {
            selector: 'addCaregiverDialogSelector',
            event: 'showCaregiverDialog',
            dialog: CaregiverFormDialog
        }, {
            selector: 'addGroupDialogSelector',
            event: 'showAddGroupDialog',
            dialog: GroupFormDialog
        }, {
            selector: 'fillDischargeTaskSelector',
            event: 'showFillDischargeTaskDialog',
            dialog: FillDischargeTaskDialog
        }, {
            selector: 'fillSNFTaskSelector',
            event: 'showFillSNFTaskDialog',
            dialog: FillSNFTaskDialog
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
                var tabType = ui.tab.data('type');

                me.trigger('patientLevelTabBeforeLoad', {
                    type: tabType
                });

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

                var panelDOM = me[NODE_NAME_TEMP.format(tabType.toLowerCase())];

                if (panelDOM) {
                    $(panelDOM).children(':first').css('visibility', 'hidden');
                    flight.registry.findInstanceInfoByNode(panelDOM)[0].instance.teardown();
                }

                Utility.progress(true);
            },
            load: function (e, ui) {
                Utility.progress(false);

                me.attachToTabs(ui.panel, ui.tab);

                me.checkEmailStatus();
            }
        });

        this.initPatientLevelTabToolbar();
    };

    this.checkEmailStatus = function() {
        var $emailStatus = $('.email-state');
        var $emailStatusIcon = $('.email-state-icon');
        var $inviteContainer = $('.div-invite');

        //var status = $emailStatus.data('emailStatus');

        var result = $("#task-list-wrap").find("[data-is-absolute='false']");

        if($emailStatus.text() === 'NOT INVITED') {
            if(result.length > 0) {
                $emailStatusIcon.removeClass(function (index, css) {
                    return (css.match(/\bemail-state-icon-\S+/g) || []).join(' ');
                }).addClass(STATUS_MAPPING.UNVERIFIED[0]).show();

                $emailStatus.text(STATUS_MAPPING.UNVERIFIED[1]).show();
                $inviteContainer.css('display', 'inline-block');
            } else {
                $emailStatusIcon.hide();
                $emailStatus.text('NOT INVITED').show();
                $inviteContainer.css('display', 'none');
            }
        }
    };


    this.attachToTabs = function (panel, tab) {
        var type = tab.data('type');

        if (!(type in TYPE_SECTION_MAPPING)) {
            throw 'Tab type is invalid in TYPE_SECTION_MAPPING';
        }

        this[NODE_NAME_TEMP.format(type.toLowerCase())] = panel.get(0);
        TYPE_SECTION_MAPPING[type].attachTo(panel, {
            'TabElement': tab[0],
            'currentMedicalRecordId': this.currentMedicalRecordId ? this.currentMedicalRecordId : null
        });
    };

    this.refreshTab = function (event, data) {
        var index = data.index;
        this.currentMedicalRecordId = data.medicalRecordId;
        this.select('tabsContainerSelector').tabs('load', index);
    };

    this.after('initialize', function () {
        this.initTabs();
        this.on('refreshTopTab', this.refreshTab);
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
