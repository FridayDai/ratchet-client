var flight = require('flight');
var WithFormDialog = require('../../common/WithFormDialog');
var URLs = require('../../../constants/Urls');
var PatientSurgeryDate = require('../../shared/components/PatientSurgeryDate');
var Notifications = require('../../common/Notification');
var Utility = require('../../../utils/Utility');

function EditEventDateFormDialog() {
    this.options({
        title: 'EDIT TREATMENT',
        width: 430,
        buttons: ['Save']
    });

    this.attributes({
        eventTimeFieldSelector: '#treatment-eventTime'
    });

    this.children({
        eventTimeFieldSelector: PatientSurgeryDate
    });

    this.onShow = function (e, data) {
        this.setCurrentSurgeryDate(data.currentSurgeryDate);

        this.patientId = data.patientId;
        this.medicalRecordId = data.medicalRecordId;

        this.$node.removeClass('ui-hidden');
        this.show();
    };

    this.setCurrentSurgeryDate = function (current) {
        this.currentSurgeryDate = current;

        this.select('eventTimeFieldSelector').val(current);
    };

    this.setFormAction = function (patientId, medicalRecordId) {
        var newDate = Utility.toVancouverTime(this.select('eventTimeFieldSelector').val());

        this.formEl.attr('action',
            URLs.UPDATE_SURGERY_DATE.format(patientId, medicalRecordId, newDate)
        );
    };

    this.beforeSubmitForm = function () {
        var me = this;

        if (this.isDateChanged()) {
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
        }

        return false;
    };

    this.isDateChanged = function () {
        return this.currentSurgeryDate !== this.select('eventTimeFieldSelector').val();
    };

    this.onEditSurgeryDateSuccess = function () {
        var newDate = Utility.toVancouverTime(this.select('eventTimeFieldSelector').val());

        this.trigger('editSurgeryDateSuccess', {
            newDate: newDate
        });
    };

    this.after('initialize', function () {
        this.on('formSuccess', this.onEditSurgeryDateSuccess);
    });
}

module.exports = flight.component(WithFormDialog, EditEventDateFormDialog);
