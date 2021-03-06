require('select2');
require('../../libs/jquery-validation/jquery.validate.js');

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
        this.$node
            .select2(composeOption(this._options, this))
            .change(function () {
                $(this).valid();
            })
            .on('select2-open', function () {
                var $container = $(this).select2('container');

                if (!$container.hasClass('opening')) {
                    $container.addClass('opening');
                }
            }).on('select2-loaded', function () {
                $(this).select2('container')
                    .removeClass('opening');
            });
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
