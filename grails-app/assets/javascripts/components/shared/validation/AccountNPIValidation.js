require('../../../libs/jquery-validation/jquery.validate.js');

var STRINGs = require('../../../constants/Strings');
var URLs = require('../../../constants/Urls');

$.validator.addMethod('NPICheck', function (value, element) {
    var regexp = /^[1-9]/;
    return this.optional(element) || (regexp.test(value));
}, STRINGs.NPI_INVALID);

module.exports = {
    get: function (originalCheck, scope) {
        return {
            rules: {
                npi: {
                    minlength: 10,
                    maxlength: 10,
                    NPICheck: true,
                    number: true,
                    remote: {
                        url: URLs.CHECK_ACCOUNT_NPI,
                        dropProcess: true,
                        dataFilter: function (responseString) {
                            var resp = jQuery.parseJSON(responseString);

                            if (originalCheck && originalCheck.call(scope) === true) {
                                return '"true"';
                            } else if (resp.check !== "false") {
                                return "\"" + STRINGs.NPI_EXISTING_INVALID + "\"";
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
