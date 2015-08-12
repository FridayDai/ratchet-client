var flight = require('flight');
var WithFormDialog = require('../common/WithFormDialog');

var ENTER_KEY = 13;

function PatientIDCheckFormDialog() {
    this.attributes({
        formSelector: '.',
        patientIDField: '#new-patient-id'
    });

    this.options({
        title: 'NEW PATIENT',
        height: 200,
        width: 380,
        buttons: ['Next']
    });

    this.onShow = function () {
        this.$node.removeClass('ui-hidden');
        this.dialogEl.dialog('open');
    };

    this.keydown = function (e) {
        if (e.which === ENTER_KEY) {
            e.preventDefault();
            this.formEl.submit();
        }
    };

    this.onCheckExistingPatientSuccess = function (e, data) {
        this.trigger('showNewPatientDialog', data);
    };

    this.after('initialize', function () {
        this.on(document, 'showPatientCheckIDDialog', this.onShow);
        this.on('formSuccess', this.onCheckExistingPatientSuccess);

        this.on('keydown', {
            patientIDField: this.keydown
        });
    });
}

module.exports = flight.component(WithFormDialog, PatientIDCheckFormDialog);
