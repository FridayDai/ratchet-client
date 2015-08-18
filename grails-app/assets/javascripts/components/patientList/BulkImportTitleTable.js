var flight = require('flight');
var WithDataTable = require('../common/WithDataTable');
var URLs = require('../../constants/Urls');
var PARAMs = require('../../constants/Params');

function BulkImportTitleTable() {
    this.attributes({
        initWithoutRender: true,
        url: URLs.GET_BULK_IMPORT_LOOKUP
    });

    this.options({
        pageLength: 5,
        deferLoading: true,
        columnDefs: [
            {
                targets: 0,
                name: 'title',
                render: function (data, type, full) {
                    return data === undefined ? full.title : data;
                },
                width: "40%"
            }, {
                targets: 1,
                name: 'type',
                render: function (data, type, full) {
                    return data === undefined ? function () {
                        return PARAMs.BULK_IMPORT_TYPE[full.type];
                    } : data;
                },
                width: "30%"
            }, {
                targets: 2,
                name: 'id',
                render: function (data, type, full) {
                    var id = data === undefined ? full.id : data;
                    var html = [
                        "<div class='copy-id-content'>",
                            "<p class='id-text strong'>",
                                "{0}",
                                "<span class='copy' title='Copy to clipboard'></span>",
                            "</p >",
                        "</div>"
                    ].join('').format(id);
                    return html;
                },
                width: "30%"
            }
        ]
    });

    this.toggleTable = function (show) {
        this.$node.parent()[show ? 'show' : 'hide']();
    };

    this.onTitleSearch = function (e, data) {
        if (!this.isDataTableInitialized()) {
            this.initDataTable();
        } else {
            this.toggleTable(true);
        }

        this.search(data);
    };

    this.onBeforeDialogClose = function () {
        this.toggleTable(false);
    };

    this.after('initialize', function () {
        this.on(document, 'searchTitleForBulkImportTitleTable', this.onTitleSearch);
        this.on(document, 'bulkImportDialogBeforeClose', this.onBeforeDialogClose);
    });
}

module.exports = flight.component(WithDataTable, BulkImportTitleTable);
