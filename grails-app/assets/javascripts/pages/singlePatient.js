(function ($, undefined) {
    'use strict';

    //Define provider page global variables
    var opts = {
            defaultConfirmArguments: {
                confirmTreatmentFormArguments: {
                    title: RC.constants.confirmTreatmentTitle,
                    content: RC.constants.confirmContent,
                    height: 600,
                    width: 600
                },
                editPatientFormArguments: {
                    title: RC.constants.editPatientTitle,
                    content: RC.constants.confirmContent,
                    height: 200,
                    width: 600
                },
                waringArguments: {
                    title: RC.constants.warningTipTitle,
                    message: RC.constants.warningTip
                },
                showMsgArguments: {
                    msg: RC.constants.invitePatientSuccess
                }
            },
            urls: {
                query: "/getProvider",
                getTreatments: "/getTreatments",
                getStaffs: "/getStaffs",
                updatePatient: "/clients/{0}/patients/{1}",
                assignTreatment: "/clients/{0}/patients/{1}/treatments",
                invitePatient: "/invitePatient/{0}"
            }
        },
        tabs,
        patientId,
        clientId,
        tabTemplate;

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
    function _addTab(medicalRecordId, treatmentId, treatmentInfo, surgeryTime) {
        //var label = tabTitle,
        var label = treatmentInfo.title + " " + treatmentInfo.tmpTitle;
        var url = "/treatment?patientId=" + patientId + "&clientId=" + clientId +
            "&medicalRecordId=" + medicalRecordId + "&treatmentId=" + treatmentId + "&surgeryTime=" + surgeryTime + "";
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

            patientId = $(this).data("patientId");
            clientId = $(this).data("clientId");

            var parent = $(this).parents();
            var id = parent.find(".id").text();
            var firstName = parent.find(".first-name").text();
            var lastName = parent.find(".last-name").text();
            var email = parent.find("#patientEmail").text();
            var phoneNum = parent.find(".phone").text();

            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.confirmTreatmentFormArguments, {
                element: $(".treatment-form"),
                okCallback: function () {
                    if ($("#treatment-form").valid()) {
                        var treatmentId = $("#selectTreatment").data("id");
                        var staffIds = $("#selectSurgeons").data("id");
                        //var staffArray = staffIds.split(',');
                        //var staffIdArr = [];
                        //$.each(staffArray, function (index, item) {
                        //    staffIdArr.push(parseInt(item));
                        //});
                        var date = new Date($("#surgeryTime").val());
                        var surgeryTime = date.getTime();
                        var ecFirstName = $('#emergency-firstName').val();
                        var ecLastName = $('#emergency-lastName').val();
                        var relationship = $('#relationshipName').data("id");
                        var ecEmail = $('#emergency-email').val();

                        var assignInfo = {
                            id: id,
                            patientId: patientId,
                            clientId: clientId,
                            firstName: firstName,
                            lastName: lastName,
                            phoneNum: phoneNum,
                            email: email,
                            treatmentId: treatmentId,
                            staffIds: staffIds,
                            surgeryTime: surgeryTime,
                            ecFirstName: ecFirstName,
                            ecLastName: ecLastName,
                            relationship: relationship,
                            ecEmail: ecEmail
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
            {label: "Other", id: 5},
        ]


        $("#relationshipName").combobox({
            source: function (request, response) {
                var sources = _.filter(data, function(num){
                    return num.label.toLowerCase().indexOf(request.term) > -1;
                });
                if (!sources.length) {
                    var result = [
                        {
                            label: 'No matches found',
                            value: ''
                        }
                    ];
                    response(result);
                }
                else {
                    response($.map(sources, function (item) {

                        return {
                            label: item.label,
                            value: item.id
                        }
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
            url: opts.urls.assignTreatment.format(clientId, patientId),
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
                _addTab(medicalRecordId, treatmentId, treatmentInfo, surgeryTime);
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
            var id = parent.find(".id").text();
            var firstName = parent.find(".first-name").text();
            var lastName = parent.find(".last-name").text();
            var email = parent.find("#patientEmail").text();
            var phoneNum = parent.find(".phone").text();
            var phoneNumber = $.trim(phoneNum);

            $("#patientId").val(id);
            $("#firstName").val(firstName);
            $("#lastName").val(lastName);
            $("#email").val(email);
            $("#phone").val(phoneNumber);

            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.editPatientFormArguments, {
                    element: $(".patient-form"),
                    okCallback: function () {

                        if ($("#patient-form").valid()) {
                            var number = $("#phone").val();
                            var phoneNumber = number.split(' ').join('').split('(').join('').split(')').join('').split('-').join('');
                            var patientInfo = {
                                patientId: patientId,
                                id: $("#patientId").val(),
                                firstName: $("#firstName").val(),
                                lastName: $("#lastName").val(),
                                email: $("#email").val(),
                                number: number,
                                phoneNumber: phoneNumber
                                //phoneNum: $("#phone").val()
                            };
                            _updatePatient(patientId, clientId, patientInfo);
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
            url: opts.urls.updatePatient.format(clientId, patientId),
            type: 'POST',
            data: patientInfo,
            dataType: 'json',
            success: function (status) {
                if (status.resp === 200) {
                    $('.id').text(patientInfo.id);
                    $('.first-name').text(patientInfo.firstName);
                    $('.last-name').text(patientInfo.lastName);
                    $('#patientEmail').text(patientInfo.email);
                    $('.phone').text(patientInfo.number);

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
        if(originalPatientEmail !== updatedEmail) {
            $('.invisible-invite').css('display', 'inline-block');
        }
    }

    /**
     * go back to previous page
     * @private
     */
    function _goBackToPrePage() {
        $('.btn-close').on('click', function (e) {
            e.preventDefault();

            parent.history.back();
            return false;
        });
    }


    /**
     * init select treatment
     * @private
     */
    function _initSelectTreatment() {
        $("#selectTreatment").combobox({
            source: function (request, response) {
                $.ajax({
                    beforeSend: function (eve, ui) {
                        RC.common.progress(false);
                    },
                    url: opts.urls.getTreatments,
                    type: "POST",
                    data: {
                        treatmentTitle: request.term
                    },
                    success: function (data) {
                        if (!data.length) {
                            var result = [
                                {
                                    label: 'No matches found',
                                    value: ''
                                }
                            ];
                            response(result);
                        }
                        else {
                            // normal response
                            response($.map(data, function (item) {
                                return {
                                    label: item.title + ' ' + item.tmpTitle,
                                    value: item.id,
                                    surgeryTime: item.surgeryTimeRequired,
                                    timeStamp: item.sendTimeOffset
                                }
                            }));
                        }
                    }
                })
            },
            select: function (event, ui) {
                event.preventDefault();
                if (ui.item.value == "No matches found") {
                    return;
                }
                $(this).val(ui.item.label);
                $(this).data("id", ui.item.value);
                $(this).data("surgeryTime", ui.item.surgeryTime);
                $(this).data("timeStamp", ui.item.timeStamp);
            },
            appendTo: ".container",
            change: function (data, ui) {
                if (ui.item == null) {
                    $(this).data("id", "");
                    return;
                }
                if (ui.item.surgeryTime === true) {
                    $("#div-surgery-time").css("display", "block");
                } else {
                    $("#div-surgery-time").css("display", "none");
                }
                var date = new Date();
                var time =date.getTime() +  ui.item.timeStamp;
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
        $("#selectSurgeons").combobox({
            source: function (request, response) {
                $.ajax({
                    beforeSend: function (eve, ui) {
                        RC.common.progress(false);
                    },
                    url: opts.urls.getStaffs,
                    type: "POST",
                    data: {
                        name: request.term,
                        type: 8
                    },
                    success: function (data) {
                        if (!data.length) {
                            var result = [
                                {
                                    label: 'No matches found',
                                    value: ''
                                }
                            ];
                            response(result);
                        }
                        else {
                            // normal response
                            response($.map(data, function (item) {
                                return {
                                    label: item.firstName + " " + item.lastName,
                                    value: item.id
                                }
                            }));
                        }
                    }
                })
            },
            appendTo: ".container"

        });
    }

    /**
     * init surgery time
     * @private
     */
    function _initSurgeryTime(time) {
        $("#surgeryTime").datetimepicker("destroy");
        $("#surgeryTime").datetimepicker({
            controlType: 'input',
            dateFormat: 'MM d, yy',
            timeFormat: "h:mm TT",
            showOn: "focus",
            ampm: true,
            minDate: new Date(time)
        });
    }

    /**
     *
     * @private
     */
    function _initPhoneInput() {
        $("#phone").intlTelInput({
            onlyCountries: ["us"],
            utilsScript: "/assets/bower_components/intl-tel-input/lib/libphonenumber/build/utils.js"
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
                error.insertAfter(element);
            }
        });

        $(document).on("change", ".select2-offscreen", function () {
            if (!$.isEmptyObject(validobj.submitted)) {
                validObj.form();
            }
        });

    }

    function _checkEmergencyContact() {
        _.each($('.emergency-field'), function (element, index) {
            $(element).on('input', function () {
                if ($(element).val() != '') {
                    $('#emergency-firstName').attr('required', true);
                    $('#emergency-lastName').attr('required', true);
                    $('#relationshipName').attr('required', true);
                    $('#emergency-email').attr('required', true);
                    $('.permission-confirm-check').attr('required', true);

                    _.each($('.emergency-required'), function (element, index) {
                        $(element).show();
                    });

                    $('.permission-confirm').addClass('visible');
                }

                var flagOptional = _.every($('.emergency-field'), function (element) {
                    return $(element).val() == '';
                });

                if (flagOptional) {
                    $('#emergency-firstName').attr('required', false);
                    $('#emergency-lastName').attr('required', false);
                    $('#relationshipName').attr('required', false);
                    $('#emergency-email').attr('required', false);
                    $('.permission-confirm-check').attr('required', false);

                    _.each($('.emergency-required'), function (element, index) {
                        $(element).hide();
                    });

                    $('.permission-confirm').removeClass('visible');

                    var elementList = $('.emergency-contact-info').find('.form-group').children();
                    $.each(elementList, function (index, element) {
                        RC.common.hideErrorTip(element);
                    });
                }
            });
        });
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
    }

    _init();

})
(jQuery);
