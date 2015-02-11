(function ($, undefined) {
    'use strict';
    var common = RC.common = RC.common || {};

    function _init() {
        _setValidator();
        _dataTablePagination();
        _setGlobalAjax();
        $('select').select2();
    }

    /**
     * set global validator
     * @private
     */
    function _setValidator() {
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

    /**
     * global ajax set up
     * @private
     */
    function _setGlobalAjax() {

        $.ajaxSetup({
            beforeSend: function () {
                RC.common.progress(true);
            },
            complete: function () {
                RC.common.progress(false);
            },
            success: function () {

            },
            global: true,
            error: function (jqXHR) {
                if (jqXHR.status === 404) {
                    //window.location.href = "/";
                } else if (jqXHR.status === 403) {
                    window.location.href = "/login";

                } else if (jqXHR.status === 0) {

                }
                else {

                }
            }
        });
    }



    /**
     * Pipelining function for DataTables. To be used to the `ajax` option of DataTables
     * @private
     */
    function _dataTablePagination() {

        $.fn.dataTable.pipeline = function (opts) {
            // Configuration options
            var conf = $.extend({
                pages: 5,     // number of pages to cache
                url: '',      // script url
                data: null,   // function or object with parameters to send to the server
                              // matching how `ajax.data` works in DataTables
                method: 'GET' // Ajax HTTP method
            }, opts);

            // Private variables for storing the cache
            var cacheLower = -1;
            var cacheUpper = null;
            var cacheLastRequest = null;
            var cacheLastJson = null;

            return function (request, drawCallback, settings) {
                var ajax = false;
                var requestStart = request.start;
                var drawStart = request.start;
                var requestLength = request.length;
                var requestEnd = requestStart + requestLength;

                if (settings.clearCache) {
                    // API requested that the cache be cleared
                    ajax = true;
                    settings.clearCache = false;
                }
                else if (cacheLower < 0 || requestStart < cacheLower || requestEnd > cacheUpper) {
                    // outside cached data - need to make a request
                    ajax = true;
                }
                else if (JSON.stringify(request.order) !== JSON.stringify(cacheLastRequest.order) ||
                    JSON.stringify(request.columns) !== JSON.stringify(cacheLastRequest.columns) ||
                    JSON.stringify(request.search) !== JSON.stringify(cacheLastRequest.search)
                ) {
                    // properties changed (ordering, columns, searching)
                    ajax = true;
                }

                // Store the request for checking next time around
                cacheLastRequest = $.extend(true, {}, request);

                if (ajax) {
                    // Need data from the server
                    if (requestStart < cacheLower) {
                        requestStart = requestStart - (requestLength * (conf.pages - 1));

                        if (requestStart < 0) {
                            requestStart = 0;
                        }
                    }

                    cacheLower = requestStart;
                    cacheUpper = requestStart + (requestLength * conf.pages);

                    request.start = requestStart;
                    request.length = requestLength * conf.pages;

                    // Provide the same `data` options as DataTables.
                    if ($.isFunction(conf.data)) {
                        // As a function it is executed with the data object as an arg
                        // for manipulation. If an object is returned, it is used as the
                        // data object to submit
                        var d = conf.data(request);
                        if (d) {
                            $.extend(request, d);
                        }
                    }
                    else if ($.isPlainObject(conf.data)) {
                        // As an object, the data given extends the default
                        $.extend(request, conf.data);
                    }

                    settings.jqXHR = $.ajax({
                        "type": conf.method,
                        "url": conf.url,
                        "data": request,
                        "dataType": "json",
                        "cache": false,
                        "success": function (json) {
                            cacheLastJson = $.extend(true, {}, json);

                            if (cacheLower !== drawStart) {
                                json.data.splice(0, drawStart - cacheLower);
                            }
                            json.data.splice(requestLength, json.data.length);

                            drawCallback(json);
                        }
                    });
                }
                else {
                    var json;
                    json = $.extend(true, {}, cacheLastJson);
                    json.draw = request.draw; // Update the echo for each response
                    json.data.splice(0, requestStart - cacheLower);
                    json.data.splice(requestLength, json.data.length);

                    drawCallback(json);
                }
            };
        };

        // Register an API method that will empty the pipelined data, forcing an Ajax
        // fetch on the next draw (i.e. `table.clearPipeline().draw()`)
        $.fn.dataTable.Api.register('clearPipeline()', function () {
            return this.iterator('table', function (settings) {
                settings.clearCache = true;
            });
        });

    }

    /**
     * set waring container
     * @param container
     * @param warningArguments
     * @returns {*|HTMLElement}
     * @private
     */
    function _setWaringContainer(container, warningArguments) {
        var $container = $(container);
        var containerParent = $container.parent().addClass('ui-size'),
            uiButton = containerParent.find('.ui-button').addClass('btn-position'),
            uiWindowTitle = $container.find('.window-title'),
            uiWindowMessage = $container.find('.window-message');
        containerParent.find('.ui-widget-header').addClass('ui-icon-show');

        //$('<div class="ui-icon-add"></div>').insertBefore(containerParent.find('.ui-button-text')[0]);
        $(uiButton[1]).addClass('btn-agree');

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
            if (hide === undefined || hide === false) {
                if ($("#msg-process").length > 0) {
                    $("#msg-process").hide();
                }
            } else {
                var $msgDiv = $('<div id="msg-process" class="msg-process-background ui-tips ui-tips-center"><span class="loading"></span></span></div>');
                if ($("#msg-process").length > 0) {
                    $msgDiv = $("#msg-process");
                } else {
                    $(document.body).append($msgDiv);
                }
                $msgDiv.show();
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

            var containerParent = $container.parent();
            var dialogOwn = $container.clone();

            var dialog = $container.dialog({
                autoOpen: false,
                resizable: false,
                height: height,
                width: width,
                modal: true,
                title: confirmFormArguments.title,
                buttons: {
                    "SAVE": function (e) {
                        if ($.isFunction(confirmFormArguments.okCallback) && (confirmFormArguments.okCallback)(e)) {
                            dialog.dialog("close");
                        }
                    }
                    //CANCEL: function (e) {
                    //    if ($.isFunction(confirmFormArguments.cancelCallback)) {
                    //        (confirmFormArguments.cancelCallback)(e);
                    //    }
                    //    dialog.dialog("close");
                    //}
                },
                close: function () {

                    var elementList = $(confirmFormArguments.element).find(".form-group").children();
                    $.each(elementList, function (index, element) {
                        RC.common.hideErrorTip(element);
                    });
                    confirmFormArguments.element[0].reset();
                    dialog.dialog("close");
                    dialogOwn.appendTo(containerParent);
                    $(this).dialog("destroy").remove();
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
                    Yes: function (e) {
                        if ($.isFunction(warningArguments.closeCallback)) {
                            (warningArguments.closeCallback)(e);
                        }
                        dialog.dialog("close");
                    },
                    Cancel: function (e) {
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
            var className = "error-msg-bottom";
            if (element.is("[data-class]")) {
                className = element.attr("data-class");
            }
            var position;
            switch (className) {
                case 'error-msg-top':
                    position = {my: 'center bottom', at: 'center top-10'};
                    break;
                case 'error-msg-bottom':
                    position = {my: 'left top', at: 'left bottom'};
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

        },

        dropDownSelect: function (selectDiv) {
            if (window !== window.top) {
                window.top.RC.common.dropDownSelect(selectDiv);
                return;
            }
            var $container = $(selectDiv.element),
                selectorBody = $container.find('.selector-body');
            $container.width(selectDiv.width || 140);
            selectorBody.css("margin-left", selectDiv.marginLeft || 0);
            selectorBody.css("margin-right", selectDiv.marginRight || 0);
            return false;
        },

        dropDownToggle: function (selectors) {
            $(selectors.selectHeader).click(function (e) {
                e.preventDefault();
                e.stopPropagation();
                if ($(selectors.selectChoice).is(':visible')) {
                    $(selectors.selectChoice).hide();
                } else {
                    $(selectors.selectChoice).show();
                }
            });

            $(document).click(function (e) {
                e.preventDefault();
                e.stopPropagation();
                if ($(selectors.selectChoice).is(':hidden')) {
                    return;
                }
                var target = $(e.target);
                if (target.closest(selectors.selectBody).length === 0) {
                    $(selectors.selectChoice).hide();
                }
            });

            _.map($(selectors.selectChoiceLink), function (ele, i) {
                $(ele).click(function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    _.map(selectors.selectFunctions(), function (fn, j) {
                        if (i === j) {
                            fn();
                        }
                    });
                    $(selectors.selectChoice).hide();
                });
            });
        }

    });
    _init();
})(jQuery);
