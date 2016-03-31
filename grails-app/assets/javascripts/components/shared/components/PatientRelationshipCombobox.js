var flight = require('flight');
var WithCombobox = require('../../common/WithCombobox');
var PARAMs = require('../../../constants/Params');

function PatientRelationshipCombobox() {
    this.options({
        appendTo: ".container",
        source: PARAMs.EMERGENCY_CONTACT_RELATIONSHIP
    });
}

module.exports = flight.component(WithCombobox, PatientRelationshipCombobox);
