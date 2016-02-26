require('../../../libs/jquery-validation/jquery.validate.js');

var STRINGs = require('../../../constants/Strings');
var moment = require('moment');
var Utility = require('../../../utils/Utility');

$.validator.addMethod('SurgeryDateMinCheck', function (value) {
    var guessFormat = Utility.guessDateFormat(value);

    if (guessFormat) {
        return !moment(value, guessFormat).isBefore('2015-01-01');
    }

    return false;
}, STRINGs.MINIMUM_SURGERY_DATE);

$.validator.addMethod('SurgeryDateMaxCheck', function (value) {
    var guessFormat = Utility.guessDateFormat(value);

    if (guessFormat) {
        return moment(value, guessFormat)
            .isBefore(moment().add(1, 'y'));
    }

    return false;
}, STRINGs.MAX_SURGERY_DATE);

module.exports = {
    rules: {
        SurgeryDateMinCheck: true,
        SurgeryDateMaxCheck: true
    }
};
