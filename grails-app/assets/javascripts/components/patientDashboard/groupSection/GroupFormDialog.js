var flight = require('flight');
var WithFormDialog = require('../../common/WithFormDialog');
var GroupSelectbox = require('./GroupSelectbox');

var ADD_TITLE = 'ADD GROUP';

function GroupFormDialog() {
    this.options({
        title: ADD_TITLE,
        width: 550,
        buttons: [
            'Add',
            'Cancel'
        ]
    });

    this.attributes({
        groupsFieldSelector: '#groups'
    });

    this.children({
        groupsFieldSelector: {
            child: GroupSelectbox
        }
    });

    this.onShow = function () {
        this.$node.removeClass('ui-hidden');
        this.clearDialog();
        this.show();
    };

    this.clearDialog = function () {
        this.select('groupsFieldSelector').select2('data', null);
    };

    this.onAddGroupSuccess = function () {
        this.trigger('addPatientGroupSuccess');
    };

    this.after('initialize', function () {
        this.on('formSuccess', this.onAddGroupSuccess);
    });
}

module.exports = flight.component(WithFormDialog, GroupFormDialog);

