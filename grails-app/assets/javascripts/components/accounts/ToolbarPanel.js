var flight = require('flight');
var KEYs = require('../../constants/Keys');

function ToolbarPanel() {
    this.attributes({
        accountIDNameSearchField: '#search-input',
        accountIDNameSearchButton: '#search-btn'
    });

    this.triggerSearch = function () {
        var currentVal = this.select('accountIDNameSearchField').val();

        if (currentVal !== this.previousVal) {
            this.previousVal = currentVal;

            this.trigger('selectAccountIDNameForAccountTable', {
                name: currentVal
            });
        }
    };

    this.previousVal = '';

    this.onSearchAccountIDName = function (e) {
        if (e.which === KEYs.ENTER) {
            this.triggerSearch();
        }
    };

    this.after('initialize', function () {
        this.on('keydown', {
            accountIDNameSearchField: this.onSearchAccountIDName
        });

        this.on('click', {
            accountIDNameSearchButton: this.triggerSearch
        });
    });
}

module.exports = flight.component(ToolbarPanel);
