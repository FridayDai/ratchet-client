var flight = require('flight');
var WithChildren = require('./WithChildren');

function WithPage() {
    require('../common/initSetup');

    flight.compose.mixin(this, [
        WithChildren
    ]);

    this.dialogs = function (options) {
        this._dialogs = options;
    };

    this._delegateDialogs = function () {
        var me = this;

        if (_.isPlainObject(this._dialogs)) {
            this._dialogs = [this._dialogs];
        }

        _.each(this._dialogs, function (item) {
            var $node = me.$node.find(me.attr[item.selector]);
            var method = item.method || 'onShow';
            var instance = null;

            var attach = _.once(function () {
                item.dialog.attachTo($node);
            });

            this.on(document, item.event, function (e, data) {
                attach();

                if (!instance) {
                    instance = flight.registry.findInstanceInfoByNode($node[0])[0].instance;
                }

                instance[method](e, data);
            });
        }, this);
    };

    this.after('initialize', function () {
        this._delegateDialogs();
    });

    this.before('teardown', function () {
        _.each(this._dialogs, function (item) {
            var $node = this.$node.select(item.selector);
            var instances = flight.registry.findInstanceInfoByNode($node[0]);

            _.each(instances, function (instance) {
                instance.instance.teardown();
            });
        }, this);
    });
}

module.exports = WithPage;
