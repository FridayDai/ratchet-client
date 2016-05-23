var flight = require('flight');
var WithChildren = require('../../common/WithChildren');
var ClearTabCache = require('../../shared/functional/ClearTabCache');

var CaregiverTable = require('./CaregiverTable');

var CAREGIVER_TAB_EFFECT_EVENTS = [
    'addTreatmentSuccess'
];

function CaregiverSection() {
    this.attributes({
        clearCacheEvents: CAREGIVER_TAB_EFFECT_EVENTS,

        caregiverTableSelector: '.ec-table',
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

    this.onInviteButtonClicked = function () {
        this.trigger('showCaregiverDialog', {
            patientId: this.select('inviteButtonSelector').data('patientId')
        });
    };

    this.showTabSection = function () {
        this.$node.children(':first').css('visibility', 'visible');
    };

    this.after('initialize', function () {
        this.showTabSection();

        this.on('click', {
            inviteButtonSelector: this.onInviteButtonClicked
        });
    });
}

module.exports = flight.component(
    ClearTabCache,
    WithChildren,
    CaregiverSection
);
