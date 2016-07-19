var flight = require('flight');
var WithFormDialog = require('../common/WithFormDialog');
var URLs = require('../../constants/Urls');
var PARAMs = require('../../constants/Params');
var Utility = require('../../utils/Utility');
var Notifications = require('../common/Notification');
var STRINGs = require('../../constants/Strings');
var EmptyEmailConfirmation = require('../shared/components/EmptyEmailConfirmation');
var WithCaregiverFieldRequired = require('../shared/functional/WithCaregiverFieldRequired');
var PhoneNumberValidation = require('../shared/validation/PhoneNumberValidation');
var PatientEmailValidation = require('../shared/validation/PatientEmailValidation');
var ComboboxInputValidation = require('../shared/validation/ComboboxInputValidation');
var PatientBirthdayValidation = require('../shared/validation/PatientBirthdayValidation');

var NewPatientPhoneInputField = require('../shared/components/PatientPhoneInputField');
var NewPatientRelationshipCombobox = require('../shared/components/PatientRelationshipCombobox');
var NewPatientGroupCombobox = require('../shared/components/PatientGroupCombobox');
var NewPatientProviderCombobox = require('../shared/components/PatientProviderCombobox');
var NewPatientTreatmentCombobox = require('../shared/components/PatientTreatmentCombobox');
var NewPatientAbsoluteEventDate = require('../shared/components/PatientAbsoluteEventDate');
var NewPatientBirthday = require('../shared/components/PatientBirthday');
var NewPatientGenderCombobox = require('../shared/components/PatientGenderCombobox');

