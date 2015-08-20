require('jquery-ui-dialog');

// Add one event before dialog close
$.widget("ui.dialog", $.ui.dialog, {
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

