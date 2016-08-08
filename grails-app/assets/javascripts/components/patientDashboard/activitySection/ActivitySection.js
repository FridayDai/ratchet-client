var flight = require('flight');
var WithChildren = require('../../common/WithChildren');
var ClearTabCache = require('../../shared/functional/ClearTabCache');

var ActivityTable = require('./ActivityTable');

var ACTIVITIES_TAB_EFFECT_EVENTS = [
    'updatePatientSuccess',
    'addEmailSuccess',
    'addPhoneNumberSuccess',
    'patientEmailInvited',
    'patientTasksNotified',
    'addTreatmentSuccess',
    'deleteTreatmentSuccess',
    'editSurgeryDateSuccess',
    //'archiveTreatmentSuccess',
    'deleteTaskSuccessful',
    'addTasksSuccess',
    'addPatientGroupSuccess',
    'deletePatientGroupSuccess',
    'caregiverUpdateSuccess',
    'deletePatientCaregiverSuccess'
];

function ActivitySection() {

    this.attributes({
        clearCacheEvents: ACTIVITIES_TAB_EFFECT_EVENTS,

        contentSelector: '.content',
        activityTableSelector: '#activity-table'
    });

    this.children({
        activityTableSelector: ActivityTable
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
    ActivitySection
);