function NewPatientFormDialog() {
    this.attributes({
        hiddenIdSelector: '#hidden-id',

        firstNameFieldSelector: '#firstName',
        lastNameFieldSelector: '#lastName',
        phoneNumberFieldSelector: '#phoneNumber',
        emailFieldSelector: '#email',
        declineFieldSelector: '#emailStatus',
        declineBlockSelector: '.decline',
        groupFieldSelector: '#selectGroup',
        providerFieldSelector: '#selectStaffs',
        treatmentFieldSelector: '#selectTreatment',
        eventTimeFieldSelector: '#eventTime',
        birthdayFieldSelector: '#birthday',
        genderFieldSelector: '#gender',

        basicEditButtonSelector: 'a.form-group-edit',
        caregiverRelationshipFieldSelector: '#relationship',
        caregiverFirstNameFieldSelector: '#caregiver-firstName',
        caregiverPermissionFirstNameSelector: '#ec-first-name',

        patientIdStaticSelector: '#patient-id-value',
        firstNameStaticSelector: '#firstName-static',
        lastNameStaticSelector: '#lastName-static',
        phoneNumberStaticSelector: '#phoneNumber-static',
        emailStaticSelector: '#email-static',
        birthdayStaticSelector: '#birthday-static',
        genderStaticSelector: '#gender-static',

        eventDateFormGroupSelector: '#div-event-time',

        relationshipSelectEvent: 'newPatientRelationshipSelected',
        relationshipClearEvent: 'newPatientRelationshipCleared'
    });

    this.options({
        title: 'NEW PATIENT',
        width: 630,
        buttons: ['Save']
    });

    this.children({
        phoneNumberFieldSelector: NewPatientPhoneInputField,
        birthdayFieldSelector: NewPatientBirthday,
        genderFieldSelector: {
            child: NewPatientGenderCombobox,
            attributes: {
                selectEvent: 'patientGenderSelected',
                clearEvent: 'patientGenderClear',
                resetEvent: 'newPatientReset'
            }
        },
        caregiverRelationshipFieldSelector: {
            child: NewPatientRelationshipCombobox,
            attributes: {
                selectEvent: 'newPatientRelationshipSelected',
                clearEvent: 'newPatientRelationshipCleared',
                resetEvent: 'newPatientReset'
            }
        },
        groupFieldSelector: {
            child: NewPatientGroupCombobox,
            attributes: {
                selectEvent: 'patientGroupSelected',
                clearEvent: 'patientGroupClear',
                resetEvent: 'newPatientReset'
            }
        },
        providerFieldSelector: {
            child: NewPatientProviderCombobox,
            attributes: {
                groupSelectEvent: 'patientGroupSelected',
                groupClearEvent: 'patientGroupClear',
                resetEvent: 'newPatientReset'
            }
        },
        treatmentFieldSelector: {
            child: NewPatientTreatmentCombobox,
            attributes: {
                groupSelectEvent: 'patientGroupSelected',
                groupClearEvent: 'patientGroupClear',
                selectEvent: 'newPatientTreatmentSelected',
                clearEvent: 'newPatientTreatmentClear',
                resetEvent: 'newPatientReset'
            }
        },
        eventTimeFieldSelector: {
            child: NewPatientAbsoluteEventDate,
            attributes: {
                groupSelectEvent: 'patientGroupSelected',
                groupClearEvent: 'patientGroupClear',
                treatmentSelectEvent: 'newPatientTreatmentSelected',
                treatmentClearEvent: 'newPatientTreatmentClear',
                resetEvent: 'newPatientReset'
            }
        }
    });

    this.initValidation = function () {
        return [
            PhoneNumberValidation.get(),
            PatientEmailValidation.get(),
            PatientBirthdayValidation.get(),
            ComboboxInputValidation.get()
        ];
    };

    this.onShow = function (e, data) {
        this.$node.removeClass('ui-hidden');
        this.prepareToShow(data);
        this.show();
    };

    this.prepareToShow = function (data) {
        if (data.check !== 'false') {
            this.setPatientExisting(data);
            this.select('patientIdStaticSelector').text(data.patientId);
        } else {
            this.setPatientNotExisting();
            this.select('patientIdStaticSelector').text(data.identify);
        }

        this.select('eventDateFormGroupSelector').hide();
    };

    this.setPatientExisting = function (data) {
        this.select('hiddenIdSelector').val(data.id);
        this.toggleBasicFields(true);
        this.setBasicInfo(data);
    };

    this.setPatientNotExisting = function () {
        this.select('hiddenIdSelector').val('');
        this.toggleBasicFields(false);
    };

    this.toggleBasicFields = function (isExisting) {
        var basicFields = [
            'firstNameFieldSelector',
            'lastNameFieldSelector',
            'emailFieldSelector',
            'birthdayFieldSelector'
        ];

        this.select('declineFieldSelector').prop({'checked': false, 'disabled': false});

        _.each(basicFields, function (selector) {
            var $selector = this.select(selector);

            if (!isExisting) {
                $selector.removeAttr('disabled').show();
            } else {
                $selector.attr('disabled', 'disabled').hide();
            }
        }, this);

        var complexFields = [
            'phoneNumberFieldSelector',
            'genderFieldSelector'
        ];

        _.each(complexFields, function (selector) {
            var $selector = this.select(selector);

            if (!isExisting) {
                $selector
                    .removeAttr('disabled')
                    .parent()
                    .show();
            } else {
                $selector.attr('disabled', 'disabled')
                    .parent()
                    .hide();
            }
        }, this);

        var baseStatics = [
            'firstNameStaticSelector',
            'lastNameStaticSelector',
            'phoneNumberStaticSelector',
            'emailStaticSelector',
            'birthdayStaticSelector',
            'genderStaticSelector'
        ];

        _.each(baseStatics, function (selector) {
            var $selector = this.select(selector);
            var $editButton = $selector.siblings('a.form-group-edit');

            if (!isExisting) {
                $selector.hide();
                $editButton.hide();
            } else {
                $selector.show();
                $editButton.show();
            }
        }, this);
    };

    this.showBasicField = function (e) {
        e.preventDefault();

        var $editButton = $(e.target);
        var $static = $editButton.prev();
        var $inputField = $static.prev();

        if ($inputField.is(':visible')) {
            return;
        }

        $static.hide();
        $inputField.show();

        if (!$inputField.is('input')) {
            $inputField = $inputField.find('input');
        }

        if($inputField.get(0).id === 'gender' && $static.text()) {
            var gender = $static.text().toLowerCase();

            $inputField.removeAttr('disabled')
                .val($static.text())
                .data('ui-autocomplete')
                ._trigger('select', 'autocompleteselect', {
                    item: {
                        label: _.capitalize(gender),
                        value: gender.toUpperCase(),
                        iconClass: 'gender-{0}'.format(gender)
                    }
                });
        }  else {
            $inputField.removeAttr('disabled').val($static.text());
        }
    };

    this.setBasicInfo = function (data) {
        this.select('firstNameStaticSelector').text(data.firstName);
        this.select('lastNameStaticSelector').text(data.lastName);
        this.select('emailStaticSelector').text(data.email === null ? '' : data.email);
        if (PARAMs.EMAIL_STATUS[data.status] === 'DECLINED') {
            //this.select('declineFieldSelector').prop({'checked': true, 'disabled': true});
            this.select('declineBlockSelector').html(
                '<i class="fa fa-ban edit-decline" aria-hidden="true"></i>' +
                '<label for="emailStatus" class="decline-msg">' +
                '<span>Patient declined to communicate via email.</span>' +
                '<span class="warn-msg">(Warning: This cannot be undone.)</span>' +
                '</label>'
            );
        } else {
            this.select('declineBlockSelector').html(
                '<input id="emailStatus" name="emailStatus" type="checkbox" value="decline">' +
                '<label for="emailStatus" class="decline-msg">' +
                '<span>Patient declined to communicate via email.</span>' +
                '<span class="warn-msg">(Warning: This cannot be undone.)</span>' +
                '</label>'
            );
            this.select('declineFieldSelector').prop({'checked': false, 'disabled': false});
        }

        this.select('phoneNumberStaticSelector').text(data.phoneNumber);

        var subNumber,
            phoneNumber,
            num = data.phoneNumber,
            gender = data.gender ? data.gender.toLowerCase() : '';

        if (num) {
            if (num.charAt(0) === '1') {
                subNumber = num.slice(1, num.length);
                phoneNumber = subNumber.replace(/(\d{3})(?=\d{2,}$)/g, '$1-');
                phoneNumber = '1 ' + phoneNumber;
            } else {
                phoneNumber = num.replace(/(\d{3})(\d{3})/, "($1) $2-");
            }
        } else {
            phoneNumber = '';
        }

        this.select('phoneNumberStaticSelector').text(phoneNumber);

        this.select('birthdayStaticSelector').text(Utility.parseBirthday(data.birthday));

        if(gender) {
            this.select('genderStaticSelector').text(gender).addClass(gender);
        } else {
            this.select('genderStaticSelector')
                .text(gender)
                .removeClass(function (index, name) {
                    return (name.match(/\s+.*male/) || []).join('');
                });
        }
    };

    this.onClose = function () {
        this.select('caregiverPermissionFirstNameSelector').empty();

        this.trigger('newPatientReset');
    };

    this.isEmailFieldBlank = function () {
        var $email = this.select('emailFieldSelector');

        return $email.is(':visible') && $email.val() === '';
    };

    this.isDeclined = function () {
        return this.select('declineFieldSelector').prop('checked');
    };

    this.beforeSubmitForm = function () {
        var $firstNameStatic = this.select('firstNameStaticSelector'),
            $lastNameStatic = this.select('lastNameStaticSelector'),
            $birthdayStatic = this.select('birthdayStaticSelector'),
            isValid = true,
            firstInValid = null;

        _.each([$firstNameStatic, $lastNameStatic, $birthdayStatic], function ($item) {
            if ($item.is(':visible') && !$item.text().trim()) {
                $item.siblings('.icon-edit').trigger('click');
                isValid = false;

                if (!firstInValid) {
                    firstInValid = $item;
                }
            }
        });

        if (!isValid) {
            this.formEl.valid();
            firstInValid.siblings('input').focus();
            return false;
        }
    };

    this.setExtraData = function () {
        var $phoneNumber = this.select('phoneNumberFieldSelector'),
            $phoneNumberStatic = this.select('phoneNumberStaticSelector'),
            phoneNumber = $phoneNumber.val() || $phoneNumberStatic.text(),
            $firstNameStatic = this.select('firstNameStaticSelector'),
            $lastNameStatic = this.select('lastNameStaticSelector'),
            $EmailStatic = this.select('emailStaticSelector'),
            $birthdayStatic = this.select('birthdayStaticSelector'),
            $relationship = this.select('caregiverRelationshipFieldSelector'),
            relationshipId = $relationship.data('id'),
            $group = this.select('groupFieldSelector'),
            groupId = $group.data('id'),
            $provider = this.select('providerFieldSelector'),
            providerId = $provider.data('id'),
            $treatment = this.select('treatmentFieldSelector'),
            treatmentId = $treatment.data('id'),
            $eventTime = this.select('eventTimeFieldSelector'),
            $birthday = this.select('birthdayFieldSelector'),
            $gender = this.select('genderFieldSelector').val();

        var result = {
            patientId: this.select('patientIdStaticSelector').text(),
            phoneNumber: phoneNumber.replace(/[\s\(\)-]/g, ''),
            relationship: relationshipId,
            groupId: groupId,
            staffId: providerId,
            treatmentId: treatmentId,
            profilePhoto: '',
            birthdayValue: Utility.toBirthday($birthday.val()),
            genderValue: Utility.toGender($gender)
        };

        if ($firstNameStatic.is(':visible')) {
            result.firstName = $firstNameStatic.text();
        }

        if ($lastNameStatic.is(':visible')) {
            result.lastName = $lastNameStatic.text();
        }

        if ($EmailStatic.is(':visible')) {
            result.email = $EmailStatic.text();
        }

        if ($birthdayStatic.is(':visible')) {
            result.birthdayValue = Utility.toBirthday($birthdayStatic.text());
        }

        if ($eventTime.is(':visible')) {
            result.absoluteEventTimestamp = Utility.toVancouverDateTime($eventTime.val());
        }

        return result;
    };

    this.onDeclineEmailClicked = function (e) {
        var declineButton = $(e.target);

        if (declineButton.prop("checked") === true) {
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

    this.onAddPatientSuccess = function (e, data) {
        this.trigger('refreshPatientsTable', {
            callback: function () {
                window.location.href = URLs.PAGE_PATIENT_DETAIL.format(data.id);
            }
        });
    };

    this.onCaregiverFirstNameInput = function () {
        this.select('caregiverPermissionFirstNameSelector')
            .text(this.select('caregiverFirstNameFieldSelector').val());
    };

    this.after('initialize', function () {
        this.on('dialogclose', this.onClose);
        this.on('formSuccess', this.onAddPatientSuccess);

        this.on('click', {
            'basicEditButtonSelector': this.showBasicField
        });
        this.on('click', {
            declineFieldSelector: this.onDeclineEmailClicked
        });

        this.on('input', {
            caregiverFirstNameFieldSelector: this.onCaregiverFirstNameInput
        });
    });
}

module.exports = flight.component(
    WithFormDialog,
    EmptyEmailConfirmation,
    WithCaregiverFieldRequired,
    NewPatientFormDialog
);
