var flight = require('flight');
var WithDataTable = require('../../common/WithDataTable');
var URLs = require('../../../constants/Urls');
var Notifications = require('../../common/Notification');

var DELETE_BUTTON_FORMAT =
    '<a href="#" class="btn-remove-team btn-remove-group" data-group-id="{0}"></a>';

function GroupTable() {

    this.attributes({
        patientId: null,
        url: null
    });

    this.options({
        columns: [
             {
                data: "name",
                render: function (data, type, full) {
                    return data === undefined ? full.name : data;
                },
                orderable: false,
                width: "85%"
            },
             {
                render: function (data, type, full) {
                    return DELETE_BUTTON_FORMAT.format(data === undefined ? full.id : data);
                },
                orderable: false,
                width: "15%"
            }
        ],
        ordering: false,
        bPaginate: false,
        rowCallback: this.rowCallback
    });

    this.rowCallback = function (rawRow) {
        var $row = $(rawRow);

        $row.find('a.btn-remove-group').click(_.bind(this.showDeleteGroupNotification, this));
    };

    this.showDeleteGroupNotification = function (e) {
        e.preventDefault();

        var $target = $(e.target);
        var groupId = $target.data("groupId");
        var $row = $target.parents('tr');
        var me = this;

        Notifications.confirm({
            title: 'DELETE GROUP',
            message: 'Are you sure you want to remove this group?'
        }, {
            buttons: [
                {
                    text: 'Yes',
                    'class': 'btn-agree',
                    click: function () {
                        // Warning dialog close
                        $(this).dialog("close");

                        me.deleteSingleGroup(groupId, $row);
                    }
                }, {
                    text: 'No',
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
            url: URLs.DELETE_PATIENT_GROUP.format(me.attr.patientId , groupId),
            type: 'POST',
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

    this.onAddPatientGroupSuccess = function () {
        this.reload();
    };

    this.after('initialize', function () {
        this.on(document, 'addPatientGroupSuccess', this.onAddPatientGroupSuccess);
    });

    this.before('teardown', function () {
        this.$node.find('a.btn-remove-team').off('click');
    });
}

module.exports = flight.component(WithDataTable, GroupTable);
