function withForm() {
    /* jshint validthis:true */

    this.attributes({
        formSelector: 'form'
    });

    this._init = function () {
        this.formEl = this.select('formSelector');

        if ($.isFunction(this.initValidation)) {
            this.initValidation();
        }
    };

    this.after('initialize', function () {
        this._init();
    });
}

module.exports = withForm;
