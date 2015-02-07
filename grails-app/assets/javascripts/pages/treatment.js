(function ($, undefined) {
    'use strict';
    var treatment = RC.pages.treatment = RC.pages.treatment || {};
    //Define provider page global variables
    var opts = {
        defaultConfirmArguments: {
            updateSurgeryTimeArguments: {
                title: RC.constants.updateSurgeryTimeTitle,
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
            query: "{0}/getProvider".format(RC.constants.baseUrl),
            editSurgeryTime: "{0}/clients/{1}/patients/{2}/surgery-time/{3}/{4}".format(RC.constants.baseUrl)
        }
    };

    /**
     *init date picker
     * @private
     */
    function _initDatePicker() {
        $('.datetime-picker').datetimepicker({
            controlType: 'input',
            showOn: "button",
            buttonImage: "../../assets/edit.png",
            buttonImageOnly: true,
            onClose: function (selectedDate) {
                var parent = $(this).parent();
                var medicalRecordId = $(this).data("medicalRecordId");
                var patientId = $(this).data("patientId");
                var clientId = $(this).data("clientId");
                var date = new Date(selectedDate);
                var surgeryTime = date.getTime();
                _updateSurgeryTime(clientId, patientId, medicalRecordId, surgeryTime, parent, selectedDate);
            }




        });
    }

    /**
     *
     * @param clientId
     * @param patientId
     * @param medicalRecordId
     * @param surgeryTime
     * @param parent
     * @param selectedDate
     * @private
     */
    function _updateSurgeryTime(clientId, patientId, medicalRecordId, surgeryTime, parent, selectedDate) {
        $.ajax({
            url: opts.urls.editSurgeryTime.format(null, clientId, patientId, medicalRecordId, surgeryTime),
            type: 'PUT',
            success: function (data) {
                if (data.resp === true) {
                    var formatDate = moment(selectedDate).format('MMM D, YYYY h:mm:ss a');
                    parent.find('.surgery-time-picker').text(formatDate);
                }
            }
        });
    }


    /**
     * page Initialization
     * @private
     */
    function _init(element) {
        _initDatePicker();

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
                            RC.pages.team.init(ui.panel);
                            break;
                        case "Overview":
                            RC.pages.overview.init(ui.panel);
                            break;
                    }
                }
            },
            disabled: [4, 5]

        });
    }


    $.extend(treatment, {
        init: function (element) {
            _init(element);
        }
    });

})
(jQuery);
