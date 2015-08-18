var flight = require('flight');
var KEYs = require('../../constants/Keys');

function BulkImportToolbar() {
    this.attributes({
        searchFieldSelector: '#search-title-input',
        searchButtonSelector: '#search-title-btn'
    });

    this.triggerSearch = function () {
        this.trigger('searchTitleForBulkImportTitleTable', {
            title: this.select('searchFieldSelector').val()
        });
    };

    this.OnSearchFieldKeydown = function (e) {
        if (e.which === KEYs.ENTER) {
            this.triggerSearch();
        }
    };

    this.onBeforeDialogClose = function () {
        this.select('searchFieldSelector').val('');
    };

    this.after('initialize', function () {
        this.on(document, 'bulkImportDialogBeforeClose', this.onBeforeDialogClose);

        this.on('keydown', {
            searchFieldSelector: this.OnSearchFieldKeydown
        });

        this.on('click', {
            searchButtonSelector: this.triggerSearch
        })
    });
}

module.exports = flight.component(BulkImportToolbar);
