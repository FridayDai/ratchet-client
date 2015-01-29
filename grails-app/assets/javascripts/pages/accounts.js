(function ($, undefined) {
    'use strict';

    //Define accounts page global variables
    var opts = {
            defaultConfirmArguments: {
                confirmFormArguments: {
                    title: RC.constants.confirmAccountTitle,
                    content: RC.constants.confirmContent,
                    height: 200,
                    width: 400
                }
            },
            urls: {
                query: "{0}/getAccounts".format(RC.constants.baseUrl),
                add: "{0}/createAccount".format(RC.constants.baseUrl),
                updateAccount: "{0}/updateAccount/".format(RC.constants.baseUrl)
            }
        },
        accountType = ["Anesthesiologist", "Medical Assistant", "Management", "Nurse", "Physical therapists (PTs)", "Primary Physican", "Scheduler", "Surgeon"],
        accountGroup = ["Patients Mgt", "Account Mgt"],
        accountTable;

    /**
     * init table with the data which loaded
     * @param data
     * @private
     */
    function _initTable(data) {
        if(accountTable) {
            accountTable.destroy();
        }

        accountTable = $("#accountsTable").DataTable({
            paging: true,
            searching: false,
            ordering: true,
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
                {data: "firstName"},
                {data: "lastName"},
                {data: "email"},
                {
                  data: function(source) {
                      return accountType[source.type-1];
                  }
                },
                {
                    data: function(source) {
                        var groupMgt = [],
                            accountMgt = source.accountManagement ? groupMgt.push("Accounts Mgt") : null,
                            patientMgt = source.patientManagement ? groupMgt.push("Patients Mgt") : null;

                        return groupMgt.join(', ');
                    }
                },
                {
                    data: function (source) {
                        return '<a href="/singleAccount/' + source.id + '" data-id ="' + source.id + '" class="editor_edit">View</a>';
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
            clientId: 6
        };
        _initTable(data);
    }

    /**
<<<<<<< HEAD
=======
     * prepare data of add account
     * @private
     */
    function _prepareAddData() {
        var clientId = 6;
        var firstName = $("#firstName").val();
        var lastName = $("#lastName").val();
        var email = $("#email").val();
        var type = $("#type").val();
        var isPatientManagement, isAccountManagement, isDoctor;

        $("#patientManagement").attr("checked") === "checked" ? isPatientManagement = true : isPatientManagement = false;
        $("#accountManagement").attr("checked") === "checked" ? isAccountManagement = true : isPatientManagement = false;
        $("#doctor").attr("checked") === "checked" ? isDoctor = true : isDoctor = false;

        var data = {
            clientId: clientId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            type: type,
            isPatientManagement: isPatientManagement,
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
            success: function() {
                _initTable();
            },
            error: function() {
                RC.common.warning(_.extend({}, opts.defaultConfirmArguments.waringArguments, {
                    element: $(".warn"),
                    closeCallback: function () {
                    }
                }));
            }
        });
    }

    /**
>>>>>>> fcad99ec844203b5d3ab3fadcc62182b05927f48
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
        // new a record
        $("#add-account").on("click", function (e) {
            e.preventDefault();
            $(".accounts-form")[0].reset();

            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.confirmFormArguments, {
                element: $(".accounts-form"),
                okCallback: function () {
                    if ($("#table-form").valid()) {
                        return true;
                    }
                    return false;
                }
            }));
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
