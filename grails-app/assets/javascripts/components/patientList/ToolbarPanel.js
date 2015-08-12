var flight = require('flight');
var TreatmentCombobox = require('./ToolbarTreatmentCombobox');
var ProviderCombobox = require('./ToolbarProviderCombobox');

TreatmentCombobox.attachTo('#treatmentForSearchPatient');
ProviderCombobox.attachTo('#selectSurgeon');

var ENTER_KEY = 13;

function ToolbarPanel() {
    this.attributes({
        patientIDNameSearchField: '#search-input'
    });

    this.OnSearchPatientIDName = function (e) {
          if (e.which === ENTER_KEY) {
              this.trigger('selectPatientIDNameForPatientTable', {
                  patientIdOrName: $(e.target).val()
              });
          }
    };

    this.after('initialize', function () {
        this.on('keydown', {
            patientIDNameSearchField: this.OnSearchPatientIDName
        })
    });
}

module.exports = flight.component(ToolbarPanel);
