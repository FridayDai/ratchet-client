require('jquery-ui-autocomplete');

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
                        this._selectMatched();
                        if ( this.menu.active ) {
                            // #6055 - Opera still allows the keypress to occur
                            // which causes forms to submit
                            suppressKeyPress = true;
                            event.preventDefault();
                            this.menu.select(event);
                        }
                        this.element.select();
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
                this.element
                    .data('saved', null)
                    .data("id", null);

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

                if (this.menu) {
                    var ul = this.menu.element;

                    if (ul) {

                        if (ul.children().length === 0) {
                              ul.addClass('no-children');
                        }

                        this.menu.refresh();

                        ul.show();
                        this._resizeMenu();
                        ul.position($.extend({
                            of: this.element
                        }, this.options.position));

                        if (this.options.autoFocus) {
                            this.menu.next();
                        }

                        this._trigger("open");
                    }
                }

                this.element.select();
            },
            blur: function( event ) {
                this.menu.active = null;

                this._selectMatched();

                if (this.menu.active) {
                    var item = this.menu.active.data("ui-autocomplete-item");
                    this.element
                        .val(item.label)
                        .data("id", item.value)
                        .data("saved", item);
                }

                this.close(event);
                this.cancelSearch = false;
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
                //if ( false !== this._trigger( "focus", event, { item: item } ) ) {
                //    // use value to match what will end up in the input, if it was a key event
                //    if ( event.originalEvent && /^key/.test( event.originalEvent.type ) ) {
                //        this._value( item.value );
                //    }
                //}

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
    },

    __response: function( content ) {
        if ( content ) {
            content = this._normalize( content );
        }
        this._trigger( "response", null, { content: content } );
        if ( !this.options.disabled && content && content.length && !this.cancelSearch ) {
            this._suggest( content );
            this._trigger( "open" );
        } else if (!this.options.disabled && !this.options.hideNoResult && content && content.length === 0 && !this.cancelSearch ) {
            this.__noResult();
            this._trigger( "open" );
        } else {
            // use ._close() instead of .close() so we don't cancel future searches
            this._close();
        }
    },

    __noResult: function () {
        var noResults = this.options.noResults || 'No Result';
        var ul = this.menu.element.empty();

        $( "<li>" )
            .addClass('ui-state-disabled')
            .text(noResults)
            .appendTo(ul);

        this.isNewMenu = true;
        this.menu.refresh();

        ul.removeClass('no-children');

        this._resizeMenu();
    },

    _suggest: function( items ) {
        var ul = this.menu.element.empty();
        this._renderMenu( ul, items );
        this.isNewMenu = true;
        this.menu.refresh();

        ul.removeClass('no-children');

        this._resizeMenu();
    },

    _selectMatched: function () {
        var currentVal = this.element.val().toLowerCase();
        var matched = _.filter(this.menu.element.children(), function (elem) {
            return $(elem).text().toLowerCase() === currentVal;
        });

        if (matched.length > 0) {
            this.menu.active = $(matched[0]);
        }
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
