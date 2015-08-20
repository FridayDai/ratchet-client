require('jquery-file-upload');

var flight = require('flight');
var STRINGs = require('../../constants/Strings');
var URLs = require('../../constants/Urls');

var DATA_ERROR_STRING = [
    "{0} ",
    "<a class='error-link' target='_blank' href='{1}'>",
        "Download Error File",
    "</a>"
].join('').format(STRINGs.BULK_IMPORT_DATA_ERROR, URLs.DOWNLOAD_BULK_IMPORT_ERROR_FILE);


function BulkImportFilePanel() {
    this.attributes({
        fileUploadButtonSelector: '#fileupload',
        processBoxSelector: '.progress-box',
        processBarSelector: '.progress-bar',
        uploadErrorSelector: '.upload-error',
        uploadSuccessSelector: '.upload-success',
        errorTipSelector: '.error-tip',
        resultBoxSelector: '.result-box'
    });

    this.beforeSend = function () {
        this.select('processBoxSelector').show();

        _.each(
            ['uploadErrorSelector', 'uploadSuccessSelector', 'errorTipSelector'],
            function (selector) {
                this.select(selector).hide();
            }, this);
    };

    this.fileUploadDone = function (jxhr, data) {
        _.each(data.files, function (file) {
            $('<p class="upload-success"/>').text(file.name).appendTo('.result-box');
        });

        _.each(
            ['uploadErrorSelector', 'errorTipSelector'],
            function (selector) {
                this.select(selector).hide();
            }, this);

        this.trigger('bulkImportFileUploadSuccess', data.result);
    };

    this.fileUploadError = function (jxhr) {
        var tip, error;

        if (jxhr.status === 209) {
            tip = DATA_ERROR_STRING;
            error = "Data Error!";
        } else {
            tip = STRINGs.BULK_IMPORT_FORMAT_ERROR;
            error = jxhr.responseText;
        }

        this.select('resultBoxSelector').show();
        this.select('uploadErrorSelector').html(error).show();
        this.select('errorTipSelector').html(tip).show();

        this.trigger('bulkImportFileUploadFail');
    };

    this.fileUploadComplete = function () {
        this.select('processBoxSelector').hide();
        this.select('processBarSelector').css({width: 0});
    };

    this.progressAll = function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);

        this.select('processBarSelector').css(
            'width',
            progress + '%'
        );
    };

    this.init = function () {
        this.select('fileUploadButtonSelector')
            .fileupload({
                dataType: 'json',
                dropProcess: true,
                beforeSend: _.bind(this.beforeSend, this),
                done: _.bind(this.fileUploadDone, this),
                error: _.bind(this.fileUploadError, this),
                complete: _.bind(this.fileUploadComplete, this),
                progressall: _.bind(this.progressAll, this)
            })
            .prop('disabled', !$.support.fileInput)
            .parent()
            .addClass($.support.fileInput ? undefined : 'disabled');
    };

    this.onDialogReset = function () {
        _.each(
            [
                'processBoxSelector',
                'uploadErrorSelector',
                'uploadSuccessSelector',
                'errorTipSelector'
            ],
            function (selector) {
                this.select(selector).hide();
            },
            this
        );

        this.select('uploadErrorSelector').empty();
        this.select('uploadSuccessSelector').remove();
    };

    this.after('initialize', function () {
        this.init();

        this.on(document, 'bulkImportDialogReset', this.onDialogReset);
    });
}

module.exports = flight.component(BulkImportFilePanel);
