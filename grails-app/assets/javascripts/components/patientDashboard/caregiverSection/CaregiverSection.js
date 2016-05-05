var flight = require('flight');
var WithChildren = require('../../common/WithChildren');

var CaregiverTable = require('./CaregiverTable');

function CaregiverSection() {
    this.attributes({
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

    this.after('initialize', function () {
        this.on('click', {
            inviteButtonSelector: this.onInviteButtonClicked
        });
    });
}

module.exports = flight.component(WithChildren, CaregiverSection);
