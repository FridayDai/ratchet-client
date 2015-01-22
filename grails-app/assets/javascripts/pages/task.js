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
        }
    };

    /*
     * add task
     */
    function _addTask() {

        $("#add-task").on("click", function (e) {
            e.preventDefault();
            $(".task-form")[0].reset();
            //$(document.body).unbind("click");
            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.confirmFormArguments, {
                element: $(".task-form"),
                okCallback: function () {
                    if ($("#task-form").valid()) {
                        _add();
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

    function _add() {

    }

    /*
     * remove task
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

    /*
     * edit note
     */
    function _showNote(content) {
        var p = content.find("p");
        var value = p.text();
        p.hide();
        content.parent().removeClass('note-bg').addClass('note-bg-edit');
        content.find("textarea").val(value).show();
        return true;

    }

    function _saveNote(content) {
        var textarea = content.find("textarea");
        var value = textarea.val();
        textarea.hide();
        content.parent().removeClass('note-bg-edit').addClass('note-bg');
        content.find("p").text(value).show();
        return false;
    }

    function _editNote() {
        var noteContent = null;
        var IsEditing = false;

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
    }

    /*
     * for dropdownList
     */
    function _initDropdownList() {
        var dropdownList;

        $('.btn-dropdown').click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (dropdownList) {
                //before new a dropdownList, we need to hide the old one
                dropdownList.hide();
            }
            dropdownList = $(this).find(".dropdown-list");
            dropdownList.show();
            _closeDropdown();

        });

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

    }

    /*
     * for form
     */
    function _blurFormBox(element) {
        var type = element.attr("value");
        var headerLeft = element.find("div").filter(".header-left");
        var changeColor = element.find(".header-middle .color-change");

        if (changeColor.hasClass('active-color')) {
            changeColor.removeClass('active-color');
        }

        if (["sdm", "basic", "outcome"].indexOf(type) !== -1) {
            element.removeClass(type);
            headerLeft.removeClass(type);
        }
    }

    function _activeFormBox(element) {

        var type = element.attr("value");
        var headerLeft = element.find("div").filter(".header-left");
        var changeColor = element.find(".header-middle .color-change");

        if (!changeColor.hasClass('active-color')) {
            changeColor.addClass('active-color');
        }

        if (["sdm", "basic", "outcome"].indexOf(type) !== -1) {
            element.addClass(type);
            headerLeft.addClass(type);
        }
    }


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

    }


    function _initDatePicker() {
        $('.datetime-picker').datetimepicker({
            controlType: 'input',
            showOn: "button",
            buttonImage: "../../assets/patients/calender.png",
            buttonImageOnly: true,
            onClose: function( selectedDate ) {
                $(this).parent().find('.datetime-picker-label').text(selectedDate);
            }
        });
    }

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
