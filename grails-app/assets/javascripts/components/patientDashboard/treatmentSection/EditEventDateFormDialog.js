var flight = require('flight');
var WithFormDialog = require('../../common/WithFormDialog');
var URLs = require('../../../constants/Urls');
var PatientAbsoluteEventDate = require('../../shared/components/PatientAbsoluteEventDate');
var ProviderCombobox = require('./ProviderCombobox');
var Notifications = require('../../common/Notification');
var Utility = require('../../../utils/Utility');
var STRINGs = require('../../../constants/Strings');

function EditEventDateFormDialog() {
    this.options({
        title: 'EDIT TREATMENT',
        width: 430,
        buttons: ['Save']
    });

    this.attributes({
        eventTimeFieldSelector: '#treatment-eventTime',
        providerFieldSelector: '#treatment-provider'
    });

    this.children({
        eventTimeFieldSelector: PatientAbsoluteEventDate,
        providerFieldSelector: ProviderCombobox
    });

    this.onShow = function (e, data) {
        this.changeLabelPlaceholderWithType(data);
        this.setCurrentAbsoluteEventDate(data.currentAbsoluteEventDate);

        this.patientId = data.patientId;
        this.medicalRecordId = data.medicalRecordId;

        this.$node.removeClass('ui-hidden');
        this.show();
    };

    this.changeLabelPlaceholderWithType = function (data) {
        var $input = this.select('eventTimeFieldSelector');
        var placeholder = STRINGs.ABSOLUTE_EVENT_DATE_PLACEHOLDER
            .format(data.absoluteEventType.toLowerCase());

        $input.attr('placeholder', placeholder)
            .data('placeholder', placeholder);

        $input.prev().html(
            STRINGs.ABSOLUTE_EVENT_DATE_LABEL
                .format(data.absoluteEventType.toUpperCase()));
    };

    this.setCurrentAbsoluteEventDate = function (current) {
        this.currentAbsoluteEventDate = current;

        this.select('eventTimeFieldSelector').val(current);
    };

    this.setFormAction = function (patientId, medicalRecordId) {
        var newDate = Utility.toVancouverTime(this.select('eventTimeFieldSelector').val());
        var providerId = this.select('providerFieldSelector').data('id');

        this.formEl.attr('action',
            URLs.UPDATE_SURGERY_DATE.format(patientId, medicalRecordId, providerId, newDate)
        );
    };

    this.beforeSubmitForm = function () {
        var me = this;

        Notifications.confirm({
            title: 'EDIT SURGERY DATE',
            message: 'Are you sure? All results will be cleared and all tasks will be rescheduled.'
        }, {
            buttons: [
                {
                    text: 'Yes',
                    'class': 'btn-agree',
                    click: function () {
                        // Warning dialog close
                        $(this).dialog("close");

                        me.setFormAction(me.patientId, me.medicalRecordId);

                        // Bulk import dialog close
                        me.submitForm();
                    }
                }, {
                    text: 'Cancel',
                    click: function () {
                        $(this).dialog("close");
                    }
                }
            ]
        });

        return false;
    };

    this.onEditSurgeryDateSuccess = function () {
        var newDate = Utility.toVancouverTime(this.select('eventTimeFieldSelector').val());

        this.trigger('editSurgeryDateSuccess', {
            newDate: newDate,
            medicalRecordId: this.medicalRecordId
        });
    };

    this.after('initialize', function () {
        this.on('formSuccess', this.onEditSurgeryDateSuccess);
    });
}

module.exports = flight.component(WithFormDialog, EditEventDateFormDialog);
