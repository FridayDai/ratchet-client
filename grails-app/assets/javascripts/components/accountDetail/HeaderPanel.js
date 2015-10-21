var flight = require('flight');
var URLs = require('../../constants/Urls');

function HeaderPanel() {
    this.attributes({
        closeButtonSelector: '.btn-close'
    });

    this.closePage = function (e) {
        e.preventDefault();
        window.location.href = URLs.PAGE_ACCOUNTS;
    };

    this.after('initialize', function () {
        this.on('click', {
            closeButtonSelector: this.closePage
        });
    });
}

module.exports = flight.component(HeaderPanel);
