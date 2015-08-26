(function ($, undefined) {
    'use strict';

    var task = RC.pages.task = RC.pages.task || {};

    //Define task page global variables
    var opts = {
        defaultConfirmArguments: {
            confirmFormArguments: {
                title: RC.constants.confirmTaskTitle,
                content: RC.constants.confirmContent,
                width: 980
            },
            showMsgArguments: {
                msg: RC.constants.sendTaskEmailSuccess
            }
        },
        urls: {
            query: "/patients/{0}/treatments/{1}/task",
            email: "/patients/{0}/treatments/{1}/task/{2}/send-mail"
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
     * sendEmail about task to patient
     */
    function _sendTaskEmail(individualTreatment, element, taskId) {
        var request = $.ajax({
            url: opts.urls.email.format(opts.params.patientId, opts.params.medicalRecordId, taskId)
        });
        request.done(function () {
            RC.common.showMsg(opts.defaultConfirmArguments.showMsgArguments);
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
     * check archived element height. if it can't fill the whole page, we will set it's height.
     * @param element
     * @private
     */
    function _checkArchivedWindowSize(element) {
        var content = element.find('.content');
        if (content.hasClass('archived') && $('.container').outerHeight() < $(window).height()) {
            var topHeight = element.offset().top;
            var contentHeight = $(window).height() - topHeight - $('.footer').height();
            content.height(contentHeight);
        }
    }

    function _switchGenerateCodeBtnStatus(element) {
        if (element.find('#no-active-item').text() === "There are no active items") {
            var codeEle = element.parent().find('.code-generation #generateCode');
            codeEle.attr('disabled',true);
            codeEle.addClass('btn-generate-code-disabled');
        }
    }


    /**
     * init for task page
     * @private
     */
    function _init(element) {
        _extendOpts(element);
        _initTaskBox(element);
        _checkArchivedWindowSize(element);
        dropdownMenu();
        _switchGenerateCodeBtnStatus(element);
    }

    $.extend(task, {
        init: function (element) {
            _init(element);
        }
    });


})
(jQuery);
