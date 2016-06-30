var flight = require('flight');

function MenuPanel() {
    this.attributes({
        expendableNavSelector: '.expendable-nav'
    });

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
                    .height(40)
                    .velocity({height: $subList.outerHeight() + 41});
            } else {
                $nav
                    .removeClass('expended')
                    .addClass('collapsed');

                $nav.velocity({height: 40});
            }
        }
    };

    this.after('initialize', function () {
        this.on('click', {
            expendableNavSelector: this.toggleNav
        });
    });
}

module.exports = flight.component(MenuPanel);
