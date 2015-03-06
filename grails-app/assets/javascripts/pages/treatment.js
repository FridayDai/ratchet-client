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
            editSurgeryTime: "/clients/{0}/patients/{1}/surgery-time/{2}/{3}",
            archived: "/clients/{0}/patients/{1}/records/{2}/archived",
            getTreatmentInfo: "/clients/{0}/treatments/{1}"
        }
    };

    /**
     *init date picker
     * @private
     */
    function _initDatePicker(element) {
        $(".surgeryTime-edit").click(function (e) {
            e.preventDefault();

            var parent = $(this).parent();
            var time = parent.find('.surgery-time-picker').text();
            var surgeryTime = $.trim(time);
            $("#treatment-surgeryTime").attr('value', surgeryTime);
            var medicalRecordId = $(this).data("medicalRecordId");
            var patientId = $(this).data("patientId");
            var clientId = $(this).data("clientId");
            var treatmentId = $(this).data("treatmentId");
            $(".treatment-time-form")[0].reset();


            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.updateSurgeryTimeArguments, {
                element: $("#treatment-time-form"),
                okCallback: function () {
                    if ($("#treatment-time-form").valid()) {
                        var date = new Date($("#treatment-surgeryTime").val());
                        var newSurgeryTime = date.getTime();
                        var oldSurgeryTime = (new Date(surgeryTime)).getTime();
                        if (newSurgeryTime !== oldSurgeryTime) {
                            _updateSurgeryTime(element, clientId, patientId, medicalRecordId, surgeryTime, parent, newSurgeryTime);
                        }
                        return true;
                    }
                    return false;
                }
            }));
            _getTreatmentInfo(clientId, treatmentId);

        });
    }

    /**
     *
     * @param clientId
     * @param treatmentId
     * @private
     */
    function _getTreatmentInfo(clientId, treatmentId) {
        $.ajax({
            url: opts.urls.getTreatmentInfo.format(clientId, treatmentId),
            type: 'POST',
            success: function (data) {
                var sendTimeOffset = data.sendTimeOffset;
                var time = Math.ceil(sendTimeOffset / 1000 / 60 / 60 / 24);
                _initSurgeryTime(time);
            }
        });
    }

    /**
     *
     * @param time
     * @private
     */
    function _initSurgeryTime(time) {
        $("#treatment-surgeryTime").datetimepicker("destroy");
        $("#treatment-surgeryTime").datetimepicker({
            controlType: 'input',
            dateFormat: 'MM d, yy',
            timeFormat: "h:mm TT",
            showOn: "focus",
            ampm: true,
            minDate: +time
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
    function _updateSurgeryTime (element, clientId, patientId, medicalRecordId, surgeryTime, parent, selectedDate) {
        $.ajax({
            url: opts.urls.editSurgeryTime.format(clientId, patientId, medicalRecordId, selectedDate),
            type: 'PUT',
            success: function (data) {
                if (data.resp === true) {
                    var formatDate = moment(selectedDate).format('MMM DD,YYYY HH:mm A');
                    parent.find('.surgery-time-picker').text(formatDate);
                    $(element).tabs("load", 0);
                }
            }
        });
    }

    /**
     * archived a treatment
     * @private
     */
    function _initArchived (element){
        $('.archived-active').click(function (e) {
            e.preventDefault();
            var medicalRecordId = $(this).data("medicalRecordId");
            var patientId = $(this).data("patientId");
            var clientId = $(this).data("clientId");
            $.ajax({
                url: opts.urls.archived.format(clientId, patientId, medicalRecordId),
                type: 'PUT',
                success: function (data) {
                    if (data.resp === true) {
                        window.location.reload();
                    }
                }
            });
        });
    }

    /**
     * page Initialization
     * @private
     */
    function _init(element) {
        _initDatePicker(element);
        _initArchived (element);
        $(element).tabs({
            cache: false,
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
