var flight = require('flight');

function WithChildren() {
    this.children = function (options) {
          this._children = options;
    };

    this._initChild = function () {
        _.each(this._children, function (child, selector) {
            if (_.isPlainObject(child)) {
                var obj = child;

                obj.child.attachTo(this.attr[selector], obj.attributes);
            } else {
                child.attachTo(this.attr[selector]);
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
