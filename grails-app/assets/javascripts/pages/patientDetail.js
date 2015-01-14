(function ($, undefined) {
    'use strict';

    //Define provider page global variables
    var opts = {
            defaultConfirmArguments: {
                confirmFormArguments: {
                    title: RC.constants.confirmTitle,
                    content: RC.constants.confirmContent,
                    height: 200,
                    width: 400
                },
                waringArguments: {
                    title: RC.constants.warningTipTitle,
                    message: RC.constants.warningTip
                }
            },
            urls: {
                query: "{0}/getProvider".format(RC.constants.baseUrl)
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
        provideTable = $("#provideTable").DataTable({
            paging: false,
            searching: false,
            ordering: false,
            info: false,
            data: data,
            columns: [
                {data: "image"},
                {
                    data: function (source) {
                        return '<label class="tr-label"> ' + source.name + '</label>';
                    }
                },
                {data: "agent"},
                {data: "email"},
                {
                    data: function (source) {
                        return '<a  href="" data-id ="' + source.id + '" class="editor_edit">Edit</a>'
                            + '&nbsp;&nbsp;<a href="" data-id ="' + source.id + '" class="editor_remove">Remove</a>';
                    },
                    className: "center"
                }
            ]
        });

    }

    /**
     * load Data from server side
     * @private
     */
    function _loadData() {
        $.ajax({
            dataType: 'json',
            url: opts.urls.query
        })
            .done(function (data) {
                provideData = data;
                _initTable(provideData);
            })
            .fail(function () {
            });
    }

    /**
     * data table add a roe
     * @private
     */
    function _add() {
        var name = $("#provider").val();
        var agent = $("#agent").val();
        var email = $("#email").val();
        var id = Math.floor((Math.random() * 1000) + 1).toString();

        provideTable.row.add({
            "image": name,
            "name": name,
            "agent": agent,
            "email": email,
            "id": id
        }).draw();

        provideData.push({
            "image": name,
            "name": name,
            "agent": agent,
            "email": email,
            "id": id
        });

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
     * remove a row
     * @param dataId
     * @param tr
     * @private
     */
    function _remove(dataId, tr) {
        var rowData = _.findWhere(provideData, {id: dataId});
        provideData = _.without(provideData, rowData);
        tr.remove().draw();
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
        $("#add-provider").on("click", function (e) {
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
     * bind remove event
     * @private
     */
    function _bindRemoveEvent() {
        // Delete a record
        $('#provideTable').on('click', 'a.editor_remove', function (e) {
            e.preventDefault();

            var dataId = $(this).data('id').toString();
            var tr = provideTable.row($(this).closest('tr'));

            RC.common.warning(_.extend({}, opts.defaultConfirmArguments.waringArguments, {
                element: $(".warn"),
                closeCallback: function () {
                    _remove(dataId, tr);
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
        _bindRemoveEvent();

        $("#tabs").tabs({
            beforeLoad: function( event, ui ) {
                ui.jqXHR.error(function() {
                    ui.panel.html(
                        "Couldn't load this tab. We'll try to fix this as soon as possible. " +
                        "If this wouldn't be a demo." );
                });
            }
        });
    }

    _init();

})
(jQuery);
