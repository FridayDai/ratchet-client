require('../../../libs/jquery-validation/jquery.validate.js');

var STRINGs = require('../../../constants/Strings');
var PARAMs = require('../../../constants/Params');
var moment = require('moment');
var maxYear = moment().year() + 100;

$.validator.addMethod('DateFormatCheck', function (value) {
    return _.some(PARAMs.DATE_FORMAT, function (format) { return moment(value, format, true).isValid(); });
}, STRINGs.WRONG_DATE_FORMAT);

$.validator.addMethod('DateMinCheck', function (value) {
    var regexp = /\d{4}$/ig;

    var matches = value.match(regexp);

    if (matches.length === 0) {
        return false;
    } else {
        return matches[0] >= 1900 ;
    }
}, STRINGs.MINIMUM_DATE_RANGE);

$.validator.addMethod('DateMaxCheck', function (value) {
    var regexp = /\d{4}$/ig;

    var matches = value.match(regexp);

    if (matches.length === 0) {
        return false;
    } else {
        return matches[0] <= maxYear ;
    }
}, STRINGs.MAX_DATE_RANGE.replace('{0}', maxYear));

module.exports = {
    addIn: function ($form) {
        $form.find('.date-picker')
            .each(function() {
                $(this).rules('add', {
                    DateFormatCheck: true,
                    DateMinCheck: true,
                    DateMaxCheck: true
                });
            });
    }
};
