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
            dropWidth: 'auto',
            onClick: this.onCheckOption,
            onUncheckAll: this.onCheckOption,
            onOpen: this.onSavedOptions
        };
    };

    this.onCheckOption = function () {
        var data = {};
        var id = this.$node.multipleSelect("getSelects").toString() || null;
        data[this.attr.selectDataKey] = id;
        this.trigger(this.attr.selectEvent, data);
    };

    this.onSavedOptions = function () {
        var savedOptions = this.$node.data('save');
        if(savedOptions) {
            this.$node.multipleSelect("setSelects", savedOptions.data);
        }
        this.$node.removeData('save');
    };

    this._initMultipleSelect = function () {
        composeOption(this._options, this);

        this.$node.multipleSelect(this.initOptions());
    };

    this.getDisplayItem = function () {
        if(this.$node.data('save')) {
            return this.$node.data('save');
        } else {
            return {
                data: this.$node.multipleSelect("getSelects"),
                text: this.$node.multipleSelect("getSelects", "text")
            };
        }
    };

    this.setDisplayItem = function (item) {
        if(item && item.text) {
            var text = item.text.toString();
            this.$node.data('save', item);

            if(text) {
                this.$node.next().find('.ms-choice .placeholder').text(text);
            }
        }
    };


    this.after('initialize', function () {
        this._initMultipleSelect();
    });

    // this.before('teardown', function () {
    //     this.$node.combobox('destroy');
    // });

}

module.exports = multipleSelect;
