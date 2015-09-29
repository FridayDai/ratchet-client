var flight = require('flight');
var WithFormDialog = require('../../common/WithFormDialog');
var WithChildren = require('../../common/WithChildren');
var URLs = require('../../../constants/Urls');

var PatientRelationshipCombobox = require('../../shared/components/PatientRelationshipCombobox');
var EmergencyContactEmailValidation = require('../../shared/validation/EmergencyContactEmailValidation');

var UPDATE = 'updateModel';
var ADD = 'addModel';

function EmergencyContactFormDialog() {
    this.options({
        title: 'ADD EMERGENCY CONTACT',
        width: 620,
        buttons: ['Save']
    });

    this.attributes({
        emergencyContactRelationshipFieldSelector: '#relationships',
        emergencyContactFirstNameFieldSelector: '#giver-firstName',
        emergencyContactLastNameFieldSelector: '#giver-lastName',
        emergencyContactEmailFieldSelector: '#giver-email',
        emergencyContactPermissionFirstNameSelector: '#permission-ec-first-name',
        emergencyContactPermissionCheckBoxSelector: '#permissionConfirm'
    });

    this.children({
        emergencyContactRelationshipFieldSelector: PatientRelationshipCombobox
    });

    this.onShow = function (e, data) {
        this.$node.removeClass('ui-hidden');
        this.prepareForShow(data);
        this.show();
    };

    this.initValidation = function () {
        return EmergencyContactEmailValidation.get(this.emailChangeCheck, this);
    };

    this.emailChangeCheck = function () {
        return this.select('emergencyContactEmailFieldSelector').val() === this.originalEmail;
    };

    this.prepareForShow = function (data) {
        this.originalEmail = '';

        this.medicalRecordId = data.medicalRecordId;
        EmergencyContactEmailValidation.setMedicalRecordId(data.medicalRecordId);

        var updateData = data.update;

        if (updateData) {
            this.model = UPDATE;

            this.emergencyContactId = updateData.emergencyContactId;

            this.select('emergencyContactFirstNameFieldSelector').val(updateData.firstName);
            this.select('emergencyContactLastNameFieldSelector').val(updateData.lastName);

            this.select('emergencyContactEmailFieldSelector').val(updateData.email);
            this.originalEmail = updateData.email;

            this.select('emergencyContactRelationshipFieldSelector')
                .val(updateData.relationship)
                .data('id', updateData.relationshipId);
            this.select('emergencyContactPermissionFirstNameSelector').text(updateData.firstName);

            this.select('emergencyContactPermissionCheckBoxSelector').attr('checked', true);

            this.formEl.attr('action', URLs.UPDATE_EMERGENCY_CONTACT.format(data.patientId));
        } else {
            this.model = ADD;

            this.formEl.attr('action', URLs.ADD_EMERGENCY_CONTACT.format(data.patientId, data.medicalRecordId));
        }
    };

    this.onEmergencyContactFirstNameInput = function () {
        this.select('emergencyContactPermissionFirstNameSelector')
            .text(this.select('emergencyContactFirstNameFieldSelector').val());
    };

    this.setExtraData = function () {
        if (this.model === UPDATE) {
            return {
                medicalRecordId: this.medicalRecordId,
                careGiverId: this.emergencyContactId,
                relationship: this.select('emergencyContactRelationshipFieldSelector').data('id')
            };
        } else {
            return {
                relationship: this.select('emergencyContactRelationshipFieldSelector').data('id')
            };
        }
    };

    this.onAddEmergencyContactSuccess = function () {
        this.trigger('emergencyContactUpdateSuccess');
    };

    this.onClose = function () {
        this.select('emergencyContactPermissionFirstNameSelector').empty();
    };

    this.after('initialize', function () {
        this.on('dialogclose', this.onClose);
        this.on('formSuccess', this.onAddEmergencyContactSuccess);

        this.on('input', {
            emergencyContactFirstNameFieldSelector: this.onEmergencyContactFirstNameInput
        });
    });
}

module.exports = flight.component(WithChildren, WithFormDialog, EmergencyContactFormDialog);
