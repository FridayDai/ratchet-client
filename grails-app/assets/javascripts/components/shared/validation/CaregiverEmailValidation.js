require('../../../libs/jquery-validation/jquery.validate.js');

var STRINGs = require('../../../constants/Strings');
var URLs = require('../../../constants/Urls');

module.exports = {
    _patientId: '',
    get: function (originalCheck, scope) {
        var me = this;

        return {
            rules: {
                email: {
                    email: true,
                    remote: {
                        urlFn: function () {
                            return URLs.CHECK_CAREGIVER_EMAIL.format(me._patientId);
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

    setPatientId: function (id) {
        this._patientId = id;
    }
};
