require('../components/common/WithString');
require('../components/layout/WithMaintenance');

var flight = require('flight');
var WithForm = require('../components/common/WithForm');
var STRINGs = require('../constants/Strings');
var Utility = require('../utils/Utility');

function LoginPage() {

    this.attributes({
        nativeForm: true,
        loginButtonSelector: '#btnLogin'
    });

    this.initRateLimitError = function () {
        var me = this;
        var $rateLimit = this.$node.find('.error-rate-limit');

        if ($rateLimit.length > 0) {
            var seconds = $rateLimit.data('rateLimit');

            $rateLimit.text(
                STRINGs.RATE_LIMIT_LOGIN
                    .format(Utility.parseSecondsToMinutes(seconds))
            );
            this.toggleLoginButton(true);

            var intervalId = setInterval(function () {
                seconds = seconds - 1;

                if (seconds) {
                    $rateLimit.text(
                        STRINGs.RATE_LIMIT_LOGIN
                            .format(Utility.parseSecondsToMinutes(seconds))
                    );
                } else {
                    clearInterval(intervalId);
                    $rateLimit.hide();
                    me.toggleLoginButton(false);
                }
            }, 1000);
        }
    };

    this.toggleLoginButton = function (setDisabled) {
        var $button = this.select('loginButtonSelector');

        $button.prop('disabled', setDisabled);

        if (setDisabled && !$button.hasClass('disabled')) {
            $button.addClass('disabled');
        } else {
            $button.removeClass('disabled');
        }
    };

    this.after('initialize', function() {
        this.initRateLimitError();

        this.$node.find('input').focus(function () {
            $('#error-login').hide();
        });
    });
}

flight.component(
    WithForm,
    LoginPage
).attachTo('form');
