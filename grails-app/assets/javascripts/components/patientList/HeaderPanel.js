var flight = require('flight');

function HeaderPanel() {
    this.attributes({
        newPatientButton: '#add-patient'
    });

    this.onNewPatientClicked = function (e) {
        e.preventDefault();

        this.trigger('showPatientCheckIDDialog');
    };

    this.after('initialize', function () {
        this.on('click', {
            newPatientButton: this.onNewPatientClicked
        })
    });
}

module.exports = flight.component(HeaderPanel);
