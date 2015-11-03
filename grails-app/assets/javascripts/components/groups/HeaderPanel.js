var flight = require('flight');

function HeaderPanel() {
    this.attributes({
        newGroupButton: '#add-group'
    });

    this.onNewGroupClicked = function (e) {
        e.preventDefault();

        this.trigger('showGroupFormDialog');
    };

    this.after('initialize', function () {
        this.on('click', {
            newGroupButton: this.onNewGroupClicked
        });
    });
}

module.exports = flight.component(HeaderPanel);

