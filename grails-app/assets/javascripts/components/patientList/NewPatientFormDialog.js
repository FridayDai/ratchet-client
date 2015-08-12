var flight = require('flight');
var WithFormDialog = require('../common/WithFormDialog');
var STRINGS = require('../../constants/Strings');

var NewPatientPhoneInputField = require('./NewPatientPhoneInputField');
var NewPatientRelationshipCombobox = require('./NewPatientRelationshipCombobox');
var NewPatientGroupCombobox = require('./NewPatientGroupCombobox');
var NewPatientProviderCombobox = require('./NewPatientProviderCombobox');
var NewPatientTreatmentCombobox = require('./NewPatientTreatmentCombobox');
var NewPatientSurgeryDate = require('./NewPatientSurgeryDate');

NewPatientPhoneInputField.attachTo('#phoneNumber');
NewPatientRelationshipCombobox.attachTo('#relationship');
NewPatientGroupCombobox.attachTo('#selectGroup');
NewPatientProviderCombobox.attachTo('#selectStaffs');
NewPatientTreatmentCombobox.attachTo('#selectTreatment');
NewPatientSurgeryDate.attachTo('#surgeryTime');

// TODO: need to think: how to compose element

var PATIENT_STATUS = [
    'NOT_EXISTING',
    'EXISTING'
];

function NewPatientFormDialog() {
    this.attributes({
        formSelector: '.',
        hiddenIdSelector: '#hidden-id',

        firstNameFieldSelector: '#firstName',
        lastNameFieldSelector: '#lastName',
        phoneNumberFieldSelector: '#phoneNumber',
        emailFieldSelector: '#email',

        inputFieldSelector: '.form-group input',
        basicEditButtonSelector: 'a.form-group-edit',
        emergencyContactFirstNameFieldSelector: '#emergency-firstName',
        emergencyContactFieldSelector: '.emergency-field',
        emergencyContactRequiredMarkSelector: '.emergency-required',
        emergencyContactPermissionSelector: '.permission-confirm',
        emergencyContactPermissionCheckSelector: '.permission-confirm-check',
        emergencyContactPermissionFirstNameSelector: '#ec-first-name',

        patientIdStaticSelector: '#patient-id-value',
        firstNameStaticSelector: '#firstName-static',
        lastNameStaticSelector: '#lastName-static',
        phoneNumberStaticSelector: '#phoneNumber-static',
        emailStaticSelector: '#email-static'
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
        }, STRINGS.PHONE_NUMBER_INVALID);

        var me = this;

        return {
            rules: {
                phoneNumber: {
                    phoneNumberCheck: true
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
                email: {
                    remote: STRINGS.EMAIL_EXISTING_INVALID
                }
            }
        };
    };

    this.onShow = function (e, data) {
        this.$node.removeClass('ui-hidden');
        this.prepare(data);
        this.dialogEl.dialog('open');
    };

    this.prepare = function (data) {
        if (data.check !== 'false') {
            this.setPatientExisting(data);
        } else {
            this.setPatientNotExisting();
        }

        this.select('patientIdStaticSelector').text(data.patientId);
    };

    this._patientStatus = [];

    this.setPatientExisting = function (data) {
        this._patientStatus[1] = PATIENT_STATUS[1];

        this.select('hiddenIdSelector').val(data.id);
        this.toggleBasicFields();
        this.setBasicInfo(data);
    };

    this.setPatientNotExisting = function () {
        this._patientStatus[1] = PATIENT_STATUS[0];

        this.select('hiddenIdSelector').val('');
        this.toggleBasicFields();
    };

    this.toggleBasicFields = function () {
        if (this._patientStatus[0] === this._patientStatus[1]) {
            return;
        }

        var basicFields = [
            'firstNameFieldSelector',
            'lastNameFieldSelector',
            'emailFieldSelector'
        ];

        _.each(basicFields, function (selector) {
            var $selector = this.select(selector);

            if (this._patientStatus[1] === PATIENT_STATUS[0]) {
                $selector.removeAttr('disabled').show();
            } else {
                $selector.attr('disabled', 'disabled').hide();
            }
        }, this);

        var baseStatics = [
            'firstNameStaticSelector',
            'lastNameStaticSelector',
            'phoneNumberStaticSelector',
            'emailStaticSelector'
        ];

        _.each(baseStatics, function (selector) {
            var $selector = this.select(selector);
            var $editButton = $selector.siblings('a.form-group-edit');

            if (this._patientStatus[1] === PATIENT_STATUS[0]) {
                $selector.hide();
                $editButton.hide();
            } else {
                $selector.show();
                $editButton.show();
            }
        }, this);

        var $phoneNumberField = this.select('phoneNumberFieldSelector');

        if (this._patientStatus[1] === PATIENT_STATUS[0]) {
            $phoneNumberField.removeAttr('disabled');
            $phoneNumberField.parent().show();
        } else {
            $phoneNumberField.attr('disabled', 'disabled');
            $phoneNumberField.parent().hide();
        }
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
        this.select('emailStaticSelector').text(data.email);

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
        this._patientStatus[0] = this._patientStatus[1];
        this._patientStatus[1] = '';

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

    this.after('initialize', function () {
        this.on(document, 'showNewPatientDialog', this.onShow);
        this.on('newPatientRelationshipSelected', this.onEmergencyContactFieldInput);
        this.on('newPatientRelationshipCleared', this.onEmergencyContactFieldInput);

        this.on('dialogclose', this.onClose);

        this.on('click', {
            'basicEditButtonSelector': this.showBasicField
        });

        this.on('input', {
            'emergencyContactFieldSelector': this.onEmergencyContactFieldInput
        });

        // TODO: can't use flight style to set focus and blur
        this.select('inputFieldSelector')
            .on('focus', this.onInputFieldFocus)
            .on('blur', this.onInputFieldBlur)
    });
}

module.exports = flight.component(WithFormDialog, NewPatientFormDialog);
