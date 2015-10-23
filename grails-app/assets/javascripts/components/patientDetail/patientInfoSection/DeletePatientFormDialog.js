var flight = require('flight');

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
        this.trigger('deletePatientSuccess');

        this.close();
    };

    this.after('initialize', function() {
        this.on('formSuccess', this.onDeletePatientSuccess);
    });
}

module.exports = flight.component(WithFormDialog, DeletePatientFormDialog);
