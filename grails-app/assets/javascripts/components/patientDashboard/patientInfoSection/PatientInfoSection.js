var flight = require('flight');
var URLs = require('../../../constants/Urls');
var STRINGs = require('../../../constants/Strings');
var Notifications = require('../../common/Notification');
var Utility = require('../../../utils/Utility');

function PatientInfoSection() {
    this.attributes({
        editPatientButtonSelector: '.btn-edit-patient',
        closePageButtonSelector: '.btn-close',
        inviteAgainButtonSelector: '.invite-patient',
        inviteAgainContainerSelector: '.div-invite',
        addEmailButtonSelector: '.add-email',
        addPhoneNumberButtonSelector: '.add-phone-number',
        emailStatusLabelSelector: '.email-status',

        patientIdStaticSelector: '.identify',
        firstNameStaticSelector: '.first-name',
        lastNameStaticSelector: '.last-name',
        emailStaticSelector: '#patientEmail',
        emailStatusSelector: '.info .email-status',
        phoneNumberStaticSelector: '.phone',
        birthdayStaticSelector: '.birthday',
        birthdayTextSelector: '.birthday span'
    });

    this.showEditPatientDialog = function (e) {
        e.preventDefault();

        this.trigger('showEditPatientFormDialog', this.getBasicInfo());
    };

    this.getBasicInfo = function () {
        var $editButton = this.select('editPatientButtonSelector');

        this.clientId = $editButton.data('clientId');
        this.patientId = $editButton.data('patientId');
        this.originalEmail = this.select('emailStaticSelector').text().trim();
        this.originalPhoneNumber = this.select('phoneNumberStaticSelector').text().trim();

        return {
            clientId: this.clientId,
            patientId: this.patientId,
            identify: this.select('patientIdStaticSelector').text().trim(),
            firstName: this.select('firstNameStaticSelector').text().trim(),
            lastName: this.select('lastNameStaticSelector').text().trim(),
            email: this.originalEmail,
            emailStatus: this.select('emailStatusSelector').attr("value"),
            phoneNumber: this.select('phoneNumberStaticSelector').text().trim(),
            accountIsAdmin: this.$node.data('accountIsAdmin'),
            birthday: this.select('birthdayTextSelector').text().trim()
        };
    };

    this.showAddEmailDialog = function (e) {
        e.preventDefault();

        this.trigger('showAddEmailDialog', this.getBasicInfo());
    };

    this.showAddPhoneNumberDialog = function (e) {
        e.preventDefault();

        this.trigger('showAddPhoneNumberDialog', this.getBasicInfo());
    };

    this.closePage = function (e) {
        e.preventDefault();

        window.location.href = URLs.PAGE_PATIENTS;
    };

    this.inviteAgain = function () {
        var patientId = this.select('inviteAgainButtonSelector').data('patientId');

        $.ajax({
            url: URLs.INVITE_PATIENT.format(patientId),
            success: function (data) {
                if (data === "true") {
                    Notifications.showFadeOutMsg(STRINGs.INVITE_EMAIL_SUCCESS);
                }
            }
        });

        this.trigger('patientEmailInvited');
    };

    this.onPatientUpdatedSuccess = function (e, data) {
        this.select('patientIdStaticSelector').text(data.id);
        this.select('firstNameStaticSelector').text(data.firstName);
        this.select('lastNameStaticSelector').text(data.lastName);
        this.select('emailStaticSelector').text(data.email ? data.email.toLowerCase() : '');

        this.updatePhoneNumber(data.number);
        this.updateEmailStatus(data.email);
        this.updateBirthday(Utility.toBirthday(data.birthday, 'MM/DD/YYYY'));
    };

    this.updatePhoneNumber = function (number) {
        var $addPhoneNumber = this.select('addPhoneNumberButtonSelector');
        var $phoneNumberStatic = this.select('phoneNumberStaticSelector');

        if (this.originalPhoneNumber !== number) {
            if (number === '') {
                this.trigger('phoneNumberUpdated', {
                    blank: true
                });

                $addPhoneNumber.show();
            } else {
                this.trigger('phoneNumberUpdated', {
                    blank: false
                });

                $addPhoneNumber.hide();
            }

            $phoneNumberStatic.text(number);
        }
    };

    this.updateBirthday = function (birthday) {
        var $birthday = this.select('birthdayStaticSelector');
        var $birthdayText = this.select('birthdayTextSelector');

        if (birthday) {
            $birthdayText.text(birthday);
            $birthday.css('display', 'inline-block');
        } else {
            $birthdayText.text('');
            $birthday.css('display', 'none');
        }
    };

    this.updateEmailStatus = function (currentEmail) {
        var $addEmail = this.select('addEmailButtonSelector');
        var $emailStatus = this.select('emailStatusLabelSelector');
        var $inviteContainer = this.select('inviteAgainContainerSelector');

        if (this.originalEmail !== currentEmail) {
            if (currentEmail === '') {
                $inviteContainer.css('display', 'none');
                $addEmail.show();

                this.trigger('emailStatusUpdated', {
                    blank: true
                });

                $emailStatus.hide();
            } else {
                $inviteContainer.css('display', 'inline-block');
                $addEmail.hide();

                this.trigger('emailStatusUpdated', {
                    blank: false
                });

                $emailStatus
                    .attr('class', '')
                    .addClass('email-status unverified')
                    .text('Unverified')
                    .show();
            }
        }
    };

    this.onPatientInfoRequest = function () {
        this.trigger('patientInfoServed', this.getBasicInfo());
    };

    this.onPatientDeleteSuccess = function () {
        window.location.href = URLs.PAGE_PATIENTS;
    };

    this.onPhoneNumberStatusFeedback = function () {
        this.trigger('feedbackPhoneNumberStatus', {
            blank: !this.select('phoneNumberStaticSelector').text().trim()
        });
    };

    this.after('initialize', function () {
        this.on(document, 'updatePatientSuccess', this.onPatientUpdatedSuccess);
        this.on(document, 'addEmailSuccess', this.onPatientUpdatedSuccess);
        this.on(document, 'addPhoneNumberSuccess', this.onPatientUpdatedSuccess);
        this.on(document, 'patientInfoRequest', this.onPatientInfoRequest);
        this.on(document, 'deletePatientSuccess', this.onPatientDeleteSuccess);
        this.on(document, 'getPhoneNumberStatusFromPatientInfo', this.onPhoneNumberStatusFeedback);

        this.on('click', {
            editPatientButtonSelector: this.showEditPatientDialog,
            addEmailButtonSelector: this.showAddEmailDialog,
            addPhoneNumberButtonSelector: this.showAddPhoneNumberDialog,
            closePageButtonSelector: this.closePage,
            inviteAgainButtonSelector: this.inviteAgain
        });
    });
}

module.exports = flight.component(PatientInfoSection);