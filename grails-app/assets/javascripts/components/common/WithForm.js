require('../../libs/jquery-validation/jquery.validate.js');
require('jForm');

function WithForm() {
    this.attributes({
        formSelector: 'form'
    });

    this._initForm = function () {
        if (this.attr.formSelector === '.') {
            this.formEl = $(this.$node);
        } else {
            this.formEl = this.select('formSelector');
        }

        this._setDefaultValidation();

        var options;
        if ($.isFunction(this.initValidation)) {
            options = this.initValidation();
        }

        this.formEl.validate(_.extend({
            submitHandler: _.bind(this._submitForm, this)
        }, options));
    };

    this._submitForm = function () {
        var data;

        if (_.isFunction(this.setExtraData)) {
            data = this.setExtraData();
        }

        this.formEl.ajaxSubmit({
            data: data,
            success: _.bind(this._formSuccess, this)
        });
    };

    this._formSuccess = function (data) {
        this.trigger('formSuccess', data);
    };

    this._setDefaultValidation = function () {
        $.validator.setDefaults({
            errorClass: 'error-help-block',
            errorPlacement: function(error, element) {
                $("<div class='error-container'></div>").appendTo(element.parent()).append(error);
            }
        });
    };

    this.after('initialize', function () {
        this._initForm();
    });
}

module.exports = WithForm;
