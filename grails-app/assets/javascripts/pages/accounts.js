(function ($, undefined) {
    'use strict';

    //Define accounts page global variables
    var opts = {
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
                }
            },
            urls: {
                query: "/getAccounts",
                add: "/createAccount",
                updateAccount: "/updateAccount",
                inviteAccount: "/inviteAccount/{0}",
                updatePassword: "/updatePassword",
                showSingleAccount: "/singleAccount/{0}"
            }
        },
        accountType = ["Anesthesiologist", "Medical Assistant", "Management", "Nurse", "Physical therapists (PTs)", "Primary Physican", "Scheduler", "Surgeon"],
        staffGroup = ["Patients Management", "Accounts Management"],
        accountTable;

    /**
     * init table with the data which loaded
     * @param data
     * @private
     */
    function _initTable(data) {
        if (accountTable) {
            accountTable.clear();
            accountTable.destroy();
        }
        accountTable = $("#accountsTable").DataTable({
            paging: true,
            searching: false,
            ordering: true,
            pageLength: 20,
            info: false,
            bLengthChange: false,
            "serverSide": true,
            "bAutoWidth": false,
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
            "columnDefs": [
                {"targets": [0, 4], "orderable": false}
            ],
            columns: [
                {
                    data: function (source) {
                        return '<p class="source-id">' + source.id + '</p>';
                    },
                    width: "10%"
                },
                {
                    data: function (source) {
                        return source.firstName + " " + source.lastName;
                    },
                    width: "18%"
                },
                {
                    data: "email",
                    width: "27%"
                },
                {
                    data: function (source) {
                        var lastUpdateTime = new Date(source.lastUpdateDate);
                        var formatTime = moment(lastUpdateTime).format('MMM D, YYYY h:mm:ss A');
                        return formatTime;
                    },
                    width: "19%"
                },
                {
                    data: function (source) {
                        return '<a href="/singleAccount/' + source.id + '" data-id ="' + source.id + '" class="view"><span>View</span></a>';
                    },
                    width: "7%"
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
        var data = _prepareAddData();

        $.ajax({
            url: opts.urls.add,
            type: "post",
            data: data,
            success: function (data) {
                if (data.resp === true) {
                    _initTable();
                }
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
            var accountId = $(this).data("accountId");
            $.ajax({
                url: opts.urls.inviteAccount.format(accountId),
                type: "GET",
                dataType: "json",
                success: function (data) {
                    if (data.resp === true) {
                        $("#status-text").text("Invited");
                    }
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
            if (isAccountManage === "Accounts Management") {
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
    }

    _init();

})
(jQuery);
