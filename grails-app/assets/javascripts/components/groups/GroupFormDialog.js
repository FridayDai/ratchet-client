var flight = require('flight');
var WithFormDialog = require('../common/WithFormDialog');
var URLs = require('../../constants/Urls');

var GroupTreatmentsSelectbox = require('./GroupTreatmentsSelectbox');

var UPDATE = 'updateModel';
var ADD = 'addModel';

var ADD_TITLE = 'NEW GROUP';
var EDIT_TITLE = 'EDIT GROUP';

function GroupFormDialog() {
    this.options({
        title: ADD_TITLE,
        width: 620,
        buttons: ['Save']
    });

    this.attributes({
        groupNameFieldSelector: '#groupName',
        treatmentsFieldSelector: '#treatments'
    });

    this.children({
        treatmentsFieldSelector: {
            child: GroupTreatmentsSelectbox,
            attributes: {
                clearEvent: 'newGroupReset'
            }
        }
    });

    this.onShow = function (e, data) {
        this.$node.removeClass('ui-hidden');
        this.prepareForShow(data);
        this.show();
    };

    this.prepareForShow = function (data) {

        var updateData = data? data.update: null;

        if (updateData) {
            this.model = UPDATE;
            this.changeTitle(EDIT_TITLE);

            this.select('groupNameFieldSelector').val(updateData.groupName);
            this.formEl.attr('action', URLs.UPDATE_GROUP.format(updateData.groupId));
        } else {
            this.model = ADD;
            this.changeTitle(ADD_TITLE);

            this.formEl.attr('action', URLs.GET_GROUPS);
        }
    };

    this.onChangeGroupSuccess = function () {
        if(this.model === UPDATE) {
            this.trigger('updateGroupSuccess');
        } else {
            this.trigger('addGroupSuccess');
        }
    };

    this.after('initialize', function () {
        this.on('formSuccess', this.onChangeGroupSuccess);
    });
}

module.exports = flight.component(WithFormDialog, GroupFormDialog);

