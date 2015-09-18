var flight = require('flight');
var WithDialog = require('../../common/WithDialog');
var URLs = require('../../../constants/Urls');

function TreatmentCodeDialog() {
    this.attributes({
        codeLabelSelector: '.code',
        linkSelector: '.link-to-patient'
    });

    this.options({
        title: 'TREATMENT CODE',
        width: 500,
        buttons: ['Done']
    });

    this.onShow = function (e, data) {
        this.getCodeFromServer(data);
    };

    this.getCodeFromServer = function (data) {
        $.ajax({
            url: URLs.GET_TREATMENT_CODE.format(data.treatmentId),
            method: "POST",
            data: data
        }).done(_.bind(this.getCodeSuccess, this));
    };

    this.getCodeSuccess = function (resp) {
        this.setCodeData(resp);

        this.$node.removeClass('ui-hidden');
        this.show();
    };

    this.setCodeData = function (data) {
        this.select('codeLabelSelector').text(data.treatmentCode);
        this.select('linkSelector')
            .attr('href', data.patientPortalLink)
            .text(data.patientPortalLink);
    };
}

module.exports = flight.component(WithDialog, TreatmentCodeDialog);
