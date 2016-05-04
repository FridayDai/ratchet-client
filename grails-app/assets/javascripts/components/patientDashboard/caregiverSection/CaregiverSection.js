var flight = require('flight');
var WithChildren = require('../../common/WithChildren');

var CaregiverTable = require('./CaregiverTable');
// var CheckArchivedWindowSize = require('../../shared/functional/CheckArchivedWindowSize');

function CaregiverSection() {
    // flight.compose.mixin(this, [
    //     CheckArchivedWindowSize
    // ]);

    this.attributes({
        treatmentIdHiddenSelector: '.hidden-treatment-id',
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

        caregiverTableSelector: '.ec-table',
        editGroupButtonSelector: '.btn-edit-surgeon',
        inviteButtonSelector: '.btn-invite'
    });

    this.getBasicIds = function () {
        return {
            patientId: this.select('inviteButtonSelector').data('patientId')
        };
    };

    this.children({
        caregiverTableSelector: CaregiverTable
    }, this.getBasicIds);

    // this.onEditGroupButtonClicked = function (e) {
    //     e.preventDefault();
    //
    //     this.trigger('showEditGroupProviderDialog', {
    //         treatmentId: this.select('treatmentIdHiddenSelector').val(),
    //         patientId: this.select('patientIdHiddenSelector').val(),
    //         medicalRecordId: this.select('medicalRecordIdHiddenSelector').val(),
    //         groupId: this.select('groupIdHiddenSelector').val(),
    //         providerId: this.select('providerIdHiddenSelector').val(),
    //         groupName: this.select('groupNameStaticSelector').text().trim(),
    //         providerName: this.select('providerFirstNameStaticSelector').text().trim() + ' ' +
    //             this.select('providerLastNameStaticSelector').text().trim()
    //     });
    // };

    // this.onEditGroupProviderSuccess = function (e, data) {
    //     if (data.isDoctor) {
    //         this.select('doctorLabelSelector')
    //             .removeClass('hidden');
    //     } else {
    //         this.select('doctorLabelSelector')
    //             .addClass('hidden');
    //     }
    //
    //     this.select('groupIdHiddenSelector').val(data.groupId);
    //     this.select('groupNameStaticSelector').text(data.groupName);
    //     this.select('providerIdHiddenSelector').val(data.providerId);
    //     this.select('providerIdStaticSelector').text(data.providerId);
    //     this.select('providerFirstNameStaticSelector').text(data.firstName);
    //     this.select('providerLastNameStaticSelector').text(data.lastName);
    //     this.select('providerEmailStaticSelector').text(data.email);
    // };

    this.onInviteButtonClicked = function () {
        this.trigger('showCaregiverDialog', {
            patientId: this.select('inviteButtonSelector').data('patientId')
        });
    };

    this.after('initialize', function () {
        this.on('click', {
            // editGroupButtonSelector: this.onEditGroupButtonClicked,
            inviteButtonSelector: this.onInviteButtonClicked
        });

        // this.on(document, 'editGroupProviderSuccess', this.onEditGroupProviderSuccess);
    });
}

module.exports = flight.component(WithChildren, CaregiverSection);
