var flight = require('flight');
var WithChildren = require('../../common/WithChildren');
var ClearTabCache = require('../../shared/functional/ClearTabCache');
var GroupTable = require('./GroupTable');
var URLs = require('../../../constants/Urls');

var GROUP_TAB_EFFECT_EVENTS = [
    'addTreatmentSuccess'
];

function GroupSection() {

    flight.compose.mixin(this, [
        ClearTabCache
    ]);

    this.attributes({
        clearCacheEvents: GROUP_TAB_EFFECT_EVENTS,

        addGroupButtonSelector: '#add-group',
        GroupTableSelector: '#group-table'
    });

    this.getBasicIds = function () {
        var patientId = this.select('addGroupButtonSelector').data('patientId');
        return {
            patientId: patientId,
            url: URLs.GET_PATIENT_GROUP.format(patientId)
        };
    };

    this.children({
        GroupTableSelector: GroupTable
    }, this.getBasicIds);


    this.onAddButtonClicked = function () {
        this.trigger('showAddGroupDialog');
    };

    this.showTabSection = function () {
        this.$node.children(':first').css('visibility', 'visible');
    };

    this.after('initialize', function () {
        this.showTabSection();
        
        this.on('click', {
            addGroupButtonSelector: this.onAddButtonClicked
        });

    });
}

module.exports = flight.component(WithChildren, GroupSection);
