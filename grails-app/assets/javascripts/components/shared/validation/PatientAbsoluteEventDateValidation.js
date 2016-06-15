require('../../../libs/jquery-validation/jquery.validate.js');

var STRINGs = require('../../../constants/Strings');
var moment = require('moment');
var Utility = require('../../../utils/Utility');

$.validator.addMethod('AbsoluteEventDateMinCheck', function (value) {
    var guessFormat = Utility.guessDateFormat(value);

    if (guessFormat) {
        return !moment(value, guessFormat).isBefore('2015-01-01');
    }

    return false;
}, STRINGs.MINIMUM_ABSOLUTE_EVENT_DATE);

$.validator.addMethod('AbsoluteEventDateMaxCheck', function (value) {
    var guessFormat = Utility.guessDateFormat(value);

    if (guessFormat) {
        return moment(value, guessFormat)
            .isBefore(moment().add(1, 'y'));
    }

    return false;
}, STRINGs.MAX_ABSOLUTE_EVENT_DATE);

module.exports = {
    rules: {
        AbsoluteEventDateMinCheck: true,
        AbsoluteEventDateMaxCheck: true
    }
};
