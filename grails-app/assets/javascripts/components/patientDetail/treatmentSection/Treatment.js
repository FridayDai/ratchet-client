var flight = require('flight');
var TaskSection = require('../taskSection/TaskSection');
var TeamSection = require('../teamSection/TeamSection');
var ActivitySection = require('../activitySection/ActivitySection');
var URLs = require('../../../constants/Urls');
var STRINGs = require('../../../constants/Strings');
var Notifications = require('../../common/Notification');
var Utility = require('../../../utils/Utility');

function Treatment() {
    this.attributes({
        subTabsContainerSelector: '.sub-tabs',

        treatmentToolListSelector: "#treatment-tool",
        addTaskButtonSelector: '#addTasks',
        notifyButtonSelector: '#notifyTasks',
        generateCodeButtonSelector: '#generateCode',
        moreDropdownButtonSelector: '.drop-down-toggle',
        moreDropdownListSelector: '.drop-down-lists',
        editSurgeryButtonSelector: '.surgeryTime-edit',
        archiveButtonSelector: '.archived-active',

        surgeryDateHiddenSelector: '.hidden-surgery-time-picker'
    });

    this.initSubTabs = function() {
        var me = this;

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

                Utility.progress(true);
            },
            load: function (event, ui) {
                var type = ui.tab.data("type");
                if (type) {
                    switch (type) {
                        case "Task":
                            me.taskNode = ui.panel.get(0);
                            TaskSection.attachTo(ui.panel);
                            break;

                        case "Team":
                            me.teamNode = ui.panel.get(0);
                            TeamSection.attachTo(ui.panel);
                            break;

                        case "Activity":
                            //RC.pages.activity.init(ui.panel, ui.panel.find("#activityTable"));
                            me.activityNode = ui.panel.get(0);
                            ActivitySection.attachTo(ui.panel);
                            break;
                    }
                }

                Utility.progress(false);
            },
            disabled: [4, 5]
        });
    };

    this.getBasicIds = function () {
        var $button = this.select('treatmentToolListSelector');

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

    this.onAddTaskButtonClicked = function (e) {
        e.preventDefault();

        this.trigger('showAddTasksDialog', _.extend(this.getBasicIds(), {
            currentSurgeryDate: this.select('surgeryDateHiddenSelector').text().trim()
        }));
    };

    this.onGenerateCodeButtonClicked = function (e) {
        e.preventDefault();

        this.trigger('showGenerateCodeDialog', this.getBasicIds());
    };

    this.onNotifyButtonClicked = function() {
        var basicIds = this.getBasicIds();

        $.ajax({
            url: URLs.NOTIFY_TREATMENT_TASKS.format(basicIds.patientId, basicIds.medicalRecordId)
        }).done(function () {
            Notifications.showFadeOutMsg(STRINGs.SEND_NOTIFY_EMAIL_SUCCESS);
        });
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
                    me.trigger('archiveTreatmentSuccess');
                }
            }
        });
    };

    this.onNoActiveTask = function () {
        this.select('generateCodeButtonSelector')
            .attr('disabled', true)
            .addClass('btn-generate-code-disabled');
        this.select('notifyButtonSelector')
            .attr('disabled', true)
            .addClass('btn-generate-code-disabled');
    };

    this.after('initialize', function () {
        this.initSubTabs();

        this.on('click', {
            addTaskButtonSelector: this.onAddTaskButtonClicked,
            notifyButtonSelector: this.onNotifyButtonClicked,
            generateCodeButtonSelector: this.onGenerateCodeButtonClicked,
            moreDropdownButtonSelector: this.onMoreButtonClicked,
            editSurgeryButtonSelector: this.onEditSurgeryButtonClicked,
            archiveButtonSelector: this.onArchiveButtonClicked
        });

        this.hideMoreDropdownListBind = _.bind(this.hideMoreDropdownList, this);

        this.on('noActiveTask', this.onNoActiveTask);
    });

    this.before('teardown', function () {
        this.select('subTabsContainerSelector').tabs('destroy');

        _.each([this.taskNode, this.teamNode, this.activityNode], function (node) {
            if (node) {
                var instances = flight.registry.findInstanceInfoByNode(node);

                _.each(instances, function (instance) {
                    instance.instance.teardown();
                });
            }
        });
    });
}

module.exports = flight.component(Treatment);
