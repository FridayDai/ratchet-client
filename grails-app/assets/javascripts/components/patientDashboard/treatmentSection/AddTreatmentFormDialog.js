var flight = require('flight');
var WithFormDialog = require('../../common/WithFormDialog');

var WithCaregiverFieldRequired = require('../../shared/functional/WithCaregiverFieldRequired');
var PatientGroupCombobox = require('../../shared/components/PatientGroupCombobox');
var PatientRelationshipCombobox = require('../../shared/components/PatientRelationshipCombobox');
var PatientProviderCombobox = require('../../shared/components/PatientProviderCombobox');
var PatientTreatmentCombobox = require('../../shared/components/PatientTreatmentCombobox');
var PatientSurgeryDate = require('../../shared/components/PatientSurgeryDate');
var ComboboxInputValidation = require('../../shared/validation/ComboboxInputValidation');
var Notifications = require('../../common/Notification');
var Utility = require('../../../utils/Utility');
var Strings = require('../../../constants/Strings');

function AddTreatmentFormDialog() {
    this.attributes({
        groupFieldSelector: '#selectGroup',
        providerFieldSelector: '#selectSurgeons',
        treatmentFieldSelector: '#selectTreatment',
        surgeryTimeFieldSelector: '#surgeryTime',
        surgeryDateFieldGroupSelector: '#surgery-date-group',

        relationshipSelectEvent: 'addTreatmentRelationshipSelected',
        relationshipClearEvent: 'addTreatmentRelationshipCleared',

        caregiverRelationshipFieldSelector: '#relationship',
        caregiverFirstNameFieldSelector: '#caregiver-firstName',
        caregiverPermissionFirstNameSelector: '#ec-first-name'
    });

    this.options({
        title: 'ADD TREATMENT',
        width: 620,
        buttons: ['Save']
    });

    this.children({
        caregiverRelationshipFieldSelector: {
            child: PatientRelationshipCombobox,
            attributes: {
                selectEvent: 'addTreatmentRelationshipSelected',
                clearEvent: 'addTreatmentRelationshipCleared',
                resetEvent: 'addTreatmentReset'
            }
        },
        groupFieldSelector: {
            child: PatientGroupCombobox,
            attributes: {
                selectEvent: 'addTreatmentGroupSelected',
                clearEvent: 'addTreatmentGroupClear',
                resetEvent: 'addTreatmentReset'
            }
        },
        providerFieldSelector:{
            child: PatientProviderCombobox,
            attributes: {
                groupSelectEvent: 'addTreatmentGroupSelected',
                groupClearEvent: 'addTreatmentGroupClear',
                resetEvent: 'addTreatmentReset'
            }
        },
        treatmentFieldSelector: {
            child: PatientTreatmentCombobox,
            attributes: {
                groupSelectEvent: 'addTreatmentGroupSelected',
                groupClearEvent: 'addTreatmentGroupClear',
                selectEvent: 'addTreatmentTreatmentSelected',
                clearEvent: 'addTreatmentTreatmentClear',
                resetEvent: 'addTreatmentReset'
            }
        },
        surgeryTimeFieldSelector: {
            child: PatientSurgeryDate,
            attributes: {
                groupSelectEvent: 'addTreatmentGroupSelected',
                groupClearEvent: 'addTreatmentGroupClear',
                treatmentSelectEvent: 'addTreatmentTreatmentSelected',
                treatmentClearEvent: 'addTreatmentTreatmentClear',
                resetEvent: 'addTreatmentReset'
            }
        }
    });

    this.initValidation = function () {
        return ComboboxInputValidation.get();
    };

    this.onShow = function () {
        this.trigger('patientInfoRequest');

        this.$node.removeClass('ui-hidden');
        this.select('surgeryDateFieldGroupSelector').hide();

        this.show();
    };

    this.onClose = function () {
        this.trigger('addTreatmentReset');
    };

    this.onPatientInfoServed = function (e, data) {
        this.patientInfo = data;
    };

    this.setExtraData = function () {
        var $relationship = this.select('caregiverRelationshipFieldSelector');
        var relationshipId = $relationship.data('id');
        var $group = this.select('groupFieldSelector');
        var groupId = $group.data('id');
        var $provider = this.select('providerFieldSelector');
        var providerId = $provider.data('id');
        var $treatment = this.select('treatmentFieldSelector');
        var treatmentId = $treatment.data('id');
        var $surgeryTime = this.select('surgeryTimeFieldSelector');

        var result = {
            clientId: this.patientInfo.clientId,
            patientId: this.patientInfo.patientId,
            id: this.patientInfo.identify,
            firstName: this.patientInfo.firstName,
            lastName: this.patientInfo.lastName,
            phoneNumber: this.patientInfo.phoneNumber.replace(/[\s\(\)-]/g, ''),
            email: this.patientInfo.email,
            emailStatus: this.patientInfo.emailStatus,
            birthdayValue: Utility.toBirthday(this.patientInfo.birthday),
            groupId: groupId,
            staffId: providerId,
            treatmentId: treatmentId,
            relationship: relationshipId,
            profilePhoto: ''
        };

        if ($surgeryTime.is(':visible')) {
            result.surgeryTime = Utility.toVancouverTime($surgeryTime.val());
        }

        return result;
    };

    this.onAddTreatmentSuccess = function (e, data) {
        var $surgeryTime = this.select('surgeryTimeFieldSelector');
        var surgeryTime = Utility.toVancouverTime($surgeryTime.val());

        this.trigger('addTreatmentSuccess', _.assign(data, {
            clientId: this.patientInfo.clientId,
            patientId: this.patientInfo.patientId,
            emailStatus: this.patientInfo.emailStatus,
            treatmentDate: surgeryTime
        }));
    };

    this.onCaregiverFirstNameInput = function () {
        this.select('caregiverPermissionFirstNameSelector')
            .text(this.select('caregiverFirstNameFieldSelector').val());
    };

    this.beforeSubmitForm = function () {
        if (!this.patientInfo.birthday) {
            Notifications.error({
                title: Strings.ERROR_TITLE,
                message: Strings.BIRTHDAY_IS_REQUIRED
            });
            return false;
        }
    };

    this.after('initialize', function () {
        this.on(document, 'patientInfoServed', this.onPatientInfoServed);

        this.on('formSuccess', this.onAddTreatmentSuccess);

        this.on('dialogclose', this.onClose);

        this.on('input', {
            caregiverFirstNameFieldSelector: this.onCaregiverFirstNameInput
        });
    });
}

module.exports = flight.component(
    WithCaregiverFieldRequired,
    WithFormDialog,
    AddTreatmentFormDialog
);
