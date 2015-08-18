var flight = require('flight');
var WithDialog = require('../common/WithDialog');
var WithChildren = require('../common/WithChildren');
var Utility = require('../../utils/Utility');

var BulkImportToolbar = require('./BulkImportToolbar');
var BulkImportTitleTable = require('./BulkImportTitleTable');

function BulkImportDialog() {
    this.attributes({
        toolbarSelector: '#bulk-import-form .search-content',
        titleTableSelector: '#helpTable',
        searchTipSelector: '.search-tip'
    });

    this.children({
        toolbarSelector: BulkImportToolbar,
        titleTableSelector: BulkImportTitleTable
    });

    this.setWindowNoScroll = function () {
        $('body').css('overflow', 'hidden');
    };

    this.recoveryWindowScroll = function () {
        $('body').css('overflow', '');
    };

    this.onShow = function () {
        this.$node.removeClass('ui-hidden');
        this.setWindowNoScroll();
        this.show();
    };

    this.onBeforeClose = function () {
        this.recoveryWindowScroll();
        this.toggleSearchTip(true);

        this.trigger('bulkImportDialogBeforeClose');
    };

    this.confirmHandler = function () {

    };

    this.cancelHandler = function () {

    };

    this.onTitleSearch = function () {
        this.toggleSearchTip(false);
    };

    this.toggleSearchTip = function (show) {
        this.select('searchTipSelector')[show ? 'show' : 'hide']();
    };

    this.options({
        title: 'BULK IMPORT',
        height: Utility.getWindowSize().height,
        width: Utility.getWindowSize().width - 30,
        position: { my: "left top", at: "left top", of: window },
        buttons: {
            Next: this.confirmHandler,
            Cancel: this.cancelHandler
        }
    });

    this.after('initialize', function () {
        this.on('dialogbeforeclose', this.onBeforeClose);

        this.on(document, 'searchTitleForBulkImportTitleTable', this.onTitleSearch);
    });
}

module.exports = flight.component(WithChildren, WithDialog, BulkImportDialog);
