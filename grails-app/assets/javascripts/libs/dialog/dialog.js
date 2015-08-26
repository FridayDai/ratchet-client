require('jquery-ui-dialog');

// Add one event before dialog close
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

