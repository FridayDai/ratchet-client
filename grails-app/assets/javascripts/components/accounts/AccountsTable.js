require('momentTZ');

var flight = require('flight');
var WithDataTable = require('../common/WithDataTable');
var URLs = require('../../constants/Urls');
var Notifications = require('../common/Notification');
var STRINGs = require('../../constants/Strings');
var moment = require('moment');

var ID_CONTAINER = '<p class="source-id">{0}</p>';
var VIEW_LINK = '<a href="/accounts/{0}" data-id="{0}" class="view"><span>View</span></a>';
var DOCTOR_MARK = '<div><span class="doctor-mark"></span> {0} {1}</div>';

function AccountsTable() {
    this.attributes({
        url: URLs.GET_ACCOUNTS
    });

    this.options({
        columnDefs: [
            {
                targets: 0,
                data: 'id',
                render: function (data, type, full) {
                    return ID_CONTAINER.format(data === undefined ? full.id : data);
                },
                width: "10%"
            }, {
                targets: 1,
                data: 'firstName',
                render: function (data, type, full) {
                    var fullName;

                    if (full.doctor === true || full.doctor === 'true') {
                        fullName = DOCTOR_MARK.format(full.firstName, full.lastName);
                    } else {
                        fullName = full.firstName + " " + full.lastName;
                    }

                    return fullName;
                },
                width: "18%"
            }, {
                targets: 2,
                data: 'email',
                render: function (data, type, full) {
                    return data === undefined ? full.email : data;
                },
                width: "27%"
            }, {
                targets: 3,
                data: 'lastUpdated',
                render: function (data, type, full) {
                    var lastUpdate = data === undefined ? full.lastUpdateDate : data;
                    var lastUpdateTime = new Date(parseInt(lastUpdate, 10));
                    return moment(lastUpdateTime).tz("America/Vancouver").format('MMM D, YYYY h:mm:ss A');
                },
                width: "19%"
            }, {
                targets: 4,
                render: function (data, type, full) {
                    return VIEW_LINK.format(data === undefined ? full.id : data);
                },
                orderable: false,
                width: "7%"
            }, {
                targets: 5,
                visible: false,
                data: 'doctor'
            }, {
                targets: 6,
                visible: false,
                data: 'firstName'
            }, {
                targets: 7,
                visible: false,
                data: 'lastName'
            }
        ]
    });

    this.setRowClickUrl = function (data) {
        return URLs.PAGE_ACCOUNT_DETAIL.format(data.id);
    };

    this.onAccountIDNameSearch = function (e, data) {
        this.search(data);
    };

    this.onAddAccountSuccess = function () {
        this.reload();
    };

    this.after('initialize', function () {
        this.on(document, 'selectAccountIDNameForAccountTable', this.onAccountIDNameSearch);
        this.on(document, 'addAccountSuccess', this.onAddAccountSuccess);
    });
}

module.exports = flight.component(WithDataTable, AccountsTable);
