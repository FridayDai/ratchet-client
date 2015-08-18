function WithChildren() {
    this.children = function (options) {
          this._children = options;
    };

    this._initChild = function () {
        _.each(this._children, function (child, selector) {
            child.attachTo(this.attr[selector]);
        }, this);
    };

    this.after('initialize', function () {
        this._initChild();
    });
}

module.exports = WithChildren;
