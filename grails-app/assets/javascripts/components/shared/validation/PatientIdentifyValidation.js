require('../../../libs/jquery-validation/jquery.validate.js');

var STRINGs = require('../../../constants/Strings');
var URLs = require('../../../constants/Urls');

module.exports = {
    get: function () {
        return {
            rules: {
                identify: {
                    remote: {
                        url: URLs.CHECK_PATIENT_ID,
                        dropProcess: true,
                        dataFilter: function (responseString) {
                            var resp = jQuery.parseJSON(responseString);
                            if (resp.check !== "false") {
                                return "\"" + STRINGs.ID_EXISTING_INVALID + "\"";
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
