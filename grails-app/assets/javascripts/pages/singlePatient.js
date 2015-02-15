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
                }
            },
            urls: {
                query: "/getProvider",
                getTreatments: "/getTreatments",
                getStaffs: "/getStaffs",
                updatePatient: "/clients/{0}/patients/{1}",
                assignTreatment: "/clients/{0}/patients/{1}/treatments"
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
            }
        });
    }

    /**
     * add treatment tab
     * @private
     */
    function _addTab(medicalRecordId, treatmentId, treatmentTitle, surgeryTime) {
        //var label = tabTitle,
        var label = treatmentTitle;
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
            var email = parent.find(".patientEmail").text();
            var phoneNum = parent.find(".phone").text();

            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.confirmTreatmentFormArguments, {
                element: $(".treatment-form"),
                okCallback: function () {
                    if ($("#treatment-form").valid()) {
                        var treatmentId = $("#selectTreatment").val();
                        var staffIds = $("#selectStaffs").val();
                        var staffArray = staffIds.split(',');
                        var staffIdArr = [];
                        $.each(staffArray, function (index, item) {
                            staffIdArr.push(parseInt(item));
                        });
                        var date = new Date($("#surgeryTime").val());
                        var surgeryTime = date.getTime();
                        var ecFirstName = $('#emergency-firstName').val();
                        var ecLastName = $('#emergency-lastName').val();
                        var relationship = $('#relationshipName').val();
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
            _initSurgeryTime();
            _initSelect();

        });
    }

    /**
     * init select
     * @private
     */
    function _initSelect() {
        $("#relationshipName").select2();
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
                var treatmentTitle = data.treatmentInfo.title;
                var surgeryTime = assignInfo.surgeryTime;
                _addTab(medicalRecordId, treatmentId, treatmentTitle, surgeryTime);
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
            var id = parent.find(".id").text();
            var firstName = parent.find(".first-name").text();
            var lastName = parent.find(".last-name").text();
            var email = parent.find(".email").text();
            var phoneNum = parent.find(".phone").text();

            $("#patientId").val(id);
            $("#firstName").val(firstName);
            $("#lastName").val(lastName);
            $("#email").val(email);
            $("#phone").val(phoneNum);

            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.editPatientFormArguments, {
                    element: $(".patient-form"),
                    okCallback: function () {

                        var number = $("#phone").val();
                        var phoneNumber = number.split('-').join('');
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
                }
            ));
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
                    $('.patientEmail').text(patientInfo.email);
                    $('.phone').text(patientInfo.number);
                }
            }
        });
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

        $('#selectTreatment').select2({
            ajax: {
                transport: function (params) {
                    params.beforeSend = function () {
                        RC.common.progress(false);
                    };
                    return $.ajax(params);
                },
                url: opts.urls.getTreatments,
                cache: "true",
                data: function (term) {
                    return {
                        term: term
                    };
                },
                results: function (data) {
                    var myResults = [];
                    $.each(data, function (index, item) {
                        myResults.push({
                            'id': item.id,
                            'text': item.title,
                            'data': item.surgeryTimeRequired
                        });
                    });
                    return {
                        results: myResults
                    };
                }
            }
        });

        $('#selectTreatment').on("change", function (data) {
            if (data.added.data === true) {
                $("#div-surgery-time").css("display", "block");
            } else {
                $("#div-surgery-time").css("display", "none");
            }
        });
    }

    /**
     * init select staff
     * @private
     */
    function _initStaffSelect() {
        $('#selectStaffs').select2({
            //tags: true,
            formatSelection: function (dataItem) {
                if (dataItem.type == 8) {
                    return "<div class='surgery'> <img src='/assets/surgeon_logo.png'/><span class='care-team'>" + dataItem.text + " </span></div>";
                } else {
                    return "<div class='surgery'> " + dataItem.text + " </div>";
                }

            },
            formatResult: function (dataItem) {
                if (dataItem.type == 8) {
                    return "<div class='surgery'> <img src='/assets/surgeon_logo.png'/><span class='care-team'>" + dataItem.text + " </span></div>";
                } else {
                    return "<div class='surgery'> <span class='text'>" + dataItem.text + "</span> </div>";
                }
            },
            ajax: {
                transport: function (params) {
                    params.beforeSend = function () {
                        RC.common.progress(false);
                    };
                    return $.ajax(params);
                },
                url: opts.urls.getStaffs,
                cache: "true",
                data: function (term) {
                    return {
                        term: term,
                        type: 8
                    };
                },
                results: function (data) {
                    var myResults = [];
                    $.each(data, function (index, item) {
                        myResults.push({
                            'id': item.id,
                            'text': item.firstName + " " + item.lastName,
                            'type': item.type
                        });
                    });
                    return {
                        results: myResults
                    };
                }
            }
        });
    }

    /**
     * init surgery time
     * @private
     */
    function _initSurgeryTime() {
        $("#surgeryTime").datetimepicker({
            controlType: 'input',
            minDate: +8
        });
    }

    /**
     *
     * @private
     */
    function _addLine() {
        $("#phone").on("input", function () {
            var str = $("#phone").val();
            var num = str.replace(/(\d{3})(?=(?:\d{2})+(?!\d)$)/g, '$1-');
            $("#phone").val(num);
        })
    }

    /**
     *
     * @private
     */
    function _initPlaceholder() {

        $('.form-group input').focus(function () {
            $(this).data('placeholder', $(this).attr('placeholder'))
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
        _addLine();
        _initPlaceholder();
    }

    _init();

})
(jQuery);
