var flight = require('flight');
var WithFormDialog = require('../../../common/WithFormDialog');

function FillDischargeTaskDialog() {
    this.options({
        title: 'DISCHARGE PLAN',
        width: 430,
        buttons: ['Save']
    });

    this.attributes({
        listSelector: '.list',
        radioTextSelector: '.text'
    });

    this.onShow = function (e, data) {
        this.taskId = data.taskId;
        this.select('listSelector').removeClass('error-help-block');
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
            ignore: ".ignore",
            rules: {
                'choice.question1': {required: true}
            },
            messages: {
                'choice.question1': {required: 'This question is required'}
            },
            errorPlacement: function(error, element) {
                var errorContainer = element.closest('.list');

                $("<div class='error-container'></div>").prependTo(errorContainer).append(error);
            },
            highlight: function(element, errorClass, validClass) {
                $(element).closest('.list').addClass(errorClass).removeClass(validClass);
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).closest('.list').removeClass(errorClass).addClass(validClass);

            }
        };
    };

    this.onRadioTextClick = function (e) {
        var choice = $(e.target).siblings('.choice');
        choice.trigger('click');
        this.$node.valid();
    };

    this.completeTaskSuccess = function (e, data) {
        this.trigger('userTaskCompleteSuccess', {
            taskId: this.taskId,
            choice: data
        });
    };

    this.after('initialize', function () {
        this.on('formSuccess', this.completeTaskSuccess);
        this.on('click', {
            radioTextSelector: this.onRadioTextClick
        });
    });
}

module.exports = flight.component(WithFormDialog, FillDischargeTaskDialog);

