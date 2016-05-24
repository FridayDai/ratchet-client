var flight = require('flight');
var ClearTabCache = require('../../../shared/functional/ClearTabCache');
var TreatmentLevelTabToolbar = require('./TreatmentListLevelTabToolbar');
var TreatmentTabToolbar = require('./TreatmentTabToolbar');
var Task = require('../Task');

//var Utility = require('../../../../utils/Utility');
//var URLs = require('../../../../constants/Urls');

//var TAB_TEMPLATE = '<li><a href="{0}">{1}</a></li>';
//
//var ARCHIVED_ICON_TEMPLATE = '<i class="icon-archived"></i>';

var GROUP_TAB_EFFECT_EVENTS = [
    'addTreatmentSuccess',
    'addTasksSuccess',
    'editSurgeryDateSuccess',
    'archiveTreatmentSuccess',
    'deleteTreatmentSuccess'
];

function TreatmentList() {
    this.attributes({
        clearCacheEvents: GROUP_TAB_EFFECT_EVENTS,
        noTreatmentContainerSelector: '.no-treatment-container',
        treatmentTabsContainerSelector: '.treatment-tabs-container',
        treatmentPanelContainerSelector: '.treatment-panel-container',
        treatmentManagerContainerSelector: '.treatment-manage-container',
        tabListSelector: '.tab-list',
        tabSelector: '.tab-list .treatment-li'
    });

    this.initTreatmentsTab = function () {

        TreatmentLevelTabToolbar.attachTo(this.attr.treatmentManagerContainerSelector);

        if (this.select('tabSelector').length > 0) {
            _.forEach(this.select('tabSelector'), function (element) {
                TreatmentTabToolbar.attachTo( $(element),  {
                    archived:  $(element).hasClass('archived-treatment')
                });
            });
        }

        Task.attachTo(this.attr.treatmentPanelContainerSelector);
    };

    this.onAddTreatmentSuccess = function () {
        this.loadSelf();

        //this.addTab(data);

        //this.updateAddTreatmentButtonStatus();

        //var $noTreatmentContainer = this.select('noTreatmentContainerSelector');
        //
        //if ($noTreatmentContainer.is(':visible')) {
        //    $noTreatmentContainer.hide();
        //}
    };

    this.showNoTreatmentContainer = function () {
        this.select('noTreatmentContainerSelector').show();
    };

    this.onArchiveTreatmentSuccess = function () {
        this.loadSelf();
        //var $activeTab = this.getCurrentActiveTab();
        //
        //this.updateTreatment({
        //    key: 'archived',
        //    value: true
        //});
        //
        //$activeTab
        //    .addClass('archived-treatment')
        //    .find('a')
        //    .prepend(ARCHIVED_ICON_TEMPLATE);
    };

    this.updateTreatment = function () {
        this.loadSelf();

        //var activeIndex = this.select('treatmentTabsContainerSelector').tabs('option', 'active');
        //var $activeTab = this.getCurrentActiveTab();
        //
        //this.updateTreatmentUrl($activeTab, param);
        //this.teardownTreatment($activeTab);
        //
        //$activeTab.data("loaded", false);
        //
        //this.select('treatmentTabsContainerSelector').tabs('load', activeIndex);
    };

    this.onAddTasksSuccess = function () {
        this.updateTreatment();
    };

    this.onEditSurgeryDateSuccess = function () {
        this.loadSelf();
    };

    this.onDeleteTreatmentSuccess = function () {
        this.loadSelf();

        //var $activeTab = this.getCurrentActiveTab();
        //this.teardownTreatment($activeTab);
        //
        //var activeTabPanelId = $activeTab.attr('aria-controls');
        //$activeTab.remove();
        //$('#' + activeTabPanelId).remove();
        //this.select('treatmentTabsContainerSelector').tabs('refresh');
        //
        //if (this.select('tabSelector').length === 0) {
        //    this.showNoTreatmentContainer();
        //}

        //this.updateAddTreatmentButtonStatus();
    };

    this.showTabSection = function () {
        this.$node.children(':first').css('visibility', 'visible');
    };

    this.loadSelf = function () {
        this.trigger('refreshTopTab', {index: 0});
    };

    this.after('initialize', function () {
        this.showTabSection();
        this.initTreatmentsTab();

        this.on(document, 'addTreatmentSuccess', this.onAddTreatmentSuccess);
        this.on(document, 'addTasksSuccess', this.onAddTasksSuccess);
        this.on(document, 'editSurgeryDateSuccess', this.onEditSurgeryDateSuccess);
        this.on(document, 'archiveTreatmentSuccess', this.onArchiveTreatmentSuccess);
        this.on(document, 'deleteTreatmentSuccess', this.onDeleteTreatmentSuccess);
    });
}

module.exports = flight.component(ClearTabCache, TreatmentList);
