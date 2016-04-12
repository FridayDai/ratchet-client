var flight = require('flight');
var WithFormDialog = require('../../common/WithFormDialog');
var PatientEmailValidation = require('../../shared/validation/PatientEmailValidation');
var Utility = require('../../../utils/Utility');

function AddEmailDialog() {
    this.attributes({
        emailFieldSelector: '#add-email-field'
    });

    this.options({
        title: 'ADDING EMAIL ADDRESS',
        width: 410,
        buttons: ['Save', 'No, next time']
    });

    this.onShow = function (e, data) {
        this.$node.removeClass('ui-hidden');

        this.patientInfo = data;

        this.show();
    };

    this.initValidation = function () {
        return PatientEmailValidation.get();
    };

    this.setExtraData = function () {
        var phoneNumber = this.patientInfo.phoneNumber.replace(/[\s\(\)-]/g, '');

        return {
            patientId: this.patientInfo.patientId,
            id: this.patientInfo.identify,
            firstName: this.patientInfo.firstName,
            lastName: this.patientInfo.lastName,
            phoneNumber: phoneNumber,
            clientId: this.patientInfo.clientId,
            birthdayValue: Utility.toBirthday(this.patientInfo.birthday)
        };
    };

    this.onAddEmailSuccess = function () {
        this.trigger('addEmailSuccess', _.assign(this.patientInfo, {
            email: this.select('emailFieldSelector').val().trim(),
            number: this.patientInfo.phoneNumber
        }));
    };

    this.after('initialize', function() {
        this.on('formSuccess', this.onAddEmailSuccess);
    });
}

module.exports = flight.component(WithFormDialog, AddEmailDialog);
