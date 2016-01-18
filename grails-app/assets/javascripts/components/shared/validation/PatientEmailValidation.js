require('../../../libs/jquery-validation/jquery.validate.js');

var STRINGs = require('../../../constants/Strings');
var URLs = require('../../../constants/Urls');



$.validator.addMethod("emailCheck", function(value){
    var regex = /(cmo){1}$|(ocm){1}$|(omc){1}$|(mco){1}$|(moc){1}$/;

    if (regex.test(value) == true) {
        return false
    } else {
        return true
    }

}, STRINGs.EMAIL_INVALID);


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
