var flight = require('flight');

function WithChildren() {
    this.children = function (options, attributes) {
        this.child = {};
        this._children = options;
        this._childrenAttrs = attributes;
    };

    this._initChild = function () {
        this._childrenAttrs = this._childrenAttrs || {};

        if (_.isFunction(this._childrenAttrs)) {
            this._childrenAttrs = this._childrenAttrs.call(this);
        }

        _.each(this._children, function (child, selector) {
            if (_.isPlainObject(child)) {
                var obj = child;

                this.child[selector] = obj.child.attachTo(
                    this.attr[selector],
                    _.defaults( obj.attributes, this._childrenAttrs)
                );
            } else {
                this.child[selector] = child.attachTo(
                    this.$node.find(this.attr[selector]),
                    this._childrenAttrs,
                    this.$node
                );
            }
        }, this);
    };

    this.after('initialize', function () {
        this._initChild();
    });

    this.before('teardown', function () {
        _.each(this._children, function (child, selector) {
            var instances = flight.registry.findInstanceInfoByNode(this.select(selector).get(0));

            _.each(instances, function (instance) {
                instance.instance.teardown();
            });
        }, this);
    });
}

module.exports = WithChildren;
