var flight = require('flight');

function NavigationPanel() {
    this.attributes({
        assistMeButton: '#assist-me',
        expendableNavSelector: '.expendable-nav'
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

    this.after('initialize', function () {
        this.on('click', {
            assistMeButton: this.onAssistMeButtonClicked,
            expendableNavSelector: this.toggleNav
        });
    });
}

module.exports = flight.component(NavigationPanel);
