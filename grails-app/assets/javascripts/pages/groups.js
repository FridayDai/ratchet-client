(function ($, undefined) {
    'use strict';

    //Define groups page global variables
    var opts = {
            table: {
                id: "#groupsTable"
            },
            defaultConfirmArguments: {
                addFormArguments: {
                    title: RC.constants.addGroupTitle,
                    content: RC.constants.confirmContent,
                    height: 200,
                    width: 380
                },
                editFormArguments: {
                    title: RC.constants.editGroupTitle,
                    content: RC.constants.confirmContent,
                    height: 200,
                    width: 385
                },
                deleteWarningArguments: {
                    title: RC.constants.deleteGroupWaringTitle,
                    message: RC.constants.archivedMessage
                }
            },
            urls: {
                getGroups: "/getGroups",
                addGroup: "/createGroup",
                updateGroup: "/updateGroup",
                deleteGroup: "/deleteGroup"
            }
        },
        groupTable;

    /**
     * init table, when sent request
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
                url: opts.urls.getGroups,
                pages: 2, // number of pages to cache
                data: data
            }),
            "columnDefs": [{
                "targets": [0, 3],
                "orderable": false
            },
                {
                    "targets": 0,
                    "render": function (data, type, full) {
                        var id = data === undefined ? full.id : data;
                        return '<p class="source-id">' + id + '</p>';
                    },
                    width: "15%"
                },
                {
                    "targets": 1,
                    "render": function (data, type, full) {

                        var name = data === undefined ? full.name : data;

                        return name;
                    },
                    width: "50%"
                },
                {
                    "targets": 2,
                    "render": function (data, type, full) {
                        var lastUpdateStr = data === undefined ? full.lastUpdated : data;
                        var lastUpdateTime = new Date(parseInt(lastUpdateStr));
                        var formatTime = moment(lastUpdateTime).tz("America/Vancouver").format('MMM D, YYYY h:mm:ss A');
                        return formatTime;
                    },
                    width: "25%"
                },
                {
                    "targets": 3,
                    "render": function (data, type, full) {
                        var id = data === undefined ? full.id : data;
                        return '<a href="#" class="btn-edit btn-edit-group" data-group-id="' + id + '" ></a>' +
                            '<a href="#" class="btn-remove-team btn-remove-group" data-group-id="' + id + '" > </a>';
                    },
                    width: "10%"
                }
            ]
        };

        if (groupTable) {
            groupTable.clear();
            groupTable.destroy();
            delete options.deferLoading;
        }

        groupTable = $(opts.table.id).DataTable(options);
    }

    /**
     * init search for groups table
     * @private
     */
    function clickToSearch(e) {
        e.preventDefault();
        _search();
    }

    function keyDownToSearch(e) {
        if (e.keyCode === 13) {
            _search();
        }
    }

    function _search() {
        var data = {
            name: $("#search-input").val()
        };
        _initTable(data);
    }

    /**
     * new a single group
     */
    var addGroupModel = function (e) {
        e.preventDefault();
        var ele = '#group-form';
        _bindAddModel(ele);
    };

    //bind new group model
    function _bindAddModel(ele) {
        var $ele = $(ele);
        $ele[0].reset();
        RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.addFormArguments, {
            element: $ele,
            okCallback: function () {
                var name = $('#groupName').val();
                if ($ele.valid()) {
                    _addGroup(name);
                    return true;
                }
                return false;
            }
        }));

    }

    function _addGroup(name) {
        $.ajax({
            url: opts.urls.addGroup,
            type: "POST",
            data: {name: name},
            dataType: "json",
            success: function () {
                _initTable();
            }
        });

    }

    /**
     * edit a single group
     * @private
     */
    var editGroupModel = function (e) {
        e.preventDefault();
        var ele = '#group-form';
        var $this = $(this);
        _bindEditModel(ele, $this);
    };

    function _bindEditModel(ele, $this) {
        var $ele = $(ele);
        $ele[0].reset();
        $ele.find('#groupName').val($this.closest('tr').find('td:eq(1)').text());
        RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.editFormArguments, {
            element: $ele,
            okCallback: function () {
                var groupInfo = {
                    name: $('#groupName').val(),
                    groupId: $this.data("groupId")
                };
                if ($ele.valid()) {
                    _editGroup(groupInfo);
                    return true;
                }
                return false;
            }
        }));
    }

    function _editGroup(groupInfo) {
        $.ajax({
            url: opts.urls.updateGroup,
            type: "POST",
            data: groupInfo,
            dataType: "json",
            success: function () {
                _initTable();
            }
        });
    }

    /**
     * delete a single group
     * @private
     */
    var deleteGroupModel = function (e) {
        e.preventDefault();
        var $this = $(this);
        _bindDeleteModel($this);
    };

    function _bindDeleteModel($this) {
        var groupId = $this.data("groupId");
        var parentTr = $this.closest('tr');
        RC.common.warning(_.extend({}, opts.defaultConfirmArguments.deleteWarningArguments, {
            yesCallback: function () {
                _deleteGroup(groupId, parentTr);
            }
        }));
    }

    function _deleteGroup(groupId, parentTr) {
        $.ajax({
            url: opts.urls.deleteGroup,
            type: "POST",
            data: {groupId: groupId},
            dataType: "json",
            success: function () {
                parentTr.remove();
            },
            error: function (jqXHR) {
                if (jqXHR.status === 400) {
                    var resp = jqXHR.responseText;
                    var msgs = resp.split(".");

                    RC.common.error({
                        title: RC.constants.groupErrorTip,
                        message: msgs[0] + ".",
                        errorMessage: msgs[1] + "."
                    });
                }

            }
        });
    }


    /**
     * bind event on this page
     */
    var events = function () {

        //add a group
        $('#add-group').on('click', addGroupModel);

        //edit a group
        $(opts.table.id).on('click', 'tr .btn-edit-group', editGroupModel);

        //delete a group
        $(opts.table.id).on('click', 'tr .btn-remove-group', deleteGroupModel);

        //search groups with name
        $('#search-input').keydown(keyDownToSearch);
        $("#search-btn").on("click", clickToSearch);

    };

    /**
     * Groups page Initialization
     * @private
     */
    function _init() {
        events();
        _initTable();
    }

    _init();

})(jQuery);
