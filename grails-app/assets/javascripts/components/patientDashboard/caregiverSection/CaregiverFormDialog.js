var flight = require('flight');
var WithFormDialog = require('../../common/WithFormDialog');
var URLs = require('../../../constants/Urls');

var PatientRelationshipCombobox = require('../../shared/components/PatientRelationshipCombobox');
var CaregiverEmailValidation = require('../../shared/validation/CaregiverEmailValidation');
var ComboboxInputValidation = require('../../shared/validation/ComboboxInputValidation');

var UPDATE = 'updateModel';
var ADD = 'addModel';

var ADD_TITLE = 'ADD CAREGIVER';
var EDIT_TITLE = 'EDIT CAREGIVER';

function CaregiverFormDialog() {
    this.options({
        title: 'ADD CAREGIVER',
        width: 620,
        buttons: ['Save']
    });

    this.attributes({
        caregiverRelationshipFieldSelector: '#relationships',
        caregiverFirstNameFieldSelector: '#giver-firstName',
        caregiverLastNameFieldSelector: '#giver-lastName',
        caregiverEmailFieldSelector: '#giver-email',
        caregiverPermissionCheckBoxSelector: '#permissionConfirm'
    });

    this.children({
        caregiverRelationshipFieldSelector: PatientRelationshipCombobox
    });

    this.onShow = function (e, data) {
        this.$node.removeClass('ui-hidden');
        this.prepareForShow(data);
        this.show();
    };

    this.initValidation = function () {
        return [
            CaregiverEmailValidation.get(this.emailChangeCheck, this),
            ComboboxInputValidation.get()
        ];
    };

    this.emailChangeCheck = function () {
        return this.select('caregiverEmailFieldSelector').val() === this.originalEmail;
    };

    this.prepareForShow = function (data) {
        this.originalEmail = '';

        this.medicalRecordId = data.medicalRecordId;
        var updateData = data.update;

        CaregiverEmailValidation.setPatientId(data.patientId);

        if (updateData) {
            this.model = UPDATE;

            this.caregiverId = updateData.caregiverId;

            this.changeTitle(EDIT_TITLE);

            this.select('caregiverFirstNameFieldSelector').val(updateData.firstName);
            this.select('caregiverLastNameFieldSelector').val(updateData.lastName);

            this.select('caregiverEmailFieldSelector').val(updateData.email);
            this.originalEmail = updateData.email;

            this.select('caregiverRelationshipFieldSelector')
                .val(updateData.relationship)
                .data('id', updateData.relationshipId);

            this.select('caregiverPermissionCheckBoxSelector').attr('checked', true);

            this.formEl.attr('action', URLs.UPDATE_CAREGIVER.format(data.patientId, this.caregiverId));
        } else {
            this.model = ADD;

            this.changeTitle(ADD_TITLE);

            this.formEl.attr('action', URLs.ADD_CAREGIVER.format(data.patientId));
        }
    };

    this.setExtraData = function () {
        if (this.model === UPDATE) {
            return {
                medicalRecordId: this.medicalRecordId,
                caregiverId: this.caregiverId,
                relationship: this.select('caregiverRelationshipFieldSelector').data('id')
            };
        } else {
            return {
                relationship: this.select('caregiverRelationshipFieldSelector').data('id')
            };
        }
    };

    this.onAddCaregiverSuccess = function () {
        this.trigger('caregiverUpdateSuccess');
    };

    this.after('initialize', function () {
        this.on('formSuccess', this.onAddCaregiverSuccess);
    });
}

module.exports = flight.component(WithFormDialog, CaregiverFormDialog);
