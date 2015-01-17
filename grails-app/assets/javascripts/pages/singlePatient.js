(function ($, undefined) {
    'use strict';

    //Define provider page global variables
    var opts = {
            defaultConfirmArguments: {
                confirmFormArguments: {
                    title: RC.constants.confirmTitle,
                    content: RC.constants.confirmContent,
                    height: 200,
                    width: 400
                },
                waringArguments: {
                    title: RC.constants.warningTipTitle,
                    message: RC.constants.warningTip
                }
            },
            urls: {
                query: "{0}/getProvider".format(RC.constants.baseUrl)
            }
        },
        tabs,
        tabTitle,
        tabTemplate;

    function _initTab() {
        tabTemplate = "<li><a href='#{href}'>#{label}</a></li>";
        tabs = $("#tabs").tabs({
            beforeLoad: function( event, ui ) {
                ui.jqXHR.error(function() {
                    ui.panel.html(RC.constants.errorMessage);
                });
            },
            load: function(event, ui) {
                RC.pages.treatment.init(ui.panel.find("#subTabs"));
            }
        });
    }

    function _addTab() {
        var label = tabTitle.val(),
            li = $( tabTemplate.replace( /#\{href\}/g, "/patientTreatment/index" ).replace( /#\{label\}/g, label ) );
        tabs.find( ".tab-treatment" ).append( li );
        tabs.tabs( "refresh" );
    }

    /**
     * set validate
     * @private
     */
    function _setValidate() {
        $("#treatment-form").validate({});
    }

    function _initAddTab() {
        $( "#add_tab").button().click(function() {
            $(".form")[0].reset();

            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.confirmFormArguments, {
                element: $(".form"),
                okCallback: function () {
                    if ($("#treatment-form").valid()) {
                        tabTitle = $( "#name" );
                        _addTab();
                        return true;
                    }
                    return false;
                }
            }));
        });
    }
    /**
     * page Initialization
     * @private
     */
    function _init() {
        _initTab();
        _initAddTab();
        _setValidate();
    }

    _init();

})
(jQuery);
