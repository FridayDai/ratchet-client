var flight = require('flight');
var WithFormDialog = require('../common/WithFormDialog');
var URLs = require('../../constants/Urls');
var Utility = require('../../utils/Utility');
var EmptyEmailConfirmation = require('../shared/components/EmptyEmailConfirmation');
var WithEmergencyContactFieldRequired = require('../shared/functional/WithEmergencyContactFieldRequired');
var PhoneNumberValidation = require('../shared/validation/PhoneNumberValidation');
var PatientEmailValidation = require('../shared/validation/PatientEmailValidation');

var NewPatientPhoneInputField = require('../shared/components/PatientPhoneInputField');
var NewPatientRelationshipCombobox = require('../shared/components/PatientRelationshipCombobox');
var NewPatientGroupCombobox = require('../shared/components/PatientGroupCombobox');
var NewPatientProviderCombobox = require('../shared/components/PatientProviderCombobox');
var NewPatientTreatmentCombobox = require('../shared/components/PatientTreatmentCombobox');
var NewPatientSurgeryDate = require('../shared/components/PatientSurgeryDate');

function NewPatientFormDialog() {
    flight.compose.mixin(this, [
        EmptyEmailConfirmation
    ]);

    this.attributes({
        hiddenIdSelector: '#hidden-id',

        firstNameFieldSelector: '#firstName',
        lastNameFieldSelector: '#lastName',
        phoneNumberFieldSelector: '#phoneNumber',
        emailFieldSelector: '#email',
        groupFieldSelector: '#selectGroup',
        providerFieldSelector: '#selectStaffs',
        treatmentFieldSelector: '#selectTreatment',
        surgeryTimeFieldSelector: '#surgeryTime',

        basicEditButtonSelector: 'a.form-group-edit',
        emergencyContactRelationshipFieldSelector: '#relationship',
        emergencyContactFirstNameFieldSelector: '#emergency-firstName',
        emergencyContactPermissionFirstNameSelector: '#ec-first-name',

        patientIdStaticSelector: '#patient-id-value',
        firstNameStaticSelector: '#firstName-static',
        lastNameStaticSelector: '#lastName-static',
        phoneNumberStaticSelector: '#phoneNumber-static',
        emailStaticSelector: '#email-static',

        surgeryDateFormGroupSelector: '#div-surgery-time',

        relationshipSelectEvent: 'newPatientRelationshipSelected',
        relationshipClearEvent: 'newPatientRelationshipCleared'
    });

    this.options({
        title: 'NEW PATIENT',
        width: 620,
        buttons: ['Save']
    });

    this.children({
        phoneNumberFieldSelector: NewPatientPhoneInputField,
        emergencyContactRelationshipFieldSelector: {
            child: NewPatientRelationshipCombobox,
            attributes: {
                selectEvent: 'newPatientRelationshipSelected',
                clearEvent: 'newPatientRelationshipCleared'
            }
        },
        groupFieldSelector: {
            child: NewPatientGroupCombobox,
            attributes: {
                selectEvent: 'patientGroupSelected',
                clearEvent: 'patientGroupClear'
            }
        },
        providerFieldSelector:{
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
                selectEvent: 'newPatientTreatmentSelected',
                clearEvent: 'newPatientTreatmentClear'
            }
        },
        surgeryTimeFieldSelector: {
            child: NewPatientSurgeryDate,
            attributes: {
                treatmentSelectEvent: 'newPatientTreatmentSelected',
                treatmentClearEvent: 'newPatientTreatmentClear',
                resetEvent: 'newPatientReset'
            }
        }
    });

    this.initValidation = function () {
        return _.defaultsDeep(PhoneNumberValidation.get(), PatientEmailValidation.get());
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

        this.select('surgeryDateFormGroupSelector').hide();
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
        this.select('emergencyContactPermissionFirstNameSelector').empty();

        this.trigger('newPatientReset');
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

        var result = {
            patientId: this.select('patientIdStaticSelector').text(),
            phoneNumber: phoneNumber.replace(/[\s\(\)-]/g, ''),
            relationship: relationshipId,
            groupId: groupId,
            staffId: providerId,
            treatmentId: treatmentId,
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

        if ($surgeryTime.is(':visible')) {
            result.surgeryTime = Utility.toVancouverTime($surgeryTime.val());
        }

        return result;
    };

    this.onAddPatientSuccess = function (e, data) {
        window.location.href = URLs.PAGE_PATIENT_DETAIL.format(data.id);
    };

    this.onEmergencyContactFirstNameInput = function () {
        this.select('emergencyContactPermissionFirstNameSelector')
            .text(this.select('emergencyContactFirstNameFieldSelector').val());
    };

    this.after('initialize', function () {
        this.on('dialogclose', this.onClose);
        this.on('formSuccess', this.onAddPatientSuccess);

        this.on('click', {
            'basicEditButtonSelector': this.showBasicField
        });

        this.on('input', {
            emergencyContactFirstNameFieldSelector: this.onEmergencyContactFirstNameInput
        });
    });
}

module.exports = flight.component(
    WithEmergencyContactFieldRequired,
    WithFormDialog,
    NewPatientFormDialog
);
