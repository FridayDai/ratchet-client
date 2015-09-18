var flight = require('flight');
var WithCombobox = require('../common/WithCombobox');
var URLs = require('../../constants/Urls');

function PatientGroupCombobox() {
    this.options({
        url: URLs.GET_MY_GROUPS,
        requestData: function (val) {
            return {
                name: val,
                length: 1000
            };
        },
        itemFormat: function (data) {
            return {
                label: data.name,
                value: data.id
            };
        },
        appendTo: ".container"
    });

    this.onSelect = function (e, ui) {
        this.trigger(this.attr.selectEvent, {
            groupId: ui.item.value
        });
    };

    this.onClear = function () {
        this.trigger(this.attr.clearEvent);
    };

    this.after('initialize', function () {
        this.on('autocompleteselect', this.onSelect);
        this.on('autocompleteclear', this.onClear);
    });
}

module.exports = flight.component(WithCombobox, PatientGroupCombobox);
