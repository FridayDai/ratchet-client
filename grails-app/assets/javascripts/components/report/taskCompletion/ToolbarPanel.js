var flight = require('flight');
var WithChildren = require('../../common/WithChildren');
var URLs = require('../../../constants/Urls');

var ProviderCombobox = require('./ProviderFilter');
var ToolCombobox = require('./ToolbarToolCombobox');
var YearCombobox = require('./ToolbarYearCombobox');

function ToolbarPanel() {
    this.attributes({
        toolFieldSelector: '#toolFilter',
        providerFieldSelector: '#selectSurgeon',
        yearFieldSelector: '#yearFilter'
    });

    this.children({
        toolFieldSelector: ToolCombobox,
        providerFieldSelector: ProviderCombobox,
        yearFieldSelector: YearCombobox
    });

    this.searchFields = {
        providerId: null,
        toolId: null,
        year: null
    };

    this.combinedFilter = function (e, data) {
        _.assign(this.searchFields, data);

        this.search();
    };

    this.search = function () {
        var me = this;

        $.ajax({
            url: URLs.GET_TASK_COMPLETION,
            type: "POST",
            data: me.searchFields,
            success: function (data) {
                me.trigger('renderTaskCompletionChart', data);
            }
        });
    };

    this.after('initialize', function () {
        this.on(document, 'selectedForTaskCompletion', this.combinedFilter);
        this.on(document, 'clearForTaskCompletion', this.combinedFilter);

    });
}

module.exports = flight.component(WithChildren, ToolbarPanel);
