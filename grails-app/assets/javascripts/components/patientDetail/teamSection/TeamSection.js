var flight = require('flight');
var WithChildren = require('../../common/WithChildren');

var EmergencyContackTable = require('./EmergencyContactTable');
var CheckArchivedWindowSize = require('../../shared/functional/CheckArchivedWindowSize');

function TeamSection() {
    flight.compose.mixin(this, [
        CheckArchivedWindowSize
    ]);

    this.attributes({
        medicalRecordIdHiddenSelector: '.hidden-medical-record',
        clientIdHiddenSelector: '.hidden-client-id',
        patientIdHiddenSelector: '.hidden-patient-id',
        archivedHiddenSelector: '.hidden-archived',
        groupIdHiddenSelector: '.hidden-group-id',
        providerIdHiddenSelector: '.hidden-surgeon-id',

        groupNameStaticSelector: '.group-name',
        providerIdStaticSelector: '.surgeon-id',
        providerFirstNameStaticSelector: '.provider-first-name',
        providerLastNameStaticSelector: '.provider-last-name',
        providerEmailStaticSelector: '.surgeon-email',
        doctorLabelSelector: '.surgeon-doctor',

        emergencyContactTableSelector: '.ec-table',
        editGroupButtonSelector: '.btn-edit-surgeon',
        inviteButtonSelector: '.btn-invite'
    });

    this.getBasicIds = function () {
        return {
            clientId: this.select('clientIdHiddenSelector').val(),
            patientId: this.select('patientIdHiddenSelector').val(),
            medicalRecordId: this.select('medicalRecordIdHiddenSelector').val(),
            archived: this.select('archivedHiddenSelector').val()
        };
    };

    this.children({
        emergencyContactTableSelector: EmergencyContackTable
    }, this.getBasicIds);

    this.onEditGroupButtonClicked = function (e) {
        e.preventDefault();

        this.trigger('showEditGroupProviderDialog', {
            patientId: this.select('patientIdHiddenSelector').val(),
            medicalRecordId: this.select('medicalRecordIdHiddenSelector').val(),
            groupId: this.select('groupIdHiddenSelector').val(),
            providerId: this.select('providerIdHiddenSelector').val(),
            groupName: this.select('groupNameStaticSelector').text().trim(),
            providerName: this.select('providerFirstNameStaticSelector').text().trim() + ' ' +
                this.select('providerLastNameStaticSelector').text().trim()
        });
    };

    this.onEditGroupProviderSuccess = function (e, data) {
        if (data.isDoctor) {
            this.select('doctorLabelSelector')
                .removeClass('hidden');
        } else {
            this.select('doctorLabelSelector')
                .addClass('hidden');
        }

        this.select('groupIdHiddenSelector').val(data.groupId);
        this.select('groupNameStaticSelector').text(data.groupName);
        this.select('providerIdHiddenSelector').val(data.providerId);
        this.select('providerIdStaticSelector').text(data.providerId);
        this.select('providerFirstNameStaticSelector').text(data.firstName);
        this.select('providerLastNameStaticSelector').text(data.lastName);
        this.select('providerEmailStaticSelector').text(data.email);
    };

    this.onInviteButtonClicked = function () {
        this.trigger('showEmergencyContactDialog', {
            patientId: this.select('patientIdHiddenSelector').val(),
            medicalRecordId: this.select('medicalRecordIdHiddenSelector').val()
        });
    };

    this.after('initialize', function () {
        this.on('click', {
            editGroupButtonSelector: this.onEditGroupButtonClicked,
            inviteButtonSelector: this.onInviteButtonClicked
        });

        this.on(document, 'editGroupProviderSuccess', this.onEditGroupProviderSuccess);
    });
}

module.exports = flight.component(WithChildren, TeamSection);
