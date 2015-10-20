var flight = require('flight');

var URLs = require('../../constants/Urls');
var STRINGs = require('../../constants/Strings');
var Notifications = require('../common/Notification');

var GROUP_FORMAT = '<p>{0}</p>';

var DEACTIVATE_MSG = '<div class="window-deactivate-msg">{0} {1} {2}</div>';

function InfoTitlePanel() {
    this.attributes({
        isDoctorLabelSelector: '#isDoctor',
        firstNameLabelSelector: '#accountFirstName',
        lastNameLabelSelector: '#accountLastName',
        npiContainerSelector: '#accountInfo-npi',
        npiLabelSelector: '#accountInfo-npi span',
        editButtonSelector: '#edit-account',
        emailLabelSelector: '.account-email',
        providerLabelSelector: '#accountRole',
        permissionLabelSelector: '#isAccountManage',
        groupLabelSelector: '#groups',

        inviteAgainButtonSelector: '#invite-account',
        statusButtonSelector: '.activate-action'
    });

    this.onEdithButtonClicked = function (e) {
        e.preventDefault();

        var isProvider = this.select('providerLabelSelector').text().trim() === 'Yes';
        var data = {
            isDoctor: this.select('isDoctorLabelSelector').text().trim() === 'Dr.',
            firstName: this.select('firstNameLabelSelector').text().trim(),
            lastName: this.select('lastNameLabelSelector').text().trim(),
            email: this.select('emailLabelSelector').text().trim(),
            isProvider: isProvider,
            isAdmin: this.select('permissionLabelSelector').text().trim() === 'Administrator',
            groups: this.select('groupLabelSelector').data('ids')
        };

        if (isProvider) {
            data.npi = this.select('npiLabelSelector').text().trim();
        }

        this.trigger('showEditAccountDialog', data);
    };

    this.updateAccountInfo = function (e, data) {
        this.select('isDoctorLabelSelector').text(data.isDoctor ? 'Dr.' : '');
        this.select('firstNameLabelSelector').text(data.firstName);
        this.select('lastNameLabelSelector').text(data.lastName);

        var $npiContainer = this.select('npiContainerSelector');
        var $npi = this.select('npiLabelSelector');
        if (data.npi) {
            $npiContainer.removeClass('hidden');
            $npi.text(data.npi);
        } else if (!$npiContainer.hasClass('hidden')) {
            $npiContainer.addClass('hidden');
            $npi.text('');
        }

        this.select('emailLabelSelector').text(data.email);
        this.select('providerLabelSelector').text(data.isProvider ? 'Yes' : 'No');
        this.select('permissionLabelSelector').text(data.isAdmin ? 'Administrator' : '');

        var $group = this.select('groupLabelSelector');

        $group.data('ids', data.groups);
        $group.html(_.map(data.groups, function (item) {
            return GROUP_FORMAT.format(item.name);
        }).join(''));
    };

    this.onInviteAgainButtonClicked = function (e) {
        e.preventDefault();

        var accountId = this.select('inviteAgainButtonSelector').data("id");

        $.ajax({
            url: URLs.ACCOUNT_INVITE_AGAIN.format(accountId),
            type: "GET",
            dataType: "json",
            success: function () {
                Notifications.showFadeOutMsg(STRINGs.INVITE_EMAIL_SUCCESS);
            }
        });
    };

    this.onStatusButtonClicked = function (e) {
        e.preventDefault();

        var $button = this.select('statusButtonSelector');
        var accountId = $button.data('accountId');
        var text = $button.text();

        if (text === "Activate") {
            this.onActivateButtonClicked(accountId, $button);
        } else {
            this.onDeactivateButtonClicked(accountId, $button);
        }
    };

    this.onActivateButtonClicked = function (accountId, $button) {
        $.ajax({
            url: URLs.ACCOUNT_ACTIVATE.format(accountId),
            type: "GET",
            dataType: "json",
            success: function (data) {
                if (data.resp === true) {
                    $button.prev()
                        .text("ACTIVE")
                        .removeClass("span-active")
                        .addClass("span-deactive");

                    $button.text("Deactivate");

                    Notifications.showFadeOutMsg(STRINGs.ACCOUNT_ACTIVATED);
                }
            }
        });
    };

    this.onDeactivateButtonClicked = function (accountId, $button) {
        var me = this;
        var isDoctor = this.select('isDoctorLabelSelector').text().trim();
        var firstName = this.select('firstNameLabelSelector').text().trim();
        var lastName = this.select('lastNameLabelSelector').text().trim();

        Notifications.confirm({
            title: 'DEACTIVATE ACCOUNT',
            message: [
                'Are you sure you want to deactivate the following account?',
                DEACTIVATE_MSG.format(isDoctor, firstName, lastName)
            ]
        }, {
            buttons: [
                {
                    text: 'Yes',
                    'class': 'btn-agree',
                    click: function () {
                        // Warning dialog close
                        $(this).dialog("close");

                        me.deactivateAccount(accountId, $button);
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

    this.deactivateAccount = function (accountId, $button) {
        $.ajax({
            url: URLs.ACCOUNT_DEACTIVATE.format(accountId),
            type: "GET",
            dataType: "json",
            success: function (data) {
                if (data.resp === true) {
                    $button.prev()
                        .text("INACTIVE")
                        .removeClass("span-deactive")
                        .addClass("span-active");

                    $button.text("Activate");

                    Notifications.showFadeOutMsg(STRINGs.ACCOUNT_DEACTIVATED);
                }
            }
        });
    };

    this.after('initialize', function () {
        this.on('click', {
            editButtonSelector: this.onEdithButtonClicked,
            inviteAgainButtonSelector: this.onInviteAgainButtonClicked,
            statusButtonSelector: this.onStatusButtonClicked
        });

        this.on(document, 'updateAccountSuccess', this.updateAccountInfo);
    });
}

module.exports = flight.component(InfoTitlePanel);
