var flight = require('flight');
var KEYs = require('../../constants/Keys');

function ToolbarPanel() {
    this.attributes({
        groupNameSearchField: '#search-input'
    });

    this.triggerSearch = function () {
        var currentVal = this.select('groupNameSearchField').val();

        if (currentVal !== this.previousVal) {
            this.previousVal = currentVal;

            this.trigger('selectGroupNameForGroupTable', {
                name: currentVal
            });
        }
    };

    this.previousVal = '';

    this.onSearchGroupName = function (e) {
        if (e.which === KEYs.ENTER) {
            this.triggerSearch();
        }
    };

    this.after('initialize', function () {
        this.on('keydown', {
            groupNameSearchField: this.onSearchGroupName
        });

        this.on('click', {
            groupNameSearchField: this.triggerSearch
        });
    });
}

module.exports = flight.component(ToolbarPanel);

