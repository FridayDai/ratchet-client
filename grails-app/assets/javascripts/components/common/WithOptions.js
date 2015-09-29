function bindDeep(obj, scope) {
    _.each(obj, function (val, key) {
        if (_.isPlainObject(val) || _.isArray(val)) {
            bindDeep(val, scope);
        } else if (_.isFunction(val)) {
            obj[key] = _.bind(val, scope);
        }
    });

    return obj;
}

function WithOptions() {
    this.options = function (options) {
        this._options = options;
    };

    this.initOptions = function () {
        if (_.isFunction(this.defaultOptions)) {
            this.defaultOptions = this.defaultOptions();
        }

        if (!this._options && _.isFunction(this.getOptions)) {
            this._options = this.getOptions();
        }

        this._optionsDef = _.defaultsDeep(_.clone(this._options, true), this.defaultOptions);

        return bindDeep(this._optionsDef, this);
    };
}

module.exports = WithOptions;
