var flight = require('flight');
var WithCombobox = require('../../common/WithCombobox');

function ToolbarYearCombobox() {
    var today = new Date();
    var year = today.getFullYear();
    var yearRange = [];

    for (var i = 2015; i <= year + 1; i++) {
        yearRange.push(i);
    }

    this.options({
        source: function (request, response) {
            response( _.map(yearRange, function (year) {
                return {
                    label: year,
                    value: year
                };
            }));
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
                year: id
            });
        }
    };

    this.attributes({
        clearEvent: 'clearForTaskCompletion',
        selectDataKey: 'year'
    });
}

module.exports = flight.component(WithCombobox, ToolbarYearCombobox);
