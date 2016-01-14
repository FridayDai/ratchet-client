var flight = require('flight');
var WithCombobox = require('../common/WithCombobox');
var URLs = require('../../constants/Urls');

function ProviderFilter() {
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
                        data.unshift({
                            id: -1,
                            firstName: 'All',
                            lastName: 'Providers'
                        });

                        response($.map(data, function (item) {
                            return options.itemFormat.call(scope, item);
                        }));
                    });
                }
            };
        }

        return _.assign(options, result);
    }

    this.options({
        url: URLs.GET_PROVIDER,
        requestData: function (val) {
            return {
                name: val,
                type: 9,
                max: 1000
            };
        },
        itemFormat: function (data) {
            return {
                label: data.firstName + " " + data.lastName,
                value: data.id
            };
        }
    });

    this._initCombobox = function () {
        this.$node.combobox(composeOption(this._options, this));
    };

    this.onClear = function () {
        this.select();
    };

    this.onSelect = function (e, ui) {
        this.select(ui.item.value);
    };

    this.previousVal = null;

    this.select = function (id) {
        if (_.isUndefined(id) || id < 0) {
            id = null;
        }

        if (this.previousVal !== id) {
            this.previousVal = id;

            this.trigger('selectProviderForTaskCompletion', {
                surgeonId: id
            });
        }
    };

    this.after('initialize', function () {
        this.on('autocompleteselect', this.onSelect);
        this.on('autocompleteclear', this.onClear);
    });
}

module.exports = flight.component(WithCombobox, ProviderFilter);
