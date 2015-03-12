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
                    width: 600
                },
                updateFormArguments: {
                    title: RC.constants.updateAccountTitle,
                    content: RC.constants.confirmContent,
                    height: 200,
                    width: 600
                },
                changePasswordFormArguments: {
                    title: RC.constants.changePasswordTitle,
                    content: RC.constants.confirmContent,
                    height: 300,
                    width: 340
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
                activateAccount: "/activateAccount/{0}"
            }
        },
        accountType = ["Anesthesiologist", "Medical Assistant", "Management", "Nurse", "Physical therapists (PTs)", "Primary Physican", "Scheduler", "Surgeon"],
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
            deferLoading: $(opts.table.id).data("total"),
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
                "targets": [0, 4],
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
                        var name = data === undefined ? (full.firstName + " " + full.lastName) : data;
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
                        var id = data == undefined ? full.id : data;
                        return '<a href="/singleAccount/' + id + '" data-id ="' + id + '" class="view"><span>View</span></a>';
                    },
                    width: "7%"
                }]
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

    function _clickRow() {
        $('#accountsTable tbody').on('click', 'tr', function () {
            var id = $(this).find("td a").data("id");
            var url = opts.urls.showSingleAccount.format(id);
            window.location.href = url;
        });
    }

    function _search() {
        var data = {
            name: $("#search-input").val()
        };
        _initTable(data);
    }

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
        var type = $("#type").val();
        var isAccountManagement, isDoctor;

        $("#accountManagement").attr("checked") === "checked" ? isAccountManagement = true : isAccountManagement = false;
        $("#doctor").attr("checked") === "checked" ? isDoctor = true : isDoctor = false;

        var data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            type: type,
            isAccountManagement: isAccountManagement,
            isDoctor: isDoctor
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
            success: function (data) {
                //newAccountData.id = data.resp.id;
                //newAccountData.lastUpdateDate = data.resp.lastUpdateDate;
                //accountTable.row.add(newAccountData).draw();
                _loadData();
            }
            //error: function () {
            //    RC.common.warning(_.extend({}, opts.defaultConfirmArguments.waringArguments, {
            //        element: $(".warn"),
            //        closeCallback: function () {
            //        }
            //    }));
            //}
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

            $("#type").select2().change(function () {
                $(this).valid();
            });
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
                success: function (data) {
                    //if (data.resp === true) {
                    //    $("#status-text").text("Invited");
                    //}
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

            $(".update-account-form")[0].reset();
            var accountId = $(this).data("accountId");

            var parent = $(this).parents();
            var doctor = parent.find(".account-doctor").text();
            var isDoctor = $.trim(doctor);
            var firstName = parent.find(".account-first-name").text();
            var lastName = parent.find(".account-last-name").text();
            var email = parent.find(".account-email").text();
            var accountRole = parent.find(".account-role").text();
            var accountManage = parent.find(".accountManage").text();
            var isAccountManage = $.trim(accountManage);

            if (isDoctor === "Dr.") {
                $("#doctor").prop("checked", true);
            }
            if (isAccountManage === "Account Management") {
                $("#accountManagement").prop("checked", true);
            }
            $("#firstName").val(firstName);
            $("#lastName").val(lastName);
            $("#email").val(email);

            $("select option").filter(function () {
                return $(this).text() === accountRole;
            }).prop('selected', true);

            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.updateFormArguments, {
                element: $(".update-account-form"),

                okCallback: function () {
                    if ($("#updateAccount").valid()) {
                        var firstName = $("#firstName").val();
                        var lastName = $("#lastName").val();
                        var email = $("#email").val();
                        var accountType = $("#accountType").val();
                        var isAccountManagement, isDoctor;

                        $("#accountManagement").attr("checked") === "checked" ? isAccountManagement = true : isAccountManagement = false;
                        $("#doctor").attr("checked") === "checked" ? isDoctor = true : isDoctor = false;

                        var accountInfo = {
                            accountId: accountId,
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            type: accountType,
                            doctor: isDoctor,
                            accountManagement: isAccountManagement
                        };

                        _updateStaff(accountInfo);
                        return true;
                    }
                    return false;
                }
            }));

            _initSelect();
        });
    }

    /**
     * ajax call backend
     * @param accountInfo
     * @private
     */
    function _updateStaff(accountInfo) {
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
        $("#johnRat").click(function () {
            $(".create-password-form").valid();

            var password = $("#password").val();
            var confirmPassword = $("#confirmPassword").val();
            if (password !== confirmPassword) {
                $(".error-area").text(RC.constants.confirmPassword);
                return false;
            }
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
        $("#accountType").select2().change(function () {
            $(this).valid();
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
                title: '<div class="window-error">' + "DEACTIVATE ACCOUNT" + '</div>',
                message: '<div class="window-error">' + "Are you sure you want to deactivate the following account?" + '</div>' +
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
     * Provider page Initialization
     * @private
     */
    function _init() {
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
