var flight = require('flight');
var WithDataTable = require('../common/WithDataTable');
var ZeroClipboard = require('ZeroClipboard');
var Notifications = require('../common/Notification');
var URLs = require('../../constants/Urls');
var PARAMs = require('../../constants/Params');
var STRINGs = require('../../constants/Strings');

function BulkImportTitleTable() {
    this.attributes({
        initWithoutRender: true,
        url: URLs.GET_BULK_IMPORT_LOOKUP,

        copyIconSelector: '.copy'
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
        var $parent = this.$node.parent();

        if ($parent.hasClass('dataTables_wrapper')) {
            $parent[show ? 'show' : 'hide']();
        }
    };

    this.onTitleSearch = function (e, data) {
        if (!this.isDataTableInitialized()) {
            this.initDataTable();
        } else {
            this.toggleTable(true);

        }

        this.search(data);
    };

    this.onDialogReset = function () {
        if (this.tableEl) {
            this.tableEl.order([0, 'desc']);
        }

        this.toggleTable(false);
    };

    this.initCopyIcon = function () {
        ZeroClipboard.config({swfPath: "./assets/ZeroClipboard.swf"});

        var client = new ZeroClipboard(this.select('copyIconSelector'));

        client.on( 'ready', function() {
            client.on('copy', function (e) {
                client.setText($(e.target).parent().text());
            });

            client.on('aftercopy', function (e) {
                var $self = $(e.target);

                $self.addClass("active");

                Notifications.showFadeOutMsg(STRINGs.ID_COPY_SUCCESS);

                setTimeout(function () {
                    $self.removeClass("active");
                }, 1500);
            });
        });
    };

    this.onDrawCallBack = function () {
        this.initCopyIcon();
    };

    this.after('initialize', function () {
        this.on(document, 'searchTitleForBulkImportTitleTable', this.onTitleSearch);
        this.on(document, 'bulkImportDialogReset', this.onDialogReset);

        this.on('drawCallback', this.onDrawCallBack);
    });
}

module.exports = flight.component(WithDataTable, BulkImportTitleTable);
