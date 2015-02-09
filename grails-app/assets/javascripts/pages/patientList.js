(function ($, undefined) {
    'use strict';

    //Define provider page global variables
    var opts = {
            defaultConfirmArguments: {
                confirmFormArguments: {
                    title: RC.constants.confirmPatientTitle,
                    content: RC.constants.confirmContent,
                    height: 200,
                    width: 600
                }
            },
            waringArguments: {
                title: RC.constants.warningTipTitle,
                message: RC.constants.warningTip
            },
            urls: {
                query: "/getPatients",
                add: "/addPatient",
                getTreatments: "/getTreatments",
                getStaffs: "/getStaffs"
            }
        },
        provideTable;

    /**
     * init table with the data which loaded
     * @param data
     * @private
     */
    function _initTable(data) {

        if (provideTable) {
            provideTable.destroy();
        }

        provideTable = $("#patientsTable").DataTable({
            paging: true,
            searching: false,
            ordering: true,
            pageLength: 10,
            info: false,
            bLengthChange: false,
            "serverSide": true,
            "bAutoWidth": false,
            "fnDrawCallback": function(oSettings, json) {
                $(".previous").text('');
                $(".next").text('');
            },
            ajax: $.fn.dataTable.pipeline({
                url: opts.urls.query,
                pages: 2, // number of pages to cache
                data: data
            }),
            columns: [
                {data: "id", width: "10%"},
                {data: "firstName", width: "10%"},
                {data: "lastName", width: "10%"},
                {data: "email", width: "20%"},
                {data: "phoneNumber", width: "10%"},
                {
                    data: function (source) {
                        var formatDate = moment(source.dateCreated).format('MMM D, YYYY h:mm:ss a');
                        return formatDate;
                    },
                    width: "20%"
                },
                {
                    data: function (source) {
                        return '<a href="/patients/' + source.id + '"class="view" data-id ="' + source.id + '">View</a>';
                    },
                    width: "20%"
                }
            ]
        });

    }

    /**
     * load Data from server side
     * @private
     */
    function _loadData() {
        var patientType = $("#selectPatient").val();
        var data = {
            patientType: parseInt(patientType)
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

        var ecFirstName = $("#emergency-firstName").val();
        var ecLastName = $("#emergency-lastName").val();
        var relationship = $("#relationship").val();
        var ecEmail = $("#emergency-email").val();


        var treatmentId = $("#selectTreatment").val();
        var date = new Date($("#surgeryTime").val());
        var surgeryTime = date.getTime();
        var staffId = $("#selectStaffs").val();
        //var staffArray = staffIds.split(',');
        //var staffIdArr = [];
        //
        //$.each(staffArray, function (index, item) {
        //    staffIdArr.push(parseInt(item));
        //});

        var data = {
            patientId: patientId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,

            ecFirstName: ecFirstName,
            ecLastName: ecLastName,
            relationship: relationship,
            ecEmail: ecEmail,

            profilePhoto: '',
            treatmentId: treatmentId,
            surgeryTime: surgeryTime,
            staffId: staffId

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
            $("#relationship").select2();
            //$("#div-surgery-time").css("display", "none");
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
        $('#selectTreatment, #treatmentForSearchPatient').select2({
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

        //$('#selectTreatment, #treatmentForSearchPatient').on("change", function (data) {
        //    if (data.added.data === true) {
        //        $("#div-surgery-time").css("display", "inline-block");
        //    } else {
        //        $("#div-surgery-time").css("display", "none");
        //    }
        //});
    }

    /**
     * init select staff
     * @private
     */
    function _initStaffSelect() {

        $('#selectStaffs').select2({
            formatSelection: function (dataItem) {
                if(dataItem.type == 8) {
                    return "<div class='surgery'> <img src='/assets/surgeon_logo.png'/><span class='care-team'>"+dataItem.text+" </span></div>";
                } else {
                    return "<div class='surgery'> "+dataItem.text+" </div>";
                }

            },
            formatResult: function (dataItem) {
                if(dataItem.type == 8) {
                    return "<div class='surgery'> <img src='/assets/surgeon_logo.png'/><span class='care-team'>"+dataItem.text+" </span></div>";
                } else {
                    return "<div class='surgery'> "+dataItem.text+" </div>";
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
                        term: term
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

    //
    //$('#selectSurgeon').select2({
    //    ajax: ajax
    //});
    //
    //$('#selectStaffs').select2({
    //    ajax: ajax


    /**
     * Provider page Initialization
     * @private
     */
    function _init() {
        _loadData();
        _setValidate();
        _bindAddEvent();
        _initSelectTreatment();
        _initStaffSelect();
    }

    _init();

})
(jQuery);
