var flight = require('flight');
var URLs = require('../../../constants/Urls');
var STRINGs = require('../../../constants/Strings');
var Notifications = require('../../common/Notification');
var Utility = require('../../../utils/Utility');
var PARAMs = require('../../../constants/Params');

var STATUS_MAPPING = {
    'UNVERIFIED': ['email-state-icon-unverified', 'UNVERIFIED'],
    'DECLINED': ['email-state-icon-declined', 'DECLINED']
};

function PatientInfoSection() {
    this.attributes({
        editPatientButtonSelector: '.btn-edit-patient',
        closePageButtonSelector: '.btn-close',
        inviteAgainButtonSelector: '.invite-patient',
        inviteAgainContainerSelector: '.div-invite',
        addEmailButtonSelector: '.add-email',
        addPhoneNumberButtonSelector: '.add-phone-number',
        emailStatusLabelSelector: '.email-state',
        emailStatusLabelIconSelector: '.email-state-icon',

        patientIdStaticSelector: '.identify',
        firstNameStaticSelector: '.first-name',
        lastNameStaticSelector: '.last-name',
        emailStaticSelector: '#patientEmail',
        declineBlockFieldSelector: '.decline',
        declineFieldSelector: '#emailStatus',
        phoneNumberStaticSelector: '.phone',
        birthdayStaticSelector: '.birthday',
        birthdayTextSelector: '.birthday span',
        genderHeaderSelector: '#header-portrait'
    });

    this.showEditPatientDialog = function (e) {
        e.preventDefault();

        this.triggerEditPatientDialog();
    };

    this.triggerEditPatientDialog = function () {
        this.trigger('showEditPatientFormDialog', this.getBasicInfo());
    };

    this.getBasicInfo = function () {
        var $editButton = this.select('editPatientButtonSelector');

        this.clientId = $editButton.data('clientId');
        this.patientId = $editButton.data('patientId');
        this.status = $editButton.data('emailStatus');
        this.gender = $editButton.data('gender');
        this.originalEmail = this.select('emailStaticSelector').text().trim();
        this.originalPhoneNumber = this.select('phoneNumberStaticSelector').text().trim();

        return {
            clientId: this.clientId,
            patientId: this.patientId,
            identify: this.select('patientIdStaticSelector').text().trim(),
            firstName: this.select('firstNameStaticSelector').text().trim(),
            lastName: this.select('lastNameStaticSelector').text().trim(),
            email: this.originalEmail,
            emailStatus: this.status,
            emailState: this.select('emailStatusLabelSelector').text().trim(),
            phoneNumber: this.select('phoneNumberStaticSelector').text().trim(),
            accountIsAdmin: this.$node.data('accountIsAdmin'),
            birthday: this.select('birthdayTextSelector').text().trim(),
            gender: this.gender
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

        this.updateGender(data.gender);
        this.updatePhoneNumber(data.number);
        this.updateEmailStatus(data.email, data.isDeclined);
        this.updateBirthday(Utility.toBirthday(data.birthday, 'MM/DD/YYYY'));
    };

    this.updateGender = function(gender) {
        this.select('genderHeaderSelector')
            .removeClass()
            .addClass('portrait-{0}'.format(gender? gender.toLowerCase() :''));

        this.select('editPatientButtonSelector').data('gender', gender);
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

    this.updateEmailStatus = function (currentEmail, isDeclined) {
        var me = this;
        var $addEmail = this.select('addEmailButtonSelector');
        var $emailStatus = this.select('emailStatusLabelSelector');
        var $emailStatusIcon = this.select('emailStatusLabelIconSelector');
        var $inviteContainer = this.select('inviteAgainContainerSelector');

        var status = $emailStatus.data('emailStatus');

        function updateEmailAddress() {
            if($emailStatus.text() === 'NOT INVITED') {
                $emailStatusIcon.hide();
                $emailStatus.text('NOT INVITED').show();
                $inviteContainer.css('display', 'none');
                $addEmail.hide();
            } else {
                $inviteContainer.css('display', 'inline-block');
                $addEmail.hide();

                me.trigger('emailStatusUpdated', {
                    blank: false
                });

                $emailStatusIcon.removeClass(function (index, css) {
                    return (css.match(/\bemail-state-icon-\S+/g) || []).join(' ');
                }).addClass(STATUS_MAPPING.UNVERIFIED[0]).show();
                $emailStatus.text(STATUS_MAPPING.UNVERIFIED[1]).show();
            }
        }

        if (PARAMs.EMAIL_STATUS[status] !== 'DECLINED') {
            if (isDeclined) {
                $emailStatus.data('emailStatus', 6);

                $emailStatusIcon.removeClass(function (index, css) {
                    return (css.match(/\bemail-state-icon-\S+/g) || []).join(' ');
                }).addClass(STATUS_MAPPING.DECLINED[0]).show();

                $emailStatus.text(STATUS_MAPPING.DECLINED[1]).show();
                $inviteContainer.css('display', 'none');
            } else if (this.originalEmail !== currentEmail) {
                if (currentEmail === '') {
                    $inviteContainer.css('display', 'none');
                    $addEmail.show();

                    this.trigger('emailStatusUpdated', {
                        blank: true
                    });

                    $emailStatusIcon.hide();
                    $emailStatus.hide();
                } else {
                    updateEmailAddress();
                }
            }
        } else {
            if (this.originalEmail !== currentEmail) {
                if (currentEmail === '') {
                    $addEmail.show();

                    this.trigger('emailStatusUpdated', {
                        blank: true
                    });
                } else {
                    $addEmail.hide();

                    this.trigger('emailStatusUpdated', {
                        blank: false
                    });
                }
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
        this.on(document, 'triggerEditPatientFormDialog', this.triggerEditPatientDialog);

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
