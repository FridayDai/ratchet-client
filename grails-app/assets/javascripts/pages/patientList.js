(function ($, undefined) {
    'use strict';

    //Define provider page global variables
    var opts = {
            table: {
                id: '#patientsTable'
            },
            defaultConfirmArguments: {
                confirmFormArguments: {
                    title: RC.constants.confirmPatientTitle,
                    content: RC.constants.confirmContent,
                    height: 200,
                    width: 620
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
                getSinglePatient: "/patient/{0}",
                getGroups: "/getStaffGroups"
            }
        },
        provideTable;

    /**
     * init table with the data which loaded
     * @param data
     * @private
     */
    function _initTable(data) {

        var options = {
            paging: true,
            searching: false,
            ordering: true,
            info: false,
            bLengthChange: false,
            serverSide: true,
            "bAutoWidth": false,
            pageLength: $(opts.table.id).data("pagesize"),
            deferLoading: [$(opts.table.id).data("filtered"), $(opts.table.id).data("total")],
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
            columnDefs: [{
                "targets": 5,
                "orderable": false
            },
                {
                    "targets": 0,
                    "render": function (data, type, full) {
                        var id = data === undefined ? full.patientId : data;
                        return '<p class="source-id">' + id + '</p>';
                    },
                    width: "10%"
                }, {
                    "targets": 1,
                    "render": function (data, type, full) {
                        var name = data === undefined ? (full.firstName + " " + full.lastName) : data;
                        return name;
                    },
                    width: "20%"
                }, {
                    "targets": 2,
                    "render": function (data, type, full) {
                        var email = data === undefined ? full.email : data;
                        return email;
                    },
                    width: "26%"
                }, {
                    "targets": 3,
                    "render": function (data, type, full) {
                        var isUS,
                            phoneNumber,
                            subNumber;
                        var num = data === undefined ? full.phoneNumber : data;

                        num.charAt(0) === '1' ? isUS = true : isUS = false;

                        if (isUS) {
                            subNumber = num.slice(1, num.length);
                            phoneNumber = subNumber.replace(/(\d{3})(?=\d{2,}$)/g, '$1-');
                            phoneNumber = '1 ' + phoneNumber;
                        } else {
                            phoneNumber = num.replace(/(\d{3})(?=\d{2,}$)/g, '$1-');
                        }

                        return phoneNumber;
                    },
                    width: "15%"
                }, {
                    "targets": 4,
                    "render": function (data, type, full) {
                        var lastUpdate = data === undefined ? full.lastUpdate : data;
                        var formatDate = moment(lastUpdate).tz("America/Vancouver").format('MMM D, YYYY h:mm:ss A');
                        return formatDate;
                    },
                    width: "19%"
                }, {
                    "targets": 5,
                    "render": function (data, type, full) {
                        var id = data === undefined ? full.id : data;
                        return '<a href="/patients/' + id + '"class="view" data-id ="' + id + '"><span>View</span></a>';
                    },
                    width: "8%"
                }]
        };

        if (provideTable) {
            provideTable.clear();
            provideTable.destroy();
            delete options.deferLoading;
        }

        provideTable = $(opts.table.id).DataTable(options);
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
            if (id) {
                var url = opts.urls.showSinglePatient.format(id);
                window.location.href = url;
            } else {
                return;
            }
        });
    }


    /**
     *
     * @private
     */
    function _search(treatment, surgeon) {
        var treatmentId = treatment || $("#treatmentForSearchPatient").data("id");
        var surgeonId = surgeon || $("#selectSurgeon").data("id");
        var patientIdOrName = $("#search-input").val();
        var data = {
            treatmentId: treatmentId,
            surgeonId: surgeonId,
            patientIdOrName: patientIdOrName
        };
        _initTable(data);
    }

    /**
     * bind search event
     * @private
     */
    function _bindSearchEvent() {

        $(".filler-content .input-auto-search").on("autocompleteselect", function (event, ui) {
            if (ui.item.value === "No matches found") {
                return;
            }
            var selectedId = ui.item.value;
            var searchId = $(this).attr('id');

            if (searchId === "treatmentForSearchPatient") {
                var treatment = selectedId;
            }
            if (searchId === "selectSurgeon") {
                var surgeon = selectedId;
            }

            _search(treatment, surgeon);
        });

        $('#search-input').add(".filler-content .input-auto-search").keydown(function (event) {
                if (event.keyCode === 13) {
                    if ($(this).val().trim() === "" && $(this).data("id")) {
                        $(this).data("id", "");
                    }
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
        var relationship = $("#relationship").data('id');
        var ecEmail = $("#emergency-email").val();


        var treatmentId = $("#selectTreatment").data('id');
        var date = new Date($("#surgeryTime").val());
        var surgeryTime = date.getTime();
        var staffId = $("#selectStaffs").data('id');
        var groupId = $("#selectGroup").data('id');

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
            staffId: staffId,
            groupId: groupId
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
            _checkSpecialNumber();
            //_initSurgeryTime();
            _initSelectTreatment();
            _initStaffSelect();
            _initPlaceholder();
            _initRelationship();
            _checkEmergencyContact();
            _initSelectGroup();
            //$("#div-surgery-time").css("display", "none");
        });
    }


    function _initRelationship() {
        var data = [
            {label: "Spouse", id: 1},
            {label: "Parent", id: 2},
            {label: "Child", id: 3},
            {label: "Friend", id: 4},
            {label: "Other", id: 5}
        ];


        $("#relationship").combobox({
            source: function (request, response) {
                var sources = _.filter(data, function (num) {
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
                        };
                    }));
                }
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
        $("#phoneNumber").intlTelInput({
            onlyCountries: ["us"],
            utilsScript: false
        });
    }

    /**
     *
     * @private
     */
    function _checkSpecialNumber() {
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
        $("#selectTreatment").combobox({
            source: function (request, response) {
                $.ajax({
                    beforeSend: function () {
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
                                };
                            }));
                        }
                    }
                });
            },

            select: function (event, ui) {
                event.preventDefault();
                if (ui.item.value === "No matches found") {
                    return;
                }
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
                    return;
                }
                var date = new Date();
                var time = date.getTime() + ui.item.timeStamp;
                $("#surgeryTime").val("");
                $("#surgeryTime").prop("disabled", false);
                _initSurgeryTime(time);
            }
        });
    }

    function _initTreatmentSelect() {
        $("#treatmentForSearchPatient").combobox({
            source: function (request, response) {
                $.ajax({
                    beforeSend: function () {
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
                                    value: item.id
                                };
                            }));
                        }
                    }
                });
            },
            change: function (data, ui) {
                if (ui.item === null) {
                    $(this).data("id", "");
                    _search();
                    return;
                }
            }
        });

    }

    /**
     *
     * @private
     */
    function _initSurgeon() {

        $("#selectSurgeon").combobox({
            source: function (request, response) {
                $.ajax({
                    beforeSend: function () {
                        RC.common.progress(false);
                    },
                    url: opts.urls.getStaffs,
                    type: "POST",
                    data: {
                        name: request.term,
                        type: 9
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
                                };
                            }));
                        }
                    }
                });
            },
            change: function (data, ui) {
                if (ui.item === null) {
                    $(this).data("id", "");
                    _search();
                    return;
                }
            }

        });

    }

    /**
     * init select staff
     * @private
     */
    function _initStaffSelect(groupId) {
        if(groupId) {
            $("#selectStaffs").combobox("destroy");
        }

        $("#selectStaffs").combobox({
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
                        groupId: groupId
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
                                };
                            }));
                        }
                    }
                });
            },
            select: function (event, ui) {
                event.preventDefault();
                if (ui.item.value === "No matches found") {
                    return;
                }
                $(this).val(ui.item.label);
                $(this).data("id", ui.item.value);
                $(this).valid();
            },
            appendTo: ".container"
        });
    }

    function _checkEmergencyContact() {
        _.each($('.emergency-field'), function (element, index) {
            $(element).on('input', function () {
                if ($(element).val() !== '') {
                    $('#emergency-firstName').attr('required', true);
                    $('#emergency-lastName').attr('required', true);
                    $('#relationship').attr('required', true);
                    $('#emergency-email').attr('required', true);
                    $('.permission-confirm-check').attr('required', true);

                    _.each($('.emergency-required'), function (element, index) {
                        $(element).show();
                    });

                    $('.permission-confirm').addClass('visible');
                    _resetToolTipPosition($('.re-position'));
                    $('.permission-confirm').data("direction", "down");
                }

                var flagOptional = _.every($('.emergency-field'), function (element) {
                    return $(element).val() === '';
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
                    _resetToolTipPosition($('.re-position'));
                    $('.permission-confirm').data("direction", "up");

                    var elementList = $('.emergency-contact-info').find('.form-group').children();
                    $.each(elementList, function (index, element) {
                        RC.common.hideErrorTip(element);
                    });
                }
            });
        });
    }

    function _resetToolTipPosition(elements) {
        if ($('.permission-confirm').hasClass('visible') && $('.permission-confirm').data("direction") === "up") {
            _.each(elements, function (element, index) {
                var id = "#" + $(element).attr("aria-describedby");
                var originalTop = parseInt($(id).css('top')) + 20;
                $(id).css('top', originalTop);
            });
            $('.permission-confirm').data("direction", "down");

        }
        if (!$('.permission-confirm').hasClass('visible') && $('.permission-confirm').data("direction") === "down") {
            _.each(elements, function (element, index) {
                var id = "#" + $(element).attr("aria-describedby");
                var originalTop = parseInt($(id).css('top')) - 20;
                $(id).css('top', originalTop);
            });
            $('.permission-confirm').data("direction", "up");
        }


    }

    /**
     * init select gruop
     * @private
     */
    function _initSelectGroup() {
        $("#selectGroup").combobox({
            source: function (request, response) {
                $.ajax({
                    beforeSend: function () {
                        RC.common.progress(false);
                    },
                    url: opts.urls.getGroups,
                    type: "POST",
                    data: {
                        name: request.term
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
                                    label: item.name,
                                    value: item.id
                                };
                            }));
                        }
                    }
                });
            },

            select: function (event, ui) {
                event.preventDefault();
                if (ui.item.value === "No matches found") {
                    return;
                }
                $(this).val(ui.item.label);
                $(this).data("id", ui.item.value);
                $(this).valid();
            },

            appendTo: ".container",
            change: function (data, ui) {
                if (ui.item === null) {
                    $(this).data("id", "");
                    return;
                }
                $("#selectStaffs").val("");
                $("#selectStaffs").prop("disabled", false);
                _initStaffSelect($(this).data("id"));
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
        _bindSearchEvent();
        _initSurgeon();
        _clickRow();
        _initTreatmentSelect();
    }

    _init();

})
(jQuery);
