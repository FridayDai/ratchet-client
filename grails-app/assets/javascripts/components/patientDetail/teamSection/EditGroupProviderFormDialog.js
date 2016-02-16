var flight = require('flight');
var WithFormDialog = require('../../common/WithFormDialog');
var URLs = require('../../../constants/Urls');

var PatientGroupCombobox = require('./PatientGroupCombobox');
var PatientProviderCombobox = require('../../shared/components/PatientProviderCombobox');
var ComboboxInputValidation = require('../../shared/validation/ComboboxInputValidation');

function EditGroupProviderFormDialog() {
    this.attributes({
        groupFieldSelector: '.group-field',
        providerFieldSelector: '.provider-field'
    });

    this.options({
        title: 'EDIT GROUP AND PROVIDER',
        width: 400,
        buttons: ['Save']
    });

    this.children({
        groupFieldSelector: {
            child: PatientGroupCombobox,
            attributes: {
                selectEvent: 'editGroupProviderGroupSelected',
                clearEvent: 'editGroupProviderGroupClear'
            }
        },
        providerFieldSelector:{
            child: PatientProviderCombobox,
            attributes: {
                groupSelectEvent: 'editGroupProviderGroupSelected',
                groupClearEvent: 'editGroupProviderGroupClear'
            }
        }
    });

    this.initValidation = function () {
        return ComboboxInputValidation.get();
    };

    this.onShow = function (e, data) {
        this.$node.removeClass('ui-hidden');
        this.prepareForShow(data);
        this.show();
    };

    this.prepareForShow = function (data) {
        this.patientId = data.patientId;
        this.medicalRecordId = data.medicalRecordId;
        this.currentGroupId = data.groupId;
        this.currentProviderId = data.providerId;

        this.trigger('editGroupProviderGroupSelected', {
            groupId: this.currentGroupId
        });

        this.child.groupFieldSelector.setDisplayItem({
            label: data.groupName,
            value: data.groupId
        });
        this.child.providerFieldSelector.setDisplayItem({
            label: data.providerName,
            value: data.providerId
        });

        this.child.groupFieldSelector.setTreatmentId(data.treatmentId);

        this.formEl.attr(
            'action',
            URLs.UPDATE_GROUP_PROVIDER_CONTACT.format(this.patientId, this.medicalRecordId)
        );
    };

    this.beforeSubmitForm = function () {
        if (!this.hasChanged()) {
            return false;
        }
    };

    this.setExtraData = function () {
        var groupId = this.select('groupFieldSelector').data('id') || this.currentGroupId;
        var staffId = this.select('providerFieldSelector').data('id') || this.currentProviderId;

        return {
            groupId: groupId,
            staffId: staffId
        };
    };

    this.hasChanged = function () {
        var $groupField = this.select('groupFieldSelector');
        var $providerField = this.select('providerFieldSelector');

        return $groupField.data('id') && ($groupField.data('id') + '') !== this.currentGroupId ||
            $providerField.data('id') && ($providerField.data('id') + '') !== this.currentProviderId;
    };

    this.onEditGroupProviderSuccess = function (e, data) {
        this.trigger('editGroupProviderSuccess', {
            providerId: data.id,
            isDoctor: data.doctor,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            groupId: data.groupId,
            groupName: data.groupName
        });
    };

    this.after('initialize', function () {
        this.on('formSuccess', this.onEditGroupProviderSuccess);
    });
}

module.exports = flight.component(WithFormDialog, EditGroupProviderFormDialog);
