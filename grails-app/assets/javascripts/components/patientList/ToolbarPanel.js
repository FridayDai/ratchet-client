var flight = require('flight');
var WithChildren = require('../common/WithChildren');
var KEYs = require('../../constants/Keys');

var TreatmentCombobox = require('./ToolbarTreatmentCombobox');
var ProviderCombobox = require('./ToolbarProviderCombobox');
var emailStatusCombobox = require('./ToolbarEmailStatusCombobox');
var treatmentStatusCombobox = require('./ToolbarTreatmentStatusCombobox');
var taskStatusCombobox = require('./ToolbarTaskStatusCombobox');
var columnFilterCombobox = require('./ToolbarColumnFilterCombobox');


function ToolbarPanel() {
    this.attributes({
        patientIDNameSearchField: '#search-input',
        patientIDNameSearchButton: '#search-btn',
        treatmentFieldSelector: '#treatmentForSearchPatient',
        providerFieldSelector: '#selectSurgeon',
        emailStatusFieldSelector: '#emailStatusFilter',
        treatmentStatusFieldSelector: '#treatmentStatusFilter',
        taskStatusFieldSelector: '#taskStatusFilter',
        columnFilterFieldSelector: '#column-status'
    });

    this.children({
        treatmentFieldSelector: TreatmentCombobox,
        providerFieldSelector: ProviderCombobox,
        emailStatusFieldSelector: emailStatusCombobox,
        treatmentStatusFieldSelector: treatmentStatusCombobox,
        taskStatusFieldSelector: taskStatusCombobox,
        columnFilterFieldSelector: columnFilterCombobox
    });

    this.getCurrentState = function () {
        return {
            treatment: this.child.treatmentFieldSelector.getDisplayItem(),
            provider: this.child.providerFieldSelector.getDisplayItem(),
            email: this.child.emailStatusFieldSelector.getDisplayItem(),
            patientIdOrName: this._patientIdOrNamePreviousVal,
            treatmentStatus: this.child.treatmentStatusFieldSelector.getDisplayItem(),
            taskStatus: this.child.taskStatusFieldSelector.getDisplayItem()
        };
    };

    this.triggerSearch = function () {
        var currentVal = this.select('patientIDNameSearchField').val();

        if (currentVal !== this._patientIdOrNamePreviousVal) {
            this._patientIdOrNamePreviousVal = currentVal;

            this.trigger('selectPatientIDNameForPatientTable', {
                patientIdOrName: currentVal
            });
        }
    };


    this._patientIdOrNamePreviousVal = '';

    this.OnSearchPatientIDName = function (e) {
        if (e.which === KEYs.ENTER) {
            this.triggerSearch();
        }
    };

    this.onLoadDataFromSessionRouter = function (e, data) {
        var toolbarData = data.toolbar;

        this._patientIdOrNamePreviousVal = toolbarData.patientIdOrName;
        this.select('patientIDNameSearchField').val(this._patientIdOrNamePreviousVal);

        this.child.treatmentFieldSelector.setDisplayItem(toolbarData.treatment);
        this.child.providerFieldSelector.setDisplayItem(toolbarData.provider);
        this.child.emailStatusFieldSelector.setDisplayItem(toolbarData.email);
        this.child.treatmentStatusFieldSelector.setDisplayItem(toolbarData.treatmentStatus);
        this.child.taskStatusFieldSelector.setDisplayItem(toolbarData.taskStatus);
    };

    this.after('initialize', function () {
        this.on(document, 'loadDataFromSessionRouter', this.onLoadDataFromSessionRouter);

        this.on('keydown', {
            patientIDNameSearchField: this.OnSearchPatientIDName
        });

        this.on('click', {
            patientIDNameSearchButton: this.triggerSearch
        });
        
    });
}

module.exports = flight.component(WithChildren, ToolbarPanel);
