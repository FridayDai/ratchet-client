var flight = require('flight');

var TreatmentLevelTabToolbar = require('./TreatmentListLevelTabToolbar');
var Treatment = require('../treatment/Treatment');

var Utility = require('../../../utils/Utility');
var URLs = require('../../../constants/Urls');

var TAB_TEMPLATE = '<li><a href="{0}">{1}</a></li>';

var ARCHIVED_ICON_TEMPLATE = '<i class="icon-archived"></i>';

function TreatmentList() {
    this.attributes({
        noTreatmentContainerSelector: '.no-treatment-container',
        treatmentTabsContainerSelector: '.treatment-tabs-container',
        tabListSelector: '.tab-list',
        tabSelector: '.tab-list li'
    });

    this.initTreatmentsTab = function() {
        var me = this;

        this.select('treatmentTabsContainerSelector').tabs({
            cache: true,
            ajaxOptions: {cache: true},
            beforeLoad: function (event, ui) {
                if (ui.tab.data('loaded')) {
                    event.preventDefault();
                    return;
                }

                ui.jqXHR.success(function () {
                    ui.tab.data('loaded', true);
                });

                Utility.progress(true);
            },
            load: function (event, ui) {
                Treatment.attachTo(ui.panel);

                me.initTreatmentTabToolbar();

                Utility.progress(false);
            }
        });

        if (!this.select('tabSelector').length) {
            this.initTreatmentTabToolbar();
        }
    };

    this.initTreatmentTabToolbar = function() {
        var $container = this.select('treatmentTabsContainerSelector');

        $container.show();

        _.once(function() {
            TreatmentLevelTabToolbar.attachTo($container);
        })();
    };

    this.onAddTreatmentSuccess = function (e, data) {
        this.addTab(data);

        this.updateAddTreatmentButtonStatus();

        var $noTreatmentContainer = this.select('noTreatmentContainerSelector');

        if ($noTreatmentContainer.is(':visible')) {
            $noTreatmentContainer.hide();
        }
    };

    this.addTab = function (options) {

        var title = options.treatmentInfo.title + " " + options.treatmentInfo.tmpTitle;

        var url = URLs.SECTION_TREATMENT_TAB.format(
            options.patientId,
            options.clientId,
            options.medicalRecordId,
            options.treatmentInfo.id,
            options.treatmentDate,
            options.emailStatus,
            false,
            Date.now()
        );

        this.select('tabListSelector')
            .prepend(TAB_TEMPLATE.format(url, title));

        this.select('treatmentTabsContainerSelector')
            .tabs('refresh')
            .tabs('option', 'active', 0);
    };

    this.updateAddTreatmentButtonStatus = function () {
        this.trigger('updateAddTreatmentButton', {
            show: this.select('tabSelector').length < 3
        });
    };

    this.showNoTreatmentContainer = function () {
        this.select('noTreatmentContainerSelector').show();
    };

    this.getCurrentActiveTab = function () {
        var activeIndex = this.select('treatmentTabsContainerSelector').tabs('option', 'active');
        return $(this.select('tabSelector').get(activeIndex));
    };

    this.onArchiveTreatmentSuccess = function () {
        var $activeTab = this.getCurrentActiveTab();

        this.updateTreatment({
            key: 'archived',
            value: true
        });

        $activeTab
            .addClass('archived-treatment')
            .find('a')
            .prepend(ARCHIVED_ICON_TEMPLATE);
    };

    this.updateTreatment = function (param) {
        var activeIndex = this.select('treatmentTabsContainerSelector').tabs('option', 'active');
        var $activeTab = this.getCurrentActiveTab();

        this.updateTreatmentUrl($activeTab, param);
        this.teardownTreatment($activeTab);

        $activeTab.data("loaded", false);

        this.select('treatmentTabsContainerSelector').tabs('load', activeIndex);
    };

    this.teardownTreatment = function ($activeTab) {
        var tabPanelId = $activeTab.attr('aria-controls');

        flight.registry.findInstanceInfoByNode($('#' + tabPanelId).get(0))[0].instance.teardown();
    };

    this.updateTreatmentUrl = function ($activeTab, param) {
        var oldUrl = $activeTab.find('a').attr('href');

        if (param) {
            var regexp = new RegExp('&{0}=[^&]*'.format(param.key), 'g');

            $activeTab.find('a').attr('href', oldUrl.replace(regexp, '&{0}={1}'.format(param.key, param.value)));
        }
    };

    this.onAddTasksSuccess = function () {
        this.updateTreatment();
    };

    this.onEditSurgeryDateSuccess = function (e, data) {
        this.updateTreatment({
            key: 'surgeryTime',
            value: data.newDate
        });
    };

    this.onDeleteTreatmentSuccess = function () {
        var $activeTab = this.getCurrentActiveTab();

        this.teardownTreatment($activeTab);

        var activeTabPanelId = $activeTab.attr('aria-controls');
        $activeTab.remove();
        $('#' + activeTabPanelId).remove();
        this.select('treatmentTabsContainerSelector').tabs('refresh');

        if (this.select('tabSelector').length === 0) {
            this.showNoTreatmentContainer();
        }

        this.updateAddTreatmentButtonStatus();
    };

    this.showTabSection = function () {
        this.$node.children(':first').css('visibility', 'visible');
    };

    this.after('initialize', function () {
        this.showTabSection();
        this.initTreatmentsTab();

        this.on(document, 'addTreatmentSuccess', this.onAddTreatmentSuccess);

        this.on(document, 'archiveTreatmentSuccess', this.onArchiveTreatmentSuccess);
        this.on(document, 'addTasksSuccess', this.onAddTasksSuccess);
        this.on(document, 'editSurgeryDateSuccess', this.onEditSurgeryDateSuccess);
        this.on(document, 'deleteTreatmentSuccess', this.onDeleteTreatmentSuccess);
    });

    this.before('teardown', function () {
        this.select('treatmentTabsContainerSelector').tabs('destroy');
    });
}

module.exports = flight.component(TreatmentList);
