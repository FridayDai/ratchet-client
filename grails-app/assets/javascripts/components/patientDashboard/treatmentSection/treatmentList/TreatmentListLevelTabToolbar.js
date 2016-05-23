var flight = require('flight');

function TreatmentListPanel() {
    this.attributes({
        addTreatmentButtonSelector: '.btn-add-treatment'
    });

    this.onAddTreatmentButtonClicked = function (e) {
        e.preventDefault();

        this.trigger('showAddTreatmentDialog');
    };

    this.after('initialize', function () {
        this.on(document, 'click', {
            addTreatmentButtonSelector: this.onAddTreatmentButtonClicked
        });
    });
}

module.exports = flight.component(TreatmentListPanel);
