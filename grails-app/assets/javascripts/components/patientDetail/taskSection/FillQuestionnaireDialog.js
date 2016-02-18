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

    this.confirmHandler = function (e) {
        var me = this;
        e.preventDefault();

        if (this.$node.valid()) {
            this.completeDate = Utility.toVancouverTime(this.select('dateSelector').val());

            this.close();

            setTimeout(function () {
                window.open(me.addCompleteDate(me.taskUrl, me.completeDate), '_blank');
            }, 300);
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
        width: 420,
        buttons: [{
            text: 'Start',
            click: this.confirmHandler
        }, {
            text: 'Cancel',
            click: this.cancelHandler
        }]
    });

    this.after('initialize', function() {
    });
}

module.exports = flight.component(WithFormDialog, FillQuestionnaireDialog);
