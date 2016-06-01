var flight = require('flight');

var Notifications = require('../../../common/Notification');
var URLs = require('../../../../constants/Urls');
var Utility = require('../../../../utils/Utility');

function TreatmentToolbar() {
    this.attributes({
        archived: null,

        treatmentListAnchorSelector: '.ui-tabs-anchor',
        addTaskButtonSelector: '.addTasks',
        editButtonSelector: '.event-time-edit',
        archiveButtonSelector: '.archived-active',
        deleteButtonSelector: '.treatment-delete',
        taskInfoHiddenSelector: '.task-info-hidden',

        treatmentDateSelector: '.treatment-time-picker'
    });

    this.getBasicIds = function () {
        var $hidden = this.select('taskInfoHiddenSelector');

        if (!this.treatmentId) {
            this.medicalRecordId = $hidden.data('medicalRecordId');
            this.patientId = $hidden.data('patientId');
            this.treatmentId = $hidden.data('treatmentId');
            this.clientId = $hidden.data('clientId');
            this.surgeryDate = $hidden.data('surgeryDate');
        }

        return {
            medicalRecordId: this.medicalRecordId,
            patientId: this.patientId,
            clientId: this.clientId,
            treatmentId: this.treatmentId,
            currentSurgeryDate: Utility.toVancouverDate(this.surgeryDate)
        };
    };

    this.onAddTaskButtonClicked = function () {
        this.trigger('showAddTasksDialog', this.getBasicIds());
    };

    this.onEditSurgeryButtonClicked = function () {

        var ids = this.getBasicIds();
        if (ids.currentSurgeryDate) {
            this.trigger('showEditSurgeryDialog', this.getBasicIds());
        }
    };

    this.onArchiveButtonClicked = function (e) {
        e.preventDefault();

        var me = this;
        this.select('moreDropdownListSelector').hide();

        Notifications.confirm({
            title: 'ARCHIVE TREATMENT',
            message: 'Warning: This action cannot be undone.'
        }, {
            buttons: [
                {
                    text: 'Archive',
                    'class': 'btn-agree',
                    click: function () {
                        // Warning dialog close
                        $(this).dialog('close');

                        // Bulk import dialog close
                        me.archiveTreatment();
                    }
                }, {
                    text: 'Cancel',
                    click: function () {
                        $(this).dialog('close');
                    }
                }
            ]
        });
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

        if($ele.data('id') === +data.medicalRecordId) {

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

    this.unactiveTreatmentList = function () {
        this.$node.removeClass('ui-state-active');
    };

    this.after('initialize', function () {

        this.on('click', {
            treatmentListAnchorSelector: this.OnTreatmentAnchorClicked
        });

        if (!this.attr.archived) {
            this.on('click', {
                addTaskButtonSelector: this.onAddTaskButtonClicked,
                editButtonSelector: this.onEditSurgeryButtonClicked,
                archiveButtonSelector: this.onArchiveButtonClicked
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

