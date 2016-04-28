var flight = require('flight');
var WithFormDialog = require('../../common/WithFormDialog');
var PatientPhoneInputField = require('../../shared/components/PatientPhoneInputField');

var PhoneNumberValidation = require('../../shared/validation/PhoneNumberValidation');
var Utility = require('../../../utils/Utility');

var Notifications = require('../../common/Notification');
var Strings = require('../../../constants/Strings');

function AddEmailDialog() {
    this.attributes({
        phoneNumberFieldSelector: '#add-phone-number-field'
    });

    this.options({
        title: 'ADDING PHONE NUMBER',
        width: 410,
        buttons: ['Save', 'No, next time']
    });

    this.onShow = function (e, data) {
        this.$node.removeClass('ui-hidden');

        this.patientInfo = data;

        this.show();
    };

    this.children({
        phoneNumberFieldSelector: PatientPhoneInputField
    });

    this.initValidation = function () {
        return PhoneNumberValidation.get();
    };

    this.setExtraData = function () {
        var $field = this.select('phoneNumberFieldSelector');

        this.patientInfo.phoneNumber = $field.val();

        return {
            patientId: this.patientInfo.patientId,
            id: this.patientInfo.identify,
            firstName: this.patientInfo.firstName,
            lastName: this.patientInfo.lastName,
            email: this.patientInfo.email,
            phoneNumber: this.patientInfo.phoneNumber.replace(/[\s\(\)-]/g, ''),
            clientId: this.patientInfo.clientId,
            birthdayValue: Utility.toBirthday(this.patientInfo.birthday)
        };
    };

    this.beforeSubmitForm = function () {
        if (!this.patientInfo.birthday) {
            Notifications.error({
                title: Strings.ERROR_TITLE,
                message: Strings.BIRTHDAY_IS_REQUIRED_ADD_EMAIL
            });
            return false;
        }
    };

    this.onAddPhoneNumberSuccess = function () {
        this.trigger('addPhoneNumberSuccess', _.assign(this.patientInfo, {
            number: this.patientInfo.phoneNumber
        }));
    };

    this.after('initialize', function() {
        this.on('formSuccess', this.onAddPhoneNumberSuccess);
    });
}

module.exports = flight.component(WithFormDialog, AddEmailDialog);
