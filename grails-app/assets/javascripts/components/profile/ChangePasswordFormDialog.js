require('../../libs/jquery-validation/jquery.validate.js');
var flight = require('flight');
var WithFormDialog = require('../common/WithFormDialog');
var URLs = require('../../constants/Urls');
var STRINGs = require('../../constants/Strings');

function changePasswordFormDialog() {
    this.options({
        title: 'CHANGE PASSWORD',
        width: 320,
        buttons: ['Save']
    });

    this.attributes({
        oldPassWordFieldSelector: '#oldPass',
        newPassWordFieldSelector: '#newPass',
        confirmPassWordFieldSelector: '#confirmPass',
        confirmErrorFieldSelector: '#confirmPass-error'
    });

    this.onShow = function (e, data) {
        this.$node.removeClass('ui-hidden');
        this.formEl.attr('action', URLs.UPDATE_PASSWORD.format(data));
        this.show();
    };

    this.initValidation = function () {
        return _.defaultsDeep({
            rules: {
                confirmPassword: {
                    equalTo: '#newPass'
                }
            },
            messages: {
                confirmPassword: {
                    equalTo: STRINGs.PASSWORD_NOT_MATCH
                }
            }
        });
    };
}

module.exports = flight.component(WithFormDialog, changePasswordFormDialog);
