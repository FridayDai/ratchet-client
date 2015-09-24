var flight = require('flight');
var WithFormDialog = require('../../common/WithFormDialog');
var WithChildren = require('../../common/WithChildren');
var URLs = require('../../../constants/Urls');
var PatientSurgeryDate = require('../../shared/components/PatientSurgeryDate');
var Notifications = require('../../common/Notification');
var Utility = require('../../../utils/Utility');

function EditSurgeryDateFormDialog() {
    this.options({
        title: 'EDIT SURGERY DATE',
        width: 420,
        buttons: ['Save']
    });

    this.attributes({
        surgeryTimeFieldSelector: '#treatment-surgeryTime'
    });

    this.children({
        surgeryTimeFieldSelector: PatientSurgeryDate
    });

    this.onShow = function (e, data) {
        this.setCurrentSurgeryDate(data.currentSurgeryDate);
        this.setMinSurgeryDate(data.clientId, data.treatmentId);

        this.patientId = data.patientId;
        this.medicalRecordId = data.medicalRecordId;
    };

    this.setMinSurgeryDate = function (clientId, treatmentId) {
        var me = this;

        $.ajax({
            url: URLs.GET_TREATMENT_DETAIL.format(treatmentId),
            type: 'POST',
            data: { clientId: clientId }
        }).done(function (data) {
            me.select('surgeryTimeFieldSelector')
                .datepicker('option', 'minDate', new Date(data.surgeryDate));
        }).always(function() {
            me.$node.removeClass('ui-hidden');
            me.show();
        });
    };

    this.setCurrentSurgeryDate = function (current) {
        this.currentSurgeryDate = current;

        this.select('surgeryTimeFieldSelector').attr('value', current);
    };

    this.setFormAction = function (patientId, medicalRecordId) {
        var newDate = Utility.toVancouverTime(this.select('surgeryTimeFieldSelector').val());

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
        return this.currentSurgeryDate !== this.select('surgeryTimeFieldSelector').val();
    };

    this.onEditSurgeryDateSuccess = function () {
        var newDate = Utility.toVancouverTime(this.select('surgeryTimeFieldSelector').val());

        this.trigger('editSurgeryDateSuccess', {
            newDate: newDate
        });
    };

    this.after('initialize', function () {
        this.on('formSuccess', this.onEditSurgeryDateSuccess);
    });
}

module.exports = flight.component(WithChildren, WithFormDialog, EditSurgeryDateFormDialog);
