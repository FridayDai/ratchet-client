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
                groups: "/groups",
                updateGroup: "/groups/update",
                deleteGroup: "/groups/delete"
            }
        },
        sortType = {
            "ID": "id",
            "Group Name": "name",
            "Last Update": "lastUpdated"
        },
        groupTable;

    /**
     * init table, when sent request
     */
    function _initTable(data) {

        var options = _.extend({}, RC.common.dataTableOptions, {
            pageLength: $(opts.table.id).data("pagesize"),
            deferLoading: [$(opts.table.id).data("filtered"), $(opts.table.id).data("total")],

            ajax: $.fn.dataTable.pipeline({
                url: opts.urls.groups,
                pages: 2, // number of pages to cache
                data: data,
                method: "get"
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
        });

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
     *
     * @private
     */
    function _sortGroupTable() {
        _.each($('#groupsTable th'), function (element, index) {
            var flag = 0;
            $(element).on("click", function () {
                var ele = $(element);
                var sort = sortType[ele.text()];
                var orderSC;
                if (flag == 0) {
                    flag = 1;
                    orderSC = "asc"
                } else {
                    flag = 0;
                    orderSC = "desc"
                }
                var data = {
                    sort: sort,
                    order: orderSC
                };
                _initTable(data);
            })
        });
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

        _bindEnterEvent($('#groupName'), function() {
            var name = $('#groupName').val();
            if ($ele.valid()) {
                _addGroup(name);
                $ele.dialog("destroy").addClass('ui-hidden');
            }
        });
    }

    function _addGroup(name) {
        $.ajax({
            url: opts.urls.groups,
            type: "POST",
            data: {name: name},
            dataType: "json",
            success: function () {
                _initTable();
            }
        });

    }

    //bind group name event enter
    function _bindEnterEvent(element, callback) {
        element.keydown(function (event) {
            if (event.keyCode === 13) {
                callback();
            }
        })
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

        _bindEnterEvent($('#groupName'), function() {
            var groupInfo = {
                name: $('#groupName').val(),
                groupId: $this.data("groupId")
            };
            if ($ele.valid()) {
                _editGroup(groupInfo);
                $ele.dialog("destroy").addClass('ui-hidden');
            }
        });
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
            confirmText: "Delete",
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
                groupTable.clearPipeline().draw();
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
        _sortGroupTable();
    }

    _init();

})(jQuery);
