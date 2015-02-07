(function ($, undefined) {
    'use strict';

    //Define provider page global variables
    var opts = {
            defaultConfirmArguments: {
                confirmTreatmentFormArguments: {
                    title: RC.constants.confirmTreatmentTitle,
                    content: RC.constants.confirmContent,
                    height: 600,
                    width: 800
                },
                editPatientFormArguments: {
                    title: RC.constants.editPatientTitle,
                    content: RC.constants.confirmContent,
                    height: 200,
                    width: 400
                },
                waringArguments: {
                    title: RC.constants.warningTipTitle,
                    message: RC.constants.warningTip
                }
            },
            urls: {
                query: "{0}/getProvider".format(RC.constants.baseUrl),
                getTreatments: "{0}/getTreatments".format(RC.constants.baseUrl),
                getStaffs: "{0}/getStaffs".format(RC.constants.baseUrl),
                updatePatient: "{0}/clients/{1}/patients/{2}".format(RC.constants.baseUrl),
                assignTreatment: "{0}/clients/{1}/patients/{2}/treatments".format(RC.constants.baseUrl)
            }
        },
        tabs,
        tabTitle,
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
        var li = $(tabTemplate.replace(/#\{href\}/g, "/treatment?patiendId&client&medicalRecordId&treatmentId&surgeryTime").replace(/#\{label\}/g, label));
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

            var patientId = $(this).data("patientId");
            var clientId = $(this).data("clientId");

            var parent = $(this).parents();
            var id = parent.find(".id").text();
            var firstName = parent.find(".first-name").text();
            var lastName = parent.find(".last-name").text();
            var email = parent.find(".email").text();
            var phoneNum = parent.find(".phone").text();

            _initSurgeryTime();

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
                        var relationship = $('#relationship').val();
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
            url: opts.urls.assignTreatment.format(null, clientId, patientId),
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
                        var patientInfo = {
                            patientId: patientId,
                            id: $("#patientId").val(),
                            firstName: $("#firstName").val(),
                            lastName: $("#lastName").val(),
                            email: $("#email").val(),
                            phoneNum: $("#phone").val()
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
            url: opts.urls.updatePatient.format(null, clientId, patientId),
            type: 'POST',
            data: patientInfo,
            dataType: 'json',
            success: function (status) {
                if (status.resp === 200) {
                    $('.id').text(patientInfo.id);
                    $('.first-name').text(patientInfo.firstName);
                    $('.last-name').text(patientInfo.lastName);
                    $('.email').text(patientInfo.email);
                    $('.phone').text(patientInfo.phoneNum);
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
            tags: true,
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
                        term: term
                    };
                },
                results: function (data) {
                    var myResults = [];
                    $.each(data, function (index, item) {
                        myResults.push({
                            'id': item.id,
                            'text': item.firstName + " " + item.lastName
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
            controlType: 'input'
        });
    }

    /**
     * set validate
     * @private
     */
    function _setValidate() {
        $("#treatment-form").validate({});
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
        _initSelectTreatment();
        _initStaffSelect();
    }

    _init();

})
(jQuery);
