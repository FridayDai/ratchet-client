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

var DEFAULT_SELECT_EVENT = 'select';
var DEFAULT_CLEAR_EVENT = 'clear';
var DEFAULT_SELECT_DATA_KEY = 'key';

function WithCombobox() {
    flight.compose.mixin(this, [
        WithOptions
    ]);

    this.attributes({
        selectEvent: DEFAULT_SELECT_EVENT,
        clearEvent: DEFAULT_CLEAR_EVENT,
        selectDataKey: DEFAULT_SELECT_DATA_KEY
    });

    this._initCombobox = function () {
        composeOption(this._options, this);
        this.$node.combobox(this.initOptions());
    };

    this.onClear = function () {
        this.select();

        if (this.attr.clearEvent !== DEFAULT_CLEAR_EVENT) {
            this.trigger(this.attr.clearEvent);
        }
    };

    this.clear = function () {
        $(this.$node)
            .val('')
            .data("id", '');
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

            if (this.attr.selectEvent !== DEFAULT_SELECT_EVENT) {
                this.trigger(this.attr.selectEvent, data);
            }
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
