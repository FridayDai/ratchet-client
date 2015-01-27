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
                query: "{0}/getAccounts".format(RC.constants.baseUrl)
            }
        },
        accountTable;

    /**
     * init table with the data which loaded
     * @param data
     * @private
     */
    function _initTable(data) {
        accountTable = $("#accountsTable").DataTable({
            paging: true,
            searching: false,
            ordering: true,
            pageLength: 5,
            info: false,
            bLengthChange: false,
            //"processing": true,
            "serverSide": true,
            ajax: $.fn.dataTable.pipeline({
                url: opts.urls.query,
                pages: 1, // number of pages to cache
                data: data
            }),
            columns: [
                {data: "emid"},
                {data: "firstName"},
                {data: "lastName"},
                {data: "email"},
                {data: "role"},
                {data: "groups"},
                {
                    data: function (source) {
                        return '<label class="tr-label"> ' + source.lastUpdate + '</label>'
                            + '&nbsp;&nbsp;<a href="/singleAccount" data-id ="' + source.id + '" class="editor_edit">View</a>';
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
        var data;
        _initTable(data);

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
