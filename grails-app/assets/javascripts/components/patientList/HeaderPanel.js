var flight = require('flight');

function HeaderPanel() {
    this.attributes({
        newPatientButton: '#add-patient',
        bulkImportButton: '#bulk-import'
    });

    this.onNewPatientClicked = function (e) {
        e.preventDefault();

        this.trigger('showPatientCheckIDDialog');
    };

    this.onBulkImportClicked = function (e) {
        e.preventDefault();

        this.trigger('showBulkImportDialog');
    };

    this.after('initialize', function () {
        this.on('click', {
            newPatientButton: this.onNewPatientClicked,
            bulkImportButton: this.onBulkImportClicked
        })
    });
}

module.exports = flight.component(HeaderPanel);
