require('../../libs/jquery-validation/jquery.validate.js');
require('jForm');

function WithForm() {
    this.attributes({
        formSelector: '.'
    });

    this._initForm = function () {
        var me = this;

        if (this.attr.formSelector === '.') {
            this.formEl = $(this.$node);
        } else {
            this.formEl = this.select('formSelector');
        }

        this._setDefaultValidation();

        var options;
        if ($.isFunction(this.initValidation)) {
            options = this.__getValidations(this.initValidation());
        }

        this.formEl.validate(_.extend({
            submitHandler: _.bind(this._prepareSubmitForm, this)
        }, options));

        _.each(this.__validationFunctions, function (fn) {
            fn.call(me, me.formEl);
        });
    };

    this.__getValidations = function (validations) {
        var plainObjects = [];
        var functions = [];

        if (_.isPlainObject(validations)) {
            return validations;
        }

        if (_.isFunction(validations)) {
            this.__validationFunctions = [validations];
            return;
        }

        _.each(validations, function (item) {
            if (_.isPlainObject(item)) {
                plainObjects.push(item);
            } else if (_.isFunction(item)) {
                functions.push(item);
            }
        });

        this.__validationFunctions = functions;

        return _.defaultsDeep.apply(this, plainObjects);
    };

    this.submitForm = function () {
        var data;

        if (_.isFunction(this.setExtraData)) {
            data = this.setExtraData();
        }

        this.formEl.ajaxSubmit({
            data: data,
            success: _.bind(this._formSuccess, this)
        });
    };

    this._prepareSubmitForm = function () {
        if (_.isFunction(this.beforeSubmitForm)) {
            if (this.beforeSubmitForm() === false) {
                return;
            }
        }

        this.submitForm();
    };

    this._formSuccess = function (data) {
        if (!data || _.isString(data)) {
            data = {resp: data};
        }

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

    this.before('teardown', function () {
        this.formEl.data('validator', null);
        this.formEl = null;
    });
}

module.exports = WithForm;
