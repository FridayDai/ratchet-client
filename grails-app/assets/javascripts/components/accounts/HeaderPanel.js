var flight = require('flight');

function HeaderPanel() {
    this.attributes({
        newAccountButton: '#add-account'
    });

    this.onNewAccountClicked = function (e) {
        e.preventDefault();

        this.trigger('showNewAccountDialog');
    };

    this.after('initialize', function () {
        this.on('click', {
            newAccountButton: this.onNewAccountClicked
        });
    });
}

module.exports = flight.component(HeaderPanel);
