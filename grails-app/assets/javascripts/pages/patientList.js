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
            urls: {
                query: "{0}/getPatients".format(RC.constants.baseUrl)
            }
        },
        provideTable,
        provideData;

    /**
     * init table with the data which loaded
     * @param data
     * @private
     */
    function _initTable(data) {
        provideTable = $("#patientsTable").DataTable({
            paging: true,
            searching: true,
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
                {data: "phoneNumber"},
                {
                    data: function (source) {
                        return '<label class="tr-label"> ' + source.treatments + '</label>'
                            + '&nbsp;&nbsp;<a href="/singlePatient" data-id ="' + source.id + '" class="editor_edit">View</a>';
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
     * data table add a row
     * @private
     */
    function _add() {
        var emid = $("#emid").val();
        var firstName = $("#firstName").val();
        var lastName = $("#lastName").val();
        var email = $("#email").val();
        var phoneNumber = $("#phoneNumber").val();
        var treatments = $("#treatments").val();
        var id = Math.floor((Math.random() * 1000) + 1).toString();

        provideTable.row.add({
            "emid": emid,
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "phoneNumber": phoneNumber,
            "treatments": treatments,
            "id": id
        }).draw();

        //provideData.push({
        //    "emid": emid,
        //    "firstName": firstName,
        //    "lastName": lastName,
        //    "email": email,
        //    "phoneNumber": phoneNumber,
        //    "treatments": treatments,
        //    "id": id
        //});

    }

    /**
     * modify data
     * @param cell
     * @private
     */
    function _modify(cell) {
        var d = cell.data();
        var name = $("#provider").val();
        var agent = $("#agent").val();
        var email = $("#email").val();
        d.name = name;
        d.agent = agent;
        d.email = email;
        provideTable.row(cell).data(d).draw();

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
        });
    }

    /**
     * bind modify event
     * @private
     */
    function _bindModifyEvent() {
        // Edit record
        $('#provideTable').on('click', 'a.editor_edit', function (e) {
            e.preventDefault();

            var dataId = $(this).data('id').toString();
            var rowData = _.findWhere(provideData, {id: dataId});
            $("#provider").val(rowData.name);
            $("#agent").val(rowData.agent);
            $("#email").val(rowData.email);

            var cell = provideTable.row($(this).closest('tr'));

            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.confirmFormArguments, {
                element: $(".form"),
                okCallback: function () {
                    _modify(cell);
                    return true;
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
        _bindModifyEvent();
    }

    _init();

})
(jQuery);
