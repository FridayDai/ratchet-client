require("multiple-select");

var flight = require('flight');
var WithOptions = require('./WithOptions');

function composeOption(options, scope) {
    var result;

    if (options.url) {
        result = {
            source: function (request, response) {
                $.ajax({
                    type: "POST",
                    dropProcess: true,
                    url: options.url,
                    data: options.requestData.call(scope, request.term)
                }).done(function render(data) {
                    response($.map(data, function (item) {
                        return options.itemFormat.call(scope, item);
                    }));
                });
            }
        };
    }

    return _.assign(options, result);
}

function multipleSelect() {

    flight.compose.mixin(this, [
        WithOptions
    ]);

    this.defaultOptions = function () {
        return {
            selectAll: false,
            minimumCountSelected: 100,
            width: "auto",
            dropWidth: 'auto'
        };
    };

    this._initMultipleSelect = function () {
        composeOption(this._options, this);

        this.$node.multipleSelect(this.initOptions());
    };

    this.after('initialize', function () {
        this._initMultipleSelect();
    });

    // this.before('teardown', function () {
    //     this.$node.combobox('destroy');
    // });

}

module.exports = multipleSelect;
