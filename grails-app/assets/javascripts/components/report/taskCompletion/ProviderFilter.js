var flight = require('flight');
var WithCombobox = require('../../common/WithCombobox');
var URLs = require('../../../constants/Urls');

function ProviderFilter() {
    var defaultName = {
        firstName: 'All',
        lastName: 'Providers'
    };

    this.options({
        source: function (request, response) {
            $.ajax({
                dropProcess: true,
                url: URLs.GET_PROVIDER,
                data: {
                    name: request.term,
                    type: 9,
                    max: 1000
                }
            }).done(function (data) {
                data.unshift({
                    id: -1,
                    firstName: defaultName.firstName,
                    lastName: defaultName.lastName
                });

                response($.map(data, function (item) {
                    return {
                        label: item.firstName + " " + item.lastName,
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

            this.trigger('selectProviderForTaskCompletion', {
                surgeonId: id
            });
        }
    };

    this.init = function () {
        this.$node.val(defaultName.firstName + ' ' + defaultName.lastName);
    };

    this.after('initialize', function () {
        this.init();
    });
}

module.exports = flight.component(WithCombobox, ProviderFilter);
