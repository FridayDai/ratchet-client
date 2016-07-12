var flight = require('flight');
var WithCombobox = require('../../common/WithCombobox');
var URLs = require('../../../constants/Urls');

function ProviderFilter() {
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
                label: data.firstName + ' ' + data.lastName,
                value: data.id
            };
        }
    });

    this.select = function (id) {
        if (_.isUndefined(id) || id < 0) {
            id = null;
        }

        if (this.__previousVal !== id) {
            this.__previousVal = id;

            this.trigger('selectedForTaskCompletion', {
                providerId: id
            });
        }
    };

    this.attributes({
        clearEvent: 'clearForTaskCompletion',
        selectDataKey: 'providerId'
    });
}

module.exports = flight.component(WithCombobox, ProviderFilter);
