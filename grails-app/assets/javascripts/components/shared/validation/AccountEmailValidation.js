require('../../../libs/jquery-validation/jquery.validate.js');

var STRINGs = require('../../../constants/Strings');
var URLs = require('../../../constants/Urls');

module.exports = {
    get: function (originalCheck, scope) {
        return {
            rules: {
                email: {
                    email: true,
                    remote: {
                        url: URLs.CHECK_ACCOUNT_EMAIL,
                        dropProcess: true,
                        dataFilter: function (responseString) {
                            var resp = jQuery.parseJSON(responseString);

                            if (originalCheck && originalCheck.call(scope) === true) {
                                return '"true"';
                            } else if (resp.check !== "false") {
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
