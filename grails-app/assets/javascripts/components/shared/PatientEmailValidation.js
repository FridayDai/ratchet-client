require('../../libs/jquery-validation/jquery.validate.js');

var STRINGs = require('../../constants/Strings');
var URLs = require('../../constants/Urls');

module.exports = {
    get: function (originalCheck, scope) {
        return {
            rules: {
                email: {
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
