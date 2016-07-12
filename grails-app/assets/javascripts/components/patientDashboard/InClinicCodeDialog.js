var flight = require('flight');
var WithDialog = require('../common/WithDialog');
var URLs = require('../../constants/Urls');

function TreatmentCodeDialog() {
    this.attributes({
        codeLabelSelector: '.code',
        linkSelector: '.link-to-patient'
    });

    this.options({
        title: 'ONE-TIME CODE',
        width: 500,
        buttons: ['Done']
    });

    this.onShow = function (e, data) {
        this.getCodeFromServer(data);
    };

    this.getCodeFromServer = function (data) {
        $.ajax({
            url: URLs.GET_IN_CLINIC_CODE.format(data.patientId),
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
        var regexp = /https?:\/\/(.*\.ratchethealth\.com)/ig;

        var host = regexp.exec(data.patientPortalLink);

        this.select('codeLabelSelector').text(data.inClinicCode);
        this.select('linkSelector')
            .attr('href', data.patientPortalLink)
            .text(host[1] + '/in-clinic');
    };
}

module.exports = flight.component(WithDialog, TreatmentCodeDialog);
