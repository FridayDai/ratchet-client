require('../../../libs/jquery-validation/jquery.validate.js');

var STRINGs = require('../../../constants/Strings');
var PARAMs = require('../../../constants/Params');
var moment = require('moment');
var Utility = require('../../../utils/Utility');

$.validator.addMethod('AbsoluteEventDateMinCheck', function (value) {
    var guessFormat = Utility.guessDateTimeFormat(value);

    if (guessFormat) {
        return !moment(value, guessFormat).isBefore('2015-01-01');
    }

    return false;
}, STRINGs.MINIMUM_ABSOLUTE_EVENT_DATE);

$.validator.addMethod('AbsoluteEventDateMaxCheck', function (value) {
    var guessFormat = Utility.guessDateTimeFormat(value);

    if (guessFormat) {
        return moment(value, guessFormat)
            .isBefore(moment().add(1, 'y'));
    }

    return false;
}, STRINGs.MAX_ABSOLUTE_EVENT_DATE);

$.validator.addMethod('DateTimeFormatCheck', function (value) {
    return _.some(PARAMs.DATE_TIME_FORMAT, function (format) { return moment(value, format, true).isValid(); });
}, STRINGs.WRONG_DATE_TIME_FORMAT);

module.exports = {
    rules: {
        DateTimeFormatCheck: true,
        AbsoluteEventDateMinCheck: true,
        AbsoluteEventDateMaxCheck: true
    }
};
