var flight = require('flight');
var WithCombobox = require('../common/WithCombobox');
var PARAMs = require('../../constants/Params');

function ToolbarEmailStatusCombobox() {
    this.options({
        appendTo: ".container",
        source: PARAMs.EMAIL_STATUS_FILTER
    });

    this.onClear = function () {
        this.select();
    };

    this.onSelect = function (e, ui) {
        this.select(ui.item.value);
    };

    this.previousVal = null;

    this.select = function (id) {
        if (_.isUndefined(id)) {
            id = null;
        }

        if (this.previousVal !== id) {
            this.previousVal = id;

            this.trigger('selectEmailStatusForPatientTable', {
                emailStatus: id
            });
        }
    };

    this.after('initialize', function () {
        this.on('autocompleteselect', this.onSelect);
        this.on('autocompleteclear', this.onClear);
    });
}

module.exports = flight.component(WithCombobox, ToolbarEmailStatusCombobox);
