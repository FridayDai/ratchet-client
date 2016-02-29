require('../components/common/WithString');
require('../components/layout/WithMaintenance');

var flight = require('flight');
var WithForm = require('../components/common/WithForm');
var STRINGs = require('../constants/Strings');
var Utility = require('../utils/Utility');

function ActivateAccountPage() {

    this.attributes({
        nativeForm: true
    });

    this.initRateLimitError = function () {
        var $rateLimit = this.$node.find('.error-rate-limit');

        if ($rateLimit.length > 0) {
            var seconds = $rateLimit.data('rateLimit');
            $rateLimit.text(
                STRINGs.RATE_LIMIT_LOGIN
                    .format(Utility.parseSecondsToMinutes(seconds))
            );

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
                }
            }, 1000);
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
    ActivateAccountPage
).attachTo('form');
