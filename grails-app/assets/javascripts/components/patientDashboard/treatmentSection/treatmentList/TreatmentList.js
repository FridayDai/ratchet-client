var flight = require('flight');
var ClearTabCache = require('../../../shared/functional/ClearTabCache');
var TreatmentLevelTabToolbar = require('./TreatmentListLevelTabToolbar');
var TreatmentTabToolbar = require('./TreatmentTabToolbar');
var Task = require('../Task');

//var Utility = require('../../../../utils/Utility');
//var URLs = require('../../../../constants/Urls');

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
        tabSelector: '.tab-list .treatment-li',
        currentMedicalRecordId: null
    });

    this.initTreatmentsTab = function () {
        var currentMedicalRecordId = this.attr.currentMedicalRecordId;

        TreatmentLevelTabToolbar.attachTo(this.attr.treatmentManagerContainerSelector);

        if (this.select('tabSelector').length > 0) {
            _.forEach(this.select('tabSelector'), function (element) {
                TreatmentTabToolbar.attachTo( $(element),  {
                    archived:  $(element).hasClass('archived-treatment'),
                    currentMedicalRecordId: currentMedicalRecordId
                });
            });
        }

        Task.attachTo(this.attr.treatmentPanelContainerSelector);
    };

    this.onAddTreatmentSuccess = function () {
        this.loadSelf();
    };

    this.showNoTreatmentContainer = function () {
        this.select('noTreatmentContainerSelector').show();
    };

    this.onArchiveTreatmentSuccess = function () {
        this.loadSelf();
    };

    this.onAddTasksSuccess = function (e, data) {
        this.loadSelf(data ? data.medicalRecordId : null);
    };

    this.onEditSurgeryDateSuccess = function (e, data) {
        this.loadSelf(data ? data.medicalRecordId : null);
    };

    this.onDeleteTreatmentSuccess = function () {
        this.loadSelf();
    };

    this.showTabSection = function () {
        this.$node.children(':first').css('visibility', 'visible');
    };

    this.loadSelf = function (medicalRecordId) {
        this.trigger('refreshTopTab', {index: 0, medicalRecordId: medicalRecordId});
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
