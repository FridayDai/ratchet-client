var flight = require('flight');
var WithCombobox = require('../common/WithCombobox');

var DATA = [
    {label: "Spouse", value: 1},
    {label: "Parent", value: 2},
    {label: "Child",  value: 3},
    {label: "Friend", value: 4},
    {label: "Other",  value: 5}
];

function NewPatientRelationshipCombobox() {
    this.options({
        appendTo: ".container",
        source: DATA
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
