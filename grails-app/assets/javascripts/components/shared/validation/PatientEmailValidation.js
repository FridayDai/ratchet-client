require('../../../libs/jquery-validation/jquery.validate.js');

var STRINGs = require('../../../constants/Strings');
var URLs = require('../../../constants/Urls');



/* jshint ignore:start */
$.validator.addMethod("emailCheck", function(value){
    var regex = /^[-a-z0-9~!$%^&*_=+}{\'?]*(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@?([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))?(:[0-9]{1,5})?$/i;

    return regex.test(value);
}, STRINGs.EMAIL_INVALID);
/* jshint ignore:end */

module.exports = {
    get: function (originalCheck, scope) {
        return {
            rules: {
                email: {
                    emailCheck: true,
                    email: true,
                    remote: {
                        url: URLs.CHECK_PATIENT_EMAIL,
                        dropProcess: true,
                        dataFilter: function (responseString) {
                            if (originalCheck && originalCheck.call(scope) === true) {
                                return '"true"';
                            } else if (responseString === "false") {
                                return "\"" + STRINGs.EMAIL_EXISTING_INVALID + "\"";
                            } else {
                                return '"true"';
                            }
                        }
                    }
                }
            }
        };
    }
};
