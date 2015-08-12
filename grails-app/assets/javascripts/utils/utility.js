function setErrorDialogMessage ($errorDialog, options) {
    var $dialogParent = $errorDialog.parent().addClass('ui-size'),
        $uiButton = $dialogParent.find('.ui-button').addClass('btn-position'),
        $uiWindowTitle = $errorDialog.find('.window-title'),
        $uiWindowMessage = $errorDialog.find('.window-message');

    $dialogParent.find('.ui-widget-header').addClass('ui-icon-show');

    $($uiButton[1]).addClass('btn-ok');

    $uiWindowTitle.html('<div class="window-error-title">' + options.title + '</div>');
    $uiWindowMessage.html('');

    if (options.message) {
        $uiWindowMessage.append('<div class="window-error">' + options.message + '</div>');
    }
    if (options.errorMessage) {
        $uiWindowMessage.append('<div class="window-error-message">' + options.errorMessage + '</div>');
    }
}

module.exports = {
    showFadeOutMsg: function (options) {
        if (_.isString(options)) {
            options = {
                msg: options
            };
        }

        var top = options.top || '33%',
            left = options.left || '50%',
            remain = options.remain || 2000,
            numRegExp = /\d+/,
            marginLeft;

        var $msgDiv = $("#msg-info");

        if ($msgDiv.length === 0) {
            $msgDiv = $('<div id="msg-info" class="ui-hide ui-tips ui-tips-center msg-info"></div>');

            $(document.body).append($msgDiv);
        }



        $msgDiv = $msgDiv.text(options.msg).css({
            position: 'fixed',
            top: top,
            left: left
        });

        marginLeft =
            (parseInt(numRegExp.exec($msgDiv.css('width')), 10) +
            parseInt(numRegExp.exec($msgDiv.css('padding-left')), 10)) / -2;

        $msgDiv.css({
            'margin-left':  marginLeft + 'px'
        });

        $msgDiv.fadeIn("slow");

        setTimeout(function () {
            $msgDiv.fadeOut("slow");
        }, remain);
    },

    progress: function (hide) {
        var elementStr = [
                '<div id="msg-process">',
                '<div class="msg-process-background ui-tips ui-tips-center"></div>',
                '<span class="msg-process-loading"></span>',
                '</div>'
            ].join('');

        var $process = $("#msg-process");

        if (hide === undefined || hide === false) {
            if ($process.length > 0) {
                $process.hide();
            }
        } else {
            if ($process.length === 0) {
                $process = $(elementStr);

                $(document.body).append($process);
            }

            $process.show();
        }
    },

    showErrorDialog: function (options) {
        var $errorDialog = $('#error-dialog');

        if ($errorDialog.length === 0) {
            var divArr = [
                '<div id="error-dialog" class="window-container">',
                '<div class="window-title"></div>',
                '<div class="window-message"></div>',
                '</div>'
            ];

            $errorDialog = $(divArr.join(''));

            $(document.body).append($errorDialog);

            $errorDialog.dialog({
                autoOpen: false,
                resizable: false,
                height: 140,
                width: 350,
                modal: true,
                open: function () {
                    $(this).parent().removeClass('hideSweetAlert').addClass('showSweetAlert');
                },
                close: function () {
                    $(this).parent().removeClass('showSweetAlert').addClass('hideSweetAlert');
                },
                buttons: {
                    'Ok': function () {
                        $errorDialog.dialog("close");
                    }
                }
            });
        }

        if (_.isFunction(options.closeCallback)) {
            $errorDialog.off('dialogbeforeclose');

            $errorDialog.on("dialogbeforeclose", options.closeCallback);
        }

        setErrorDialogMessage($errorDialog, options);

        $errorDialog.dialog("open");
    }
};
