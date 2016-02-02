var flight = require('flight');
var WithCombobox = require('../../common/WithCombobox');
var URLs = require('../../../constants/Urls');

var ALL_PROVIDER_FIRST = 'All';
var ALL_PROVIDER_SECOND = 'Providers';

function ToolbarProviderCombobox() {
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
                    firstName: ALL_PROVIDER_FIRST,
                    lastName: ALL_PROVIDER_SECOND
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

    this.attributes({
        selectDataKey: 'providerId',
        selectEvent: 'selectProviderForReportOverview',
        clearEvent: 'clearProviderForReportOverview'
    });
}

module.exports = flight.component(WithCombobox, ToolbarProviderCombobox);
