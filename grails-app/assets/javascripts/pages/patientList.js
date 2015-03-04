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
            pageLength: $('#patientsTable').data("pagesize"),
            info: false,
            bLengthChange: false,
            serverSide: true,
            "bAutoWidth": false,
            "columnDefs": [{
                "targets": 5,
                "orderable": false,
            },
            {
                "targets": 0,
                "render": function ( data, type, full, meta ) {
                    var id = data === undefined ? full.id : data;
                    return '<p class="source-id">' + id + '</p>';
                }
            }, {
                "targets": 1,
                "render": function ( data, type, full, meta ) {
                    var name = data === undefined ? (full.firstName + " " + full.lastName) : data;
                    return name;
                }
            }, {
                "targets": 2,
                "render": function ( data, type, full, meta ) {
                    var email = data === undefined ? full.email : data;
                    return email;
                }
            }, {
                "targets": 3,
                "render": function ( data, type, full, meta ) {
                    var isUS,
                        phoneNumber,
                        subNumber;
                    var num = data === undefined ? full.phoneNumber : data;

                    num.charAt(0) === '1' ? isUS = true : isUS = false;

                    if(isUS) {
                        subNumber = num.slice(1, num.length);
                        phoneNumber = subNumber.replace(/(\d{3})(?=\d{2,}$)/g, '$1-');
                        phoneNumber = '1 ' + phoneNumber;
                    } else {
                        phoneNumber = num.replace(/(\d{3})(?=\d{2,}$)/g, '$1-');
                    }

                    return phoneNumber;
                }
            }, {
                "targets": 4,
                "render": function ( data, type, full, meta ) {
                    var lastUpdate = data === undefined ? full.lastUpdate : data;
                    var formatDate = moment(lastUpdate).tz("America/Vancouver").format('MMM D, YYYY h:mm:ss A');
                    return formatDate;
                }
            }, {
                "targets": 5,
                "render": function ( data, type, full, meta ) {
                    var id = data == undefined ? full.id : data;
                    return '<a href="/patients/' + id + '"class="view" data-id ="' + id + '"><span>View</span></a>';
                }
            }],
            "fnDrawCallback": function () {
                $(".previous").text('');
                $(".next").text('');
                $(".display").css("display", "inline-table");
            },
            ajax: $.fn.dataTable.pipeline({
                url: opts.urls.query,
                pages: 2, // number of pages to cache
                data: data
            }),
            deferLoading: $('#patientsTable').data("total"),
            columns: [
                {
                    width: "10%",
                },
                {
                    width: "20%"
                },
                {
                    width: "26%"
                },
                {
                    width: "15%"
                },
                {
                    width: "19%"
                },
                {
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
            _checkDoubleOneNumber();
            //_initSurgeryTime();
            _initSelectTreatment();
            _initStaffSelect();
            _initPlaceholder();
            $("#relationship").select2();
            _checkEmergencyContact();
            //$("#div-surgery-time").css("display", "none");
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
            minDate: +time
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
    function _checkDoubleOneNumber() {
        $("#phoneNumber").on("input", function () {
            var str = $("#phoneNumber").val(),
                firstNum,
                secondNum;

            if (str.substring(0, 2) === "11" || str.substring(0, 2) === "10") {
                firstNum = str.charAt(0);
                secondNum = str.charAt(1);
                str = firstNum + ' ' + secondNum + str.substring(2, str.length);

                $('#phoneNumber').val(str);
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
                            'data': item.surgeryTimeRequired,
                            'timeStamp': item.sendTimeOffset

                        });
                    });
                    return {
                        results: myResults
                    };
                }
            }
        }).change(function (data) {
            $(this).valid();
            //var date = new Date();
            //var time = date.getTime() + data.added.timeStamp;
            var time = Math.ceil((data.added.timeStamp) / 1000 / 60 / 60 / 24);
            _initSurgeryTime(time);
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
        });


    }

    /**
     * init select staff
     * @private
     */
    function _initStaffSelect() {

        $('#selectStaffs').select2({
            //formatSelection: function (dataItem) {
            //    if (dataItem.type === 8) {
            //        return "<div class='surgery'> <img src='/assets/surgeon_logo.png'/><span class='care-team'>" + dataItem.text + " </span></div>";
            //    } else {
            //        return "<div class='surgery'> " + dataItem.text + " </div>";
            //    }
            //
            //},
            //formatResult: function (dataItem) {
            //    if (dataItem.type === 8) {
            //        return "<div class='surgery'> <img src='/assets/surgeon_logo.png'/><span class='care-team'>" + dataItem.text + " </span></div>";
            //    } else {
            //        return "<div class='surgery'> <span class='text'>" + dataItem.text + "</span> </div>";
            //    }
            //},
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

    function _checkEmergencyContact() {
        _.each($('.emergency-field'), function (element, index) {
            $(element).on('input', function () {
                if ($(element).val() != '') {
                    $('#emergency-firstName').attr('required', true);
                    $('#emergency-lastName').attr('required', true);
                    $('#relationship').attr('required', true);
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
                    $('#relationship').attr('required', false);
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
    }

    _init();

})
(jQuery);
