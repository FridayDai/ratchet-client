var flight = require('flight');

var WithFormDialog = require('../../common/WithFormDialog');
var DeleteFieldValidation = require('../../shared/validation/DeleteFieldValidation');
var URLs = require('../../../constants/Urls');

function DeletePatientFormDialog() {
    this.attributes({
        deleteFieldSelector: '#delete-treatment-field'
    });

    this.options({
        title: 'DELETE TREATMENT',
        width: 420,
        buttons: ['Delete', 'Cancel']
    });

    this.onShow = function (e, data) {
        this.$node.removeClass('ui-hidden');

        this.formEl.attr('action', URLs.DELETE_TREATMENT.format(data.ids.patientId, data.ids.medicalRecordId));

        this.show();
    };

    this.initValidation = function () {
        return DeleteFieldValidation.get();
    };

    this.onDeleteTreatmentSuccess = function () {
        this.trigger('deleteTreatmentSuccess');

        this.close();
    };

    this.after('initialize', function() {
        this.on('formSuccess', this.onDeleteTreatmentSuccess);
    });
}

module.exports = flight.component(WithFormDialog, DeletePatientFormDialog);
