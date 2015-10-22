require('../../../libs/jquery-validation/jquery.validate.js');

var STRINGs = require('../../../constants/Strings');

$.validator.addMethod('DELETECheck', function (value, element) {
    return this.optional(element) || (value === 'DELETE');
}, STRINGs.DELETE_INVALID);

module.exports = {
    get: function () {
        return {
            rules: {
                delete: {
                    DELETECheck: true
                }
            }
        };
    }
};
