require('../components/layout/WithMaintenance');

var flight = require('flight');
var WithForm = require('../components/common/WithForm');
var WithElementValidation = require('../components/common/WithElementValidation');
var STRINGs = require('../constants/Strings');
var PasswordValidation = require('../components/shared/validation/PasswordValidation');

function ActivateAccountPage() {

    this.attributes({
        nativeForm: true,
        passwordInputSelector: '#password',
        confirmPasswordInputSelector: 'confirmPassword'
    });

    this.initValidation = function () {
        return {
            rules: {
                confirmPassword: {
                    equalTo: '#password'
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
            this.select('passwordInputSelector'),
            PasswordValidation.rules
        );
    };

    this.after('initialize', function() {
        this.initPasswordValidation();
    });
}

flight.component(
    WithElementValidation,
    WithForm,
    ActivateAccountPage
).attachTo('form');
