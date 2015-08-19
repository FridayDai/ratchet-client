// TODO: This code should be removed after refactor
/* jshint -W072 */
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
                width: 420
            },
            waringArguments: {
                title: RC.constants.archivedTreatmentWarningMsg,
                message: RC.constants.archivedMessage
            },
            surgeryTimeEditWaringArguments: {
                title: RC.constants.surgeryTimeEditWaringTitle,
                message: RC.constants.surgeryTimeEditWaringMessage
            }
        },
        urls: {
            query: "/getProvider",
            editSurgeryTime: "/patients/{0}/surgery-time/{1}/{2}",
            archived: "/patients/{0}/records/{1}/archived",
            getTreatmentInfo: "/treatments/{0}",
            generateTreatmentCode: "/treatments/{0}/generateCode"
        }
    };

    /**
     *init date picker
     * @private
     */
    function _initDatePicker(element) {
        element.find(".surgeryTime-edit").click(function (e) {
            e.preventDefault();
            element.find('.drop-down-list').hide();
            var parent = $(this).parents();
            var $ele = $(this).parent();
            var time = $ele.find('.hidden-surgery-time-picker').text();
            var surgeryTime = $.trim(time);
            $("#treatment-surgeryTime").attr('value', surgeryTime);
            var medicalRecordId = $(this).data("medicalRecordId");
            var patientId = $(this).data("patientId");
            var clientId = $(this).data("clientId");
            var treatmentId = $(this).data("treatmentId");
            $("#treatment-time-form")[0].reset();

            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.updateSurgeryTimeArguments, {
                element: $("#treatment-time-form"),
                //beforeClass: function () {
                //    $("#treatment-time-form").attr("style", "display:none!important")
                //},
                okCallback: function () {
                    if ($("#treatment-time-form").valid()) {
                        var newSurgeryTime = RC.common.parseVancouverTime($("#treatment-surgeryTime").val());
                        var oldSurgeryTime = RC.common.parseVancouverTime(surgeryTime);
                        if (newSurgeryTime !== oldSurgeryTime) {
                            _editSurgeryTime(
                                element,
                                clientId,
                                patientId,
                                medicalRecordId,
                                surgeryTime,
                                parent,
                                newSurgeryTime,
                                $ele
                            );
                        }
                    }
                }
            }));
            _getTreatmentInfo(clientId, treatmentId);

        });
    }

    /**
     * It will binds a warning pop up and to update surgery date when user confirmed.
     * @private
     */
    function _editSurgeryTime(element, clientId, patientId,
                              medicalRecordId, surgeryTime, parent, newSurgeryTime, $ele) {
        RC.common.warning(_.extend({}, opts.defaultConfirmArguments.surgeryTimeEditWaringArguments, {
            element: $(".warn"),
            yesCallback: function () {
                _updateSurgeryTime(element, clientId, patientId,
                    medicalRecordId, surgeryTime, parent, newSurgeryTime, $ele);
                $("#treatment-time-form").dialog("destroy").addClass('ui-hidden');
                _initdropdownMenu(element);
            }
        }));
    }

    /**
     *
     * @param clientId
     * @param treatmentId
     * @private
     */
    function _getTreatmentInfo(clientId, treatmentId) {
        $.ajax({
            url: opts.urls.getTreatmentInfo.format(treatmentId),
            type: 'POST',
            data: {clientId: clientId},
            success: function (data) {
                var time = data.surgeryDate;
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
        $("#treatment-surgeryTime").datepicker("destroy");
        $("#treatment-surgeryTime").datepicker({
            dateFormat: 'MM d, yy',
            minDate: new Date(time)
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
    function _updateSurgeryTime(element, clientId, patientId,
                                medicalRecordId, surgeryTime, parent, selectedDate, $ele) {
        $.ajax({
            url: opts.urls.editSurgeryTime.format(patientId, medicalRecordId, selectedDate),
            type: 'PUT',
            success: function (data) {
                if (data.resp === true) {
                    var formatDate = RC.common.formatVancouverTime(parseInt(selectedDate, 10));
                    parent.find('.surgery-time-picker').text(formatDate);
                    $ele.find('.hidden-surgery-time-picker').text(formatDate);
                    $(element).tabs({
                        beforeLoad: function (event, ui) {
                            ui.tab.data("loaded", false);
                        }
                    }).tabs("load", 0);
                    _init(element);
                }
            }
        });
    }

    /**
     * init archived a treatment event
     * @private
     */
    function _initArchived(element) {
        $('.archived-active').click(function (e) {
            e.preventDefault();
            element.find('.drop-down-list').hide();
            var medicalRecordId = $(this).data("medicalRecordId");
            var patientId = $(this).data("patientId");
            var clientId = $(this).data("clientId");
            RC.common.warning(_.extend({}, opts.defaultConfirmArguments.waringArguments, {
                element: $(".warn"),
                confirmText: "Archive",
                yesCallback: function () {
                    _archived(clientId, patientId, medicalRecordId);
                }
            }));
        });
    }

    /**
     * archived a treatment
     * @param clientId
     * @param patientId
     * @param medicalRecordId
     * @private
     */
    function _archived(clientId, patientId, medicalRecordId) {
        $.ajax({
            url: opts.urls.archived.format(patientId, medicalRecordId),
            type: 'POST',
            success: function (data) {
                if (data.resp === true) {
                    window.location.reload();
                }
            }
        });
    }


    function _initGenerateTreatmentCode(element) {
        element.find('#generateCode').click(function (e) {
            e.preventDefault();
            var treatmentId = $(this).data("treatmentId");

            var data = {
                medicalRecordId: $(this).data("medicalRecordId"),
                patientId: $(this).data("patientId"),
                clientId: $(this).data("clientId")
            };

            var ajaxPost = $.ajax({
                url: opts.urls.generateTreatmentCode.format(treatmentId),
                method: "POST",
                data: data
            });
            ajaxPost.done(function (resp) {
                var content = '<div class="msg-center msg-header">' + "Code generated successfully!" + '</div>' +
                    '<div class="msg-center code">' + resp.treatmentCode + '</div>' +
                    '<div class="msg-center">' +
                    "Go to " +
                    '<a target="_blank" class="link-to-patient" href=' + resp.patientPortalLink + '>' +
                    resp.patientPortalLink + '</a>' +
                    " and enter code to start task." + '</div> ' +
                    '<div class="msg-center">' + "The code will expire in 24 hours!" + '</div>';

                $('.generate-code-form').html('');
                $('.generate-code-form').append(content);
                RC.common.confirmForm(_.extend({}, {
                    title: "TREATMENT CODE",
                    okTitle: "Done",
                    height: 200,
                    width: 500
                }, {
                    element: $('.generate-code-form'),
                    okCallback: function () {
                        $(".generate-code-form").dialog("destroy").addClass('ui-hidden');
                    }
                }));
            });
        });
    }

    function _initdropdownMenu(element) {
        $('.drop-down-toggle').click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            if ($('.drop-down-list').is(':visible')) {
                $('.drop-down-list').hide();
            } else {
                $('.drop-down-list').show();
            }
            _initDatePicker(element);
            _initArchived(element);
        });

        $('.container').click(function (e) {
            if (element.find('.drop-down-list').is(':hidden')) {
                return;
            }
            var target = $(e.target);
            if (target.closest('.drop-down-lists').length === 0) {
                $('.drop-down-list').hide();
            }
        });
    }

    /**
     * page Initialization
     * @private
     */
    function _init(element) {
        //_initDatePicker(element);
        //_initArchived(element);
        _initGenerateTreatmentCode(element);
        _initdropdownMenu(element);

        $(element).tabs({
            cache: true,
            ajaxOptions: {cache: true},
            beforeLoad: function (event, ui) {
                // if the target panel is empty, return true
                //    return ui.panel.html() == "";

                if (ui.tab.data("loaded")) {
                    event.preventDefault();
                    return;
                }

                ui.jqXHR.success(function () {
                    ui.tab.data("loaded", true);
                });

            },
            load: function (event, ui) {
                var type = ui.tab.data("type");
                if (type) {
                    switch (type) {
                        case "Activity":
                            RC.pages.activity.init(ui.panel, ui.panel.find("#activityTable"));
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
/* jshint +W072 */
