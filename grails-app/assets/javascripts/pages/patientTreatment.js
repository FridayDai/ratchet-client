(function ($, undefined) {
    'use strict';
    var treatment = RC.pages.treatment = RC.pages.treatment || {};
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
        };


    /**
     * page Initialization
     * @private
     */
    function _init(element) {
        $(element).tabs({
            beforeLoad: function( event, ui ) {
                ui.jqXHR.error(function() {
                    ui.panel.html(RC.constants.errorMessage);
                });
            },
            load: function(event, ui) {
                var type = ui.tab.data("type");
                if(type && type=="Activity"){
                    RC.pages.activity.init(ui.panel.find("#activityTable"));
                }

            }
        });
    }

    $.extend(treatment, {
        init: function(element){
            _init(element);
        }
    });

})
(jQuery);
