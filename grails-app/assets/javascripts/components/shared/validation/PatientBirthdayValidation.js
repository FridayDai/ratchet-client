require('../../../libs/jquery-validation/jquery.validate.js');

var moment = require('moment');
var STRINGs = require('../../../constants/Strings');

$.validator.addMethod("birthdayValueCheck", function(value, elem){
    var $form = $(elem).closest('form');
    var birthday = $form.find('[name=birthday]').val();

    return moment(birthday, 'MMM D, YYYY').isBefore(moment());
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
