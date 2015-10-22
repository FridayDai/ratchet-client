var flight = require('flight');

var URLs = require('../../../constants/Urls');

var WithFormDialog = require('../../common/WithFormDialog');
var DeleteFieldValidation = require('../../shared/validation/DeleteFieldValidation');

function DeletePatientFormDialog() {
    this.attributes({
        deleteFieldSelector: '#delete-patient-field'
    });

    this.options({
        title: 'DELETE PATIENT',
        width: 420,
        buttons: ['Delete', 'Cancel']
    });

    this.onShow = function (e, data) {
        this.$node.removeClass('ui-hidden');

        this.patientInfo = data;

        this.show();
    };

    this.initValidation = function () {
        return DeleteFieldValidation.get();
    };

    this.onDeletePatientSuccess = function () {
        window.location.href = URLs.PAGE_PATIENTS;
    };

    this.after('initialize', function() {
        this.on('formSuccess', this.onDeletePatientSuccess);
    });
}

module.exports = flight.component(WithFormDialog, DeletePatientFormDialog);
