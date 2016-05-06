function ClearTabCache() {
    this.attributes({
        TabElement: null,
        clearCacheEvents: null
    });

    this._clearCache = function() {
        $(this.attr.TabElement).data('loaded', false);
    };

    this.after('initialize', function () {
        var me = this;

        if (_.isString(this.attr.clearCacheEvents)) {
            this.attr.clearCacheEvents = [this.attr.clearCacheEvents];
        }

        if (!_.isArray(this.attr.clearCacheEvents)) {
            throw 'clearCacheEvents should be one array.';
        }

        _.each(this.attr.clearCacheEvents, function (event) {
            me.on(document, event, me._clearCache);
        });
    });
}

module.exports = ClearTabCache;

