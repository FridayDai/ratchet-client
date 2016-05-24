var flight = require('flight');

var Notifications = require('../../../common/Notification');
var URLs = require('../../../../constants/Urls');
var Utility = require('../../../../utils/Utility');

function TreatmentToolbar() {
    this.attributes({
        archived: null,

        addTaskButtonSelector: '.addTasks',
        moreDropdownButtonSelector: '.drop-down-toggle',
        moreDropdownListSelector: '.drop-down-lists',
        editSurgeryButtonSelector: '.surgeryTime-edit',
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

    this.onMoreButtonClicked = function (e) {
        e.preventDefault();
        e.stopPropagation();

        var $dropdownList = this.select('moreDropdownListSelector');

        if ($dropdownList.is(':visible')) {
            $dropdownList.hide();
            $('body').off('click', this.hideMoreDropdownListBind);

        } else {
            $dropdownList.show();

            $('body').click(this.hideMoreDropdownListBind);
        }
    };

    this.hideMoreDropdownList = function () {
        var $dropdownList = this.select('moreDropdownListSelector');

        if ($dropdownList.is(':visible')) {
            $dropdownList.hide();
            $('body').off('click', this.hideMoreDropdownListBind);
        }
    };

    this.onEditSurgeryButtonClicked = function () {
        var ids = this.getBasicIds();
        if(ids.currentSurgeryDate) {
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

    //this.hideNotAvailableButtons = function () {
    //    this.select('editSurgeryButtonSelector').hide();
    //    this.select('archiveButtonSelector').hide();
    //};

    this.initTreatmentList = function () {
        this.on('click', function () {
            var $ele = this.$node;
            if (!$ele.hasClass('ui-state-active')) {
                this.$node.siblings().removeClass('ui-state-active');
                this.$node.addClass('ui-state-active');
            }

            this.trigger('medicalRecordListSelected', {
                medicalRecordId: $ele.data('id')
            });
        });
    };

    this.after('initialize', function () {
        this.initTreatmentList();

        if (!this.attr.archived) {
            this.on('click', {
                addTaskButtonSelector: this.onAddTaskButtonClicked,
                editSurgeryButtonSelector: this.onEditSurgeryButtonClicked,
                archiveButtonSelector: this.onArchiveButtonClicked
            });
        }
        // else {
        //    this.hideNotAvailableButtons();
        //}

        this.on('click', {
            //moreDropdownButtonSelector: this.onMoreButtonClicked,
            deleteButtonSelector: this.onDeleteButtonClicked
        });

        //this.hideMoreDropdownListBind = _.bind(this.hideMoreDropdownList, this);
    });
}

module.exports = flight.component(TreatmentToolbar);

