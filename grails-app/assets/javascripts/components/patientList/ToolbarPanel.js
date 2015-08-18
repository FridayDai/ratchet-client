var flight = require('flight');
var WithChildren = require('../common/WithChildren');
var KEYs = require('../../constants/Keys');

var TreatmentCombobox = require('./ToolbarTreatmentCombobox');
var ProviderCombobox = require('./ToolbarProviderCombobox');

function ToolbarPanel() {
    this.attributes({
        patientIDNameSearchField: '#search-input',
        patientIDNameSearchButton: '#search-btn',
        treatmentFieldSelector: '#treatmentForSearchPatient',
        providerFieldSelector: '#selectSurgeon'
    });

    this.children({
        treatmentFieldSelector: TreatmentCombobox,
        providerFieldSelector: ProviderCombobox
    });

    this.triggerSearch = function () {
        this.trigger('selectPatientIDNameForPatientTable', {
            patientIdOrName: this.select('patientIDNameSearchField').val()
        });
    };

    this.OnSearchPatientIDName = function () {
        if (e.which === KEYs.ENTER) {
            this.triggerSearch();
        }
    };

    this.after('initialize', function () {
        this.on('keydown', {
            patientIDNameSearchField: this.OnSearchPatientIDName
        });

        this.on('click', {
            patientIDNameSearchButton: this.triggerSearch
        })
    });
}

module.exports = flight.component(WithChildren, ToolbarPanel);
