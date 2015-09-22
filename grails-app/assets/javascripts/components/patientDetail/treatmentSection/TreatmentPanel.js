var flight = require('flight');
var URLs = require('../../../constants/Urls');

var TAB_TEMPLATE = '<li><a href="{0}">{1}</a></li>';

function TreatmentPanel() {
    this.attributes({
        addTreatmentButtonSelector: '#addTab',

        tabsContainerSelector: '.tab-treatment',
        tabLabelSelector: '.tab-treatment li'
    });

    this.onAddTreatmentButtonClicked = function (e) {
        e.preventDefault();

        this.trigger('showAddTreatmentDialog');
    };

    this.onAddTreatmentSuccess = function (e, data) {
        this.addTab(data);

        this.updateAddTreatmentButtonStatus();
    };

    this.addTab = function (options) {

        var title = options.treatmentInfo.title + " " + options.treatmentInfo.tmpTitle;

        var url = URLs.SECTION_TREATMENT_TAB.format(
                    options.patientId,
                    options.clientId,
                    options.medicalRecordId,
                    options.treatmentInfo.id,
                    options.treatmentInfo.surgeryDate,
                    options.emailStatus,
                    Date.now()
                );

        this.select('tabsContainerSelector')
            .append(TAB_TEMPLATE.format(url, title));

        this.$node
            .tabs('refresh')
            .tabs('option', 'active', this.select('tabLabelSelector').length - 1);
    };

    this.updateAddTreatmentButtonStatus = function () {
        if (this.select('tabLabelSelector').length >= 3) {
            this.select('addTreatmentButtonSelector').hide();
        }
    };

    this.after('initialize', function () {
        this.on('click', {
            addTreatmentButtonSelector: this.onAddTreatmentButtonClicked
        });

        this.on(document, 'addTreatmentSuccess', this.onAddTreatmentSuccess);
    });
}

module.exports = flight.component(TreatmentPanel);
