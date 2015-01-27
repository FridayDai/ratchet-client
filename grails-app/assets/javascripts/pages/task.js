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
            query: "{0}/patients/{1}/treatments/{2}/task".format(RC.constants.baseUrl)
        }
    };

    var IsEditing = false; // Private variables for note
    var noteContent = null; // Private variables for note
    var dropdownList; // Private variables for dropdownList

    /**
     * add task
     * @private
     */
    function _addTask() {

        $("#add-task").on("click", function (e) {
            e.preventDefault();
            $(".task-form")[0].reset();
            var surgeryTime = $(this).data("surgeryTime");
            var patientId = "x12345";
            var medicalRecord = 21;//need change
            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.confirmFormArguments, {
                element: $(".task-form"),
                okCallback: function () {
                    if ($("#task-form").valid()) {
                        _add(surgeryTime, patientId, medicalRecord);
                        return true;
                    }
                    return false;
                },
                cancelCallback: function () {
                    $('.form-box').each(function () {
                        _blurFormBox($(this));
                    });

                }

            }));
        });
    }

    /**
     * add task to medicalRecord
     * @param patientId
     * @param medicalRecordId
     * @private
     */
    function _add(surgeryTime, patientId, medicalRecordId) {
        var toolId = $("input:radio[name=task-template]:checked").val();
        var relativeInterval = $("#relativeInterval option:selected").val();
        var status = $("input:radio[name=time]:checked").val();
        var weeks = $("#receive-week option:selected").text();
        var days = $("#receive-days option:selected").text();
        var hours = $("#receive-hours option:selected").text();
        var minutes = $("#receive-minutes option:selected").text();
        var remindDays = $("#remind-days option:selected").text();
        var remindHours = $("#remind-hours option:selected").text();
        var sendMillionSeconds = 60000 * (minutes + 60 * (hours + 24 * (days + 7 * weeks)));
        var remindMillionSeconds = 3600000 * (remindHours + 24 * remindDays);
        var request = $.ajax({
            url: opts.urls.query.format(patientId, medicalRecordId),
            data: {toolId: toolId, status: status, surgeryTime: surgeryTime, sendMillionSeconds: sendMillionSeconds,
                remindMillionSeconds: remindMillionSeconds}
        });
        request.done(function () {
            _renderNewTask();
        });
        request.fail(function () {

        });
    }

    function _renderNewTask() {
        var html = '<div></div>';



    }

    /**
     * remove task
     * @private
     */
    function _removeTask() {
        $('.a-remove').click(function () {
            var $this = $(this);
            var taskId = $this.data('id');

            RC.common.warning(_.extend({}, opts.defaultConfirmArguments.waringArguments, {
                element: $(".warn"),
                closeCallback: function () {
                    console.log(taskId);
                    $this.closest('.box-item').remove();
                }
            }));
        });
    }

    /**
     * NOTE, show textarea for note
     * @param content
     * @returns {boolean}
     * @private
     */
    function _showNote(content) {
        var p = content.find("p");
        var value = p.text();
        p.hide();
        content.parent().removeClass('note-bg').addClass('note-bg-edit');
        content.find("textarea").val(value).show();
        return true;

    }

    /**
     * NOTE, save textarea content and hide textarea for note
     * @param content
     * @returns {boolean}
     * @private
     */
    function _saveNote(content) {
        var textarea = content.find("textarea");
        var value = textarea.val();
        textarea.hide();
        content.parent().removeClass('note-bg-edit').addClass('note-bg');
        content.find("p").text(value).show();
        return false;
    }

    /**
     * NOTE, when complete the edit, the function will be use
     * @private
     */
    function _finishEdit() {
        $(document.body).click(function (e) {
            e.preventDefault();
            if (noteContent) {
                IsEditing = _saveNote(noteContent);
                noteContent = null;
                $(document.body).unbind("click");
            }
        });
    }

    /**
     * NOTE, the main function of note
     * @private
     */

    function _editNote() {

        $(".item-note").on("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (!IsEditing) {
                noteContent = $(this).parent().next(".note-content");
                IsEditing = _showNote(noteContent);
                _finishEdit();
            }

        });

        $(".note-p").dblclick(function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (!IsEditing) {
                noteContent = $(this).parent(".note-content");
                IsEditing = _showNote(noteContent);
                _finishEdit();
            }
        });

        $(".text-area-form").on("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
        });

    }

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


    /**
     * TASK FORM BOX, blur the form box color
     * @param element
     * @private
     */
    function _blurFormBox(element) {
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
    function _activeFormBox(element) {

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
    function _clickFormBox() {

        $('.form-box').click(function () {
            var $this = $(this);
            var radio = $this.find(':radio');

            $("input:radio[name=task-template]").each(function () {
                _blurFormBox($(this).closest(".form-box"));
                this.checked = false;
            });

            _activeFormBox($(this));
            radio.prop('checked', true);

        });

        $('.box-radio').click(function (e) {
            e.stopPropagation();

            $("input:radio[name=task-template]").each(function () {
                _blurFormBox($(this).closest(".form-box"));
            });

            _activeFormBox($(this).closest(".form-box"));

        });

        $("input:radio[name=time]").click(function (e) {
            e.stopPropagation();
            var relativeChoices = $('#relative-choices');
            if($(this).val() === "2") {
                relativeChoices.hide();
            }
            if($(this).val() === "3") {
                relativeChoices.show();
            }
        });

    }

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
                $(this).parent().find('.datetime-picker-label').text(selectedDate);
            }
        });
    }

    /**
     * init for task page
     * @private
     */
    function _init() {
        _initDatePicker();
        _initDropdownList();
        _clickFormBox();
        _addTask();
        _removeTask();
        _editNote();
    }

    $.extend(task, {
        init: function () {
            _init();
        }
    });


})(jQuery);
