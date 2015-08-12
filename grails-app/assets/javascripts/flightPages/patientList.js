require('../components/layout/Main');

var HeaderPanel = require('../components/patientList/HeaderPanel');
var ToolbarPanel = require('../components/patientList/ToolbarPanel');
var PatientTable = require('../components/patientList/PatientsTable');
var PatientIDCheckFormDialog = require('../components/patientList/PatientIDCheckFormDialog');
var NewPatientFormDialog = require('../components/patientList/NewPatientFormDialog');

HeaderPanel.attachTo('#header-panel');
ToolbarPanel.attachTo('#patients-toolbar');
PatientTable.attachTo('#patientsTable');
PatientIDCheckFormDialog.attachTo('#patient-id-form');
NewPatientFormDialog.attachTo('#table-form');
