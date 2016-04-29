var flight = require('flight');
var WithDataTable = require('../../common/WithDataTable');
var Notifications = require('../../common/Notification');
var PARAMs = require('../../../constants/Params');
var URLs = require('../../../constants/Urls');

var ACTIVE_BUTTONS = '<a href="#" class="btn-edit" data-care-giver-id="{0}"></a>' +
    '<a href="#" class="btn-remove-team" data-care-giver-id="{0}"></a>';
var INACTIVE_BUTTONS = '<span class="btn-edit disabled"></span><span class="btn-remove-team disabled"></span>';

var ACTIVE_STATUS = '<span class="status-active">ACTIVE</span>';
var INACTIVE_STATUS = '<span class="status-inactive">INACTIVE</span>';

function EmergencyContactTable() {
    this.attributes({
        patientId: null
    });

    this.options({
        columns: [
            {
                data: "id",
                className: "id",
                orderable: false,
                width: "10%"
            }, {
                data: "name",
                render: function (data) {
                    return data.firstName + ' ' + data.lastName;
                },
                className: "firstName",
                orderable: false,
                width: "15%"
            },
            // {
            //     data: "lastName",
            //     className: "lastName",
            //     orderable: false,
            //     width: "15%"
            // },
            {
                data: 'relationShip',
                render: function (data) {
                    return PARAMs.EMERGENCY_CONTACT_RELATIONSHIP_MAP[data];
                },
                className: "relationship",
                orderable: false,
                width: "15%"
            }, {
                data: "email",
                className: "email",
                orderable: false,
                width: "20%"
            }, {
                // BE status: UNINVITED (1), INVITED (2), VERIFIED(3), NO_EMAIL(4), BOUNCED(5)
                data: 'status',
                render: function (data) {
                    if (data === 3) {
                        return ACTIVE_STATUS;
                    } else {
                        return INACTIVE_STATUS;
                    }
                },
                orderable: false,
                width: "15%"
            }, {
                render: function (data, type, full) {
                    return this.attr.archived === 'false' ?
                        ACTIVE_BUTTONS.format(full.id) : INACTIVE_BUTTONS.format(full.id);
                },
                orderable: false,
                width: "10%"
            }
        ],
        ordering: false,
        rowCallback: this.rowCallback
    });

    this.rowCallback = function (rawRow) {
        var $row = $(rawRow);

        $row.find('a.btn-edit').click(_.bind(this.showEditPatientDialog, this));
        $row.find('a.btn-remove-team').click(_.bind(this.showDeleteEmergencyContactConfirmation, this));
    };

    this.showEditPatientDialog = function (e) {
        e.preventDefault();

        var $row = $(e.target).parents('tr');
        var relationship = $row.find('.relationship').text().trim();

        this.trigger('showCareGiverDialog', {
            patientId: this.attr.patientId,
            medicalRecordId: this.attr.medicalRecordId,
            update: {
                emergencyContactId: $row.find('.id').text().trim(),
                firstName: $row.find('.firstName').text().trim(),
                lastName: $row.find('.lastName').text().trim(),
                relationship: relationship,
                relationshipId: PARAMs.EMERGENCY_CONTACT_RELATIONSHIP_REVERSE_MAP[relationship.toLowerCase()],
                email: $row.find('.email').text().trim()
            }
        });
    };

    this.showDeleteEmergencyContactConfirmation = function (e) {
        e.preventDefault();

        var me = this;
        var $target = $(e.target);
        var careGiverId = $target.data("careGiverId");
        var $row = $target.parents('tr');

        Notifications.confirm({
            title: 'DELETE EMERGENCY CONTACT',
            message: 'Are you sure you want to remove the current emergency contact?'
        }, {
            buttons: [
                {
                    text: 'Yes',
                    'class': 'btn-agree',
                    click: function () {
                        // Warning dialog close
                        $(this).dialog("close");

                        me.deleteEmergencyContact($row, careGiverId);
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

    this.deleteEmergencyContact = function ($row, careGiverId) {
        var me = this;

        $.ajax({
            url: URLs.DELETE_EMERGENCY_CONTACT
                .format(this.attr.patientId, this.attr.medicalRecordId, careGiverId),
            type: 'DELETE',
            success: function () {
                me.deleteRow($row);
            }
        });
    };

    this.getUrl = function () {
        return URLs.GET_EMERGENCY_CONTACT_LIST.format(this.attr.patientId, this.attr.medicalRecordId);
    };

    this.after('initialize', function () {
        this.on(document, 'emergencyContactUpdateSuccess', this.reload);
    });

    this.before('teardown', function () {
        this.$node.find('a.btn-edit').off('click');
        this.$node.find('a.btn-remove-team').off('click');
    });
}

module.exports = flight.component(WithDataTable, EmergencyContactTable);
