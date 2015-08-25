var flight = require('flight');
var libPhoneNumber = require('libphonenumber');
var WithFormDialog = require('../common/WithFormDialog');
var WithChildren = require('../common/WithChildren');
var STRINGs = require('../../constants/Strings');
var URLs = require('../../constants/Urls');
var Utility = require('../../utils/Utility');
var Notifications = require('../common/Notification');

var NewPatientPhoneInputField = require('./NewPatientPhoneInputField');
var NewPatientRelationshipCombobox = require('./NewPatientRelationshipCombobox');
var NewPatientGroupCombobox = require('./NewPatientGroupCombobox');
var NewPatientProviderCombobox = require('./NewPatientProviderCombobox');
var NewPatientTreatmentCombobox = require('./NewPatientTreatmentCombobox');
var NewPatientSurgeryDate = require('./NewPatientSurgeryDate');

function NewPatientFormDialog() {
    this.attributes({
        formSelector: '.',
        hiddenIdSelector: '#hidden-id',

        firstNameFieldSelector: '#firstName',
        lastNameFieldSelector: '#lastName',
        phoneNumberFieldSelector: '#phoneNumber',
        emailFieldSelector: '#email',
        groupFieldSelector: '#selectGroup',
        providerFieldSelector: '#selectStaffs',
        treatmentFieldSelector: '#selectTreatment',
        surgeryTimeFieldSelector: '#surgeryTime',

        inputFieldSelector: '.form-group input',
        basicEditButtonSelector: 'a.form-group-edit',
        emergencyContactFirstNameFieldSelector: '#emergency-firstName',
        emergencyContactFieldSelector: '.emergency-field',
        emergencyContactRequiredMarkSelector: '.emergency-required',
        emergencyContactPermissionSelector: '.permission-confirm',
        emergencyContactPermissionCheckSelector: '.permission-confirm-check',
        emergencyContactPermissionFirstNameSelector: '#ec-first-name',
        emergencyContactRelationshipFieldSelector: '#relationship',

        patientIdStaticSelector: '#patient-id-value',
        firstNameStaticSelector: '#firstName-static',
        lastNameStaticSelector: '#lastName-static',
        phoneNumberStaticSelector: '#phoneNumber-static',
        emailStaticSelector: '#email-static'
    });

    this.children({
        phoneNumberFieldSelector: NewPatientPhoneInputField,
        emergencyContactRelationshipFieldSelector: NewPatientRelationshipCombobox,
        groupFieldSelector: NewPatientGroupCombobox,
        providerFieldSelector: NewPatientProviderCombobox,
        treatmentFieldSelector: NewPatientTreatmentCombobox,
        surgeryTimeFieldSelector: NewPatientSurgeryDate
    });

    this.options({
        title: 'NEW PATIENT',
        width: 620,
        buttons: ['Save']
    });

    this.initValidation = function () {
        $.validator.addMethod('phoneNumberCheck', function (value, element) {
            var tel = /^[0-9\-\(\)\s]+$/;
            return this.optional(element) || (tel.test(value));
        }, STRINGs.PHONE_NUMBER_INVALID);

        $.validator.addMethod('checkPhoneNumberRegion', function (value) {
            var phoneUtil = libPhoneNumber.PhoneNumberUtil.getInstance();
            var phoneNumber = phoneUtil.parse(value, 'US');
            var isPossible = phoneUtil.isPossibleNumber(phoneNumber);
            var isValid = phoneUtil.isValidNumber(phoneNumber);
            var regionCode = phoneUtil.getRegionCodeForNumber(phoneNumber);
            var isValidRegionCode = phoneUtil.isValidNumberForRegion(phoneNumber, 'US');
            return isPossible && isValid && regionCode && isValidRegionCode;
        }, STRINGs.PHONE_NUMBER_INVALID);

        return {
            rules: {
                phoneNumberVal: {
                    minlength: 14,
                    phoneNumberCheck: true,
                    checkPhoneNumberRegion: true
                },
                email: {
                    email: true,
                    remote: {
                        url: '/patients/check-email',
                        dropProcess: true
                    }
                }
            },
            messages: {
                phoneNumberVal: {
                    minlength: STRINGs.PHONE_NUMBER_INVALID
                },
                email: {
                    remote: STRINGs.EMAIL_EXISTING_INVALID
                }
            }
        };
    };

    this.beforeSubmitForm = function () {
        var me = this;

        if (this.isEmailFieldBlank()) {
            Notifications.confirm({
                title: 'NO EMAIL ADDRESS',
                message: [
                    'Patient without email address will not receive any automated task reminder.',
                    'Do you want to proceed?'
                ]
            }, {
                buttons: [
                    {
                        text: 'Yes',
                        'class': 'btn-agree',
                        click: function () {
                            // Warning dialog close
                            $(this).dialog("close");

                            // Bulk import dialog close
                            me.submitForm();
                        }
                    }, {
                        text: 'No',
                        click: function () {
                            $(this).dialog("close");
                        }
                    }
                ]
            });

            return false;
        }
    };

    this.isEmailFieldBlank = function () {
        var $email = this.select('emailFieldSelector');

        return $email.is(':visible') && $email.val() === '';
    };

    this.onShow = function (e, data) {
        this.$node.removeClass('ui-hidden');
        this.prepare(data);
        this.show();
    };

    this.prepare = function (data) {
        if (data.check !== 'false') {
            this.setPatientExisting(data);
        } else {
            this.setPatientNotExisting();
        }

        this.select('patientIdStaticSelector').text(data.patientId);
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
            'emailFieldSelector'
        ];

        _.each(basicFields, function (selector) {
            var $selector = this.select(selector);

            if (!isExisting) {
                $selector.removeAttr('disabled').show();
            } else {
                $selector.attr('disabled', 'disabled').hide();
            }
        }, this);

        var $phoneNumberField = this.select('phoneNumberFieldSelector');

        if (!isExisting) {
            $phoneNumberField.removeAttr('disabled');
            $phoneNumberField.parent().show();
        } else {
            $phoneNumberField.attr('disabled', 'disabled');
            $phoneNumberField.parent().hide();
        }

        var baseStatics = [
            'firstNameStaticSelector',
            'lastNameStaticSelector',
            'phoneNumberStaticSelector',
            'emailStaticSelector'
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

        $inputField.removeAttr('disabled').val($static.text());
    };

    this.setBasicInfo = function (data) {
        this.select('firstNameStaticSelector').text(data.firstName);
        this.select('lastNameStaticSelector').text(data.lastName);
        this.select('emailStaticSelector').text(data.email === null ? '' : data.email);

        this.select('phoneNumberStaticSelector').text(data.phoneNumber);

        var subNumber,
            phoneNumber,
            num = data.phoneNumber;

        if (num.charAt(0) === '1') {
            subNumber = num.slice(1, num.length);
            phoneNumber = subNumber.replace(/(\d{3})(?=\d{2,}$)/g, '$1-');
            phoneNumber = '1 ' + phoneNumber;
        } else {
            phoneNumber = num.replace(/(\d{3})(\d{3})/, "($1) $2-");
        }

        this.select('phoneNumberStaticSelector').text(phoneNumber);
    };

    this.onClose = function () {
        this.setEmergencyContactRequired(false);

        this.trigger('newPatientReset');
    };

    this.onInputFieldFocus = function (e) {
        var $element = $(e.target);

        $element
            .data('placeholder', $element.attr('placeholder'))
            .attr('placeholder', '');
    };

    this.onInputFieldBlur = function (e) {
        var $element = $(e.target);

        $element.attr('placeholder', $element.data('placeholder'));
    };

    this._emergencyContactRequired = false;
    this.onEmergencyContactFieldInput = function (e) {
        var $target = $(e.target);

        if ($target.val() !== '' && !this._emergencyContactRequired) {
            this.setEmergencyContactRequired(true);
        }

        if ($target.val() === '') {
            var isAllEmpty = _.every(this.select('emergencyContactFieldSelector'), function (element) {
                return $(element).val() === '';
            });

            if (isAllEmpty) {
                this.setEmergencyContactRequired(false);
            }
        }

        if ($target[0] === this.select('emergencyContactFirstNameFieldSelector')[0]) {
            this.select('emergencyContactPermissionFirstNameSelector').text($target.val());
        }
    };

    this.setEmergencyContactRequired = function (isRequired) {
        if (isRequired) {
            this._emergencyContactRequired = true;

            this.select('emergencyContactFieldSelector')
                .attr('required', true);

            this.select('emergencyContactPermissionSelector')
                .addClass('visible');

            this.select('emergencyContactPermissionCheckSelector')
                .attr('required', true);

            this.select('emergencyContactRequiredMarkSelector')
                .show();
        } else {
            this._emergencyContactRequired = false;

            this.select('emergencyContactFieldSelector')
                .attr('required', false);

            this.select('emergencyContactFieldSelector').valid();

            this.select('emergencyContactPermissionCheckSelector')
                .attr('required', false);
            this.select('emergencyContactPermissionCheckSelector').valid();

            this.select('emergencyContactPermissionSelector')
                .removeClass('visible');

            this.select('emergencyContactRequiredMarkSelector')
                .hide();
        }
    };

    this.setExtraData = function () {
        var $phoneNumber = this.select('phoneNumberFieldSelector');
        var $phoneNumberStatic = this.select('phoneNumberStaticSelector');
        var phoneNumber = $phoneNumber.val() || $phoneNumberStatic.text();
        var $firstNameStatic = this.select('firstNameStaticSelector');
        var $lastNameStatic = this.select('lastNameStaticSelector');
        var $EmailStatic = this.select('emailStaticSelector');
        var $relationship = this.select('emergencyContactRelationshipFieldSelector');
        var relationshipId = $relationship.data('id');
        var $group = this.select('groupFieldSelector');
        var groupId = $group.data('id');
        var $provider = this.select('providerFieldSelector');
        var providerId = $provider.data('id');
        var $treatment = this.select('treatmentFieldSelector');
        var treatmentId = $treatment.data('id');
        var $surgeryTime = this.select('surgeryTimeFieldSelector');
        var surgeryTime = Utility.toVancouverTime($surgeryTime.val());

        var result = {
            patientId: this.select('patientIdStaticSelector').text(),
            phoneNumber: phoneNumber.replace(/[\s\(\)-]/g, ''),
            relationship: relationshipId,
            groupId: groupId,
            staffId: providerId,
            treatmentId: treatmentId,
            surgeryTime: surgeryTime,
            profilePhoto: ''
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

        return result;
    };

    this.onAddPatientSuccess = function (e, data) {window.location.href = URLs.PAGE_PATIENT_DETAIL.format(data.id);
    };

    this.after('initialize', function () {
        this.on('newPatientRelationshipSelected', this.onEmergencyContactFieldInput);
        this.on('newPatientRelationshipCleared', this.onEmergencyContactFieldInput);

        this.on('dialogclose', this.onClose);
        this.on('formSuccess', this.onAddPatientSuccess);

        this.on('click', {
            'basicEditButtonSelector': this.showBasicField
        });

        this.on('input', {
            'emergencyContactFieldSelector': this.onEmergencyContactFieldInput
        });

        // TODO: can't use flight style to set focus and blur
        this.select('inputFieldSelector')
            .on('focus', this.onInputFieldFocus)
            .on('blur', this.onInputFieldBlur);
    });
}

module.exports = flight.component(WithChildren, WithFormDialog, NewPatientFormDialog);
