require('../../libs/combobox/combobox');

var flight = require('flight');
var WithOptions = require('./WithOptions');

function composeOption (options, scope) {
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

function WithCombobox() {
    flight.compose.mixin(this, [
        WithOptions
    ]);

    this._initCombobox = function () {
        this.$node.combobox(composeOption(this._options, this));
    };

    this.after('initialize', function () {
        this._initCombobox();
    });

    this.before('teardown', function () {
        this.$node.combobox('destroy');
    });
}

module.exports = WithCombobox;
