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

        //$("input:radio").click(function(e) {
        //    e.preventDefault();
        //    e.stopPropagation();
        //});

        $("#add-task").on("click", function (e) {
            e.preventDefault();
            $(".task-form")[0].reset();
            $(document.body).unbind("click");
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
    function _editNote() {
        var noteContent = null;
        var IsEditing = false;
        $(".item-note").on("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            if(!IsEditing){
                noteContent = $(this).parent().next(".note-content");
                IsEditing = _showNote(noteContent);
            }

        });

        $(".note-p").dblclick(function(e) {
            e.preventDefault();
            e.stopPropagation();
            if(!IsEditing){
                noteContent = $(this).parent(".note-content");
                IsEditing = _showNote(noteContent);
            }
        });

        $(document.body).click( function(e) {
            e.preventDefault();
            if (noteContent){
                IsEditing = _saveNote(noteContent);
                noteContent = null;
            }

        });

        $(".text-area-form").on("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
        });

    }

    function _bindDocument(){

    }

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





    /*
     * for form
     */
    function _blurFormBox(element) {
        var type = element.attr("value");
        var headerLeft = element.find("div").filter(".header-left");
        if (type === "SDM") {
            element.removeClass("sdm");
            headerLeft.removeClass("background-sdm");
            return;
        }
        if (type === "basic") {
            element.removeClass("basic");
            headerLeft.removeClass("background-basic");
            return;
        }
        if (type === "outcome") {
            element.removeClass("outcome");
            headerLeft.removeClass("background-outcome");
        }


    }

    function _activeFormBox(element) {

        var type = element.attr("value");
        var headerLeft = element.find("div").filter(".header-left");

        if (type === "SDM") {
            element.addClass("sdm");
            headerLeft.addClass("background-sdm");
            return;
        }
        if (type === "basic") {
            element.addClass("basic");
            headerLeft.addClass("background-basic");
            return;
        }
        if (type === "outcome") {
            element.addClass("outcome");
            headerLeft.addClass("background-outcome");
        }
    }


    function _clickFormBox() {




        $('.form-box').click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            var $this = $(this);
            //var checkbox = $this.find(':checkbox');
            //if (checkbox.prop('checked')) {
            //    checkbox.prop('checked', false);
            //    _blurFormBox($this);
            //} else {
            //    checkbox.prop('checked', true);
            //    _activeFormBox($this);
            //}
        });


        //$('.form-box .header-right :checkbox').change(function() {
        //    var parent = $(this).closest(".form-box");
        //
        //    if($(this).prop('checked')) {
        //        _activeFormBox(parent);
        //    }
        //    else {
        //        _blurFormBox(parent);
        //    }
        //
        //})
    }



    function _initDatePicker() {
        $('.datetime-picker').datepicker();
    }

    function _init() {
        _initDatePicker();
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
