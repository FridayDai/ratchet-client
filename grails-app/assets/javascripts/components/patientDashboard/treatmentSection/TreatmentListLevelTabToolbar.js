var flight = require('flight');

function TreatmentListPanel() {
    this.attributes({
        addTreatmentButtonSelector: '.btn-add-treatment'
    });

    this.onAddTreatmentButtonClicked = function (e) {
        e.preventDefault();

        this.trigger('showAddTreatmentDialog');
    };

    this.updateAddTreatmentButtonStatus = function (e, data) {
        var $addTreatment = this.select('addTreatmentButtonSelector');

        if (data.show) {
            $addTreatment.show();
        } else {
            $addTreatment.hide();
        }
    };

    this.after('initialize', function () {
        this.on('click', {
            addTreatmentButtonSelector: this.onAddTreatmentButtonClicked
        });

        this.on(document, 'updateAddTreatmentButton', this.updateAddTreatmentButtonStatus);
    });
}

module.exports = flight.component(TreatmentListPanel);
