var flight = require('flight');
var WithDialog = require('../common/WithDialog');
var Notifications = require('../common/Notification');
var WithChildren = require('../common/WithChildren');
var Utility = require('../../utils/Utility');
var URLs = require('../../constants/Urls');

var BulkImportToolbar = require('./BulkImportToolbar');
var BulkImportTitleTable = require('./BulkImportTitleTable');
var BulkImportFilePanel = require('./BulkImportFilePanel');
var BulkImportResultTable = require('./BulkImportResultTable');

function BulkImportDialog() {
    this.attributes({
        toolbarSelector: '#bulk-import-form .search-content',
        titleTableSelector: '#helpTable',
        searchTipSelector: '.search-tip',
        importFilePanelSelector: '.import-file-panel',
        importResultTableSelector: '#patient-list',
        importPanelSelector: '.import-content',
        afterImportPanelSelector: '.after-important'
    });

    this.children({
        toolbarSelector: BulkImportToolbar,
        titleTableSelector: BulkImportTitleTable,
        importFilePanelSelector: BulkImportFilePanel,
        importResultTableSelector: BulkImportResultTable
    });

    this.setWindowResize = function () {
        this.onWindowResizeBind = _.bind(this.onWindowResize, this);

        $(window).on('resize', this.onWindowResizeBind);
    };

    this.onWindowResize = function () {
        var $dialog = this.$node.parent();

        $dialog.css({
            height: Utility.getWindowSize().height,
            width: Utility.getWindowSize().width - 30,
            left: 0,
            top: 0
        });

        if ($dialog.height() <= 630) {
            $dialog.css("overflow", "auto");
        } else {
            $dialog.css("overflow", "hidden");
        }
    };

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
        var me = this;

        if (this.hasDataUploaded()) {
            Notifications.confirm({
                title: 'ARE YOU SURE?',
                message: 'Are you sure you want to discard the patient list?'
            }, {
                buttons: [
                    {
                        text: 'Discard Patients',
                        'class': 'btn-agree',
                        click: function () {
                            me.clearUploadedFlag();

                            // Warning dialog close
                            $(this).dialog("close");

                            // Bulk import dialog close
                            me.close();
                        }
                    }, {
                        text: 'Cancel',
                        click: function () {
                            $(this).dialog("close");
                        }
                    }
                ]
            });

            return false;
        }
    };

    this.clearUploadedFlag = function () {
        this._isFileUploaded = false;
    };

    this.hasDataUploaded = function () {
          return this._isFileUploaded;
    };

    this.onClose = function () {
        this.resetDialog();
    };

    this.resetDialog = function () {
        this.recoveryWindowScroll();
        this.toggleSearchTip(true);

        this._isFileUploaded = false;
        this._fileUploadData = null;

        this.select('importPanelSelector').show();
        this.select('afterImportPanelSelector').hide();

        this.setNextButtonText('Next');
        this.toggleNextButton(false);

        this.trigger('bulkImportDialogReset');
    };

    this.confirmHandler = function () {
        var me = this;

        if (this.select('importResultTableSelector').is(":visible")) {
            $.ajax({
                url: URLs.SAVE_BULK_IMPORT_DATA,
                type: "post",
                data: {
                    bulkList: JSON.stringify(this._fileUploadData)
                },
                success: function () {
                    me.clearUploadedFlag();
                    me.close();
                    me.trigger('bulkImportSavedSuccess', {
                        number: me._fileUploadData.length
                    });
                }
            });
        } else {
            this.select('importPanelSelector').hide();
            this.select('afterImportPanelSelector').show();
            this.setNextButtonText('Confirm');

            this.trigger('setDataForBulkImportResultTable', {
                data: this._fileUploadData
            });
        }
    };

    this.cancelHandler = function () {
        this.close();
    };

    this.onTitleSearch = function () {
        this.toggleSearchTip(false);
    };

    this.toggleSearchTip = function (show) {
        this.select('searchTipSelector')[show ? 'show' : 'hide']();
    };

    this.toggleNextButton = function (isEnable) {
        var $nextButton = this.dialogEl.parent().find('.ui-dialog-buttonset button').first();

        if (isEnable) {
            $nextButton.button("enable");
        } else {
            $nextButton.button("disable");
        }
    };

    this.setNextButtonText = function (text) {
        this.dialogEl.parent().find('.ui-dialog-buttonset button').first().text(text);
    };

    this._isFileUploaded = false;
    this._fileUploadData = null;

    this.onBulkImportFileUploadSuccess = function (e, data) {
        this._isFileUploaded = true;
        this._fileUploadData = data.data;

        this.toggleNextButton(true);
    };

    this.onBulkImportFileUploadFail = function () {
        this._isFileUploaded = true;
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
        this.on('dialogclose', this.onClose);

        this.on(document, 'searchTitleForBulkImportTitleTable', this.onTitleSearch);
        this.on(document, 'bulkImportFileUploadSuccess', this.onBulkImportFileUploadSuccess);
        this.on(document, 'bulkImportFileUploadFail', this.onBulkImportFileUploadFail);

        this.setWindowResize();
        this.toggleNextButton(false);
    });

    this.before('teardown', function () {
        $(window).off('resize', this.onWindowResizeBind);
    });
}

module.exports = flight.component(WithChildren, WithDialog, BulkImportDialog);
