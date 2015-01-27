(function ($, undefined) {
    'use strict';

    //Define provider page global variables
    var opts = {
            defaultConfirmArguments: {
                confirmFormArguments: {
                    title: RC.constants.confirmPatientTitle,
                    content: RC.constants.confirmContent,
                    height: 200,
                    width: 400
                }
            },
            waringArguments: {
                title: RC.constants.warningTipTitle,
                message: RC.constants.warningTip
            },
            urls: {
                query: "{0}/getPatients".format(RC.constants.baseUrl),
                add:"{0}/addPatient".format(RC.constants.baseUrl),
                getTreatments:"{0}/getTreatments".format(RC.constants.baseUrl),
                getStaffs:"{0}/getStaffs".format(RC.constants.baseUrl)
            }
        },
        provideTable;

    /**
     * init table with the data which loaded
     * @param data
     * @private
     */
    function _initTable(data) {

        if(provideTable){
            provideTable.destroy();
        }

        provideTable = $("#patientsTable").DataTable({
            paging: true,
            searching: false,
            ordering: false,
            pageLength: 10,
            info: false,
            bLengthChange: false,
            "serverSide": true,
            ajax: $.fn.dataTable.pipeline({
                url: opts.urls.query,
                pages: 2, // number of pages to cache
                data: data
            }),
            columns: [
                {data: "id"},
                {data: function (source) {
                    return source.firstName+" "+source.lastName;
                }},
                {data: "email"},
                {data: "phoneNumber"},
                {data: "profilePhoto"},
                {
                    data: function (source) {
                        return '<label class="tr-label"> ' + source.treatments + '</label>'
                            + '&nbsp;&nbsp;<a href="/patients/' + source.emid + '"class="editor_edit" data-id ="' + source.id + '">View</a>';
                    }
                }
            ]
        });

    }

    /**
     * load Data from server side
     * @private
     */
    function _loadData() {
        var data = {
            clientId:1
        };
        _initTable(data);

    }

    /**
     * get add patient data
     * @returns data
     * @private
     */
    function _getAddData() {
        var patientId = $("#patientId").val();
        var firstName = $("#firstName").val();
        var lastName = $("#lastName").val();
        var email = $("#email").val();
        var phoneNumber = $("#phoneNumber").val();
        var treatmentId = $("#selectTreatment").val();
        var surgeryTime = $("#surgeryTime").val();
        var staffIds = $("#selectStaffs").val();
        var staffArray = staffIds.split(',');
        var staffIdArr = [];

        $.each(staffArray, function(index, item){
            staffIdArr.push(parseInt(item));
        });

        var data = {
            patientId: patientId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            profilePhoto: '',
            treatmentId: treatmentId,
            primaryStaffId:16,
            staffIds: staffIds,
            surgeryTime: surgeryTime
        };

        return data;
    }
    /**
     * data table add a row
     * @private
     */
    function _add() {

        var data = _getAddData();
        $.ajax({
            url: opts.urls.add,
            type: "post",
            data: data,
            success: function () {
                _initTable();
            },
            error: function () {
                RC.common.warning(_.extend({}, opts.defaultConfirmArguments.waringArguments, {
                    element: $(".warn"),
                    closeCallback: function () {
                    }
                }));
            }
        });


    }

    /**
     * set validate
     * @private
     */
    function _setValidate() {
        $("#table-form").validate({
                messages: {
                    provider: RC.constants.waringMessageProvider,
                    agent: RC.constants.waringMessageAgent,
                    email: RC.constants.waringMessageEmail
                }
            }
        );
    }

    /**
     * bind add event
     * @private
     */
    function _bindAddEvent() {
        $("#add-patient").on("click", function (e) {
            e.preventDefault();
            $(".form")[0].reset();

            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.confirmFormArguments, {
                element: $(".form"),
                okCallback: function () {
                    if ($("#table-form").valid()) {
                        _add();
                        return true;
                    }
                    return false;
                }
            }));

            _initSurgeryTime();
            _initSelectTreatment();
            _initStaffSelect();

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
     * init select treatment
     * @private
     */
    function _initSelectTreatment() {
        $('#selectTreatment').select2({
            ajax: {
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
                            'text': item.firstName +" "+item.lastName
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
     * Provider page Initialization
     * @private
     */
    function _init() {
        _loadData();
        _setValidate();
        _bindAddEvent();
    }

    _init();

})
(jQuery);
