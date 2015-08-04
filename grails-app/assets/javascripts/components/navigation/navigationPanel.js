var flight = require('flight');

function navigationPanel() {
    /* jshint validthis:true */

    this.attributes({
        assistMeButton: '#assist-me'
    });

    this.onAssistMeButtonClicked = function (e) {
        e.preventDefault();

        this.trigger('showAssistMeDialog');
    };

    this.after('initialize', function () {
        this.on('click', {
            assistMeButton: this.onAssistMeButtonClicked
        });
    });
}

module.exports = flight.component(navigationPanel);
