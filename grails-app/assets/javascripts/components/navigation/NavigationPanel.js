var flight = require('flight');
var STRINGs = require('../../constants/Strings');

function NavigationPanel() {
    this.attributes({
        assistMeButton: '#assist-me',
        expendableNavSelector: '.expendable-nav',
        accountInfoNavSelector: '.login-info',
        logoutLinkSelector: '.log-out'
    });

    this.onAssistMeButtonClicked = function (e) {
        e.preventDefault();

        this.trigger('showAssistMeDialog');
    };

    this.toggleNav = function (e) {
        var $target = $(e.target);

        if ($target.closest('.nav-button').length > 0) {
            e.preventDefault();
            var $nav = $target.closest('.expendable-nav');
            var $subList = $nav.find('.sub-nav-list');

            if ($nav.hasClass('collapsed')) {
                $nav
                    .removeClass('collapsed')
                    .addClass('expended');

                $nav
                    .height(50)
                    .velocity({height: $subList.outerHeight() + 51});
            } else {
                $nav
                    .removeClass('expended')
                    .addClass('collapsed');

                $nav.velocity({height: 50});
            }
        }
    };

    this.onLogoutClicked = function (e) {
        e.preventDefault();
        this.removeAccountInfo();

        var $logout = this.select('logoutLinkSelector');

        window.location = $logout.attr('href');
    };

    this.saveAccountInfo = function () {
        sessionStorage.setItem(STRINGs.SESSION_ACCOUNT_INFO, JSON.stringify({
            email: this.select('accountInfoNavSelector').data('email')
        }));
    };

    this.removeAccountInfo = function () {
        sessionStorage.removeItem(STRINGs.SESSION_ACCOUNT_INFO);
    };

    this.after('initialize', function () {
        this.saveAccountInfo();

        this.on('click', {
            assistMeButton: this.onAssistMeButtonClicked,
            expendableNavSelector: this.toggleNav,
            logoutLinkSelector: this.onLogoutClicked
        });
    });
}

module.exports = flight.component(NavigationPanel);
