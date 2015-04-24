(function ($, undefined) {
    'use strict';

    //Define accounts page global variables
    var opts = {
            table: {
                id: '#accountsTable'
            },
            defaultConfirmArguments: {
                confirmFormArguments: {
                    title: RC.constants.confirmAccountTitle,
                    content: RC.constants.confirmContent,
                    height: 200,
                    width: 620
                },
                updateFormArguments: {
                    title: RC.constants.updateAccountTitle,
                    content: RC.constants.confirmContent,
                    height: 200,
                    width: 630
                },
                changePasswordFormArguments: {
                    title: RC.constants.changePasswordTitle,
                    content: RC.constants.confirmContent,
                    height: 300,
                    width: 320
                },
                showMsgArguments: {
                    msg: RC.constants.inviteAccountSuccess
                },
                showActiveArguments: {
                    msg: RC.constants.activeAccountSuccess
                },
                showDeactiveArguments: {
                    msg: RC.constants.deactiveAccountSuccess
                }
            },
            urls: {
                query: "/getAccounts",
                add: "/createAccount",
                updateAccount: "/updateAccount",
                inviteAccount: "/inviteAccount/{0}",
                updatePassword: "/updatePassword",
                showSingleAccount: "/singleAccount/{0}",
                deactivateAccount: "/deactivateAccount/{0}",
                activateAccount: "/activateAccount/{0}",
                getGroups: "/getStaffGroups",
                getAllGroups: "/getGroups"
            },
            img: {
                isDoctor: ""
            }
        },
        accountType = ["Anesthesiologist", "Medical Assistant", "Management", "Nurse", "Physical therapists (PTs)", "Primary Physican", "Scheduler", "Surgeon", "Yes", "No"],
        staffGroup = ["Patient Management", "Account Management"],
        accountTable;

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
            "columnDefs": [{
                "targets": 4,
                "orderable": false
            },
                {
                    "targets": 0,
                    "render": function (data, type, full) {
                        var id = data === undefined ? full.id : data;
                        return '<p class="source-id">' + id + '</p>';
                    },
                    width: "10%"
                },
                {
                    "targets": 1,
                    "render": function (data, type, full) {
                        var fullName,
                            dataName;


                        if (full[5] === "true") {
                            dataName = ("<img src=" + opts.img.isDoctor + "/>" + " " + data);
                        } else {
                            dataName = data;
                        }

                        if (full.doctor === true) {
                            fullName = "<img src=" + opts.img.isDoctor + "/>" + " " + full.firstName + " " + full.lastName;
                        } else {
                            fullName = full.firstName + " " + full.lastName;
                        }
                        var name = data === undefined ? fullName : dataName;

                        return name;
                    },
                    width: "18%"
                },
                {
                    "targets": 2,
                    "render": function (data, type, full) {
                        var email = data === undefined ? full.email : data;
                        return email;
                    },
                    width: "27%"
                },
                {
                    "targets": 3,
                    "render": function (data, type, full) {
                        var lastUpdateStr = data === undefined ? full.lastUpdateDate : data;
                        var lastUpdateTime = new Date(parseInt(lastUpdateStr));
                        var formatTime = moment(lastUpdateTime).tz("America/Vancouver").format('MMM D, YYYY h:mm:ss A');
                        return formatTime;
                    },
                    width: "19%"
                },
                {
                    "targets": 4,
                    "render": function (data, type, full) {
                        var id = data === undefined ? full.id : data;
                        return '<a href="/singleAccount/' + id + '" data-id ="' + id + '" class="view"><span>View</span></a>';
                    },
                    width: "7%"
                },
                {
                    "targets": 5,
                    "visible": false,
                    "render": function (data, type, full) {
                        var isDoctor = data === undefined ? full.doctor : data;
                        return isDoctor;
                    }
                }
            ]
        };

        if (accountTable) {
            accountTable.clear();
            accountTable.destroy();
            delete options.deferLoading;
        }

        accountTable = $(opts.table.id).DataTable(options);
    }

    /**
     * load Data from server side
     * @private
     */
    function _loadData() {
        _initTable();
    }

    /**
     * init click row event
     * @private
     */
    function _clickRow() {
        $('#accountsTable tbody').on('click', 'tr', function () {
            var id = $(this).find("td a").data("id");
            if (id) {
                var url = opts.urls.showSingleAccount.format(id);
                window.location.href = url;
            } else {
                return;
            }
        });
    }

    /**
     * init search event
     * @private
     */
    function _search() {
        var data = {
            name: $("#search-input").val()
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
     * prepare data of add account
     * @private
     */
    function _prepareAddData() {
        var firstName = $("#firstName").val();
        var lastName = $("#lastName").val();
        var email = $("#email").val();
        //var type = $("#type").data("id");
        var groupId = $("#selectGroup").val();
        var isAccountManagement, isDoctor, type;

        $("#accountManagement").attr("checked") === "checked" ? isAccountManagement = true : isAccountManagement = false;
        $("#doctor").attr("checked") === "checked" ? isDoctor = true : isDoctor = false;
        $("#provider").attr("checked") === "checked" ? type = 9 : type = 10;


        var data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            type: type,
            isAccountManagement: isAccountManagement,
            isDoctor: isDoctor,
            groupId: groupId
        };

        return data;
    }

    /**
     * data table add a row
     * @private
     */
    function _add() {
        var newAccountData = _prepareAddData();

        $.ajax({
            url: opts.urls.add,
            type: "post",
            data: newAccountData,
            success: function () {
                _loadData();
            }
        });
    }


    /**
     * bind add account event
     * @private
     */
    function _bindAddEvent() {

        $("#add-account").on("click", function (e) {
            e.preventDefault();
            $(".accounts-form")[0].reset();
            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.confirmFormArguments, {
                element: $(".accounts-form"),
                okCallback: function () {
                    if ($("#table-form").valid()) {
                        _add();
                        return true;
                    }
                    return false;
                }
            }));

            _initSelectGroup();
            //var data = [
            //    {label: "Anesthesiologist", id: 1},
            //    {label: "Medical Assistant", id: 2},
            //    {label: "Management", id: 3},
            //    {label: "Nurse", id: 4},
            //    {label: "Physical therapists (PTs)", id: 5},
            //    {label: "Primary Physician", id: 6},
            //    {label: "Scheduler", id: 7},
            //    {label: "Surgeon", id: 8}
            //];
            //$("#type").combobox({
            //    source: function (request, response) {
            //        var sources = _.filter(data, function (num) {
            //            return num.label.toLowerCase().indexOf(request.term) > -1;
            //        });
            //        if (!sources.length) {
            //            var result = [
            //                {
            //                    label: 'No matches found',
            //                    value: ''
            //                }
            //            ];
            //            response(result);
            //        }
            //        else {
            //            response($.map(sources, function (item) {
            //
            //                return {
            //                    label: item.label,
            //                    value: item.id
            //                };
            //            }));
            //        }
            //    },
            //    appendTo: ".container"
            //});
        });
    }

    /**
     * invite account again
     * @private
     */
    function _inviteAccount() {
        $("#invite-account").on("click", function (e) {
            e.preventDefault();
            var accountId = $(this).data("id");
            $.ajax({
                url: opts.urls.inviteAccount.format(accountId),
                type: "GET",
                dataType: "json",
                success: function () {
                    RC.common.showMsg(opts.defaultConfirmArguments.showMsgArguments);
                }
            });
        });
    }

    /**
     * update account
     * @private
     */
    function _updateAccount() {
        $("#edit-account").on("click", function (e) {
            e.preventDefault();

            $("#updateAccount")[0].reset();
            var accountId = $(this).data("accountId");

            var parent = $(this).parents();
            var doctor = parent.find(".account-doctor").text();
            var isDoctor = $.trim(doctor);
            var firstName = parent.find(".account-first-name").text();
            var lastName = parent.find(".account-last-name").text();
            var email = parent.find(".account-email").text();
            var accountRole = parent.find(".account-role").text();
            var typeId = parent.find(".account-role").data("id");
            var accountManage = parent.find(".accountManage").text();
            var isAccountManage = $.trim(accountManage);
            var groups = parent.find(".groups").data("ids");

            var selectResults = [];
            $.each(groups, function (index, item) {
                selectResults.push({
                    id: item.id,
                    text: item.name
                });
            });

            if (isDoctor === "Dr.") {
                $("#doctor").prop("checked", true);
            }

            if (isAccountManage === "Account Management") {
                $("#accountManagement").prop("checked", true);
            }

            if (accountRole === "Yes") {
                $("#accountProvider").prop("checked", true);
            } else {
                $("#accountProvider").prop("checked", false);
            }
            $("#firstName").val(firstName);
            $("#lastName").val(lastName);
            $("#email").val(email);


            //$("select option").filter(function () {
            //    return $(this).text() === accountRole;
            //}).prop('selected', true);

            //$("#accountType").val(accountRole);
            //$("#accountType").data("id", typeId);

            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.updateFormArguments, {
                element: $("#updateAccount"),

                okCallback: function () {
                    if ($("#updateAccount").valid()) {
                        var firstName = $("#firstName").val();
                        var lastName = $("#lastName").val();
                        var email = $("#email").val();
                        //var accountType = $("#accountType").data("id");
                        var groupId = $("#groupSelect").val();
                        var selections = $("#groupSelect").select2('data');
                        var groupValue = '';
                        $.each(selections, function (index, item) {
                            groupValue = groupValue + '<p> ' + item.text + '</p> </br>';
                        });

                        var newValue = [];
                        $.each(selections, function (index, item) {
                            newValue.push({
                                'id': item.id,
                                'name': item.text
                            });
                        });

                        var isAccountManagement, isDoctor, accountType;

                        $("#accountManagement").attr("checked") === "checked" ? isAccountManagement = true : isAccountManagement = false;
                        $("#doctor").attr("checked") === "checked" ? isDoctor = true : isDoctor = false;
                        $("#accountProvider").attr("checked") === "checked" ? accountType = 9 : accountType = 10;
                        var accountInfo = {
                            accountId: accountId,
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            type: accountType,
                            doctor: isDoctor,
                            accountManagement: isAccountManagement,
                            groupId: groupId,
                            newValue: newValue
                        };

                        _updateStaff(accountInfo, groupValue);
                        return true;
                    }
                    return false;
                }
            }));
            _initGroupSelect(selectResults);
            //$("#groupSelect").val(selectResults);
            //_initSelect();
        });
    }

    /**
     * ajax call backend
     * @param accountInfo
     * @private
     */
    function _updateStaff(accountInfo, groupValue) {
        $.ajax({
            url: opts.urls.updateAccount,
            type: "POST",
            data: accountInfo,
            dataType: "json",
            success: function (data) {
                if (data.resp === true) {
                    if (accountInfo.doctor === true) {
                        $("#isDoctor").text("Dr.");
                    } else {
                        $("#isDoctor").empty();
                    }
                    $("#accountFirstName").text(accountInfo.firstName);
                    $("#accountLastName").text(accountInfo.lastName);
                    $("#accountRole").text(accountType[accountInfo.type - 1]);
                    if (accountInfo.accountManagement === true) {
                        $("#isAccountManage").text(staffGroup[1]);
                    } else {
                        $("#isAccountManage").empty();
                    }
                    $("#groups").html(groupValue);
                    $("#groups").data("ids", accountInfo.newValue);
                }
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
     * change account password
     * @private
     */
    function _changePassword() {

        $("#changePassword").on("click", function (e) {
            e.preventDefault();
            $(".update-password")[0].reset();

            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.changePasswordFormArguments, {
                element: $(".update-password"),
                okCallback: function () {
                    if ($("#updatePassword").valid()) {

                        var oldPass = $("#oldPass").val();
                        var newPass = $("#newPass").val();
                        var confirmPass = $("#confirmPass").val();

                        var passwords = {
                            oldPassword: oldPass,
                            password: newPass,
                            confirmPassword: confirmPass
                        };

                        _updatePassword(passwords);

                        return true;
                    }
                    return false;
                }
            }));
        });
    }

    /**
     * update password
     * @param passwords
     * @private
     */
    function _updatePassword(passwords) {
        $.ajax({
            url: opts.urls.updatePassword,
            type: "POST",
            data: passwords,
            dataType: "json",
            success: function () {

            }
        });
    }

    /**
     * add set password input valid
     */
    function _validSetPassword() {
        $("#joinRat").click(function () {
            var password = $("#password").val();
            var confirmPassword = $("#confirmPassword").val();
            $(".error-area").text('');

            if ($(".create-password-form").valid() && password !== confirmPassword) {
                $(".error-area").text(RC.constants.confirmPassword);
                return false;
            }
        });

        $('.create-password-form .input-control').each(function () {
            $(this).on('input', function () {
                $(".error-area").text('');
            });
        });
    }

    /**
     * reset localStorage item 'storedEmail'
     * @private
     */
    function _logout() {
        $('.log-out').click(function () {
            window.localStorage.clear();
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
     * init select
     * @private
     */
    function _initSelect() {
        var data = [
            {label: "Anesthesiologist", id: 1},
            {label: "Medical Assistant", id: 2},
            {label: "Management", id: 3},
            {label: "Nurse", id: 4},
            {label: "Physical therapists (PTs)", id: 5},
            {label: "Primary Physician", id: 6},
            {label: "Scheduler", id: 7},
            {label: "Surgeon", id: 8}
        ];
        $("#accountType").combobox({
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
     *
     * @private
     */
    function _activateAndDeactivate() {
        $(".activate-action").on("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            var accountId = $(this).data("accountId");
            var parents = $(this).parents();
            var text = $(this).text();

            if (text === "Activate") {
                _activateAccount(accountId, parents);
            } else {
                _deactivateStaff(accountId, parents);
            }
        });
    }

    /**
     *
     * @private
     */
    function _deactivateStaff(accountId, parents) {
        var doctor = parents.find("#isDoctor").text();
        var isDoctor = $.trim(doctor);
        var firstName = parents.find("#accountFirstName").text();
        var lastName = parents.find("#accountLastName").text();

        RC.common.warning(_.extend({}, {
                title: '<div>' + "DEACTIVATE ACCOUNT" + '</div>',
                message: '<div>' + "Are you sure you want to deactivate the following account?" + '</div>' +
                '<div class="window-deactivate-msg">' + isDoctor + " " + firstName + " " + lastName + '</div>'
            },
            {
                element: $(".warn"),
                yesCallback: function () {
                    _deactivateAccount(accountId, parents);
                }
            }));
    }

    /**
     *
     * @param accountId
     * @private
     */
    function _deactivateAccount(accountId, parents) {
        $.ajax({
            url: opts.urls.deactivateAccount.format(accountId),
            type: "GET",
            dataType: "json",
            success: function (data) {
                if (data.resp === true) {
                    parents.find(".span-activate-action").text("INACTIVE").removeClass("span-deactive").addClass("span-active");
                    parents.find(".activate-action").text("Activate");
                    RC.common.showMsg(opts.defaultConfirmArguments.showDeactiveArguments);
                }
            }
        });
    }

    /**
     *
     * @param accountId
     * @param parents
     * @private
     */
    function _activateAccount(accountId, parents) {
        $.ajax({
            url: opts.urls.activateAccount.format(accountId),
            type: "GET",
            dataType: "json",
            success: function (data) {
                if (data.resp === true) {
                    parents.find(".span-activate-action").text("ACTIVE").removeClass("span-active").addClass("span-deactive");
                    parents.find(".activate-action").text("Deactivate");
                    RC.common.showMsg(opts.defaultConfirmArguments.showActiveArguments);
                }
            }
        });
    }

    /**
     * init select groups
     * @private
     */
    function _initSelectGroup() {
        $('#selectGroup').select2({
            tags: true,
            ajax: {
                transport: function (params) {
                    params.beforeSend = function () {
                        RC.common.progress(false);
                    };
                    return $.ajax(params);
                },
                url: opts.urls.getAllGroups,
                cache: "true",
                data: function (name) {
                    return {
                        name: name
                    };
                },
                results: function (data) {
                    var myResults = [];
                    $.each(data.data, function (index, item) {
                        myResults.push({
                            'id': item.id,
                            'text': item.name
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
     * init select groups
     * @private
     */
    function _initGroupSelect(groups) {

        $('#groupSelect').select2({
            tags: true,
            ajax: {
                transport: function (params) {
                    params.beforeSend = function () {
                        RC.common.progress(false);
                    };
                    return $.ajax(params);
                },
                url: opts.urls.getAllGroups,
                cache: "true",
                data: function (name) {
                    return {
                        name: name
                    };
                },
                results: function (data) {
                    var myResults = [];
                    $.each(data.data, function (index, item) {
                        myResults.push({
                            'id': item.id,
                            'text': item.name
                        });
                    });
                    return {
                        results: myResults
                    };
                }
            }
        }).change(function () {
            $(this).valid();
        }).select2('data', groups);
    }

    function _setIsDoctorImgPath() {
        var data = $('#isDoctorImg').data();

        if (data) {
            opts.img.isDoctor = data['imgPath'];
        }
    }

    /**
     * Provider page Initialization
     * @private
     */
    function _init() {
        _setIsDoctorImgPath();
        _loadData();
        _setValidate();
        _bindAddEvent();
        _clickRow();
        _inviteAccount();
        _updateAccount();
        _changePassword();
        _validSetPassword();
        _bindSearchEvent();
        _logout();
        _goBackToPrePage();
        _activateAndDeactivate();
    }

    _init();

})
(jQuery);
