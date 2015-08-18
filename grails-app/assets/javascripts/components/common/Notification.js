function getErrorContent(contentOps) {
    var divArr = [
        '<div class="window-container">',
            '<div class="window-title"></div>',
            '<div class="window-message"></div>',
        '</div>'
    ];

    var $errorDialog = $(divArr.join(''));
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

function createDialog ($content, options) {
     $content.dialog(_.assign({
        resizable: false,
        width: 350,
        modal: true,
        dialogClass: 'ui-size'
    }, options));

    return $content;
}

function setAnimation($element) {
    $element
        .on('dialogopen', function () {
            var $parent = $(this).parent();

            $parent.velocity('ratchet.bounceIn');
        })
        .on('dialogbeforeclose', function () {
            var $parent = $(this).parent();

            $parent.velocity('ratchet.expandOut');
        });
}

function setErrorDefaultEvents($element) {
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

module.exports = {
    error: function (contentOps, dialogOps) {
        var $content = getErrorContent(contentOps);

        setErrorDefaultEvents($content);

        setAnimation($content);

        createDialog($content, _.assign(ERROR_DEFAULT_OPTIONS, dialogOps));
    },

    confirm: function (content, options) {
    }
};
