var flight = require('flight');
var WithCombobox = require('../../common/WithCombobox');
var URLs = require('../../../constants/Urls');

function ToolbarToolCombobox() {
    this.options({
        source: function (request, response) {
            $.ajax({
                dropProcess: true,
                url: URLs.GET_CLIENT_TOOLS
            }).done(function (data) {
                response($.map(data, function (item) {
                    return {
                        label: item.title,
                        value: item.id
                    };
                }));
            });
        },
        appendTo: ".container"
    });

    this.select = function (id) {
        if (_.isUndefined(id) || id < 0) {
            id = null;
        }

        if (this.__previousVal !== id) {
            this.__previousVal = id;

            this.trigger('selectedForTaskCompletion', {
                toolId: id
            });
        }
    };

    this.attributes({
        clearEvent: 'clearForTaskCompletion',
        selectDataKey: 'toolId'
    });

}

module.exports = flight.component(WithCombobox, ToolbarToolCombobox);
