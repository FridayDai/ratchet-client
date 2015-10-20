require('momentTZ');

var flight = require('flight');
var WithDataTable = require('../common/WithDataTable');
var URLs = require('../../constants/Urls');
var moment = require('moment');

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
                    var id = data === undefined ? full.id : data;
                    return '<p class="source-id">' + id + '</p>';
                },
                width: "15%"
            },
            {
                targets: 1,
                data: 'name',
                render: function (data, type, full) {

                    var name = data === undefined ? full.name : data;

                    return name;
                },
                width: "50%"
            },
            {
                targets: 2,
                data: 'lastUpdated',
                render: function (data, type, full) {
                    var lastUpdateStr = data === undefined ? full.lastUpdated : data;
                    var lastUpdateTime = new Date(parseInt(lastUpdateStr, 10));
                    return moment(lastUpdateTime).tz("America/Vancouver").format('MMM D, YYYY h:mm:ss A');
                },
                width: "25%"
            },
            {
                targets: 3,
                render: function (data, type, full) {
                    var id = data === undefined ? full.id : data;
                    return '<a href="#" class="btn-edit btn-edit-group" data-group-id="' + id + '" ></a>' +
                        '<a href="#" class="btn-remove-team btn-remove-group" data-group-id="' + id + '" > </a>';
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

        this.trigger('showDeleteGroupNotification', {
            groupId: groupId
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

    this.onDeleteGroupSuccess = function() {

    };

    this.after('initialize', function () {
        this.on(document, 'selectGroupNameForGroupTable', this.onGroupNameSearch);
        this.on(document, 'addGroupSuccess', this.onAddGroupSuccess);
        this.on(document, 'updateGroupSuccess', this.onEditGroupSuccess);
        this.on(document, 'deleteGroupSuccess', this.onDeleteGroupSuccess);

    });
}

module.exports = flight.component(WithDataTable, GroupsTable);
