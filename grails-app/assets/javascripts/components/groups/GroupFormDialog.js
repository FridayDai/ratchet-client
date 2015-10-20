var flight = require('flight');
var WithFormDialog = require('../../common/WithFormDialog');
//var WithChildren = require('../../common/WithChildren');
var URLs = require('../../../constants/Urls');

//var PatientRelationshipCombobox = require('../../shared/components/PatientRelationshipCombobox');
//var EmergencyContactEmailValidation = require('../../shared/validation/EmergencyContactEmailValidation');

var UPDATE = 'updateModel';
var ADD = 'addModel';

var ADD_TITLE = 'NEW GROUP';
var EDIT_TITLE = 'EDIT GROUP';

function GroupFormDialog() {
    this.options({
        title: ADD_TITLE,
        width: 385,
        buttons: ['Save']
    });

    this.attributes({
        groupNameFieldSelector: '#groupName'
    });

    this.onShow = function (e, data) {
        this.$node.removeClass('ui-hidden');
        this.prepareForShow(data);
        this.show();
    };

    this.prepareForShow = function (data) {

        var updateData = data.update;

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


    //this.setExtraData = function () {
    //    if (this.model === UPDATE) {
    //        return {
    //            medicalRecordId: this.medicalRecordId,
    //            careGiverId: this.emergencyContactId,
    //            relationship: this.select('emergencyContactRelationshipFieldSelector').data('id')
    //        };
    //    } else {
    //        return {
    //            relationship: this.select('emergencyContactRelationshipFieldSelector').data('id')
    //        };
    //    }
    //};

    this.onAddGroupSuccess = function () {
        this.trigger('addGroupSuccess');
    };

    //this.onClose = function () {
    //    this.select('emergencyContactPermissionFirstNameSelector').empty();
    //};

    this.after('initialize', function () {
        //this.on('dialogclose', this.onClose);
        this.on('formSuccess', this.onAddGroupSuccess);

    });
}

module.exports = flight.component(WithFormDialog, GroupFormDialog);

