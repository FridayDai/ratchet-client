require('jquery-ui-autocomplete');

(function () {
    $.widget("ui.autocomplete", $.ui.autocomplete, {
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
                if (e.which == 13 && $(this).val() === '') {
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

                    self.element.autocomplete("search", "");
                    self.element.focus();
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
})();
