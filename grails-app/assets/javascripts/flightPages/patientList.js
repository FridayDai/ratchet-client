require('../components/layout/Main');

var flight = require('flight');
var WithPage = require('../components/common/WithPage');
var PAGEs = require('../constants/Pages');

var HeaderPanel = require('../components/patientList/HeaderPanel');
var ToolbarPanel = require('../components/patientList/ToolbarPanel');
var PatientTable = require('../components/patientList/PatientsTable');
var PatientIDCheckFormDialog = require('../components/patientList/PatientIDCheckFormDialog');
var NewPatientFormDialog = require('../components/patientList/NewPatientFormDialog');
var BulkImportDialog = require('../components/patientList/BulkImportDialog');

function PatientListPage() {
    this.setPath(PAGEs.PATIENT_LIST);

    this.attributes({
        headerPanelSelector: '#header-panel',
        toolbarPanelSelector: '#patients-toolbar',
        patientTableSelector: '#patientsTable',
        patientIDCheckDialogSelector: '#patient-id-form',
        newPatientDialogSelector: '#table-form',
        bulkImportDialogSelector: '#bulk-import-form'
    });

    this.children({
        headerPanelSelector: HeaderPanel,
        toolbarPanelSelector: ToolbarPanel,
        patientTableSelector: PatientTable
    });

    this.dialogs([
        {
            selector: 'patientIDCheckDialogSelector',
            event: 'showPatientCheckIDDialog',
            dialog: PatientIDCheckFormDialog
        }, {
            selector: 'newPatientDialogSelector',
            event: 'showNewPatientDialog',
            dialog: NewPatientFormDialog
        }, {
            selector: 'bulkImportDialogSelector',
            event: 'showBulkImportDialog',
            dialog: BulkImportDialog
        }
    ]);

    this.onBeforeUnload = function () {
        this.saveParams2Router(PAGEs.PATIENT_LIST, {
            patientsTable: this.child.patientTableSelector.getCurrentState(),
            toolbar: this.child.toolbarPanelSelector.getCurrentState()
        });
    };

    this.recoveryFromRouter = function () {
        if (this.getLastPath() === PAGEs.PATIENT_DETAIL) {
            this.trigger('loadDataFromSessionRouter', this.getParamsFromRoute(PAGEs.PATIENT_LIST));
        }
    };

    this.after('initialize', function () {
        $(window).on('beforeunload', _.bind(this.onBeforeUnload, this));

        this.recoveryFromRouter();
    });
}

flight.component(WithPage, PatientListPage).attachTo('#main');
