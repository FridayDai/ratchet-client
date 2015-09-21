var flight = require('flight');
var URLs = require('../../../constants/Urls');
var STRINGs = require('../../../constants/Strings');
var Notifications = require('../../common/Notification');

function PatientInfoSection() {
    this.attributes({
        editPatientButtonSelector: '.btn-edit-patient',
        closePageButtonSelector: '.btn-close',
        inviteAgainButtonSelector: '.invite-patient',
        inviteAgainContainerSelector: '.div-invite',
        addEmailButtonSelector: '.add-email',
        emailStatusLabelSelector: '.email-status',

        patientIdStaticSelector: '.identify',
        firstNameStaticSelector: '.first-name',
        lastNameStaticSelector: '.last-name',
        emailStaticSelector: '#patientEmail',
        phoneNumberStaticSelector: '.phone'
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

        return {
            clientId: this.clientId,
            patientId: this.patientId,
            identify: this.select('patientIdStaticSelector').text().trim(),
            firstName: this.select('firstNameStaticSelector').text().trim(),
            lastName: this.select('lastNameStaticSelector').text().trim(),
            email: this.originalEmail,
            phoneNumber: this.select('phoneNumberStaticSelector').text().trim()
        };
    };

    this.showAddEmailDialog = function (e) {
        e.preventDefault();

        this.trigger('showAddEmailDialog', this.getBasicInfo());
    };

    this.closePage = function (e) {
        e.preventDefault();

        window.location.href = "/patients";
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
    };

    this.onPatientUpdatedSuccess = function (e, data) {
        this.select('patientIdStaticSelector').text(data.identify);
        this.select('firstNameStaticSelector').text(data.firstName);
        this.select('lastNameStaticSelector').text(data.lastName);
        this.select('emailStaticSelector').text(data.email ? data.email.toLowerCase() : '');
        this.select('phoneNumberStaticSelector').text(data.number);

        this.updateEmailStatus(data.email);
    };

    this.updateEmailStatus = function (currentEmail) {
        var $addEmail = this.select('addEmailButtonSelector');
        var $emailStatus = this.select('emailStatusLabelSelector');
        var $inviteContainer = this.select('inviteAgainContainerSelector');

        if (this.originalEmail !== currentEmail) {
            if (currentEmail === '') {
                $inviteContainer.css('display', 'none');
                this.trigger('emailStatusUpdated', {
                    blank: true
                });

                $addEmail.show();

                $emailStatus.hide();
            } else {
                $inviteContainer.css('display', 'inline-block');

                this.trigger('emailStatusUpdated', {
                    blank: false
                });

                $addEmail.hide();

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

    this.after('initialize', function () {
        this.on(document, 'updatePatientSuccess', this.onPatientUpdatedSuccess);
        this.on(document, 'addEmailSuccess', this.onPatientUpdatedSuccess);
        this.on(document, 'patientInfoRequest', this.onPatientInfoRequest);

        this.on('click', {
            editPatientButtonSelector: this.showEditPatientDialog,
            addEmailButtonSelector: this.showAddEmailDialog,
            closePageButtonSelector: this.closePage,
            inviteAgainButtonSelector: this.inviteAgain
        });
    });
}

module.exports = flight.component(PatientInfoSection);