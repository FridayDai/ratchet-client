// TODO: This code should be removed after refactor
/* jshint -W071 */
(function ($, undefined) {
    'use strict';

    //Define patient page global variables
    var opts = {
            defaultConfirmArguments: {
                confirmTreatmentFormArguments: {
                    title: RC.constants.confirmTreatmentTitle,
                    content: RC.constants.confirmContent,
                    width: 620
                },
                editPatientFormArguments: {
                    title: RC.constants.editPatientTitle,
                    content: RC.constants.confirmContent,
                    width: 620
                },
                waringArguments: {
                    title: RC.constants.warningTipTitle,
                    message: RC.constants.warningTip
                },
                showMsgArguments: {
                    msg: RC.constants.invitePatientSuccess
                },
                addEmailFormArguments: {
                    title: RC.constants.addEmailTitle,
                    content: RC.constants.addEmailContent,
                    width: 410
                }
            },
            urls: {
                updatePatient: "/patients/{0}",
                assignTreatment: "/patients/{0}/treatments",
                invitePatient: "/patients/{0}/invite",
                checkPatientId: "/patients/check-id",
                checkPatientEmail: "/patients/check-email",
                query: "/getProvider",
                getTreatments: "/treatments",
                getStaffs: "/staffs",
                //getGroups: "/getStaffGroups"
                getGroups: "/accounts/{0}/groups"
            }
        },
        tabs,
        patientId,
        clientId,
        tabTemplate,
        _addTreatmentGroupId;

    /**
     * init treatment tab
     * @private
     */
    function _initTab() {
        tabTemplate = "<li><a href='#{href}'>#{label}</a></li>";
        tabs = $("#tabs").tabs({
            beforeLoad: function (event, ui) {
                ui.jqXHR.error(function () {
                    ui.panel.html(RC.constants.errorMessage);
                });
            },
            load: function (event, ui) {
                RC.pages.treatment.init(ui.panel.find("#subTabs"));
                $('.patient-tab').css("display", "block");
            }
        });
    }

    /**
     * add treatment tab
     * @private
     */
    function _addTab(treatment, surgeryTime, emailStatus) {
        //var label = tabTitle,
        var label = treatment.treatmentInfo.title + " " + treatment.treatmentInfo.tmpTitle;
        var url = "/patients/" + patientId + "/treatment?clientId=" + clientId +
            "&medicalRecordId=" + treatment.medicalRecordId + "&treatmentId=" + treatment.treatmentId +
            "&surgeryTime=" + surgeryTime + "&PatientEmailStatus=" + emailStatus + "";
        var li = $(tabTemplate.replace(/#\{href\}/g, url).replace(/#\{label\}/g, label));
        //
        tabs.find(".tab-treatment").append(li);
        tabs.tabs("refresh");
    }


    /**
     * add treatment to a patient
     * @private
     */
    function _addTreatment() {
        $("#addTab").button().click(function (e) {
            e.preventDefault();

            $(".treatment-form")[0].reset();

            if ($('.permission-confirm').hasClass('visible')) {
                $('.permission-confirm').removeClass('visible');
            }

            patientId = $(this).data("patientId");
            clientId = $(this).data("clientId");
            var accountId = $(this).data("accountId");

            var parent = $(this).parents();
            var id = parent.find(".id").text();
            var firstName = parent.find(".first-name").text().trim();
            var lastName = parent.find(".last-name").text().trim();
            var email = parent.find("#patientEmail").text().trim();
            var phoneNum = parent.find(".phone").text().trim();
            var phoneNumber = phoneNum.replace(/(-)/g, '');

            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.confirmTreatmentFormArguments, {
                element: $(".treatment-form"),
                okCallback: function () {
                    if ($("#treatment-form").valid()) {
                        var treatmentId = $("#selectTreatment").data("id");
                        var staffIds = $("#selectSurgeons").data("id");
                        var groupId = $("#selectGroup").data("id");
                        //var staffArray = staffIds.split(',');
                        //var staffIdArr = [];
                        //$.each(staffArray, function (index, item) {
                        //    staffIdArr.push(parseInt(item));
                        //});
                        var surgeryTime = RC.common.parseVancouverTime($("#surgeryTime").val());
                        var ecFirstName = $('#emergency-firstName').val();
                        var ecLastName = $('#emergency-lastName').val();
                        var relationship = $('#relationshipName').data("id");
                        var ecEmail = $('#emergency-email').val();
                        var emailStatus = $(".info .email-status").attr("value");

                        var assignInfo = {
                            id: id,
                            patientId: patientId,
                            clientId: clientId,
                            firstName: firstName,
                            lastName: lastName,
                            phoneNumber: phoneNumber,
                            email: email,
                            treatmentId: treatmentId,
                            staffId: staffIds,
                            surgeryTime: surgeryTime,
                            ecFirstName: ecFirstName,
                            ecLastName: ecLastName,
                            relationship: relationship,
                            ecEmail: ecEmail,
                            groupId: groupId,
                            emailStatus: emailStatus
                        };
                        _assignTreatment(patientId, clientId, assignInfo);

                        return true;
                    }
                    return false;
                }
            }));

            _initSelectTreatment();
            _initStaffSelect();
            //_initSurgeryTime();
            _initSelect();
            _checkEmergencyContact();
            _initSelectGroup(accountId);

        });
    }

    /**
     * invite patient again
     */
    function _inviteAgain() {
        var id = $('.invite-patient').data("id");
        $('.invite-patient').click(function () {
            $.ajax({
                url: opts.urls.invitePatient.format(id),
                success: function (data) {
                    if (data === "true") {
                        RC.common.showMsg(opts.defaultConfirmArguments.showMsgArguments);
                    }
                }
            });
        });
    }

    /**
     * init select
     * @private
     */
    function _initSelect() {
        var data = [
            {label: "Spouse", id: 1},
            {label: "Parent", id: 2},
            {label: "Child", id: 3},
            {label: "Friend", id: 4},
            {label: "Other", id: 5}
        ];


        $("#relationshipName").combobox({
            change: function (event, ui) {
                event.preventDefault();
                if (ui.item === null) {
                    $(this).data("id", "");
                    $(this).val("");
                    _changeRequiredStatus(this);

                }
            },
            source: function (request, response) {
                var sources = _.filter(data, function (num) {
                    return num.label.toLowerCase().indexOf(request.term.toLowerCase()) > -1;
                });

                if (sources.length) {
                    response($.map(sources, function (item) {

                        return {
                            label: item.label,
                            value: item.id
                        };
                    }));
                }
            },
            appendTo: ".container"
        });
    }

    /**
     *
     * @param emid
     * @param clientId
     * @param assignInfo
     * @private
     */
    function _assignTreatment(patientId, clientId, assignInfo) {
        $.ajax({
            url: opts.urls.assignTreatment.format(patientId),
            type: 'POST',
            data: assignInfo,
            dataType: 'json',
            success: function (data) {
                //tabTitle = data.title;
                var medicalRecordId = data.medicalRecordId;
                var treatmentId = data.treatmentInfo.id;
                //var treatmentTitle = data.treatmentInfo.title;
                var treatmentInfo = data.treatmentInfo;
                var surgeryTime = assignInfo.surgeryTime;
                var treatment = {
                    medicalRecordId: medicalRecordId,
                    treatmentId: treatmentId,
                    treatmentInfo: treatmentInfo
                };

                _addTab(treatment, surgeryTime, assignInfo.emailStatus);
                _checkTreatmentBtn();
            }
        });
    }

    /**
     * @private
     */
    function _checkTreatmentBtn() {
        if ($('.tab-treatment li').length >= 3) {
            $('#addTab').hide();
        }
    }

    function _getEmailValidate($field, primaryEmail) {
        return {
            email: true,
            remote: {
                url: opts.urls.checkPatientEmail,
                type: "POST",
                beforeSend: function () {
                    RC.common.progress(false);
                },
                data: {
                    email: function () {
                        return $field.val();
                    }
                },
                async: false,
                dataFilter: function (responseString) {
                    if (primaryEmail === $field.val()) {
                        return '"true"';
                    } else if (responseString === "false") {
                        return "\"" + RC.constants.emailExist + "\"";
                    } else {
                        return '"true"';
                    }
                },
                error: function (jqXHR) {
                    if (jqXHR.status === 500) {
                        return;
                    }
                }

            }
        };
    }

    function _initAddEmailFormDialog() {
        $('.add-email').click(function (e) {
            e.preventDefault();

            var $form = $('#add-email-form');
            var $editButon = $('.btn-edit-patient');
            var patientId = $editButon.data("patientId");
            var clientId = $editButon.data("clientId");

            $form.validate({
                rules: {
                    email: _getEmailValidate($('#add-email-field'), $("#patientEmail").text().trim())
                }
            });

            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.addEmailFormArguments, {
                    element: $form,
                    okCallback: function () {
                        if ($form.valid() && $form.valid()) {

                            var number = $(".info .phone").text();
                            var phoneNumber = number.replace(/[\s\(\)-]/g, '');
                            var patientInfo = {
                                patientId: patientId,
                                id: $(".id-info .id").text(),
                                firstName: $(".info .first-name").text(),
                                lastName: $(".info .last-name").text(),
                                email: $("#add-email-field").val(),
                                number: number,
                                phoneNumber: phoneNumber,
                                clientId: clientId
                            };

                            _updatePatient(patientId, clientId, patientInfo);
                            return true;
                        }
                        return false;
                    },
                    secondTitle: 'No, next time'
                }
            ));
        });
    }

    /**
     * set remote validation with email and id
     * @param form
     * @private
     */
    function _setRemoteValidation(form, primaryPatientId, primaryEmail) {
        form.validate({
            rules: {
                phone: {
                    minlength: 14,
                    checkPhoneNumberRegion: true
                },
                id: {
                    required: true,
                    remote: {
                        url: opts.urls.checkPatientId,
                        type: "POST",
                        beforeSend: function () {
                            RC.common.progress(false);
                        },
                        data: {
                            patientId: function () {
                                return $('.patient-form #patientId').val();
                            }
                        },
                        async: false,
                        dataType: "json",
                        dataFilter: function (responseString) {
                            var resp = jQuery.parseJSON(responseString);
                            if (primaryPatientId === $('.patient-form #patientId').val()) {
                                return '"true"';
                            }
                            else if (resp.check !== "false") {
                                return "\"" + RC.constants.patientIdExist + "\"";
                            } else {
                                return '"true"';
                            }
                        },
                        error: function (jqXHR) {
                            if (jqXHR.status === 500) {
                                return;
                            }
                        }

                    }
                },
                email: _getEmailValidate($('#email'), primaryEmail)
            },
            messages: {
                phone: {
                    minlength: RC.constants.phoneNumberMsg
                }
            }
        });
    }

    /**
     * edit patient info event
     * @private
     */
    function _editPatientInfo() {
        $('.btn-edit-patient').on('click', function (e) {
            e.preventDefault();

            var patientId = $(this).data("patientId");
            var clientId = $(this).data("clientId");

            var parent = $(this).parents();
            var id = parent.find(".id").text().trim();
            var firstName = parent.find(".first-name").text();
            var lastName = parent.find(".last-name").text();
            var email = parent.find("#patientEmail").text().trim();
            var phoneNum = parent.find(".phone").text();
            var phoneNumber = $.trim(phoneNum);

            $("form #patientId").val(id);
            $("#patientId").blur();
            $("#firstName").val(firstName);
            $("#lastName").val(lastName);
            $("#email").val(email);
            $("#phone").val(phoneNumber);

            var form = $(".patient-form");
            _setRemoteValidation(form, id, email);

            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.editPatientFormArguments, {
                    element: form,
                    okCallback: function () {
                        if (form.valid() && form.valid()) {
                            var currentEmailVal = $("#email").val();
                            if (currentEmailVal === '') {
                                _confirmWithEmptyEmail(form, clientId, patientId);
                                return false;
                            }

                            _submitUpdatePatient(clientId, patientId);
                            return true;
                        }
                        return false;
                    }
                }
            ));

            _checkSpecialNumber();

            if (phoneNumber.substring(0, 3) !== "1 1" && phoneNumber.substring(0, 3) !== "1 0") {
                _initPhoneInput();
            }
        });
    }

    function _submitUpdatePatient(clientId, patientId) {
        var number = $("#phone").val();
        var phoneNumber = number.replace(/[\s\(\)-]/g, '');
        var patientInfo = {
            patientId: patientId,
            id: $("form #patientId").val(),
            firstName: $("#firstName").val(),
            lastName: $("#lastName").val(),
            email: $("#email").val(),
            number: number,
            phoneNumber: phoneNumber,
            clientId: clientId
            //phoneNum: $("#phone").val()
        };
        _updatePatient(patientId, clientId, patientInfo);
    }

    function _confirmWithEmptyEmail($dialog, clientId, patientId) {
        RC.common.warning(_.extend({
            title: 'NO EMAIL ADDRESS',
            message: [
                'Patient without email address will not receive any automated task reminder.',
                'Do you want to proceed?'
            ]
        }, {
            element: $(".warn"),
            confirmText: "Yes",
            secondText: 'No',
            yesCallback: function () {
                _submitUpdatePatient(clientId, patientId);

                $dialog.dialog('close');
                return true;
            }
        }));
    }

    /**
     *
     * @param emid
     * @param clientId
     * @param patientInfo
     * @private
     */
    function _updatePatient(patientId, clientId, patientInfo) {
        var originalPatientEmail = $('#patientEmail').attr('value');
        $.ajax({
            url: opts.urls.updatePatient.format(patientId),
            type: 'POST',
            data: patientInfo,
            dataType: 'json',
            success: function (status) {
                if (status.resp === 200) {
                    $('.id').text(patientInfo.id);
                    $('.first-name').text(patientInfo.firstName);
                    $('.last-name').text(patientInfo.lastName);
                    $('#patientEmail').text((patientInfo.email).toLowerCase());
                    $('.phone').text(patientInfo.number);

                    $('#patientEmail').attr('value', patientInfo.email);

                    _checkEmailUpdated(originalPatientEmail, patientInfo.email);
                }
            }
        });
    }

    /**
     * show invite again button when email updated.
     * @private
     */
    function _checkEmailUpdated(originalPatientEmail, updatedEmail) {
        var $addEmail = $('.add-email');
        var $emailStatus = $('.patient-detail .email-status');

        if (originalPatientEmail !== updatedEmail) {
            if (updatedEmail === '') {
                $('.div-invite').css('display', 'none');
                _toggleNotifyButton(false);

                $addEmail.show();

                $emailStatus.hide();
            } else {
                $('.div-invite').css('display', 'inline-block');

                _toggleNotifyButton(true);

                $addEmail.hide();

                $emailStatus
                    .attr('class', '')
                    .addClass('email-status unverified')
                    .text('Unverified')
                    .show();
            }
        }
    }

    //if email not verified, button always hide. And we do not use socket, status only can turn show to hide.
    function _toggleNotifyButton(isVisible) {
        var $notifyButton = $('.btn-notify.task-email');

        if (!isVisible) {
            $notifyButton.hide();
        }
    }

    /**
     * go back to previous page
     * @private
     */
    function _goBackToPrePage() {
        $('.btn-close').on('click', function (e) {
            e.preventDefault();
            window.location.href = "/patients";
            //parent.history.back();
            //return false;
        });
    }

    /**
     * disabled button
     * @param elem
     * @private
     */
    //function _disableButton(elem) {
    //    elem.prop("disabled", true);
    //}

    /**
     * enabled button
     * @param elem
     * @private
     */
    //function _enableButton(elem) {
    //    elem.prop("disabled", false);
    //}

    /**
     * init select treatment
     * @private
     */
    function _initSelectTreatment() {
        $("#selectTreatment").combobox({
            source: function (request, response) {
                $.ajax({
                    beforeSend: function () {
                        RC.common.progress(false);
                    },
                    url: opts.urls.getTreatments,
                    type: "POST",
                    data: {
                        treatmentTitle: request.term,
                        max: 1000
                    },
                    success: function (data) {
                        if (data.length) {
                            // normal response
                            response($.map(data, function (item) {
                                return {
                                    label: item.title + ' ' + item.tmpTitle,
                                    value: item.id,
                                    surgeryTime: item.surgeryTimeRequired,
                                    timeStamp: item.sendTimeOffset,
                                    surgeryDate: item.surgeryDate
                                };
                            }));
                        }
                    }
                });
            },
            select: function (event, ui) {
                event.preventDefault();
                $(this).val(ui.item.label);
                $(this).data("id", ui.item.value);
                $(this).data("surgeryTime", ui.item.surgeryTime);
                $(this).data("timeStamp", ui.item.timeStamp);
                $(this).valid();
            },
            appendTo: ".container",
            change: function (data, ui) {
                if (ui.item === null) {
                    $(this).data("id", "");
                    $("#surgeryTime").val("");
                    $("#surgeryTime").prop("disabled", true);
                    return;
                }
                if (ui.item.surgeryTime === true) {
                    $("#div-surgery-time").css("display", "block");
                } else {
                    $("#div-surgery-time").css("display", "none");
                }
                //var date = new Date();
                //var time = date.getTime() + ui.item.timeStamp;
                //var time = ui.item.surgeryDate + ui.item.timeStamp;
                var time = ui.item.surgeryDate;
                $("#surgeryTime").val("");
                $("#surgeryTime").prop("disabled", false);
                _initSurgeryTime(time);
            }
        });
    }

    /**
     * init select staff
     * @private
     */
    function _initStaffSelect() {
        //if (groupId) {
        //    $("#selectSurgeons").combobox("destroy");
        //}
        $("#selectSurgeons").combobox({
            source: function (request, response) {
                $.ajax({
                    beforeSend: function () {
                        RC.common.progress(false);
                    },
                    url: opts.urls.getStaffs,
                    type: "POST",
                    data: {
                        name: request.term,
                        type: 9,
                        groupId: _addTreatmentGroupId,
                        max: 1000
                    },
                    success: function (data) {
                        // normal response
                        response($.map(data, function (item) {
                            return {
                                label: item.firstName + " " + item.lastName,
                                value: item.id
                            };
                        }));
                    }
                });
            },
            appendTo: ".container"

        });
    }

    /**
     * init surgery date
     * @private
     */
    function _initSurgeryTime(time) {
        $("#surgeryTime").datepicker("destroy");

        /* fix buggy IE popup not close on select date */
        if(/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
            $("#surgeryTime").datepicker({
                dateFormat: 'MM d, yy',
                minDate: new Date(time),

                /* fix buggy IE focus functionality */
                fixFocusIE: false,

                /* blur needed to correctly handle placeholder text */
                onSelect: function() {
                    this.fixFocusIE = true;
                    $(this).blur().change().focus();
                },
                onClose: function() {
                    this.fixFocusIE = true;
                    this.focus();
                },
                beforeShow: function() {
                    var result = /MSIE (\d+\.\d+);/.test(navigator.userAgent) ? !this.fixFocusIE : true;
                    this.fixFocusIE = false;
                    return result;
                }
            });
        } else {
            $("#surgeryTime").datepicker({
                dateFormat: 'MM d, yy',
                minDate: new Date(time)
            });
        }

    }

    /**
     *
     * @private
     */
    function _initPhoneInput() {
        $("#phone").intlTelInput({
            onlyCountries: ["us"],
            utilsScript: false
        });
    }

    /**
     * format phone number when the front characters are '11' or '10'
     * @private
     */
    function _checkSpecialNumber() {
        var phoneStr;

        $("#phone").on("input", function () {
            _initPhoneInput();

            phoneStr = $("#phone").val();
            if (phoneStr.substring(0, 2) === "11" || phoneStr.substring(0, 2) === "10") {
                var firstNum = phoneStr.charAt(0);
                var secondNum = phoneStr.charAt(1);
                phoneStr = firstNum + ' ' + secondNum + phoneStr.substring(2, phoneStr.length);

                $('#phone').val(phoneStr);
            }
        });
    }

    /**
     *
     * @private
     */
    function _initPlaceholder() {

        $('.form-group input').focus(function () {
            $(this).data('placeholder', $(this).attr('placeholder'));
            $(this).attr('placeholder', '');
        });

        $('.form-group input').blur(function () {
            $(this).attr('placeholder', $(this).data('placeholder'));
        });

    }

    /**
     * set validate
     * @private
     */
    function _setValidate() {
        var validObj = $("#treatment-form").validate({
            //ignore: 'input[type=hidden]',
            onkeyup: false,
            errorClass: "myErrorClass",

            errorPlacement: function (error, element) {
                var elem = $(element);
                error.insertAfter(elem);
            }
        });

        $(document).on("change", ".select2-offscreen", function () {
            if (!$.isEmptyObject(validObj.submitted)) {
                validObj.form();
            }
        });

    }

    function _checkEmergencyContact() {

        $("#relationshipName").on("autocompleteselect", function () {
            _changeRequiredStatus(this);

        });


        _.each($('.emergency-field'), function (element) {
            $(element).on('input', function () {
                _changeRequiredStatus(this);
            });
        });
    }

    function _changeRequiredStatus(element) {
        if ($(element).val() !== '') {
            $('#emergency-firstName').attr('required', true);
            $('#emergency-lastName').attr('required', true);
            $('#relationshipName').attr('required', true);
            $('#emergency-email').attr('required', true);
            $('.permission-confirm-check').attr('required', true);

            _.each($('.emergency-required'), function (element) {
                $(element).show();
            });

            $('.permission-confirm').addClass('visible');
            $('#ec-first-name').text($("#emergency-firstName").val());

            $('.emergency-field')
                .each(function () {
                    var placeholder = $(this).attr('placeholder');
                    var dataPlaceholder = $(this).data('placeholder');

                    if (placeholder.indexOf(' (Optional)') >= 0) {
                        $(this).attr('placeholder', placeholder.replace(' (Optional)', ''));
                    }

                    if (dataPlaceholder && dataPlaceholder.indexOf(' (Optional)') >= 0) {
                        $(this).data('placeholder', dataPlaceholder.replace(' (Optional)', ''));
                    }
                });
        }

        var flagOptional = _.every($('.emergency-field'), function (element) {
            return $(element).val() === '';
        });

        if (flagOptional) {
            $('#emergency-firstName').attr('required', false);
            $('#emergency-lastName').attr('required', false);
            $('#relationshipName').attr('required', false);
            $('#emergency-email').attr('required', false);
            $('.permission-confirm-check').attr('required', false);

            _.each($('.emergency-required'), function (element) {
                $(element).hide();
            });

            $('.permission-confirm').removeClass('visible');

            var elementList = $('.emergency-contact-info').find('.form-group input');
            $.each(elementList, function (index, element) {
                RC.common.hideErrorTip(element);
            });

            $('.emergency-field')
                .each(function () {
                    var placeholder = $(this).attr('placeholder');
                    var dataPlaceholder = $(this).data('placeholder');

                    if (placeholder.indexOf(' (Optional)') === -1 && !$(this).is(':focus')) {
                        $(this).attr('placeholder', placeholder + ' (Optional)');
                    }

                    if (dataPlaceholder && dataPlaceholder.indexOf(' (Optional)') === -1) {
                        $(this).data('placeholder', dataPlaceholder + ' (Optional)');
                    }
                });
        }
    }

    /**
     * init select gruop
     * @private
     */
    function _initSelectGroup(accountId) {
        $("#selectGroup").combobox({
            source: function (request, response) {
                $.ajax({
                    beforeSend: function () {
                        RC.common.progress(false);
                    },
                    url: opts.urls.getGroups.format(accountId),
                    type: "POST",
                    data: {
                        name: request.term,
                        length: 1000
                    },
                    success: function (data) {
                        // normal response
                        response($.map(data, function (item) {
                            return {
                                label: item.name,
                                value: item.id
                            };
                        }));
                    }
                });
            },

            select: function (event, ui) {
                event.preventDefault();
                $(this).val(ui.item.label);
                $(this).data("id", ui.item.value);
                $(this).valid();
                $("#selectSurgeons").val("");
                $("#selectSurgeons").prop("disabled", false);
                $("#selectSurgeons").parent().find('.ui-button').removeClass('disable');
                _addTreatmentGroupId = $(this).data("id");
            },

            change: function (data, ui) {
                if (!ui.item) {
                    $("#selectSurgeons").val("");
                    $("#selectSurgeons").prop("disabled", true);
                    $("#selectSurgeons").parent().find('.ui-button').addClass('disable');
                    _addTreatmentGroupId = null;
                }
            },

            appendTo: ".container"
        });
    }

    function _switchArchivedStyle(clickEle, showEle, archivedClass) {
        $(clickEle).click(function () {
            if ($(showEle).hasClass(archivedClass)) {
                return;
            } else {
                $(showEle).addClass(archivedClass);
            }
        });
    }

    function _clickTabSwitchArchiveStyle(archivedTreatmentClass) {
        $("#tabs li").click(function () {
            var $this = this;
            if ($($this).hasClass(archivedTreatmentClass)) {
                $($this).removeClass(archivedTreatmentClass);

                var siblings = $(this).siblings();

                _switchArchivedStyle(siblings, $this, archivedTreatmentClass);
            }
        });
    }

    function _showArchivedTreatment() {
        var firstLi = "#tabs li:first";
        var notFirstLi = "#tabs li:not(:first-child)";
        var archivedTreatmentClass = "archived-treatment";

        if ($(firstLi).hasClass(archivedTreatmentClass)) {
            $(firstLi).removeClass(archivedTreatmentClass);

            _clickTabSwitchArchiveStyle(archivedTreatmentClass);
            _switchArchivedStyle(notFirstLi, firstLi, archivedTreatmentClass);

            $(firstLi).click(function () {
                if ($(firstLi).hasClass(archivedTreatmentClass)) {
                    $(firstLi).removeClass(archivedTreatmentClass);
                }
            });
        } else {
            _clickTabSwitchArchiveStyle(archivedTreatmentClass);
        }
    }

    /**
     * page Initialization
     * @private
     */
    function _init() {
        _initTab();
        _addTreatment();
        _setValidate();
        _editPatientInfo();
        _goBackToPrePage();
        _initPlaceholder();
        _inviteAgain();
        _showArchivedTreatment();
        _initAddEmailFormDialog();
    }

    _init();

})
(jQuery);
/* jshint +W071 */
