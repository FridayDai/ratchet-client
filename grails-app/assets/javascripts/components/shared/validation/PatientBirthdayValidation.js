require('../../../libs/jquery-validation/jquery.validate.js');

var moment = require('moment');
var STRINGs = require('../../../constants/Strings');

$.validator.addMethod("birthdayValueCheck", function(value, elem){
    var $form = $(elem).closest('form');
    var birthday = $form.find('[name=birthday]').val();
    var formatBirthday = moment(birthday, 'MM/DD/YYYY');
    return formatBirthday.isValid() && formatBirthday.isBefore(moment()) && formatBirthday.isAfter('1900-01-01');
}, STRINGs.BIRTHDAY_RANGE_VALUE);

module.exports = {
    get: function () {
        return {
            rules: {
                birthday: {
                    birthdayValueCheck: true
                }
            }
        };
    }
};
