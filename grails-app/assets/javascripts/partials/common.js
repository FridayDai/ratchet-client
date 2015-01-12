(function ($, undefined) {
    'use strict';
    var common = RC.common = RC.common || {};

    function _init() {
        $.validator.setDefaults({
            showErrors: function (errorMap, errorList) {

                $.each(this.validElements(), function (index, element) {
                    RC.common.hideErrorTip(element);
                });

                $.each(errorList, function (index, error) {
                    RC.common.showErrorTip(error);
                });
            },
            focusInvalid: false
        });
    }

    function _setWaringContainer(container, warningArguments) {
        var $container = $(container);
        var containerParent = $container.parent().addClass('ui-size'),
            uiButton = containerParent.find('.ui-button').addClass('btn-position'),
            uiWindowTitle = $container.find('.window-title'),
            uiWindowMessage = $container.find('.window-message');
        containerParent.find('.ui-widget-header').addClass('ui-icon-show');

        $('<div class="ui-icon-add"></div>').insertBefore(containerParent.find('.ui-button-text')[0]);
        $(uiButton[1]).addClass('btn-cancel');

        uiWindowTitle.html('<div class="window-warning-title">' + warningArguments.title + '</div>');
        uiWindowMessage.html('<div class="window-warning">' + warningArguments.message + '</div>');
        return $container;
    }

    $.extend(common, {
        /**
         * show progress on pages
         * @param hide
         */
        progress: function (hide) {
            if (window !== window.top) {
                window.top.RC.common.progress(hide);
                return;
            }
            if (hide === undefined || hide === false) {
                if ($("#msg-process").length > 0) {
                    $("#msg-process").hide();
                }
            } else {
                var remain = 1000,
                    msg = RC.constants.loadingContent;
                var $msgDiv = $('<div id="msg-process" class="ui-tips ui-tips-center"></div>');
                if ($("#msg-process").length > 0) {
                    $msgDiv = $("#msg-process");
                } else {
                    $(document.body).append($msgDiv);
                }
                $msgDiv.html(msg).show();
                setTimeout(function () {
                        $msgDiv.hide();
                        $msgDiv.trigger("timeout");
                    },
                    remain);
            }
        },
        /**
         * show remind message
         * @param msg
         * @param remain
         */
        showMsg: function (msg, remain) {
            if (window !== window.top) {
                window.top.RC.common.showMsg(msg, remain);
                return;
            }
            var $msgDiv = $('<div id="msg-info" class="ui-hide ui-tips ui-tips-center"></div>');
            if ($("#msg-info").length > 0) {
                $msgDiv = $("#msg-info");
            } else {
                $(document.body).append($msgDiv);
            }
            var self = this;

            remain = remain || 2000;

            $msgDiv.fadeIn("slow").html(msg);
            setTimeout(function () {
                    $msgDiv.fadeOut("slow");
                },
                remain);
            return self;
        },
        /**
         * confirm form
         * @param element
         * @param title
         * @param message
         * @param okCallback
         * @param cancelCallback
         * @param height
         * @param width
         */
        confirmForm: function (confirmFormArguments) {
            if (window !== window.top) {
                window.top.RC.common.confirmForm(confirmFormArguments);
                return;
            }
            var height = confirmFormArguments.height || 300,
                width = confirmFormArguments.width || 350;
            var $container = $(confirmFormArguments.element);
            var dialog = $container.dialog({
                autoOpen: false,
                resizable: false,
                height: height,
                width: width,
                modal: true,
                title: confirmFormArguments.title,
                buttons: {
                    "CONFIRM": function (e) {
                        if ($.isFunction(confirmFormArguments.okCallback) && (confirmFormArguments.okCallback)(e)) {
                            dialog.dialog("close");
                        }
                    },
                    CANCEL: function (e) {
                        if ($.isFunction(confirmFormArguments.cancelCallback)) {
                            (confirmFormArguments.cancelCallback)(e);
                        }
                        dialog.dialog("close");

                        var elementList = $(confirmFormArguments.element).find("input");
                        $.each(elementList, function (index, element) {
                            RC.common.hideErrorTip(element);
                        });
                    }
                },
                close: function () {
                    //form.reset();
                }
            });
            $container.removeClass('ui-hidden');
            dialog.dialog("open");
            return false;

        },
        /**
         * confirm dialogue
         * @param title
         * @param message
         * @param okCallback
         * @param cancelCallback
         */
        confirm: function (confirmArguments) {
            if (window !== window.top) {
                window.top.RC.common.confirm(confirmArguments);
                return;
            }
            var $container;
            if ($(".window-Container").length > 0) {
                $container = $(".window-Container");
            } else {
                $container = $('<div class="window-Container"><div class="window-message" ></div></div>');
                $container.find('.window-message').html('<div class="window-confirm">' +
                confirmArguments.message + '</div>');
                $(document.body).append($container);
            }
            var dialog = $container.dialog();
            if (!dialog) {
                $container.dialog({
                    autoOpen: false,
                    resizable: false,
                    height: 140,
                    width: 350,
                    modal: true,
                    buttons: {
                        "Ok": function (e) {
                            if ($.isFunction(confirmArguments.okCallback) && (confirmArguments.okCallback)(e)) {
                                dialog.dialog("close");
                            }
                        },
                        Cancel: function (e) {
                            if ($.isFunction(confirmArguments.cancelCallback)) {
                                (confirmArguments.cancelCallback)(e);
                            }
                            dialog.dialog("close");
                        }
                    },
                    close: function () {

                    }
                });
            }
            dialog.dialog("open");
            return false;
        },

        /**
         * waring dialogue
         * @param title
         * @param message
         * @param closeCallback
         */
        warning: function (warningArguments) {
            if (window !== window.top) {
                window.top.RC.common.warning(warningArguments);
                return;
            }
            var $container,
                dialog;
            if ($(".window-container").length > 0) {
                $container = $(".window-container");
            } else {
                $container = $('<div class="window-container">' +
                '<div class="window-title"></div>' +
                '<div class="window-message"></div>' +
                '</div>');
                $(document.body).append($container);
            }

            dialog = $container.dialog({
                autoOpen: false,
                resizable: false,
                height: 140,
                width: 350,
                modal: true,
                buttons: {
                    PROCEED: function (e) {
                        if ($.isFunction(warningArguments.closeCallback)) {
                            (warningArguments.closeCallback)(e);
                        }
                        dialog.dialog("close");
                    },
                    CANCEL: function (e) {
                        if ($.isFunction(warningArguments.cancelCallback)) {
                            (warningArguments.cancelCallback)(e);
                        }
                        dialog.dialog("close");
                    }
                }
            });
            $container = _setWaringContainer($container, warningArguments);
            dialog.dialog("open");
            return false;
        },

        /**
         * show error tip
         * @param errorElement
         * @param showType
         */
        showErrorTip: function (errorElement) {
            var element = $(errorElement.element);
            var errorMessage = errorElement.message;
            element.attr("data-error-msg", errorMessage);
            var className = "error-msg-right";
            if (element.is("[data-class]")) {
                className = element.attr("data-class");
            }
            var position;
            switch (className) {
                case 'error-msg-top':
                    position = {my: 'center bottom', at: 'center top-10'};
                    break;
                case 'error-msg-bottom':
                    position = {my: 'center top', at: 'center bottom+10'};
                    break;
                case 'error-msg-left':
                    position = {my: 'right center', at: 'left-10 center'};
                    break;
                case 'error-msg-right':
                    position = {my: 'left center', at: 'right+10 center'};
                    break;
            }
            position.collision = 'none';
            var errorContent = $('<div class="validation-error-text">' +
            '<i class="misc-icon ui-validation-error"></i>' + errorMessage + '</div>');
            var tooltips = element.tooltip({
                tooltipClass: className,
                position: position,
                items: "[data-error-msg], [title]",
                content: function () {
                    if (element.is("[data-error-msg]")) {
                        return errorContent;
                    }
                    if (element.is("[title]")) {
                        return element.attr("title");
                    }
                    return errorContent;
                }
            });
            tooltips.tooltip("open");
        },

        /**
         * hide error tip
         * @param element
         */
        hideErrorTip: function (errorElement) {
            var element = $(errorElement);
            if ($(element).tooltip()) {
                $(element).tooltip("destroy");
                $(element).removeAttr("data-error-msg");
            }
        },

        /**
         * tooltip
         */
        tooltip: function () {

        }


    });
    _init();
})(jQuery);
