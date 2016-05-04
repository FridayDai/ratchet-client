var flight = require('flight');
var WithChildren = require('../../common/WithChildren');
var ClearTabCache = require('../../shared/functional/ClearTabCache');
var GroupTable = require('./GroupTable');

function GroupSection() {

    flight.compose.mixin(this, [
        ClearTabCache
    ]);

    this.attributes({
        addGroupButtonSelector: '#add-group',
        GroupTableSelector: '#group-table'
    });

    this.getBasicIds = function () {
        return {
            patientId: this.select('addGroupButtonSelector').data('patientId')
        };
    };

    this.children({
        GroupTableSelector: GroupTable
    }, this.getBasicIds);


    this.onAddButtonClicked = function () {
        this.trigger('showAddGroupDialog');
    };

    this.after('initialize', function () {
        this.on('click', {
            addGroupButtonSelector: this.onAddButtonClicked
        });

    });
}

module.exports = flight.component(WithChildren, GroupSection);
