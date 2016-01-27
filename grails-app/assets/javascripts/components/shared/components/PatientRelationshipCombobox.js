var flight = require('flight');
var WithCombobox = require('../../common/WithCombobox');
var PARAMs = require('../../../constants/Params');

function PatientRelationshipCombobox() {
    this.options({
        appendTo: ".container",
        source: PARAMs.EMERGENCY_CONTACT_RELATIONSHIP
    });

    this.onSelect = function () {
        if (this.attr.selectEvent) {
            this.trigger(this.attr.selectEvent);
        }
    };

    this.onClear = function () {
        if (this.attr.clearEvent) {
            this.trigger(this.attr.clearEvent);
        }
    };
}

module.exports = flight.component(WithCombobox, PatientRelationshipCombobox);
