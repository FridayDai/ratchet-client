require('select2');

var flight = require('flight');
var WithOptions = require('./WithOptions');

function composeOption (options) {
    var result;

    if (options.url) {
        result = {
            tags: true,
            ajax: {
                transport: function (params) {
                    return $.ajax(_.assign(params, {dropProcess: true}));
                },
                url: options.url,
                data: function (name) {
                    return {
                        name: name,
                        length: 1000
                    };
                },
                results: function (data) {
                    var myResults = [];
                    $.each(data.data, function (index, item) {
                        myResults.push({
                            id: item.id,
                            text: item.name
                        });
                    });

                    return {
                        results: myResults
                    };
                }
            }
        };
    }

    return _.assign(options, result);
}

function WithSelectbox() {
    flight.compose.mixin(this, [
        WithOptions
    ]);

    this._initSelectbox = function () {
        this.$node.select2(composeOption(this._options, this));
    };

    this.clear = function () {
        this.$node.select2('val', '');
    };

    this.after('initialize', function () {
        this._initSelectbox();
    });

    this.before('teardown', function () {
        this.$node.select2('destroy');
    });
}

module.exports = WithSelectbox;
