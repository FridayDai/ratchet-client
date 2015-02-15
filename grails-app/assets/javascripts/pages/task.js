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
                title: RC.constants.waringMessageSendTask
            }
        },
        urls: {
            query: "/clients/{0}/patients/{1}/treatments/{2}/task",
            email: "/clients/{0}/patients/{1}/treatments/{2}/task/{3}/sendMail"
        }
    };

    /**
     *  add task page global variable to object opts
     * @private
     */
    function _extendOpts(element) {
        _.extend(opts, {
                params: {
                    clientId: element.find("#task-info-hidden").data("clientId"),
                    patientId: element.find("#task-info-hidden").data("patientId"),
                    medicalRecordId: element.find("#task-info-hidden").data("medicalRecordId")
                }
            }
        );
    }


    /**
     * update task sendTime. if this box is in schedule item, it also needs to update status and move to sent items
     * @param element
     * @private
     */
    function _updateTaskBox(individualTreatment, element, sendTime, dueTime) {

        var taskStatus = element.closest('.box-item').data('status');
        var sentRow = individualTreatment.find('#task-row-sent');
        var scheduleRow = individualTreatment.find('#task-row-schedule');
        var sendDate = moment(sendTime).format("MMM DD,YYYY HH:mm a");
        var dueDate = moment(dueTime).format("MMM DD,YYYY HH:mm a");

        var taskBox = element.closest('.box-item').find('.sent-time').text("Send Time: " + sendDate + '').closest(".box-item");
        taskBox = taskBox.find('.due-time').text("DUE: " + dueDate + '').closest(".box-item");
        //var html = "<div class='item-status pending'>"
        //    + "<label class='uppercase status-background'>pending</label></div>";

        if (taskStatus === "pending" || "overdue") {
            taskBox = taskBox.removeClass(taskStatus);
        }

        taskBox.addClass('pending').detach().prependTo(sentRow);

        if (sentRow.has('.no-item-sent').length !== 0) {
            sentRow.find('.no-item-sent').remove();
        }

        var hasDefaultScheduleItem = scheduleRow.has('.no-item-schedule').length !== 0;
        var noScheduleItem = scheduleRow.has('.box-item').length === 0;
        if (noScheduleItem && !hasDefaultScheduleItem) {
            var itemHtml = "<div class='no-item center no-item-schedule'><p>No item has been scheduled yet.</p></div>";
            scheduleRow.append(itemHtml);
        }

    }

    /**
     * sendEmail about task to patient
     */
    function _sendTaskEmail(individualTreatment, element, taskId) {
        var request = $.ajax({
            url: opts.urls.email.format(opts.params.clientId, opts.params.patientId, opts.params.medicalRecordId, taskId)
        });
        request.done(function (data) {
            var sendTime = data.sendTime;
            var dueTime = data.dueTime;
            _updateTaskBox(individualTreatment, element, sendTime, dueTime);
        });
    }

    /**
     * init for task Box
     * @private
     */
    function _initTaskBox(individualTreatment) {
        $('.task-email').click(function () {
            var element = $(this);
            var taskId = element.data("taskId");
            _sendTaskEmail(individualTreatment, element, taskId);
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
     * init for task page
     * @private
     */
    function _init(element) {
        _extendOpts(element);
        _initTaskBox(element);
        dropdownMenu();
    }

    $.extend(task, {
        init: function (element) {
            _init(element);
        }
    });


})(jQuery);
