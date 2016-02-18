require('../../../libs/jquery-validation/jquery.validate.js');

var STRINGs = require('../../../constants/Strings');
var PARAMs = require('../../../constants/Params');
var moment = require('moment');

$.validator.addMethod('DateFormatCheck', function (value) {
    return _.some(PARAMs.DATE_FORMAT, function (format) { return moment(value, format, true).isValid(); })

}, STRINGs.WRONG_DATE_FORMAT);

module.exports = {
    addIn: function ($form) {
        $form.find('.date-picker')
            .each(function() {
                $(this).rules('add', {
                    DateFormatCheck: true
                });
            });
    }
};
