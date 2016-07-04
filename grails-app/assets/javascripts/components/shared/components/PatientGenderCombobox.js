var flight = require('flight');
var WithComplexCombobox = require('../../common/WithComplexCombobox');
var PARAMs = require('../../../constants/Params');


function PatientGenderCombobox() {
    this.options({
        appendTo: ".container",
        source: PARAMs.HUMAN_GENDER
    });

    this.hideElementIcon = function () {
        this.$node.prev().hide();
    };

    this.onReset = function () {
        this.clear();
        this.$node.val('');
    };

    this.clear = function () {
        this.$node.removeClass('complex-combobox');
        this.hideElementIcon();
    };

    this.after('initialize', function () {
        this.on(document, this.attr.resetEvent, this.onReset);
        this.on(document, this.attr.clearEvent, this.clear);
    });
}

module.exports = flight.component(WithComplexCombobox, PatientGenderCombobox);

