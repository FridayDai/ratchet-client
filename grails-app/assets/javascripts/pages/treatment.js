(function ($, undefined) {
    'use strict';
    var treatment = RC.pages.treatment = RC.pages.treatment || {};
    //Define provider page global variables
    var opts = {
        defaultConfirmArguments: {
            editPatientFormArguments: {
                title: RC.constants.editPatientTitle,
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
     * edit patient info event
     * @private
     */
    function _editPatientInfo() {
        $('.btn-edit-patient').on('click', function (e) {
            e.preventDefault();

            var parent = $(this).parent();
            $("#emid").val(parent.find('.id-info').attr('value'));
            $("#name").val(parent.find('.name-info').attr('value'));
            $("#email").val(parent.find('.email-info').attr('value'));
            $("#phone").val(parent.find('.phone-info').attr('value'));

            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.editPatientFormArguments, {
                element: $(".treatment-form"),
                okCallback: function () {
                    alert('ok');
                }
            }));
        });
    }

    /**
     * go back to previous page
     * @private
     */
    function _goBackToPrePage() {
        $('.btn-back').on('click', function (e) {
            e.preventDefault();

            parent.history.back();
            return false;
        });
    }

    /**
     * page Initialization
     * @private
     */
    function _init(element) {
        _editPatientInfo();
        _goBackToPrePage();

        $(element).tabs({
            beforeLoad: function (event, ui) {
                ui.jqXHR.error(function () {
                    ui.panel.html(RC.constants.errorMessage);
                });
            },
            load: function (event, ui) {
                var type = ui.tab.data("type");
                if (type) {
                    switch (type) {
                        case "Activity":
                            RC.pages.activity.init(ui.panel.find("#activityTable"));
                            break;
                        case "Task":
                            RC.pages.task.init();
                            break;
                        case "Team":
                            RC.pages.team.init();
                            break;
                    }
                }
            }
        });
    }


    $.extend(treatment, {
        init: function (element) {
            _init(element);
        }
    });

})
(jQuery);
