require('../../../libs/jquery-validation/jquery.validate.js');

var STRINGs = require('../../../constants/Strings');
var PARAMs = require('../../../constants/Params');
var moment = require('moment');

var SURGERY_DATE_FORMAT = 'MMMM D, YYYY';

$.validator.addMethod('SurgeryDateMinCheck', function (value) {
    return !moment(value, SURGERY_DATE_FORMAT).isBefore('2015-1-1');
}, STRINGs.MINIMUM_SURGERY_DATE);

$.validator.addMethod('SurgeryDateMaxCheck', function (value) {
    return moment(value, SURGERY_DATE_FORMAT)
            .isBefore(moment().add(1, 'y'));
}, STRINGs.MAX_SURGERY_DATE);

module.exports = {
    rules: {
        SurgeryDateMinCheck: true,
        SurgeryDateMaxCheck: true
    }
};
