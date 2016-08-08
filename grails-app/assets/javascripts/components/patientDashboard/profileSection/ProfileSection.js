var flight = require('flight');
var WithChildren = require('../../common/WithChildren');
var ClearTabCache = require('../../shared/functional/ClearTabCache');
var CompanyTable = require('./CompanyTable');

var PROFILE_TAB_EFFECT_EVENTS = [
    'updatePatientSuccess',
    'addEmailSuccess',
    'addPhoneNumberSuccess',
    'patientEmailInvited',
    'patientTasksNotified',
    'addPatientGroupSuccess',
    'deletePatientGroupSuccess'
];

function ProfileSection() {

    this.attributes({
        clearCacheEvents: PROFILE_TAB_EFFECT_EVENTS,

        contentSelector: '.content',
        companyTableSelector: '.ec-table'
    });

    this.children({
        companyTableSelector: CompanyTable
    });

    this.showTabSection = function () {
        this.$node.children(':first').css('visibility', 'visible');
    };

    this.after('initialize', function () {
        this.showTabSection();
    });
}

module.exports = flight.component(
    ClearTabCache,
    WithChildren,
    ProfileSection
);

