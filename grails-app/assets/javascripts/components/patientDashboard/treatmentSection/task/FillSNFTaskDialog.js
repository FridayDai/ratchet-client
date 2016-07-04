var flight = require('flight');
var WithFormDialog = require('../../../common/WithFormDialog');

function FillSNFTaskDialog() {
    this.options({
        title: 'SNF Follow Up',
        width: 454,
        buttons: ['Save']
    });

    this.attributes({
        listSelector: '.list',
        radioTextSelector: '.text',
        inputTextSelector : '.input-text'
    });

    this.filterNumber = function () {
        var val = this.select('inputTextSelector').val();
        var reg = /^[0-9]+$/;
        var num = val.match(reg);
        this.select('inputTextSelector').val(num);

        this.checkNum(num);
    };

    this.checkNum = function(n) {
        var val = this.select('inputTextSelector').val();
        var reg = /^(0[0-9]$)/;
        var num = val.match(reg);

        if(num) {
            num = num[0].substring(1,2);
            this.select('inputTextSelector').val(num);
        }else {
            this.select('inputTextSelector').val(n);
        }

    };

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
                'choice.question1': {required: true},
                'choice.question2': {
                    required: true,
                    range: [0, 99]
                }
            },
            messages: {
                'choice.question1': {required: 'This question is required'},
                'choice.question2': {
                    required: 'This question is required',
                    range: "Invalid Input. The number of day(s) should be between 0 - 99."
                }
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
        this.$node.find("input:radio").valid();
    };

    this.completeTaskSuccess = function (e, data) {
        this.trigger('userTaskCompleteSuccess', {
            taskId: this.taskId,
            choice: data
        });
    };

    this.after('initialize', function () {
        this.on('formSuccess', this.completeTaskSuccess);
        this.on('input', {inputTextSelector: this.filterNumber});
        this.on('click', {
            radioTextSelector: this.onRadioTextClick
        });
    });
}

module.exports = flight.component(WithFormDialog, FillSNFTaskDialog);


