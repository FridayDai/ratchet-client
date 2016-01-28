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
var DEFAULT_RESET_KEY = 'reset';

function WithCombobox() {
    flight.compose.mixin(this, [
        WithOptions
    ]);

    this.attributes({
        selectEvent: DEFAULT_SELECT_EVENT,
        clearEvent: DEFAULT_CLEAR_EVENT,
        selectDataKey: DEFAULT_SELECT_DATA_KEY,
        resetEvent: DEFAULT_RESET_KEY
    });

    this._initCombobox = function () {
        composeOption(this._options, this);
        this.$node.combobox(this.initOptions());
    };

    this.onClear = function () {
        this.clear();

        if (this.attr.clearEvent !== DEFAULT_CLEAR_EVENT) {
            this.trigger(this.attr.clearEvent);
        }
    };

    this.clear = function () {
        $(this.$node)
            .val('')
            .data("id", '');
        this.__previousVal = null;
    };

    this.onSelect = function (e, ui) {
        this.select(ui.item.value);
    };

    this.__previousVal = null;

    this.select = function (id) {
        if (_.isUndefined(id)) {
            id = null;
        }

        if (this.__previousVal !== id) {
            this.__previousVal = id;

            var data = {};

            data[this.attr.selectDataKey] = id;

            if (this.attr.selectEvent !== DEFAULT_SELECT_EVENT) {
                this.trigger(this.attr.selectEvent, data);
            }
        }
    };

    this.__onReset = function () {
        this.clear();
    };

    this.after('initialize', function () {
        this._initCombobox();
        this.clear();

        this.on('autocompleteselect', this.onSelect);
        this.on('autocompleteclear', this.onClear);

        if (this.attr.resetEvent !== DEFAULT_RESET_KEY) {
            this.on(document, this.attr.resetEvent, this.__onReset);
        }
    });

    this.before('teardown', function () {
        this.$node.combobox('destroy');
    });
}

module.exports = WithCombobox;
