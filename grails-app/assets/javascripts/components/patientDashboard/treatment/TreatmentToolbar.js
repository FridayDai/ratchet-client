var flight = require('flight');

var Notifications = require('../../common/Notification');
var URLs = require('../../../constants/Urls');

function TreatmentToolbar() {
    this.attributes({
        archived: null,

        addTaskButtonSelector: '#addTasks',
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
        }

        return {
            medicalRecordId: this.medicalRecordId,
            patientId: this.patientId,
            clientId: this.clientId,
            treatmentId: this.treatmentId
        };
    };

    this.onAddTaskButtonClicked = function (e) {
        e.preventDefault();

        this.trigger('showAddTasksDialog', _.extend(this.getBasicIds(), {
            currentSurgeryDate: this.select('treatmentDateSelector').text().trim()
        }));
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

    this.onEditSurgeryButtonClicked = function (e) {
        e.preventDefault();

        this.select('moreDropdownListSelector').hide();
        this.trigger('showEditSurgeryDialog', _.assign(this.getBasicIds(), {
            currentSurgeryDate: this.select('treatmentDateSelector').text().trim()
        }));
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

    this.onDeleteButtonClicked = function (e) {
        e.preventDefault();

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

    this.hideNotAvailableButtons = function () {
        this.select('editSurgeryButtonSelector').hide();
        this.select('archiveButtonSelector').hide();
    };

    this.after('initialize', function () {
        if (!this.attr.archived) {
            this.on('click', {
                addTaskButtonSelector: this.onAddTaskButtonClicked,
                editSurgeryButtonSelector: this.onEditSurgeryButtonClicked,
                archiveButtonSelector: this.onArchiveButtonClicked
            });
        } else {
            this.hideNotAvailableButtons();
        }

        this.on('click', {
            moreDropdownButtonSelector: this.onMoreButtonClicked,
            deleteButtonSelector: this.onDeleteButtonClicked
        });

        this.hideMoreDropdownListBind = _.bind(this.hideMoreDropdownList, this);
    });
}

module.exports = flight.component(TreatmentToolbar);
