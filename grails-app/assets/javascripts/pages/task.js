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
            noteFormArguments: {
                title: RC.constants.confirmNoteTitle,
                content: RC.constants.confirmContent,
                height: 200,
                width: 400
            },
            waringArguments: {
                title: RC.constants.warningTipTitle,
                message: RC.constants.warningTip
            }

        }
    };

    /*
     * init page color
     */

    function _initBoxColor() {
        $(".box-item").each(function () {
            var $this = $(this);
            var $header = $this.find('.item-header');
            var $bgType = $this.find('.item-left-li');
            var type = $(this).attr("value");
            var hasClass = $this.hasClass('SDM') || $this.hasClass('basic') || $this.hasClass('outcome');

            if ($this.attr('status') === "complete" || hasClass) {
                return;
            }

            _changeBorderColor(type, $this, $header);
            _changeBgColor(type, $bgType);

        });
    }

    function _changeBorderColor(type, that, header) {

        if (type === "SDM") {
            that.addClass("sdm");
            header.addClass("sdm");
            return;
        }
        if (type === "basic") {
            that.addClass("basic");
            header.addClass("basic");
        }
        else {
            that.addClass("outcome");
            header.addClass("outcome");
        }
    }

    function _changeBgColor(type, bgType) {

        if (type === "SDM") {
            bgType.addClass("background-sdm");
            return;
        }
        if (type === "basic") {
            bgType.addClass("background-basic");
        }
        else {
            bgType.addClass("background-outcome");
        }
    }

    /*
     * add task
     */
    function _addTask() {
        $("#add-task").on("click", function (e) {
            e.preventDefault();
            $(".task-form")[0].reset();

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

        $('.form-box').click(function () {
            var $this = $(this);
            var checkbox = $this.find(':checkbox');
            if (checkbox.prop('checked')) {
                checkbox.prop('checked', false);
                _blurFormBox($this);
            } else {
                checkbox.prop('checked', true);
                _activeFormBox($this);
            }
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

    /*
     * edit note
     */
    function _editNote() {
        $(".item-note").on("click", function (e) {
            e.preventDefault();
            $(".note-form")[0].reset();
            var noteContent = $(this).parent().next();

            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.noteFormArguments, {
                element: $(".note-form"),
                okCallback: function () {
                    if($("textarea").valid()){
                        var textarea = this.element.find('textarea').val();
                        noteContent.html("<p>" + textarea + "</p>");
                        return true;
                    }

                },
                cancelCallback: function () {

                }

            }));
        });
    }

    function _initDatePicker() {
        $('.datetime-picker').datepicker();
    }

    function _init() {
        _initDatePicker();
        //_initBoxColor();
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
