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

    this.attributes({
        selectEvent: 'select',
        selectDataKey: 'key'
    });

    this._initCombobox = function () {
        composeOption(this._options, this);
        this.$node.combobox(this.initOptions());
    };

    this.onClear = function () {
        this.select();

        if (this.attr.clearEvent) {
            this.trigger(this.attr.clearEvent);
        }
    };

    this.onSelect = function (e, ui) {
        this.select(ui.item.value);
    };

    this.previousVal = null;

    this.select = function (id) {
        if (_.isUndefined(id)) {
            id = null;
        }

        if (this.previousVal !== id) {
            this.previousVal = id;

            var data = {};

            data[this.attr.selectDataKey] = id;
            this.trigger(this.attr.selectEvent, data);
        }
    };

    this.after('initialize', function () {
        this._initCombobox();

        this.on('autocompleteselect', this.onSelect);
        this.on('autocompleteclear', this.onClear);
    });

    this.before('teardown', function () {
        this.$node.combobox('destroy');
    });
}

module.exports = WithCombobox;
