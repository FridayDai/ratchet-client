
var flight = require('flight');
var WithDataTable = require('../common/WithDataTable');
var URLs = require('../../constants/Urls');
var Notifications = require('../common/Notification');
var Utility = require('../../utils/Utility');

var ID_P_FORMAT = '<p class="source-id">{0}</p>';
var EDIT_DELETE_BUTTON_FORMAT = [
    '<a href="#" class="btn-edit btn-edit-group" data-group-id="{0}" ></a>',
    '<a href="#" class="btn-remove-team btn-remove-group" data-group-id="{0}"></a>'
].join('');

function GroupsTable() {
    this.attributes({
        url: URLs.GET_GROUPS
    });

    this.options({
        columnDefs: [
            {
                targets: 0,
                data: 'id',
                render: function (data, type, full) {
                    return ID_P_FORMAT.format(data === undefined ? full.id : data);
                },
                width: "15%"
            },
            {
                targets: 1,
                data: 'name',
                render: function (data, type, full) {
                    return data === undefined ? full.name : data;
                },
                width: "50%"
            },
            {
                targets: 2,
                data: 'lastUpdated',
                render: function (data, type, full) {
                    var lastUpdateStr = data === undefined ? full.lastUpdated : data;
                    var lastUpdateTime = new Date(parseInt(lastUpdateStr, 10));
                    return Utility.toVancouverTimeHour(lastUpdateTime);
                },
                width: "25%"
            },
            {
                targets: 3,
                render: function (data, type, full) {
                    return EDIT_DELETE_BUTTON_FORMAT.format(data === undefined ? full.id : data);
                },
                orderable: false,
                width: "10%"
            }
        ],
        rowCallback: this.rowCallback
    });

    this.rowCallback = function (rawRow) {
        var $row = $(rawRow);

        $row.find('a.btn-edit-group').click(_.bind(this.showEditGroupDialog, this));
        $row.find('a.btn-remove-group').click(_.bind(this.showDeleteGroupNotification, this));
    };

    this.showEditGroupDialog = function (e) {
        e.preventDefault();

        var $target = $(e.target);
        var $row = $target.parents('tr');
        var groupId = $target.data("groupId");
        var groupName = $row.find('td:eq(1)').text().trim();


        this.trigger('showGroupFormDialog', {
            update: {
                groupId: groupId,
                groupName: groupName
            }
        });
    };

    this.showDeleteGroupNotification = function (e) {
        e.preventDefault();

        var $target = $(e.target);
        var groupId = $target.data("groupId");
        var $row = $target.parents('tr');
        var me = this;

        Notifications.confirm({
            title: 'DELETE GROUP',
            message: 'Warning: This action cannot be undone.'
        }, {
            buttons: [
                {
                    text: 'Delete',
                    'class': 'btn-agree',
                    click: function () {
                        // Warning dialog close
                        $(this).dialog("close");

                        me.deleteSingleGroup(groupId, $row);
                    }
                }, {
                    text: 'Cancel',
                    click: function () {
                        $(this).dialog("close");
                    }
                }
            ]
        });
    };

    this.deleteSingleGroup = function (groupId, $row) {
        var me = this;

        $.ajax({
            url: URLs.DELETE_GROUP,
            type: 'POST',
            data: {groupId: groupId},
            success: function () {
                me.deleteRow($row);
            },
            error: function (jqXHR) {
                if (jqXHR.status === 400 && jqXHR.responseText.indexOf('cannot be deleted')) {
                    var errMsg = jqXHR.responseText.replace('. ', '.<br/>');

                    Notifications.error({
                        title: '<strong>CANNOT DELETE GROUP</strong>',
                        message: errMsg
                    });
                }
            }
        });
    };

    this.onGroupNameSearch = function (e, data) {
        this.search(data);
    };

    this.onAddGroupSuccess = function () {
        this.reload();
    };

    this.onEditGroupSuccess = function () {
        this.reload();
    };

    this.after('initialize', function () {
        this.on(document, 'selectGroupNameForGroupTable', this.onGroupNameSearch);
        this.on(document, 'addGroupSuccess', this.onAddGroupSuccess);
        this.on(document, 'updateGroupSuccess', this.onEditGroupSuccess);
    });

    this.before('teardown', function () {
        this.$node.find('a.btn-edit-group').off('click');
        this.$node.find('a.a.btn-remove-group').off('click');
    });
}

module.exports = flight.component(WithDataTable, GroupsTable);
