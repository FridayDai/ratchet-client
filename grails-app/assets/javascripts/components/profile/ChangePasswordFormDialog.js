require('../../libs/jquery-validation/jquery.validate.js');
var flight = require('flight');
var WithFormDialog = require('../common/WithFormDialog');
var WithElementValidation = require('../common/WithElementValidation');
var PasswordValidation = require('../shared/validation/PasswordValidation');
var URLs = require('../../constants/Urls');
var Notifications = require('../common/Notification');
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
        return {
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
        };
    };

    this.initPasswordValidation = function () {
        this.setElementValidation(
            this.select('newPassWordFieldSelector'),
            PasswordValidation.rules
        );
    };

    this.onBeforeClose = function() {
        var $password = this.select('newPassWordFieldSelector');
        if ($password.data('tooltipsterNs')) {
            $password.tooltipster('hide');
        }
    };

    this.after('initialize', function() {
        this.initPasswordValidation();

        this.on('formSuccess', function() {
            Notifications.showFadeOutMsg(STRINGs.PASSWORD_CHANGED);
        });

        this.on('dialogbeforeclose', this.onBeforeClose);
    });
}

module.exports = flight.component(
    WithFormDialog,
    WithElementValidation,
    changePasswordFormDialog
);
