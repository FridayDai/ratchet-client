var flight = require('flight');
var WithFormDialog = require('../common/WithFormDialog');
var WithChildren = require('../common/WithChildren');
var URLs = require('../../constants/Urls');
var Utility = require('../../utils/Utility');

var AccountEmailValidation = require('../shared/validation/AccountEmailValidation');

function NewAccountFormDialog() {
    this.attributes({

    });

    this.options({
        title: 'NEW ACCOUNT',
        width: 620,
        buttons: ['Save']
    });

    this.initValidation = function () {
        return AccountEmailValidation.get();
    };

    this.onShow = function (e, data) {
        this.$node.removeClass('ui-hidden');
        //this.prepareToShow(data);
        this.show();
    };

    this.prepareToShow = function (data) {
        if (data.check !== 'false') {
            this.setPatientExisting(data);
            this.select('patientIdStaticSelector').text(data.patientId);
        } else {
            this.setPatientNotExisting();
            this.select('patientIdStaticSelector').text(data.identify);
        }
    };

    this.onClose = function () {
        this.trigger('newPatientReset');
    };

    this.onAddAccountSuccess = function (e, data) {
        //window.location.href = URLs.PAGE_PATIENT_DETAIL.format(data.id);
    };

    this.after('initialize', function () {
        this.on('dialogclose', this.onClose);
        this.on('formSuccess', this.onAddAccountSuccess);
    });
}

module.exports = flight.component(
    WithChildren,
    WithFormDialog,
    NewAccountFormDialog
);
