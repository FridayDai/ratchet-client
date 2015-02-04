(function ($, undefined) {
    'use strict';

    var task = RC.pages.task = RC.pages.task || {};

    //Define task page global variables
    var opts = {
        defaultConfirmArguments: {
            confirmFormArguments: {
                title: RC.constants.confirmTaskTitle,
                content: RC.constants.confirmContent,
                height: 200,
                width: 980
            },
            waringArguments: {
                title: RC.constants.warningTipTitle,
                message: RC.constants.warningTip
            }
        },
        urls: {
            query: "{0}/clients/{1}/patients/{2}/treatments/{3}/task".format(RC.constants.baseUrl),
            email: "{0}/clients/{1}/patients/{2}/treatments/{3}/task/{4}/sendMail".format(RC.constants.baseUrl)
        }
    };

    //add page global value of this page to opts
    function _addValueToOpts() {
        _.extend(opts, {
                params: {
                    clientId: $("#task-info-hidden").data("clientId"),
                    patientId: $("#task-info-hidden").data("patientId"),
                    medicalRecordId: $("#task-info-hidden").data("medicalRecordId")
                }
            }
        );
    }

    /**
     * add task to medicalRecord
     * @param patientId
     * @param medicalRecordId
     * @private
     */
    function _add(clientId, patientId, medicalRecordId) {
        var toolId = $("input:radio[name=task-template]:checked").val();
        var requireCompletion = $("input:radio[name=task-template]:checked").data("requireCompletion");
        var relativeInterval = $("#relativeInterval option:selected").val();
        var status = $("input:radio[name=time]:checked").val();
        var weeks = $("#receive-week option:selected").text();
        var days = $("#receive-days option:selected").text();
        var hours = $("#receive-hours option:selected").text();
        var minutes = $("#receive-minutes option:selected").text();
        var remindDays = $("#remind-days option:selected").text();
        var remindHours = $("#remind-hours option:selected").text();
        var sendMillionSeconds = relativeInterval * 60000 * (minutes + 60 * (hours + 24 * (days + 7 * weeks)));
        var remindMillionSeconds = 3600000 * (remindHours + 24 * remindDays);
        var request = $.ajax({
            url: opts.urls.query.format(null, clientId, patientId, medicalRecordId),
            data: {
                toolId: toolId,
                status: status,
                requireCompletion: requireCompletion,
                sendMillionSeconds: sendMillionSeconds,
                remindMillionSeconds: remindMillionSeconds
            }
        });
        request.done(function (data) {
            _renderNewTask(data, status);
            _init();
        });
        request.fail(function (data) {
            console.log("failed " + data + "!");
        });
    }

    function _renderNewTask(taskObject, status) {

        if (status === '2') {
            $("#task-row-sent").append(taskObject);
        } else {
            $("#task-row-schedule").append(taskObject);
        }

    }

    /**
     * add task
     * @private
     */
    function _addTask() {

        $("#add-task").on("click", function (e) {
            e.preventDefault();
            $(".task-form")[0].reset();
            //var patientId = $(this).data("patientId");
            //var medicalRecord = $(this).data("medicalRecordId");
            var clientId = opts.params.clientId;
            var patientId = opts.params.patientId;
            var medicalRecord = opts.params.medicalRecordId;
            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.confirmFormArguments, {
                element: $(".task-form"),
                okCallback: function () {
                    $('.form-box').each(function () {
                        _blurToolBox($(this));
                    });
                    if ($("#task-form").valid()) {
                        _add(clientId, patientId, medicalRecord);
                        //_renderNewTask();
                        return true;
                    }
                    return false;
                },
                cancelCallback: function () {
                    $('.form-box').each(function () {
                        _blurToolBox($(this));
                    });

                }

            }));
        });
    }

    /**
     * sendEmail about task to patient
     */
    function _sendTaskEmail(element, taskId) {
        var request = $.ajax({
            url: opts.urls.email.format(null, opts.params.clientId, opts.params.patientId, opts.params.medicalRecordId, taskId)
        });
        request.done(function (data) {
            if (data === "true") {
                var date = new Date();
                date = moment(date).format("MMM/DD/YYYY, HH:mm a");
                var html = "<div class='item-status pending'><label class='uppercase status-background'>pending</label></div>";
                var target = element.parent().siblings('.show-status').html('').append(html).closest(".box-item");
                target = target.find('.sent-time').text("Send Time: " +date+ "").closest(".box-item");
                target.addClass('pending').detach().appendTo($('#task-row-sent'));
            }
        });
        request.fail(function () {

        });
    }

    function _initTaskBox() {
        //$('.a-remove').click(function () {
        //    var $this = $(this);
        //    var taskId = $this.data('id');
        //
        //    RC.common.warning(_.extend({}, opts.defaultConfirmArguments.waringArguments, {
        //        element: $(".warn"),
        //        closeCallback: function () {
        //            console.log(taskId);
        //            $this.closest('.box-item').remove();
        //        }
        //    }));
        //});

        $('.task-email').click(function () {
            var element = $(this);
            var taskId = element.data("taskId");
            _sendTaskEmail(element, taskId);
        });
    }


    /**
     * TASK FORM BOX, blur the form box color
     * @param element
     * @private
     */
    function _blurToolBox(element) {
        var type = element.attr("value");
        var headerLeft = element.find("div").filter(".header-left");
        var changeColor = element.find(".header-middle .color-change");

        if (changeColor.hasClass('active-color')) {
            changeColor.removeClass('active-color');
        }

        if ($.inArray(type, ["sdm", "basic", "outcome"]) !== -1) {
            element.removeClass(type);
            headerLeft.removeClass(type);
        }
    }

    /**
     * TASK FORM BOX, active the form box color
     * @param element
     * @private
     */
    function _activeToolBox(element) {

        var type = element.attr("value");
        var headerLeft = element.find("div").filter(".header-left");
        var changeColor = element.find(".header-middle .color-change");

        if (!changeColor.hasClass('active-color')) {
            changeColor.addClass('active-color');
        }

        if ($.inArray(type, ["sdm", "basic", "outcome"]) !== -1) {
            element.addClass(type);
            headerLeft.addClass(type);
        }
    }

    /**
     * TASK FORM BOX, init the form box when click
     * @private
     */
    function _initToolBox() {

        $('.form-box').click(function () {
            var $this = $(this);
            var radio = $this.find(':radio');

            var requireCompletion = radio.data("requireCompletion");
            var hideMessageArea = $("#hide-message");
            if (requireCompletion === true) {
                hideMessageArea.css("visibility", "visible");
            } else {
                hideMessageArea.css("visibility", "hidden");
            }

            $("input:radio[name=task-template]").each(function () {
                _blurToolBox($(this).closest(".form-box"));
                this.checked = false;
            });

            _activeToolBox($(this));
            radio.prop('checked', true);

        });

        $('.box-radio').click(function (e) {
            e.stopPropagation();
            var requireCompletion = $(this).data("requireCompletion");
            var hideMessageArea = $("#hide-message");
            if (requireCompletion === true) {
                hideMessageArea.css("visibility", "visible");
            } else {
                hideMessageArea.css("visibility", "hidden");
            }
            $("input:radio[name=task-template]").each(function () {
                _blurToolBox($(this).closest(".form-box"));
            });

            _activeToolBox($(this).closest(".form-box"));

        });

        $("input:radio[name=time]").click(function (e) {
            e.stopPropagation();
            var relativeChoices = $('#relative-choices');
            if ($(this).val() === "2") {
                relativeChoices.hide();
            }
            if ($(this).val() === "3") {
                relativeChoices.show();
            }
        });

    }

    /**
     * DROPDOWN, dropdown show and hide
     */
    var dropdownMenu = function () {

        var dropdownList; // Private variables for dropdownList

        /**
         * DROPDOWN, clear the dropdown
         * @private
         */
        function _closeDropdown() {
            $(document.body).click(function (e) {
                e.preventDefault();
                if (dropdownList) {
                    dropdownList.hide();
                    dropdownList = null;
                    $(document.body).unbind("click");
                }

            });
        }

        /**
         * DROPDOWN, dropdown main function to init this
         * @private
         */
        function _initDropdownList() {

            $('.btn-dropdown').click(function (e) {
                e.preventDefault();
                e.stopPropagation();
                $(this).trigger('focus');
                if (dropdownList) {
                    //before new a dropdownList, we need to hide the old one
                    dropdownList.hide();
                }
                dropdownList = $(this).find(".dropdown-list");
                dropdownList.show();
                _closeDropdown();
            });
        }

        return _initDropdownList();
    };

    /**
     * DATETIMEPICKER, init dateTimePicker
     * @private
     */
    function _initDatePicker() {
        $('.datetime-picker').datetimepicker({
            controlType: 'input',
            showOn: "button",
            buttonImage: "../../assets/patients/calender.png",
            buttonImageOnly: true,
            onClose: function (selectedDate) {
                $(this).parent().find('.surgery-time-picker').text(selectedDate);
            }
        });
    }

    /**
     * init for task page
     * @private
     */
    function _init() {
        _addValueToOpts();
        _addTask();
        _initTaskBox();
        _initToolBox();
        dropdownMenu();
        _initDatePicker();
    }

    $.extend(task, {
        init: function () {
            _init();
        }
    });


})(jQuery);
