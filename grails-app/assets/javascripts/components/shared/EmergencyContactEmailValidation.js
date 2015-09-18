require('../../libs/jquery-validation/jquery.validate.js');

var STRINGs = require('../../constants/Strings');
var URLs = require('../../constants/Urls');

module.exports = {
    _medicalRecordId: '',
    get: function (originalCheck, scope) {
        var me = this;

        return {
            rules: {
                email: {
                    email: true,
                    remote: {
                        urlFn: function () {
                            return URLs.CHECK_EMERGENCY_CONTACT_EMAIL.format(me._medicalRecordId);
                        },
                        dropProcess: true,
                        dataFilter: function (responseString) {
                            var resp = JSON.parse(responseString);

                            if (originalCheck && originalCheck.call(scope) === true) {
                                return '"true"';
                            } else if (resp.existed) {
                                return "\"" + STRINGs.EMAIL_EXISTING_INVALID + "\"";
                            } else {
                                return '"true"';
                            }
                        },
                        error: function (jqXHR) {
                            if (jqXHR.status === 500) {
                                return;
                            }
                        }
                    }
                }
            }
        };
    },

    setMedicalRecordId: function (id) {
        this._medicalRecordId = id;
    }
};
