var flight = require('flight');

var WithFormDialog = require('../../common/WithFormDialog');
var WithDatepicker = require('../../common/WithDatepicker');

var Utility = require('../../../utils/Utility');

function FillQuestionnaireDialog() {
    this.attributes({
        dateSelector: '#fill-questionnaire-date-field'
    });

    this.children({
        dateSelector: flight.component(WithDatepicker)
    });

    this.onShow = function (e, data) {
        this.$node.removeClass('ui-hidden');

        this.taskUrl = data.taskUrl;

        this.show();
    };

    this.confirmHandler = function () {
        if (this.$node.valid()) {
            this.completeDate = Utility.toVancouverTime(this.select('dateSelector').val());

            this.close();

            document.domain = "ratchethealth.com";

            window.open(
                this.addCompleteDate(this.taskUrl, this.completeDate),
                'patientPortalWindow'
            );
        }
    };

    this.addCompleteDate = function (url, completeDate) {
        var format = 'completeDate={0}';
        var connector = '?';

        if (url.indexOf('?') >=0) {
            connector = '&';
        }

        return url + connector + format.format(completeDate);
    };

    this.cancelHandler = function (e) {
        e.preventDefault();

        this.close();
    };

    this.options({
        title: 'FILL QUESTIONNAIRE',
        width: 430,
        buttons: [{
            text: 'Start',
            click: this.confirmHandler
        }, {
            text: 'Cancel',
            click: this.cancelHandler
        }]
    });
}

module.exports = flight.component(WithFormDialog, FillQuestionnaireDialog);
