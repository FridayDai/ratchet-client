var flight = require('flight');
var WithCombobox = require('../../common/WithCombobox');
var URLs = require('../../../constants/Urls');

function ToolbarToolCombobox() {
    this.options({
        source: function (request, response) {
            $.ajax({
                dropProcess: true,
                url: URLs.GET_PATIENT_TOOLS.format(this.$node.data('patientId'))
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

    this.attributes({
        selectEvent: 'selectToolForIndividualReport',
        clearEvent: 'clearToolForIndividualReport',
        selectDataKey: 'toolId'
    });
}

module.exports = flight.component(WithCombobox, ToolbarToolCombobox);
