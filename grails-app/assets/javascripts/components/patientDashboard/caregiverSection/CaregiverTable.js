var flight = require('flight');
var WithDataTable = require('../../common/WithDataTable');
var Notifications = require('../../common/Notification');
var PARAMs = require('../../../constants/Params');
var URLs = require('../../../constants/Urls');

var ACTIVE_BUTTONS = '<a href="#" class="btn-edit" data-caregiver-id="{0}"></a>' +
    '<a href="#" class="btn-remove-team" data-caregiver-id="{0}"></a>';

var ACTIVE_STATUS = '<span class="status-active">ACTIVE</span>';
var INACTIVE_STATUS = '<span class="status-inactive">INACTIVE</span>';

function CaregiverTable() {
    this.attributes({
        patientId: null
    });

    this.options({
        paging: false,
        columns: [
            {
                data: "id",
                className: "id",
                width: "10%"
            }, {
                data: "fullName",
                render: function (data, type, full) {
                    return full.lastName ? (full.firstName + " " + full.lastName) : data;
                },
                className: "firstName",
                width: "20%"
            }, {
                data: 'relationShip',
                render: function (data) {
                    return PARAMs.CAREGIVER_RELATIONSHIP_MAP[data];
                },
                className: "relationship",
                width: "15%"
            }, {
                data: "email",
                className: "email",
                width: "30%"
            }, {
                // BE status: UNINVITED (1), INVITED (2), VERIFIED(3), NO_EMAIL(4), BOUNCED(5)
                data: 'status',
                name: 'emailStatus',
                render: function (data) {
                    if (data === 3 || data === '3') {
                        return ACTIVE_STATUS;
                    } else {
                        return INACTIVE_STATUS;
                    }
                },
                width: "15%"
            }, {
                render: function (data, type, full) {
                    return ACTIVE_BUTTONS.format(full.id);
                },
                orderable: false,
                width: "10%"
            }
        ],
        rowCallback: this.rowCallback
    });

    this.rowCallback = function (rawRow) {
        var $row = $(rawRow);

        $row.find('a.btn-edit').click(_.bind(this.showEditCaregiverDialog, this));
        $row.find('a.btn-remove-team').click(_.bind(this.showDeleteCaregiverConfirmation, this));
    };

    this.showEditCaregiverDialog = function (e) {
        e.preventDefault();

        var $row = $(e.target).parents('tr');
        var relationship = $row.find('.relationship').text().trim();
        var name = $row.find('.firstName').text().trim();
        var nameArr = name.split(' ');

        this.trigger('showCaregiverDialog', {
            patientId: this.attr.patientId,
            update: {
                caregiverId: $row.find('.id').text().trim(),
                firstName: nameArr[0],
                lastName: nameArr[1],
                relationship: relationship,
                relationshipId: PARAMs.CAREGIVER_RELATIONSHIP_REVERSE_MAP[relationship.toLowerCase()],
                email: $row.find('.email').text().trim()
            }
        });
    };

    this.showDeleteCaregiverConfirmation = function (e) {
        e.preventDefault();

        var me = this;
        var $target = $(e.target);
        var caregiverId = $target.data("caregiverId");
        var $row = $target.parents('tr');

        Notifications.confirm({
            title: 'DELETE CAREGIVER',
            message: 'Are you sure you want to remove the current caregiver?'
        }, {
            buttons: [
                {
                    text: 'Yes',
                    'class': 'btn-agree',
                    click: function () {
                        // Warning dialog close
                        $(this).dialog("close");

                        me.deleteCaregiver($row, caregiverId);
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

    this.deleteCaregiver = function ($row, caregiverId) {
        var me = this;

        $.ajax({
            url: URLs.DELETE_CAREGIVER
                .format(this.attr.patientId, caregiverId),
            type: 'DELETE',
            success: function () {
                me.deleteRow($row);
            }
        });
    };

    this.getUrl = function () {
        return URLs.GET_CARE_GIVER_LIST.format(this.attr.patientId);
    };

    this.after('initialize', function () {
        this.on(document, 'caregiverUpdateSuccess', this.reload);
    });

    this.before('teardown', function () {
        this.$node.find('a.btn-edit').off('click');
        this.$node.find('a.btn-remove-team').off('click');
    });
}

module.exports = flight.component(WithDataTable, CaregiverTable);
