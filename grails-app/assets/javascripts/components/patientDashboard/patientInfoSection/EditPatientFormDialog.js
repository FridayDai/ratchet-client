var flight = require('flight');
var WithFormDialog = require('../../common/WithFormDialog');
var PhoneNumberValidation = require('../../shared/validation/PhoneNumberValidation');
var PatientEmailValidation = require('../../shared/validation/PatientEmailValidation');
var PatientIdentifyValidation = require('../../shared/validation/PatientIdentifyValidation');
var PatientBirthdayValidation = require('../../shared/validation/PatientBirthdayValidation');
var PARAMs = require('../../../constants/Params');
var EmptyEmailConfirmation = require('../../shared/components/EmptyEmailConfirmation');
var PatientPhoneInputField = require('../../shared/components/PatientPhoneInputField');
var PatientBirthday = require('../../shared/components/PatientBirthday');
var NewPatientGenderCombobox = require('../../shared/components/PatientGenderCombobox');
var Notifications = require('../../common/Notification');
var STRINGs = require('../../../constants/Strings');

var Utility = require('../../../utils/Utility');

var FOOTER_PANEL = [
    '<div class="dialog-footer-panel ui-dialog-content ui-widget-content">',
        '<a href="#" class="delete-patient-btn">Delete Patient</a>',
    '</div>'
].join('');

function EditPatientFormDialog() {
    this.attributes({
        identifyFieldSelector: '#identify',
        firstNameFieldSelector: '#firstName',
        lastNameFieldSelector: '#lastName',
        phoneNumberFieldSelector: '#phone',
        emailFieldSelector: '#email',
        declineBlockSelector: '.decline',
        declineFieldSelector: '#emailStatus',
        birthdayFieldSelector: '#birthday',
        genderFieldSelector: '#gender'
    });

    this.children({
        phoneNumberFieldSelector: PatientPhoneInputField,
        birthdayFieldSelector: PatientBirthday,
        genderFieldSelector: {
            child: NewPatientGenderCombobox,
            attributes: {
                selectEvent: 'patientGenderSelected',
                clearEvent: 'patientGenderClear',
                resetEvent: 'editPatientReset'
            }
        }
    });

    this.options({
        title: 'EDIT PATIENT',
        width: 630,
        buttons: ['Save']
    });

    this.onShow = function (e, data) {
        this.$node.removeClass('ui-hidden');
        this.prepareForShow(data);
        this.show();
    };

    this.footerRendered = false;

    this.prepareForShow = function (data) {
        var me = this;

        this.select('identifyFieldSelector').val(data.identify);
        this.select('firstNameFieldSelector').val(data.firstName);
        this.select('lastNameFieldSelector').val(data.lastName);
        this.select('phoneNumberFieldSelector').intlTelInput('setNumber', data.phoneNumber);
        this.select('emailFieldSelector').val(data.email);
        this.select('birthdayFieldSelector').val(data.birthday);

        if(data.gender && Utility.toGender(data.gender)) {
            var gender = data.gender.toLowerCase();

            this.select('genderFieldSelector')
                .val(gender)
                .data('ui-autocomplete')
                ._trigger('select', 'autocompleteselect', {
                    item: {
                        label: _.capitalize(gender),
                        value: gender.toUpperCase(),
                        iconClass: 'gender-{0}'.format(gender)
                    }
                });
        }

        if(PARAMs.EMAIL_STATUS[data.emailStatus] === 'DECLINED' || data.emailState === "DECLINED") {
            this.select('declineBlockSelector').html(
                '<i class="fa fa-ban edit-decline" aria-hidden="true"></i>' +
                '<label for="emailStatus" class="decline-msg">' +
                    '<span>Patient declined to communicate via email.</span>' +
                    '<span class="warn-msg">(Warning: This cannot be undone.)</span>' +
                '</label>'
            );
        }

        this.patientId = data.patientId;
        this.clientId = data.clientId;

        if (!this.footerRendered && data.accountIsAdmin) {
            this.footerRendered = true;

            $(FOOTER_PANEL)
                .find('.delete-patient-btn')
                .click(_.bind(me.onDeletePatientClicked, me))
                .end()
                .appendTo(this.$node.parent());
        }
    };

    this.onDeletePatientClicked = function (e) {
        e.preventDefault();

        this.trigger('showDeletePatientDialog');

        this.close();
    };

    this.onDeclineEmailClicked = function (e) {
        var declineButton = $(e.target);

        if (declineButton.prop("checked") === true ){
            Notifications.confirm({
                title: STRINGs.DECLINE_TITLE,
                message: STRINGs.DECLINE_MESSAGE
            }, {
                buttons: [
                    {
                        text: 'Yes',
                        'class': 'btn-agree',
                        click: function () {
                            $(this).dialog("close");

                            declineButton.prop("checked", true);
                        }
                    }, {
                        text: 'Cancel',
                        click: function () {
                            declineButton.prop("checked", false);
                            $(this).dialog("close");
                        }
                    }
                ]
            });
        }
    };

    this.initValidation = function () {
        return [
            PatientIdentifyValidation.get(),
            PhoneNumberValidation.get(),
            PatientEmailValidation.get(),
            PatientBirthdayValidation.get()
        ];
    };

    this.onClose = function () {
        this.trigger('patientGenderClear');
    };

    this.setExtraData = function () {
        var rawNumber = this.select('phoneNumberFieldSelector').val();
        var phoneNumber = rawNumber.replace(/[\s\(\)-]/g, '');
        var birthday = this.select('birthdayFieldSelector').val();
        var $gender = this.select('genderFieldSelector').val();


        return {
            patientId: this.patientId,
            id: this.select('identifyFieldSelector').val(),
            phoneNumber: phoneNumber,
            clientId: this.clientId,
            birthdayValue: Utility.toBirthday(birthday),
            genderValue: Utility.toGender($gender)
        };
    };

    this.onEditPatientSuccess = function () {
        var rawNumber = this.select('phoneNumberFieldSelector').val();
        var phoneNumber = rawNumber.replace(/[\s\(\)-]/g, '');

        this.trigger('updatePatientSuccess', {
            patientId: this.patientId,
            id: this.select('identifyFieldSelector').val(),
            firstName: this.select('firstNameFieldSelector').val(),
            lastName: this.select('lastNameFieldSelector').val(),
            email: this.select('emailFieldSelector').val(),
            isDeclined: this.select('declineFieldSelector').prop('checked'),
            number: rawNumber,
            phoneNumber: phoneNumber,
            clientId: this.clientId,
            birthday: this.select('birthdayFieldSelector').val(),
            gender: this.select('genderFieldSelector').val().toUpperCase()
        });
    };

    this.after('initialize', function () {
        this.on('dialogclose', this.onClose);
        this.on('formSuccess', this.onEditPatientSuccess);
        this.on('click', {
            declineFieldSelector: this.onDeclineEmailClicked
        });
    });

    this.before('teardown', function () {
        this.$node.parent()
            .find('.delete-patient-btn')
            .off('click');
    });
}

module.exports = flight.component(
    WithFormDialog,
    EmptyEmailConfirmation,
    EditPatientFormDialog
);
