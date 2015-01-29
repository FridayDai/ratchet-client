(function ($, undefined) {
    'use strict';

    //Define provider page global variables
    var opts = {
            defaultConfirmArguments: {
                confirmTreatmentFormArguments: {
                    title: RC.constants.confirmTreatmentTitle,
                    content: RC.constants.confirmContent,
                    height: 200,
                    width: 400
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
                editPatient: "{0}/clients/".format(RC.constants.baseUrl),
                getTreatments: "{0}/getTreatments".format(RC.constants.baseUrl),
                getStaffs: "{0}/getStaffs".format(RC.constants.baseUrl)
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
    function _addTab() {
        var label = tabTitle,
            li = $(tabTemplate.replace(/#\{href\}/g, "/treatment/index").replace(/#\{label\}/g, label));
        tabs.find(".tab-treatment").append(li);
        tabs.tabs("refresh");
    }

    /**
     * set validate
     * @private
     */
    function _setValidate() {
        $("#treatment-form").validate({});
    }

    /**
     * add treatment to a patient
     * @private
     */
    function _addTreatment() {
        $("#addTab").button().click(function (e) {
            e.preventDefault();
            $(".treatment-form")[0].reset();

            var grandParent = $(this).parent().parent();
            var emid = grandParent.find('.id-info').attr('value');
            var clientId = grandParent.find('input').attr('value');
            var firstName = grandParent.find('.first-name-info').attr('value');
            var lastName = grandParent.find('.last-name-info').attr('value');
            var email = grandParent.find('.email-info').attr('value');
            var phoneNum = grandParent.find('.phone-info').attr('value');

            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.confirmTreatmentFormArguments, {
                element: $(".treatment-form"),
                okCallback: function () {
                    if ($("#treatment-form").valid()) {
                        //tabTitle = $("#selectTreatment");

                        var treatmentId = $("#selectTreatment").val();
                        var staffIds = $("#selectStaffs").val();
                        var staffArray = staffIds.split(',');
                        var staffIdArr = [];
                        $.each(staffArray, function (index, item) {
                            staffIdArr.push(parseInt(item));
                        });

                        var assignInfo = {
                            patientId: emid,
                            clientId: clientId,
                            firstName: firstName,
                            lastName: lastName,
                            phoneNum: phoneNum,
                            email: email,
                            treatmentId: treatmentId,
                            staffIds: staffIds
                            //surgeryTime: surgeryTime
                        };
                        _assignTreatment(emid, clientId, assignInfo);

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
    function _assignTreatment(emid, clientId, assignInfo) {
        $.ajax({
            url: opts.urls.editPatient + clientId + '/patients/' + emid + '/treatments',
            type: 'POST',
            data: assignInfo,
            dataType: 'json',
            success: function (data) {
                tabTitle = data[0].title;
                _addTab();
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

            var parent = $(this).parent();
            var emid = parent.find('.id-info').attr('value');
            var clientId = parent.find('input').attr('value');
            $("#firstName").val(parent.find('.first-name-info').attr('value'));
            $("#lastName").val(parent.find('.last-name-info').attr('value'));
            $("#email").val(parent.find('.email-info').attr('value'));
            $("#phone").val(parent.find('.phone-info').attr('value'));

            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.editPatientFormArguments, {
                    element: $(".patient-form"),
                    okCallback: function () {
                        var patientInfo = {
                            emid: emid,
                            firstName: $("#firstName").val(),
                            lastName: $("#lastName").val(),
                            email: $("#email").val(),
                            phoneNum: $("#phone").val()
                        };
                        _updatePatient(emid, clientId, patientInfo);
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
    function _updatePatient(emid, clientId, patientInfo) {
        $.ajax({
            url: opts.urls.editPatient + clientId + '/patients/' + emid,
            type: 'POST',
            data: patientInfo,
            dataType: 'json',
            success: function (status) {
                if (status.resp === 200) {
                    $('.first-name-info').empty().append(patientInfo.firstName);
                    $('.last-name-info').empty().append(patientInfo.lastName);
                    $('.email-info').empty().append(patientInfo.email);
                    $('.phone-info').empty().append(patientInfo.phoneNum);
                }
            }
        });
    }

    /**
     * go back to previous page
     * @private
     */
    function _goBackToPrePage() {
        $('.btn-back').on('click', function (e) {
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
                transport: function(params){
                    params.beforeSend = function(){
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
                            'text': item.title
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
     * init select staff
     * @private
     */
    function _initStaffSelect() {
        $('#selectStaffs').select2({
            tags: true,
            ajax: {
                transport: function(params){
                    params.beforeSend = function(){
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
     * page Initialization
     * @private
     */
    function _init() {
        _initTab();
        _addTreatment();
        //_assignTreatment();
        _setValidate();
        _editPatientInfo();
        _goBackToPrePage();
        _initSelectTreatment();
        _initStaffSelect();
    }

    _init();

})
(jQuery);
