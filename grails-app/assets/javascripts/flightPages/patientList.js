require('../components/layout/Main');

var flight = require('flight');
var WithPage = require('../components/common/WithPage');

var HeaderPanel = require('../components/patientList/HeaderPanel');
var ToolbarPanel = require('../components/patientList/ToolbarPanel');
var PatientTable = require('../components/patientList/PatientsTable');
var PatientIDCheckFormDialog = require('../components/patientList/PatientIDCheckFormDialog');
var NewPatientFormDialog = require('../components/patientList/NewPatientFormDialog');
var BulkImportDialog = require('../components/patientList/BulkImportDialog');

function PatientListPage() {
    require('../components/layout/Main');

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
}

flight.component(WithPage, PatientListPage).attachTo('#main');
