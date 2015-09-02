var flight = require('flight');
var WithCombobox = require('../common/WithCombobox');
var PARAMs = require('../../constants/Params');

function NewPatientRelationshipCombobox() {
    this.options({
        appendTo: ".container",
        source: PARAMs.EMERGENCY_CONTACT_RELATIONSHIP
    });

    this.onSelect = function () {
        this.trigger('newPatientRelationshipSelected');
    };

    this.onClear = function () {
        this.trigger('newPatientRelationshipCleared');
    };

    this.after('initialize', function () {
        this.on('autocompleteselect', this.onSelect);
        this.on('autocompleteclear', this.onClear);
    });
}

module.exports = flight.component(WithCombobox, NewPatientRelationshipCombobox);
