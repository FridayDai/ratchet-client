require('intlTelInput');
require('intlTelInput-utils');

function WithIntlTelInput() {

    this._initPhoneInput = function () {
        this.$node.intlTelInput({
            onlyCountries: ['us'],
            utilsScript: false
        });
    };

    this.after('initialize', function () {
        this._initPhoneInput();
    });

    this.before('teardown', function () {
        this.$node.intlTelInput('destroy');
    });
}

module.exports = WithIntlTelInput;
