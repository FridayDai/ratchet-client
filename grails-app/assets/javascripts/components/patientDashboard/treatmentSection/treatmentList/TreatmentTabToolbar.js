var flight = require('flight');

var URLs = require('../../../../constants/Urls');
var Utility = require('../../../../utils/Utility');

function TreatmentToolbar() {
    this.attributes({
        archived: null,
        currentMedicalRecordId: null,

        treatmentListAnchorSelector: '.ui-tabs-anchor',
        addTaskButtonSelector: '.addTasks',
        editButtonSelector: '.event-time-edit',
        deleteButtonSelector: '.treatment-delete',
        taskInfoHiddenSelector: '.task-info-hidden',

        treatmentDateSelector: '.treatment-time-picker'
    });

    this.getBasicIds = function () {
        var $hidden = this.select('taskInfoHiddenSelector');
        var surgeryDateTime, time;

        if (!this.treatmentId) {
            this.medicalRecordId = $hidden.data('medicalRecordId');
            this.patientId = $hidden.data('patientId');
            this.treatmentId = $hidden.data('treatmentId');
            this.clientId = $hidden.data('clientId');
            this.providerName = $hidden.data('providerName');
            this.absoluteEventDate = $hidden.data('surgeryDate');
            this.absoluteEventTime = $hidden.data('surgeryTime');
            this.absoluteEventType = $hidden.data('absoluteEventType');
        }

        if(this.absoluteEventDate) {
            time = this.absoluteEventTime ? this.absoluteEventTime : '';
            surgeryDateTime = "{0} {1}".format(Utility.toVancouverDate(this.absoluteEventDate), time);
        }

        return {
            medicalRecordId: this.medicalRecordId,
            patientId: this.patientId,
            clientId: this.clientId,
            treatmentId: this.treatmentId,
            currentAbsoluteEventDate: surgeryDateTime,
            absoluteEventType: this.absoluteEventType,
            providerName: this.providerName
        };
    };

    this.onAddTaskButtonClicked = function () {
        this.trigger('showAddTasksDialog', this.getBasicIds());
    };

    this.onEditSurgeryButtonClicked = function () {

        var ids = this.getBasicIds();
        if (ids.currentAbsoluteEventDate) {
            this.trigger('showEditTreatmentDialog', this.getBasicIds());
        }
    };

    this.onDeleteButtonClicked = function () {
        this.trigger('showDeleteTreatmentDialog', {
            ids: this.getBasicIds()
        });
    };

    this.archiveTreatment = function () {
        var basicIds = this.getBasicIds();
        var me = this;

        $.ajax({
            url: URLs.ARCHIVE_TREATMENT.format(basicIds.patientId, basicIds.medicalRecordId),
            type: 'POST',
            success: function (data) {
                if (data.resp === true) {
                    me.trigger('archiveTreatmentSuccess');
                }
            }
        });
    };

    this.OnTreatmentAnchorClicked = function () {

        var $ele = this.$node;
        var archived = $ele.hasClass('archived-treatment');

        if ($ele.hasClass('ui-state-active')) {
            this.$node.removeClass('ui-state-active');
            this.trigger('medicalRecordListSelected', {
                archived: archived
            });
        } else {
            this.$node.siblings().removeClass('ui-state-active');
            this.$node.addClass('ui-state-active');
            this.trigger('medicalRecordListSelected', {
                medicalRecordId: $ele.data('id'),
                archived: archived
            });
        }

    };

    this.OnTreatmentAnchorSelected = function (e, data) {
        var $ele = this.$node;

        if ($ele.data('id') === +data.medicalRecordId) {

            var archived = $ele.hasClass('archived-treatment');

            if (!$ele.hasClass('ui-state-active')) {
                this.$node.siblings().removeClass('ui-state-active');
                this.$node.addClass('ui-state-active');
                this.trigger('medicalRecordListSelected', {
                    medicalRecordId: $ele.data('id'),
                    archived: archived
                });
            }
        }
    };

    this.initTreatmentTabTool = function () {
        var $ele = this.$node;

        if (+this.attr.currentMedicalRecordId === +$ele.data('id')) {
            this.$node.addClass('ui-state-active');
            this.trigger('medicalRecordListSelected', {
                medicalRecordId: $ele.data('id'),
                archived: $ele.hasClass('archived-treatment')
            });
        }
    };

    this.unactiveTreatmentList = function () {
        this.$node.removeClass('ui-state-active');
    };

    this.after('initialize', function () {

        this.initTreatmentTabTool();

        this.on('click', {
            treatmentListAnchorSelector: this.OnTreatmentAnchorClicked
        });

        if (!this.attr.archived) {
            this.on('click', {
                addTaskButtonSelector: this.onAddTaskButtonClicked,
                editButtonSelector: this.onEditSurgeryButtonClicked
            });
        }

        this.on('click', {
            deleteButtonSelector: this.onDeleteButtonClicked
        });

        this.on(document, 'taskIndicatorSelected', this.OnTreatmentAnchorSelected);
        this.on(document, 'taskStatusClearFilter', this.unactiveTreatmentList);
    });
}

module.exports = flight.component(TreatmentToolbar);

