var flight = require('flight');
var WithCombobox = require('../../common/WithCombobox');
var URLs = require('../../../constants/Urls');

function AddTasksProviderCombobox() {
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
        },
        appendTo: ".container"
    });

    this.attributes({
        selectDataKey: 'providerId'
    });

    this.after('initialize', function () {
        this.on(document, this.attr.resetEvent, this.clear);
    });
}

module.exports = flight.component(WithCombobox, AddTasksProviderCombobox);
