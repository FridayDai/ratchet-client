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
            }
        },
        urls: {
            query: "{0}/clients/{1}/patients/{2}/treatments/{3}/task".format(RC.constants.baseUrl),
            email: "{0}/clients/{1}/patients/{2}/treatments/{3}/task/{4}/sendMail".format(RC.constants.baseUrl)
        }
    };

    /**
     *  add task page global variable to object opts
     * @private
     */
    function _extendOpts() {
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
     * update task sendTime. if this box is in schedule item, it also needs to update status and move to sent items
     * @param element
     * @private
     */
    function _updateTaskBox(element) {
        var date = new Date();
        date = moment(date).format("MMM/DD/YYYY, HH:mm a");
        var hasNotStatus = element.parent().siblings('.show-status').has('.item-status').length === 0;
        var taskBox = element.closest('.box-item').find('.sent-time').text("Send Time: " +date+'').closest(".box-item");
        if (hasNotStatus) {
            var html = "<div class='item-status pending'>"
                + "<label class='uppercase status-background'>pending</label></div>";
            taskBox = taskBox.find('.show-status').html('').append(html).closest(".box-item");
            taskBox.addClass('pending').detach().appendTo($('#task-row-sent'));
        }
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
                _updateTaskBox(element);
            }
        });
        request.fail(function () {

        });
    }

    /**
     * init for task Box
     * @private
     */
    function _initTaskBox() {
        $('.task-email').click(function () {
            var element = $(this);
            var taskId = element.data("taskId");
            _sendTaskEmail(element, taskId);
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
    function _init() {
        _extendOpts();
        _initTaskBox();
        dropdownMenu();
    }

    $.extend(task, {
        init: function () {
            _init();
        }
    });


})(jQuery);
