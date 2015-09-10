var flight = require('flight');
var TaskSection = require('../taskSection/TaskSection');
var TeamSection = require('../teamSection/TeamSection');
var ActivitySection = require('../activitySection/ActivitySection');
var URLs = require('../../../constants/Urls');
var Notifications = require('../../common/Notification');

function Treatment() {
    this.attributes({
        subTabsContainerSelector: '.sub-tabs',

        generateCodeButtonSelector: '#generateCode',
        moreDropdownButtonSelector: '.drop-down-toggle',
        moreDropdownListSelector: '.drop-down-lists',
        editSurgeryButtonSelector: '.surgeryTime-edit',
        archiveButtonSelector: '.archived-active',

        surgeryDateHiddenSelector: '.hidden-surgery-time-picker'
    });

    this.initSubTabs = function() {
        this.select('subTabsContainerSelector').tabs({
            cache: true,
            ajaxOptions: {cache: true},
            beforeLoad: function (event, ui) {
                if (ui.tab.data("loaded")) {
                    event.preventDefault();
                    return;
                }

                ui.jqXHR.success(function () {
                    ui.tab.data("loaded", true);
                });

            },
            load: function (event, ui) {
                var type = ui.tab.data("type");
                if (type) {
                    switch (type) {
                        case "Activity":
                            //RC.pages.activity.init(ui.panel, ui.panel.find("#activityTable"));
                            ActivitySection.attachTo(ui.panel);
                            break;

                        case "Task":
                            TaskSection.attachTo(ui.panel);
                            break;

                        case "Team":
                            TeamSection.attachTo(ui.panel);
                            break;
                    }
                }
            },
            disabled: [4, 5]
        });
    };

    this.getBasicIds = function () {
        var $button = this.select('generateCodeButtonSelector');

        if (!this.treatmentId) {
            this.treatmentId = $button.data("treatmentId");
            this.medicalRecordId = $button.data("medicalRecordId");
            this.patientId = $button.data("patientId");
            this.clientId = $button.data("clientId");
        }

        return {
            treatmentId: this.treatmentId,
            medicalRecordId: this.medicalRecordId,
            patientId: this.patientId,
            clientId: this.clientId
        };
    };

    this.onGenerateCodeButtonClicked = function (e) {
        e.preventDefault();

        this.trigger('showGenerateCodeDialog', this.getBasicIds());
    };

    this.onMoreButtonClicked = function (e) {
        e.preventDefault();
        e.stopPropagation();

        var $dropdownList = this.select('moreDropdownListSelector');

        if ($dropdownList.is(':visible')) {
            $dropdownList.hide();
        } else {
            $dropdownList.show();
        }
    };

    this.onEditSurgeryButtonClicked = function (e) {
        e.preventDefault();

        this.select('moreDropdownListSelector').hide();
        this.trigger('showEditSurgeryDialog', _.assign(this.getBasicIds(), {
            currentSurgeryDate: this.select('surgeryDateHiddenSelector').text().trim()
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
                        $(this).dialog("close");

                        // Bulk import dialog close
                        me.archiveTreatment();
                    }
                }, {
                    text: 'Cancel',
                    click: function () {
                        $(this).dialog("close");
                    }
                }
            ]
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
                    //window.location.reload();
                    me.trigger('archiveTreatmentSuccess');
                }
            }
        });
    };

    this.after('initialize', function () {
        this.initSubTabs();

        this.on('click', {
            generateCodeButtonSelector: this.onGenerateCodeButtonClicked,
            moreDropdownButtonSelector: this.onMoreButtonClicked,
            editSurgeryButtonSelector: this.onEditSurgeryButtonClicked,
            archiveButtonSelector: this.onArchiveButtonClicked
        });
    });

    this.before('teardown', function () {
        //TODO: teardown task, team and activities section
        this.select('subTabsContainerSelector').tabs('destroy');
    });
}

module.exports = flight.component(Treatment);
