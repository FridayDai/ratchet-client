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
            query: "/getProvider",
            editSurgeryTime: "/clients/{0}/patients/{1}/surgery-time/{2}/{3}"
        }
    };

    /**
     *init date picker
     * @private
     */
    function _initDatePicker() {
        $(".surgeryTime-edit").click(function (e) {
            e.preventDefault();

            var parent = $(this).parent();
            var time = parent.find('.surgery-time-picker').text();
            var surgeryTime = $.trim(time);
            $("#treatment-surgeryTime").attr('value', surgeryTime);
            var medicalRecordId = $(this).data("medicalRecordId");
            var patientId = $(this).data("patientId");
            var clientId = $(this).data("clientId");
            $(".treatment-time-form")[0].reset();

            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.updateSurgeryTimeArguments, {
                element: $("#treatment-time-form"),
                okCallback: function () {
                    if ($("#treatment-time-form").valid()) {
                        var date = new Date($("#treatment-surgeryTime").val());
                        var surgeryTime = date.getTime();
                        _updateSurgeryTime(clientId, patientId, medicalRecordId, surgeryTime, parent, surgeryTime);
                        return true;
                    }
                    return false;
                }
            }));
            _initSurgeryTime();

        });


        //$('.datetime-picker').datetimepicker({
        //    controlType: 'input',
        //    showOn: "button",
        //    buttonImage: "../../assets/edit.png",
        //    buttonImageOnly: true,
        //    onClose: function (selectedDate) {
        //        var parent = $(this).parent();
        //        var medicalRecordId = $(this).data("medicalRecordId");
        //        var patientId = $(this).data("patientId");
        //        var clientId = $(this).data("clientId");
        //        var date = new Date(selectedDate);
        //        var surgeryTime = date.getTime();
        //        _updateSurgeryTime(clientId, patientId, medicalRecordId, surgeryTime, parent, selectedDate);
        //    }
        //});
    }

    function _initSurgeryTime() {
        $("#treatment-surgeryTime").datetimepicker({
            controlType: 'input',
            dateFormat: 'MM d, yy',
            timeFormat: "h:mm TT",
            showOn: "focus",
            ampm: true,
            minDate: +8
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
            url: opts.urls.editSurgeryTime.format(clientId, patientId, medicalRecordId, surgeryTime),
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
                RC.common.progress(false);
            },
            load: function (event, ui) {
                var type = ui.tab.data("type");
                if (type) {
                    switch (type) {
                        case "Activity":
                            RC.pages.activity.init(ui.panel.find("#activityTable"));
                            break;
                        case "Task":
                            RC.pages.task.init(ui.panel);
                            break;
                        case "Team":
                            RC.pages.team.init(ui.panel);
                            break;
                        case "Overview":
                            RC.pages.overview.init(ui.panel);
                            break;
                    }
                }
                RC.common.progress(true);
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
