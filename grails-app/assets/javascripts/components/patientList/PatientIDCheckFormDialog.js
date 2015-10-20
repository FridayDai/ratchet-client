var flight = require('flight');
var WithFormDialog = require('../common/WithFormDialog');
var KEYs = require('../../constants/Keys');

function PatientIDCheckFormDialog() {
    this.attributes({
        patientIDField: '#new-patient-id'
    });

    this.options({
        title: 'NEW PATIENT',
        width: 380,
        buttons: ['Next']
    });

    this.onShow = function () {
        this.$node.removeClass('ui-hidden');
        this.show();
    };

    this.keydown = function (e) {
        if (e.which === KEYs.ENTER) {
            e.preventDefault();
            this.formEl.submit();
        }
    };

    this.onCheckExistingPatientSuccess = function (e, data) {
        this.trigger('showNewPatientDialog', data);
    };

    this.after('initialize', function () {
        this.on('formSuccess', this.onCheckExistingPatientSuccess);

        this.on('keydown', {
            patientIDField: this.keydown
        });
    });
}

module.exports = flight.component(WithFormDialog, PatientIDCheckFormDialog);
