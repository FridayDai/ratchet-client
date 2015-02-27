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
                title: RC.constants.errorTip,
                message: RC.constants.errorTip
            },
            urls: {
                query: "/getPatients",
                add: "/addPatient",
                getTreatments: "/getTreatments",
                getStaffs: "/getStaffs",
                showSinglePatient: "/patients/{0}",
                getSinglePatient: "/patient/{0}"
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
            provideTable.clear();
            provideTable.destroy();
        }

        provideTable = $("#patientsTable").DataTable({
            paging: true,
            searching: false,
            ordering: true,
            pageLength: 20,
            info: false,
            bLengthChange: false,
            //processing: true,
            "serverSide": true,
            "bAutoWidth": false,
            "columnDefs": [
                {"targets": 5, "orderable": false}],
            "fnDrawCallback": function () {
                $(".previous").text('');
                $(".next").text('');
                $(".display").css("display","inline-table");
            },
            ajax: $.fn.dataTable.pipeline({
                url: opts.urls.query,
                pages: 2, // number of pages to cache
                data: data
            }),
            columns: [
                {
                    data: function (source) {
                        return '<p class="source-id">' + source.patientId + '</p>';
                    },
                    width: "10%"
                },
                {
                    data: function (source) {
                        return source.firstName + " " + source.lastName;
                    },
                    width: "20%"
                },
                {
                    data: function (source) {
                        return source.email;
                    },
                    width: "28%"
                },
                {
                    data: function (source) {
                        var num = source.phoneNumber;
                        var phoneNumber = num.replace(/(\d{3})(?=\d{2,}$)/g, '$1-');
                        return phoneNumber;
                    },
                    width: "15%"
                },
                {
                    data: function (source) {
                        var formatDate = moment(source.lastUpdate).format('MMM D, YYYY h:mm:ss A');
                        return formatDate;
                    },
                    width: "19%"
                },
                {
                    data: function (source) {
                        return '<a href="/patients/' + source.id + '"class="view" data-id ="' + source.id + '"><span>View</span></a>';
                    },
                    width: "8%"
                }
            ]
        });

    }

    /**
     * load Data from server side
     * @private
     */
    function _loadData() {
        _initTable();
    }

    /**
     * click one row to single patient page
     * @private
     */
    function _clickRow() {
        $('#patientsTable tbody').on('click', 'tr', function () {
            var id = $(this).find("td a").data("id");
            var url = opts.urls.showSinglePatient.format(id);
            window.location.href = url;
        });
    }


    /**
     *
     * @private
     */
    function _search() {
        var treatmentId = $("#treatmentForSearchPatient").val();
        var surgeonId = $("#selectSurgeon").val();
        var name = $("#search-input").val();
        var data = {
            treatmentId: treatmentId,
            surgeonId: surgeonId,
            name: name
        };
        _initTable(data);
    }

    /**
     * bind search event
     * @private
     */
    function _bindSearchEvent() {
        $('#search-input').keydown(function (event) {
                if (event.keyCode === 13) {
                    _search();
                }
            }
        );

        $("#search-btn").on("click", function (e) {
            e.preventDefault();
            _search();
        });
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
        var number = $("#phoneNumber").val();
        var phoneNumber = number.split(' ').join('').split('(').join('').split(')').join('').split('-').join('');

        var ecFirstName = $("#emergency-firstName").val();
        var ecLastName = $("#emergency-lastName").val();
        var relationship = $("#relationship").val();
        var ecEmail = $("#emergency-email").val();


        var treatmentId = $("#selectTreatment").val();
        var date = new Date($("#surgeryTime").val());
        var surgeryTime = date.getTime();
        var staffId = $("#selectStaffs").val();

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
            success: function (data) {
                var url = opts.urls.showSinglePatient.format(data.id);
                window.location.href = url;
            }
        });

    }

    /**
     * set validate
     * @private
     */
    function _setValidate() {
        $("#table-form").validate({
                rules: {
                    phoneNumber: {
                        isPhone: true
                    }
                },
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

            _initPhoneInput();
            _initSurgeryTime();
            _initSelectTreatment();
            _initStaffSelect();
            _initPlaceholder();
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
            controlType: 'input',
            dateFormat: 'MM d, yy',
            timeFormat: "h:mm TT",
            showOn: "focus",
            ampm: true,
            minDate: +8
        });
    }

    /**
     *
     * @private
     */
    function _initPhoneInput() {
        $("#phoneNumber").intlTelInput({
            onlyCountries: ["us"],
            utilsScript: "assets/bower_components/intl-tel-input/lib/libphonenumber/build/utils.js"
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
                data: function (name) {
                    return {
                        name: name
                    };
                },
                results: function (data) {
                    var myResults = [];
                    $.each(data, function (index, item) {
                        myResults.push({
                            'id': item.id,
                            'text': item.title + ' ' + item.tmpTitle,
                            'data': item.surgeryTimeRequired
                        });
                    });
                    return {
                        results: myResults
                    };
                }
            }
        }).change(function () {
            $(this).valid();
        });

    }

    function _initTreatmentSelect() {
        $('#treatmentForSearchPatient').select2({
            ajax: {
                transport: function (params) {
                    params.beforeSend = function () {
                        RC.common.progress(false);
                    };
                    return $.ajax(params);
                },
                url: opts.urls.getTreatments,
                cache: "true",
                data: function (name) {
                    return {
                        name: name
                    };
                },
                results: function (data) {
                    var myResults = [];
                    $.each(data, function (index, item) {
                        myResults.push({
                            'id': item.id,
                            'text': item.title + ' ' + item.tmpTitle,
                            'data': item.surgeryTimeRequired
                        });
                    });
                    return {
                        results: myResults
                    };
                }
            }
        }).change(function () {
            $(this).valid();
        });

    }

    /**
     *
     * @private
     */
    function _initSurgeon() {

        $('#selectSurgeon').select2({
            ajax: {
                transport: function (params) {
                    params.beforeSend = function () {
                        RC.common.progress(false);
                    };
                    return $.ajax(params);
                },
                url: opts.urls.getStaffs,
                cache: "true",
                data: function (name) {
                    return {
                        name: name,
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
        }).change(function () {
            $(this).valid();
        });
    }

    /**
     * init select staff
     * @private
     */
    function _initStaffSelect() {

        $('#selectStaffs').select2({
            formatSelection: function (dataItem) {
                if (dataItem.type === 8) {
                    return "<div class='surgery'> <img src='/assets/surgeon_logo.png'/><span class='care-team'>" + dataItem.text + " </span></div>";
                } else {
                    return "<div class='surgery'> " + dataItem.text + " </div>";
                }

            },
            formatResult: function (dataItem) {
                if (dataItem.type === 8) {
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
                data: function (name) {
                    return {
                        name: name,
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
        }).change(function () {
            $(this).valid();
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
        _bindSearchEvent();
        _initSurgeon();
        _clickRow();
        _initTreatmentSelect();
        //_initPlaceholder();
    }

    _init();

})
(jQuery);
