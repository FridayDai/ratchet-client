var flight = require('flight');
var WithFormDialog = require('../../common/WithFormDialog');
var WithChildren = require('../../common/WithChildren');
var WithEmergencyContactFieldRequired = require('../../shared/WithEmergencyContactFieldRequired');
var PatientGroupCombobox = require('../../shared/PatientGroupCombobox');
var PatientRelationshipCombobox = require('../../shared/PatientRelationshipCombobox');
var PatientProviderCombobox = require('../../shared/PatientProviderCombobox');
var PatientTreatmentCombobox = require('../../shared/PatientTreatmentCombobox');
var PatientSurgeryDate = require('../../shared/PatientSurgeryDate');
var Utility = require('../../../utils/Utility');

function AddTreatmentFormDialog() {
    this.attributes({
        groupFieldSelector: '#selectGroup',
        providerFieldSelector: '#selectSurgeons',
        treatmentFieldSelector: '#selectTreatment',
        surgeryTimeFieldSelector: '#surgeryTime',

        relationshipSelectEvent: 'addTreatmentRelationshipSelected',
        relationshipClearEvent: 'addTreatmentRelationshipCleared',

        emergencyContactRelationshipFieldSelector: '#relationship'
    });

    this.options({
        title: 'ADD TREATMENT',
        width: 620,
        buttons: ['Save']
    });

    this.children({
        emergencyContactRelationshipFieldSelector: {
            child: PatientRelationshipCombobox,
            attributes: {
                selectEvent: 'addTreatmentRelationshipSelected',
                clearEvent: 'addTreatmentRelationshipCleared'
            }
        },
        groupFieldSelector: {
            child: PatientGroupCombobox,
            attributes: {
                selectEvent: 'addTreatmentGroupSelected',
                clearEvent: 'addTreatmentGroupClear'
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
                selectEvent: 'addTreatmentTreatmentSelected',
                clearEvent: 'addTreatmentTreatmentClear'
            }
        },
        surgeryTimeFieldSelector: {
            child: PatientSurgeryDate,
            attributes: {
                treatmentSelectEvent: 'addTreatmentTreatmentSelected',
                treatmentClearEvent: 'addTreatmentTreatmentClear',
                resetEvent: 'addTreatmentReset'
            }
        }
    });

    this.onShow = function () {
        this.trigger('patientInfoRequest');

        this.$node.removeClass('ui-hidden');
        this.show();
    };

    this.onClose = function () {
        this.trigger('addTreatmentReset');
    };

    this.onPatientInfoServed = function (e, data) {
        this.patientInfo = data;
    };

    this.setExtraData = function () {
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

        return {
            clientId: this.patientInfo.clientId,
            patientId: this.patientInfo.patientId,
            id: this.patientInfo.identify,
            firstName: this.patientInfo.firstName,
            lastName: this.patientInfo.lastName,
            phoneNumber: this.patientInfo.phoneNumber.replace(/[\s\(\)-]/g, ''),
            email: this.patientInfo.email,
            groupId: groupId,
            staffId: providerId,
            treatmentId: treatmentId,
            surgeryTime: surgeryTime,
            relationship: relationshipId,
            profilePhoto: ''
        };
    };

    this.onAddTreatmentSuccess = function (e, data) {
        this.trigger('addTreatmentSuccess', _.assign(data, {
            clientId: this.patientInfo.clientId,
            patientId: this.patientInfo.patientId
        }));
    };

    this.after('initialize', function () {
        this.on(document, 'patientInfoServed', this.onPatientInfoServed);

        this.on('formSuccess', this.onAddTreatmentSuccess);

        this.on('dialogclose', this.onClose);
    });
}

module.exports = flight.component(
    WithEmergencyContactFieldRequired,
    WithChildren,
    WithFormDialog,
    AddTreatmentFormDialog
);
