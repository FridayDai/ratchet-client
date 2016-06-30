var flight = require('flight');
var STRINGs = require('../../constants/Strings');

function ProfileMenuPanel() {
    this.attributes({
        logoutLinkSelector: '.log-out'
    });

    this.onLogoutClicked = function (e) {
        e.preventDefault();
        this.removeAccountInfo();

        var $logout = this.select('logoutLinkSelector');

        window.location = $logout.attr('href');
    };

    this.saveAccountInfo = function () {
        sessionStorage.setItem(STRINGs.SESSION_ACCOUNT_INFO, JSON.stringify({
            email: this.select('logoutLinkSelector').data('email')
        }));
    };

    this.removeAccountInfo = function () {
        sessionStorage.removeItem(STRINGs.SESSION_ACCOUNT_INFO);
    };

    this.after('initialize', function () {
        this.saveAccountInfo();

        this.on('click', {
            logoutLinkSelector: this.onLogoutClicked
        });
    });
}

module.exports = flight.component(ProfileMenuPanel);
