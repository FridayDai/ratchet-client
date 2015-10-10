// TODO: This code should be removed after refactor
/* jshint -W071 */
/* jshint -W074 */
/* global moment */
(function ($, undefined) {
    'use strict';
    var common = RC.common = RC.common || {};

    function _init() {
        _setValidator();
        _dataTablePagination();
        _setGlobalAjax();
        _setMaintenance();
        _initDialog();
        _initComboboxWidget();
        _setNavbar();
    }

    function _initDialog() {
        $.widget("ui.dialog", $.ui.dialog, {
            _defalyFocus: function () {
                this._focusTabbable();
                this._trigger( "focus" );
            },
            open: function() {
                var that = this;
                if ( this._isOpen ) {
                    if ( this._moveToTop() ) {
                        this._focusTabbable();
                    }
                    return;
                }

                this._isOpen = true;
                this.opener = $( this.document[ 0 ].activeElement );

                this._size();
                this._position();
                this._createOverlay();
                this._moveToTop( null, true );

                // Ensure the overlay is moved to the top with the dialog, but only when
                // opening. The overlay shouldn't move after the dialog is open so that
                // modeless dialogs opened after the modal dialog stack properly.
                if ( this.overlay ) {
                    this.overlay.css( "z-index", this.uiDialog.css( "z-index" ) - 1 );
                }

                this._show( this.uiDialog, this.options.show, function() {
                    if (that.options.delayFocus) {
                        setTimeout(function() {
                            that._defalyFocus.call(that);
                        }, that.options.delayFocus);
                    } else {
                        that._defalyFocus();
                    }
                });

                // Track the dialog immediately upon openening in case a focus event
                // somehow occurs outside of the dialog before an element inside the
                // dialog is focused (#10152)
                this._makeFocusTarget();

                this._trigger( "open" );
            },
            close: function( event ) {
                var activeElement,
                    that = this;

                if ( !this._isOpen || this._trigger( "beforeClose", event ) === false ) {
                    return;
                }

                this._isOpen = false;
                this._focusedElement = null;
                this._destroyOverlay();
                this._untrackInstance();

                if ( !this.opener.filter( ":focusable" ).focus().length ) {

                    // support: IE9
                    // IE9 throws an "Unspecified error" accessing document.activeElement from an <iframe>
                    try {
                        activeElement = this.document[ 0 ].activeElement;

                        // Support: IE9, IE10
                        // If the <body> is blurred, IE will switch windows, see #4520
                        if ( activeElement && activeElement.nodeName.toLowerCase() !== "body" ) {

                            // Hiding a focused element doesn't trigger blur in WebKit
                            // so in case we have nothing to focus on, explicitly blur the active element
                            // https://bugs.webkit.org/show_bug.cgi?id=47182
                            $( activeElement ).blur();
                        }
                    } catch ( error ) {}
                }

                that._trigger( "prepareclose", event );

                this._hide( this.uiDialog, this.options.hide, function() {
                    that._trigger( "close", event );
                });
            }
        });
    }

    /**
     * set global validator
     * @private
     */
    function _setValidator() {
        $.validator.setDefaults({
            ignore: [],
            showErrors: function (errorMap, errorList) {

                $.each(this.validElements(), function (index, element) {

                    var elem = $(element).parent().find('.select2-container');
                    if (elem.length > 0) {
                        RC.common.hideErrorTip(elem);
                    } else {
                        RC.common.hideErrorTip(element);
                    }
                });

                $.each(errorList, function (index, error) {
                    var elem = $(error.element).parent().find('.select2-container');
                    if (elem.length > 0) {
                        var obj = {
                            element: elem,
                            message: error.message,
                            method: error.method
                        };
                        RC.common.showErrorTip(obj);
                    } else {
                        RC.common.showErrorTip(error);
                    }
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
                $('.btn').blur();
            },
            success: function () {

            },
            cache: false,
            global: true,
            error: function (jqXHR) {
                if (jqXHR.status === 401) {
                    window.location.href = "/login";
                }
                else if (jqXHR.status === 400) {
                    RC.common.error({
                        title: RC.constants.errorTitle,
                        message: RC.constants.errorMessageAction,
                        errorMessage: jqXHR.responseText
                    });
                }
                else if (jqXHR.status === 403 || jqXHR.status >= 404) {
                    RC.common.error({
                        title: RC.constants.errorTitle404,
                        message: RC.constants.errorTip
                    });
                }
            }
        });
    }

    /**
     * Maintenance banner set up
     * @private
     */
    function _setMaintenance() {
        var maintenanceEl = $('#maintenance');

        $('.maintenance-btn-close').click(function () {
            var announcementLastUpdated = maintenanceEl.data('announcementLastUpdated');

            $.get('/announcement/close?announcementLastUpdated=' + announcementLastUpdated);

            maintenanceEl.remove();
        });
    }

    function _setNavbar() {

        function _getAssistData() {
            var title = $('#assist-title').val();
            var desc = $('#assist-desc').val();
            var browser = window.navigator.userAgent;
            var url = window.location.href;

            return {
                title: title,
                desc: desc,
                browser: browser,
                url: url
            };
        }

        function _sendAssistReport() {
            var addAssistUrl = '/assist-me';
            var data = _getAssistData();

            $.ajax({
                url: addAssistUrl,
                type: 'post',
                data: data,
                success: function () {
                    RC.common.showMsg({
                        msg: RC.constants.sendAssistMessageSuccess
                    });
                }
            });
        }

        function _bindAssistEvent() {
            $('#assist-me').on('click', function (e) {
                e.preventDefault();
                $('.assist-form')[0].reset();

                var args = {
                    title: 'ASSIST ME',
                    content: '',
                    width: 800,
                    okTitle: 'Send'
                };

                RC.common.confirmForm(_.extend({}, args, {
                    element: $('.assist-form'),
                    okCallback: function () {
                        if ($('#assist-form').valid()) {
                            _sendAssistReport();
                            return true;
                        }
                        return false;
                    }
                }));
            });
        }

        _bindAssistEvent();
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
                method: 'GET'// Ajax HTTP method
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
     * init combobox widget
     * @private
     */
    function _initComboboxWidget() {
        $.widget("ui.autocomplete", $.ui.autocomplete, {
            _create: function() {
                // Some browsers only repeat keydown events, not keypress events,
                // so we use the suppressKeyPress flag to determine if we've already
                // handled the keydown event. #7269
                // Unfortunately the code for & in keypress is the same as the up arrow,
                // so we use the suppressKeyPressRepeat flag to avoid handling keypress
                // events when we know the keydown event was used to modify the
                // search term. #7799
                var suppressKeyPress, suppressKeyPressRepeat, suppressInput,
                    nodeName = this.element[ 0 ].nodeName.toLowerCase(),
                    isTextarea = nodeName === "textarea",
                    isInput = nodeName === "input";

                this.isMultiLine =
                    // Textareas are always multi-line
                    isTextarea ? true :
                        // Inputs are always single-line, even if inside a contentEditable element
                        // IE also treats inputs as contentEditable
                        isInput ? false :
                            // All other element types are determined by whether or not they're contentEditable
                            this.element.prop( "isContentEditable" );

                this.valueMethod = this.element[ isTextarea || isInput ? "val" : "text" ];
                this.isNewMenu = true;

                this.element
                    .addClass( "ui-autocomplete-input" )
                    .attr( "autocomplete", "off" );

                this._on( this.element, {
                    keydown: function( event ) {
                        if ( this.element.prop( "readOnly" ) ) {
                            suppressKeyPress = true;
                            suppressInput = true;
                            suppressKeyPressRepeat = true;
                            return;
                        }

                        suppressKeyPress = false;
                        suppressInput = false;
                        suppressKeyPressRepeat = false;
                        var keyCode = $.ui.keyCode;
                        switch ( event.keyCode ) {
                            case keyCode.PAGE_UP:
                                suppressKeyPress = true;
                                this._move( "previousPage", event );
                                break;
                            case keyCode.PAGE_DOWN:
                                suppressKeyPress = true;
                                this._move( "nextPage", event );
                                break;
                            case keyCode.UP:
                                suppressKeyPress = true;
                                this._keyEvent( "previous", event );
                                break;
                            case keyCode.DOWN:
                                suppressKeyPress = true;
                                this._keyEvent( "next", event );
                                break;
                            case keyCode.ENTER:
                                // when menu is open and has focus
                                if ( this.menu.active ) {
                                    // #6055 - Opera still allows the keypress to occur
                                    // which causes forms to submit
                                    suppressKeyPress = true;
                                    event.preventDefault();
                                    this.menu.select( event );
                                }
                                break;
                            case keyCode.TAB:
                                if ( this.menu.active ) {
                                    this.menu.select( event );
                                }
                                break;
                            case keyCode.ESCAPE:
                                if ( this.menu.element.is( ":visible" ) ) {
                                    if ( !this.isMultiLine ) {
                                        this._value( this.term );
                                    }
                                    this.close( event );
                                    // Different browsers have different default behavior for escape
                                    // Single press can mean undo or clear
                                    // Double press in IE means clear the whole form
                                    event.preventDefault();
                                }
                                break;
                            default:
                                suppressKeyPressRepeat = true;
                                // search timeout should be triggered before the input value is changed
                                this._searchTimeout( event );
                                break;
                        }
                    },
                    keypress: function( event ) {
                        if ( suppressKeyPress ) {
                            suppressKeyPress = false;
                            if ( !this.isMultiLine || this.menu.element.is( ":visible" ) ) {
                                event.preventDefault();
                            }
                            return;
                        }
                        if ( suppressKeyPressRepeat ) {
                            return;
                        }

                        // replicate some key handlers to allow them to repeat in Firefox and Opera
                        var keyCode = $.ui.keyCode;
                        switch ( event.keyCode ) {
                            case keyCode.PAGE_UP:
                                this._move( "previousPage", event );
                                break;
                            case keyCode.PAGE_DOWN:
                                this._move( "nextPage", event );
                                break;
                            case keyCode.UP:
                                this._keyEvent( "previous", event );
                                break;
                            case keyCode.DOWN:
                                this._keyEvent( "next", event );
                                break;
                        }
                    },
                    input: function( event ) {
                        console.log('beforeinput');
                        if ( suppressInput ) {
                            suppressInput = false;
                            event.preventDefault();
                            return;
                        }

                        if (this.element.is(':focus')) { // Fix IE bugs RH-1515
                            this._searchTimeout(event);
                        }
                    },
                    focus: function() {
                        this.selectedItem = null;
                        this.previous = this._value();
                    },
                    blur: function( event ) {
                        if ( this.cancelBlur ) {
                            delete this.cancelBlur;
                            return;
                        }

                        clearTimeout( this.searching );
                        this.close( event );
                        this._change( event );
                    }
                });

                this._initSource();
                this.menu = $( "<ul>" )
                    .addClass( "ui-autocomplete ui-front" )
                    .appendTo( this._appendTo() )
                    .menu({
                        // disable ARIA support, the live region takes care of that
                        role: null
                    })
                    .hide()
                    .menu( "instance" );

                this._on( this.menu.element, {
                    mousedown: function( event ) {
                        // prevent moving focus out of the text field
                        event.preventDefault();

                        // IE doesn't prevent moving focus even with event.preventDefault()
                        // so we set a flag to know when we should ignore the blur event
                        this.cancelBlur = true;
                        this._delay(function() {
                            delete this.cancelBlur;
                        });

                        // clicking on the scrollbar causes focus to shift to the body
                        // but we can't detect a mouseup or a click immediately afterward
                        // so we have to track the next mousedown and close the menu if
                        // the user clicks somewhere outside of the autocomplete
                        var menuElement = this.menu.element[ 0 ];
                        if ( !$( event.target ).closest( ".ui-menu-item" ).length ) {
                            this._delay(function() {
                                var that = this;
                                this.document.one( "mousedown", function( event ) {
                                    if ( event.target !== that.element[ 0 ] &&
                                        event.target !== menuElement &&
                                        !$.contains( menuElement, event.target ) ) {
                                        that.close();
                                    }
                                });
                            });
                        }
                    },
                    menufocus: function( event, ui ) {
                        var label, item;
                        // support: Firefox
                        // Prevent accidental activation of menu items in Firefox (#7024 #9118)
                        if ( this.isNewMenu ) {
                            this.isNewMenu = false;
                            if ( event.originalEvent && /^mouse/.test( event.originalEvent.type ) ) {
                                this.menu.blur();

                                this.document.one( "mousemove", function() {
                                    $( event.target ).trigger( event.originalEvent );
                                });

                                return;
                            }
                        }

                        item = ui.item.data( "ui-autocomplete-item" );
                        if ( false !== this._trigger( "focus", event, { item: item } ) ) {
                            // use value to match what will end up in the input, if it was a key event
                            if ( event.originalEvent && /^key/.test( event.originalEvent.type ) ) {
                                this._value( item.value );
                            }
                        }

                        // Announce the value in the liveRegion
                        label = ui.item.attr( "aria-label" ) || item.value;
                        if ( label && $.trim( label ).length ) {
                            this.liveRegion.children().hide();
                            $( "<div>" ).text( label ).appendTo( this.liveRegion );
                        }
                    },
                    menuselect: function( event, ui ) {
                        var item = ui.item.data( "ui-autocomplete-item" ),
                            previous = this.previous;

                        // only trigger when focus was lost (click on menu)
                        if ( this.element[ 0 ] !== this.document[ 0 ].activeElement ) {
                            this.element.focus();
                            this.previous = previous;
                            // #6109 - IE triggers two focus events and the second
                            // is asynchronous, so we need to reset the previous
                            // term synchronously and asynchronously :-(
                            this._delay(function() {
                                this.previous = previous;
                                this.selectedItem = item;
                            });
                        }

                        if ( false !== this._trigger( "select", event, { item: item } ) ) {
                            this._value( item.value );
                        }
                        // reset the term after the select event
                        // this allows custom select handling to work properly
                        this.term = this._value();

                        this.close( event );
                        this.selectedItem = item;
                    }
                });

                this.liveRegion = $( "<span>", {
                    role: "status",
                    "aria-live": "assertive",
                    "aria-relevant": "additions"
                })
                    .addClass( "ui-helper-hidden-accessible" )
                    .appendTo( this.document[ 0 ].body );

                // turning off autocomplete prevents the browser from remembering the
                // value when navigating through history, so we re-enable autocomplete
                // if the page is unloaded before the widget is destroyed. #7790
                this._on( this.window, {
                    beforeunload: function() {
                        this.element.removeAttr( "autocomplete" );
                    }
                });
            },
            _resizeMenu: function () {
                var ul = this.menu.element;
                ul.outerWidth(Math.max(
                    ul.width("").outerWidth(),
                    this.element.outerWidth() + 16
                ));
            },

            _search: function( value ) {
                this.pending++;
                this.element.parent().find('.ui-icon').
                    addClass( "ui-button-icon-loading" ).removeClass('ui-button-icon-primary');
                this.cancelSearch = false;

                this.source( { term: value }, this._response() );
            },

            _response: function() {
                var index = ++this.requestIndex;

                return $.proxy(function( content ) {
                    if ( index === this.requestIndex ) {
                        this.__response( content );
                    }

                    this.pending--;
                    if ( !this.pending ) {
                        this.element.parent().find('.ui-icon')
                            .removeClass( "ui-button-icon-loading").addClass('ui-button-icon-primary');
                    }
                }, this );
            }
        });

        $.widget("ui.combobox", {
            _create: function () {
                var wrapper = this.wrapper = $("<span />").addClass("ui-combobox"),
                    self = this,
                    classes = [
                        "input-group",
                        "ui-state-default",
                        "ui-combobox-input",
                        "ui-widget",
                        "ui-widget-content",
                        "ui-corner-left"
                    ].join(' ');


                this.element.wrap(wrapper);

                $(this.element).data('saved', {
                    label: '',
                    value: ''
                });

                this.element
                    .addClass(classes)
                    .focus(function () {
                        if ($(this).data('uiAutocomplete').options.focusSearch && $(this).val() === '') {
                            $(this).autocomplete("search");
                        }
                    })
                    .autocomplete($.extend({
                        minLength: 0,
                        focusSearch: true,
                        select: function (event, ui) {
                            event.preventDefault();

                            $(this)
                                .val(ui.item.label)
                                .data("id", ui.item.value)
                                .data("saved", ui.item);
                        },
                        change: function (event, ui) {
                            event.preventDefault();

                            var saved = $(this).data('saved');

                            if (ui.item === null && saved && $(this).val() !== '') {
                                $(this)
                                    .val(saved.label)
                                    .data('id', saved.value);
                            }
                        },
                        focus: function (event, ui) {
                            event.preventDefault();
                            $(this)
                                .val(ui.item.label)
                                .data("id", ui.item.value);
                        }
                    }, this.options));

                function clear(element) {
                    $(element).trigger('autocompleteclear');

                    $(element)
                        .val('')
                        .data("id", '')
                        .data("saved", {
                            label: '',
                            value: ''
                        });
                }

                this.element.on('keyup', function (e) {
                    if (e.which === 13 && $(this).val() === '') {
                        clear(this);
                    }
                });

                this.element.on('blur', function () {
                    if ($(this).val() === '') {
                        clear(this);
                    }
                });

                $("<a />")
                    .insertAfter(this.element)
                    .button({
                        icons: {
                            primary: "ui-icon-triangle-1-s"
                        },
                        text: false
                    })
                    .addClass("ui-combobox-toggle")
                    .click(function () {
                        if (self.element.is(":disabled")) {
                            return;
                        }

                        if (self.element.autocomplete("widget").is(":visible")) {
                            self.element.autocomplete("close");
                            return;
                        }

                        $(self.element).data('uiAutocomplete').options.focusSearch = false;
                        self.element.autocomplete("search", "");
                        self.element.focus();
                        $(self.element).data('uiAutocomplete').options.focusSearch = true;
                    });

                if (self.element.is(":disabled")) {
                    self.element.parent().find("a").addClass('disable');
                }
            },

            destroy: function () {
                this.wrapper.remove();
                this.element.parent().find("a").remove();
                this.element.show();
                $.Widget.prototype.destroy.call(this);
            }
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

        if (warningArguments.confirmText) {
            $(uiButton[1]).addClass('btn-agree')
                .find('.ui-button-text')
                .text(warningArguments.confirmText);
        } else {
            $(uiButton[1]).addClass('btn-agree');
        }

        if (warningArguments.secondText) {
            $(uiButton[2])
                .find('.ui-button-text')
                .text(warningArguments.secondText);
        }

        uiWindowTitle.html('<div class="window-warning-title">' + warningArguments.title + '</div>');

        if (_.isString(warningArguments.message)) {
            warningArguments.message = [warningArguments.message];
        }

        uiWindowMessage.html('');
        _.each(warningArguments.message, function (message) {
            uiWindowMessage.append('<div class="window-warning">' + message + '</div>');
        });

        return $container;
    }

    /**
     *
     * @param container
     * @param errorArguments
     * @returns {*|HTMLElement}
     * @private
     */
    function _setErrorContainer(container, errorArguments) {
        var $container = $(container);
        var containerParent = $container.parent().addClass('ui-size'),
            uiButton = containerParent.find('.ui-button').addClass('btn-position'),
            uiWindowTitle = $container.find('.window-title'),
            uiWindowMessage = $container.find('.window-message');
        containerParent.find('.ui-widget-header').addClass('ui-icon-show');

        $(uiButton[1]).addClass('btn-ok');

        uiWindowTitle.html('<div class="window-error-title">' + errorArguments.title + '</div>');
        uiWindowMessage.html('');
        if (errorArguments.message) {
            uiWindowMessage.append('<div class="window-error">' + errorArguments.message + '</div>');
        }
        if (errorArguments.errorMessage) {
            uiWindowMessage.append('<div class="window-error-message">' + errorArguments.errorMessage + '</div>');
        }
        return $container;
    }

    $.extend(common, {
        /**
         * show progress on pages
         * @param hide
         */
        progress: function (hide) {
            var elementStr = [
                '<div id="msg-process">',
                '<div class="msg-process-background ui-tips ui-tips-center"></div>',
                '<span class="msg-process-loading"></span>',
                '</div>'
            ].join('');

            if (hide === undefined || hide === false) {
                if ($("#msg-process").length > 0) {
                    $("#msg-process").hide();
                }
            } else {
                var $msgDiv = $(elementStr);
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
         * @param msg, remain, top, left, marginLeft in showMsgArguments
         *
         */
        showMsg: function (showMsgArguments) {
            //if (window !== window.top) {
            //    window.top.RC.common.showMsg(showMsgArguments);
            //    return;
            //}
            var top = showMsgArguments.top || '33%',
                left = showMsgArguments.left || '50%',
                remain = showMsgArguments.remain || 2000,
                match = /\d+/,
                marginLeft;

            var $msgDiv = $('<div id="msg-info" class="ui-hide ui-tips ui-tips-center msg-info"></div>');

            if ($("#msg-info").length > 0) {
                $msgDiv = $("#msg-info");
            } else {
                $(document.body).append($msgDiv);
            }
            var self = this;

            $msgDiv = $msgDiv.html(showMsgArguments.msg).css({
                position: 'fixed',
                top: top,
                left: left
            });

            if (showMsgArguments.marginLeft) {
                marginLeft = showMsgArguments.marginLeft;
            }
            else {
                marginLeft =
                    (parseInt(match.exec($msgDiv.css('width')), 10) +
                    parseInt(match.exec($msgDiv.css('padding-left')), 10)) / -2;
            }
            $msgDiv.css('margin-left', marginLeft + 'px');

            $msgDiv.fadeIn("slow");
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
            //if (window !== window.top) {
            //    window.top.RC.common.confirmForm(confirmFormArguments);
            //    return;
            //}
            var height = confirmFormArguments.height || 'auto',
                width = confirmFormArguments.width || 350;
            var title = confirmFormArguments.okTitle || "Save";

            var cancel = confirmFormArguments.cancelCallback;

            var $container = $(confirmFormArguments.element);
            var beforeClose = confirmFormArguments.beforeClose;

            //var containerParent = $container.parent();
            var dialogOwn = $container.clone();
            var secondTitle = confirmFormArguments.secondTitle;

            var dialogOpts = {
                autoOpen: false,
                resizable: false,
                height: height,
                width: width,
                modal: true,
                title: confirmFormArguments.title,
                delayFocus: 800,
                open: function () {
                    //$("input").blur();
                    var $element = $(this).parent();
                    $element.addClass('fade');
                    setTimeout(function () {
                        $element.addClass("in");
                    }, 300);

                },
                beforeClose: function () {

                },
                buttons: {},
                close: function () {
                    var elementList = $(confirmFormArguments.element).find(".form-group").find(":input");
                    $.each(elementList, function (index, element) {
                        RC.common.hideErrorTip(element);
                    });

                    if (confirmFormArguments.element.is('form')) {
                        confirmFormArguments.element.validate().resetForm();
                        confirmFormArguments.element[0].reset();
                    }

                    var body = $(confirmFormArguments.element).parents().find("body");
                    if (body.css("overflow") === "hidden") {
                        body.css('overflow', 'auto');
                    }
                    dialog.dialog("close");
                    $('.btn').blur();
                    var hiddenDialogOwn = dialogOwn.addClass('ui-hidden');
                    $(this).dialog("destroy").replaceWith(hiddenDialogOwn);
                }
            };

            dialogOpts.buttons[title] = function (e) {
                if ($.isFunction(confirmFormArguments.okCallback)) {
                    var back = confirmFormArguments.okCallback(e);
                    if (back && $.isFunction(back.promise)) {
                        $.when(back).done(function () {
                            dialog.dialog("close");
                        });
                    }
                    else if (back) {
                        dialog.dialog("close");
                    }
                }
            };

            if (secondTitle) {
                dialogOpts.buttons[secondTitle] = function () {
                    dialog.dialog("close");
                };
            }

            if (cancel) {
                dialogOpts.buttons.Cancel = function (e) {
                    if ($.isFunction(confirmFormArguments.cancelCallback) && (confirmFormArguments.cancelCallback)(e)) {

                    }
                };
            }

            if ($.isFunction(beforeClose)) {
                dialogOpts.beforeClose = beforeClose;
            }

            var dialog = $container.dialog(dialogOpts);
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
            //if (window !== window.top) {
            //    window.top.RC.common.confirm(confirmArguments);
            //    return;
            //}
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
                    height: 'auto',
                    width: 350,
                    modal: true,
                    open: function () {
                        $(this).parent().removeClass('hideSweetAlert').addClass('showSweetAlert');
                    },
                    close: function () {
                        $(this).parent().removeClass('showSweetAlert').addClass('hideSweetAlert');
                    },
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
            //if (window !== window.top) {
            //    window.top.RC.common.warning(warningArguments);
            //    return;
            //}
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
                height: 'auto',
                width: 350,
                modal: true,
                open: function () {
                    $(this).parent().removeClass('hideSweetAlert').addClass('showSweetAlert');
                },
                close: function () {
                    $(this).parent().removeClass('showSweetAlert').addClass('hideSweetAlert');
                },
                buttons: {
                    Yes: function (e) {
                        if ($.isFunction(warningArguments.yesCallback)) {
                            (warningArguments.yesCallback)(e);
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
         * error dialog
         * @param title
         * @param message
         * @param errorMessage
         * @returns {boolean}
         */
        error: function (errorArguments) {
            //if (window !== window.top) {
            //    window.top.RC.common.error(errorArguments);
            //    return;
            //}
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
                height: 'auto',
                width: 350,
                modal: true,
                open: function () {
                    $(this).parent().removeClass('hideSweetAlert').addClass('showSweetAlert');
                },
                close: function () {
                    $(this).parent().removeClass('showSweetAlert').addClass('hideSweetAlert');
                },
                buttons: {
                    Ok: function (e) {
                        if ($.isFunction(errorArguments.closeCallback)) {
                            (errorArguments.closeCallback)(e);
                        }
                        dialog.dialog("close");
                    }
                }
            });
            $container = _setErrorContainer($container, errorArguments);
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
            var form = element.closest("form");
            if (form.css("display") === "none") {
                return;
            } else {
                var errorMessage = errorElement.message;
                element.attr("data-error-msg", errorMessage);
                element.attr("data-error-hover-close", false);
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

                }).on("mouseleave", function (event) {
                    event.stopImmediatePropagation();
                    var elem = $(this).parent().find('.select2-container');
                    if (elem.length > 0) {

                    } else {
                        //if (!$(this).valid()) {
                        //    return;
                        //}
                    }
                });
                tooltips.tooltip("open");
            }

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
                $(element).attr("data-error-hover-close", true);
            }
        },

        /**
         * tooltip
         */
        tooltip: function () {

        },

        dropDownSelect: function (selectDiv) {
            //if (window !== window.top) {
            //    window.top.RC.common.dropDownSelect(selectDiv);
            //    return;
            //}
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
        },

        dataTableOptions: {
            paging: true,
            searching: false,
            ordering: true,
            info: false,
            bLengthChange: false,
            serverSide: true,
            "bAutoWidth": false,
            "fnDrawCallback": function () {
                $(".previous").text('');
                $(".next").text('');
                $(".display").css("display", "inline-table");
                var paginate = $(this).siblings();
                var bothDisabled = paginate
                        .find(".previous")
                        .hasClass("disabled") &&
                    paginate
                        .find(".next")
                        .hasClass("disabled");
                if (bothDisabled && paginate.find(".current").length === 0) {
                    paginate.hide();
                }
            }
        },

        parseVancouverTime: function (time) {
            return moment.tz(time, "MMM D, YYYY", "America/Vancouver").format('x');
        },

        formatVancouverTime: function (time) {
            return moment.tz(time, "America/Vancouver").format('MMM D, YYYY');
        }
    });
    _init();
})(jQuery);
/* jshint +W071 */
/* jshint +W074 */
