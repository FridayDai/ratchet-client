require('jquery-ui-dialog');
require('../../libs/dialog/dialog');
require('./WithVelocity');

function getNotificationContent() {
    var divArr = [
        '<div class="window-container">',
            '<div class="window-title"></div>',
            '<div class="window-message"></div>',
        '</div>'
    ];

    return $(divArr.join(''));
}

function getErrorContent(contentOps) {
    var $errorDialog = getNotificationContent();
    var $title = $errorDialog.find('.window-title');
    var $message = $errorDialog.find('.window-message');

    if (contentOps.title) {
        $title.append('<div class="window-error-title">{0}</div>'.format(contentOps.title));
    }

    if (contentOps.message) {
        $message.append('<div class="window-error">{0}</div>'.format(contentOps.message));
    }

    if (contentOps.errorMessage) {
        $message.append('<div class="window-error-message">{0}</div>'.format(contentOps.errorMessage));
    }

    return $errorDialog;
}

function getWarningContent(contentOps) {
    var $warningDialog = getNotificationContent();
    var $title = $warningDialog.find('.window-title');
    var $message = $warningDialog.find('.window-message');

    if (contentOps.title) {
        $title.append('<div class="window-warning-title">{0}</div>'.format(contentOps.title));
    }

    if (_.isString(contentOps.message)) {
        contentOps.message = [contentOps.message];
    }

    if (contentOps.message) {
        _.each(contentOps.message, function (message) {
            $message.append('<div class="window-warning">{0}</div>'.format(message));
        });
    }

    return $warningDialog;
}

function createDialog($content, options) {
     $content.dialog(_.assign({
        resizable: false,
        width: 350,
        modal: true,
        dialogClass: 'ui-dialog-warning'
    }, options));

    return $content;
}

function setAnimation($element) {
    $element
        .on('dialogopen', function () {
            var $parent = $(this).parent();

            $parent.velocity('ratchet.bounceIn');
        })
        .on('dialogprepareclose', function () {
            var $parent = $(this).parent();

            $parent.velocity('ratchet.expandOut');
        });
}

function setNotificationDefaultEvents($element) {
    $element
        .on('dialogcreate', function() {
            var $parent = $(this).parent();
            $parent.find('.ui-widget-header').addClass('ui-icon-show');
            $parent.find('.ui-dialog-titlebar-close').hide();
        })
        .on('dialogclose', function () {
            $(this).dialog('destroy');
        });
}

var ERROR_DEFAULT_OPTIONS = {
    buttons: {
        'Ok': function () {
            $(this).dialog("close");
        }
    }
};

var WARNING_DEFAULT_OPTIONS = {
    buttons: [{
        text: 'Cancel',
        click: function () {
            $(this).dialog("close");
        }
    }]
};

module.exports = {
    error: function (contentOps, dialogOps) {
        var $content = getErrorContent(contentOps);

        setNotificationDefaultEvents($content);
        setAnimation($content);

        createDialog($content, _.assign(ERROR_DEFAULT_OPTIONS, dialogOps));
    },

    confirm: function (contentOps, dialogOps) {
        var $content = getWarningContent(contentOps);

        setNotificationDefaultEvents($content);
        setAnimation($content);

        createDialog($content, _.assign(WARNING_DEFAULT_OPTIONS, dialogOps));
    },

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
    }
};
