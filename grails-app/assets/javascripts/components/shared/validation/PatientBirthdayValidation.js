require('../../../libs/jquery-validation/jquery.validate.js');

var moment = require('moment');
var STRINGs = require('../../../constants/Strings');

var BIRTHDAY_FORMAT = '{0}-{1}-{2}';

$.validator.addMethod("birthdayValueCheck", function(value, elem){
    var $form = $(elem).closest('form');
    var month = $form.find('[name=birthdayMonth]').val();
    var day = $form.find('[name=birthdayDay]').val();
    var year = $form.find('[name=birthdayYear]').val();

    if (!month && !day && !year) {
        return true;
    } else {
        return moment(BIRTHDAY_FORMAT.format(month, day, year), 'MMM-D-YYYY', true).isValid();
    }

}, STRINGs.BIRTHDAY_INVALID_VALUE);

module.exports = {
    get: function () {
        return {
            groups: {
                birthday: 'birthdayMonth birthdayDay birthdayYear'
            },

            rules: {
                birthdayMonth: {
                    birthdayValueCheck: true
                },

                birthdayDay: {
                    birthdayValueCheck: true
                },

                birthdayYear: {
                    birthdayValueCheck: true
                }
            }
        };
    }
};
