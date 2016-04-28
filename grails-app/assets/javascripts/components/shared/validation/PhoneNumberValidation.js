require('../../../libs/jquery-validation/jquery.validate.js');
require('intlTelInput-utils');

var STRINGs = require('../../../constants/Strings');

$.validator.addMethod('phoneNumberCheck', function (value, element) {
    var tel = /^[0-9\-\(\)\s]+$/;
    return this.optional(element) || (tel.test(value));
}, STRINGs.PHONE_NUMBER_INVALID);

$.validator.addMethod('checkPhoneNumberRegion', function (value) {
    //var phoneUtil = libPhoneNumber.PhoneNumberUtil.getInstance();
    //var phoneNumber = phoneUtil.parse(value, 'US');
    //var isPossible = phoneUtil.isPossibleNumber(phoneNumber);
    //var isValid = phoneUtil.isValidNumber(phoneNumber);
    //var regionCode = phoneUtil.getRegionCodeForNumber(phoneNumber);
    //var isValidRegionCode = phoneUtil.isValidNumberForRegion(phoneNumber, 'US');
    //return isPossible && isValid && regionCode && isValidRegionCode;
    //return intlTelInputUtils.isValidNumber(intlTelInputUtils.formatNumber(value, 'US'), 'US');
    if (value) {
        return intlTelInputUtils.isValidNumber(value, 'US');
    }

    return true;
}, STRINGs.PHONE_NUMBER_INVALID);

module.exports = {
    get: function () {
        return {
            rules: {
                phoneNumberVal: {
                    minlength: 14,
                    phoneNumberCheck: true,
                    checkPhoneNumberRegion: true
                }
            },
            messages: {
                phoneNumberVal: {
                    minlength: STRINGs.PHONE_NUMBER_INVALID
                }
            }
        };
    }
};
