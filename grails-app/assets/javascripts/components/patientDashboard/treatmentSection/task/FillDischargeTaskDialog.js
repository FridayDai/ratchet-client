var flight = require('flight');
var WithFormDialog = require('../../../common/WithFormDialog');
var URLs = require('../../../../constants/Urls');
var Utility = require('../../../../utils/Utility');

function FillDischargeTaskDialog() {
    this.options({
        title: 'DISCHARGE PLAN',
        width: 430,
        buttons: ['Save']
    });

    this.attributes({
        radioTextSelector: '.text'
    });

    this.onShow = function (e, data) {
        this.taskId = data.taskId;

        this.$node.removeClass('ui-hidden');
        this.show();
    };

    this.setExtraData = function () {
        return {
            taskId: this.taskId
        };
    };

    this.initValidation = function () {
        return {
            rules: {
                'choices.question1': {required: true}
            },
            messages: {
                'choices.question1': {required: 'This question is required'}
            }
        };
    };

    this.onRadioTextClick = function (e) {
        var choice = $(e.target).siblings('.choice');
        choice.find('input').prop('checked', true);
    };

    this.completeTaskSuccess = function () {

    };

    this.after('initialize', function () {
        this.on('formSuccess', this.completeTaskSuccess);
        this.on('click', {
            radioTextSelector: this.onRadioTextClick
        })
    });
}

module.exports = flight.component(WithFormDialog, FillDischargeTaskDialog);

