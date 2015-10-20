var flight = require('flight');
var WithFormDialog = require('../../common/WithFormDialog');
var WithChildren = require('../../common/WithChildren');
var PhoneNumberValidation = require('../../shared/validation/PhoneNumberValidation');
var PatientEmailValidation = require('../../shared/validation/PatientEmailValidation');
var PatientIdentifyValidation = require('../../shared/validation/PatientIdentifyValidation');
var EmptyEmailConfirmation = require('../../shared/components/EmptyEmailConfirmation');

var PatientPhoneInputField = require('../../shared/components/PatientPhoneInputField');

function EditPatientFormDialog() {
    flight.compose.mixin(this, [
        EmptyEmailConfirmation
    ]);

    this.attributes({
        identifyFieldSelector: '#identify',
        firstNameFieldSelector: '#firstName',
        lastNameFieldSelector: '#lastName',
        phoneNumberFieldSelector: '#phone',
        emailFieldSelector: '#email'
    });

    this.children({
        phoneNumberFieldSelector: PatientPhoneInputField
    });

    this.options({
        title: 'EDIT PATIENT',
        width: 620,
        buttons: ['Save']
    });

    this.onShow = function (e, data) {
        this.$node.removeClass('ui-hidden');
        this.prepareForShow(data);
        this.show();
    };

    this.prepareForShow = function (data) {
        this.select('identifyFieldSelector').val(data.identify);
        this.select('firstNameFieldSelector').val(data.firstName);
        this.select('lastNameFieldSelector').val(data.lastName);
        this.select('phoneNumberFieldSelector').intlTelInput('setNumber', data.phoneNumber);
        this.select('emailFieldSelector').val(data.email);

        this._originalEmail = data.email;
        this._originalIdentify = data.identify;

        this.patientId = data.patientId;
        this.clientId = data.clientId;
    };

    this.originalEmailCheck = function () {
        return this._originalEmail === this.select('emailFieldSelector').val().trim();
    };

    this.originalIdentifyCheck = function () {
        return this._originalIdentify === this.select('identifyFieldSelector').val().trim();
    };

    this.initValidation = function () {
        return _.defaultsDeep(
            PatientIdentifyValidation.get(this.originalIdentifyCheck, this),
            PhoneNumberValidation.get(),
            PatientEmailValidation.get(this.originalEmailCheck, this)
        );
    };

    this.setExtraData = function () {
        var rawNumber = this.select('phoneNumberFieldSelector').val();
        var phoneNumber = rawNumber.replace(/[\s\(\)-]/g, '');

        return {
            patientId: this.patientId,
            id: this.select('identifyFieldSelector').val(),
            phoneNumber: phoneNumber,
            clientId: this.clientId
        };
    };

    this.onEditPatientSuccess = function () {
        var rawNumber = this.select('phoneNumberFieldSelector').val();
        var phoneNumber = rawNumber.replace(/[\s\(\)-]/g, '');

        this.trigger('updatePatientSuccess', {
            patientId: this.patientId,
            id: this.select('identifyFieldSelector').val(),
            firstName: this.select('firstNameFieldSelector').val(),
            lastName: this.select('lastNameFieldSelector').val(),
            email: this.select('emailFieldSelector').val(),
            number: rawNumber,
            phoneNumber: phoneNumber,
            clientId: this.clientId
        });
    };

    this.after('initialize', function () {
        this.on('formSuccess', this.onEditPatientSuccess);
    });
}

module.exports = flight.component(WithChildren, WithFormDialog, EditPatientFormDialog);
