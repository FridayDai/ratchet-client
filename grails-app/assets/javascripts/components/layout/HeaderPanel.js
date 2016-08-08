require('momentTZ');

var flight = require('flight');
var URLs = require('../../constants/Urls');
var WithChildren = require('../common/WithChildren');

var MenuPanel = require('./MenuPanel');
var ProfileMenuPanel = require('./ProfileMenuPanel');

var AlertPopupDialog = require('./AlertPopupDialog');

var ALERT_COUNT_POLL_INTERVAL = 120000;

function HeaderPanel() {
    this.attributes({
        alertIconSelector: '.alert-icon',
        alertBadgeSelector: '.alert-icon .badge',
        mainMenuPanelSelector: '.main-menu-list',
        menuIconSelector: '.menu-icon',
        profileMenuPanelSelector: '.profile-menu-list'
    });

    this.children({
        mainMenuPanelSelector: MenuPanel,
        profileMenuPanelSelector: ProfileMenuPanel
    });

    this.initAlertPopup = function () {
        this.alertPopup = AlertPopupDialog.init(this.select('alertIconSelector').next(), this);
    };

    this.showAlertIcon = function (count) {
        var $badge = this.select('alertBadgeSelector');

        this.select('alertIconSelector').removeClass('hidden');

        if (count > 0 && count <= 99) {
            $badge.text(count).show();
        } else if (count > 99) {
            $badge.text('99+').show();
        } else {
            $badge.hide();
        }
    };

    this.hideAlertIcon = function () {
        var $icon = this.select('alertIconSelector');

        if (!$icon.hasClass('hidden')) {
            $icon.addClass('hidden');
        }
    };

    this.onAlertIconClicked = function (e) {
        e.preventDefault();
        e.stopPropagation();

        this.alertPopup.toggle();
    };

    this.getAlertCount = function () {
        var me = this;

        $.ajax({
            url:URLs.GET_ALERT_COUNT,
            method: 'GET',
            dropProcess: true,
            ignoreError: true,
            data: {
                timestamp: (new Date()).getTime()
            }
        })
            .done(function (data) {
                if (data.enableAlert) {
                    me.showAlertIcon(data.totalCount);
                } else {
                    me.hideAlertIcon();
                }
            })
            .fail(function () {
                me.hideAlertIcon();
            });
    };

    this.after('initialize', function () {
        this.getAlertCount();

        this.initAlertPopup();

        setInterval(_.bind(this.getAlertCount, this), ALERT_COUNT_POLL_INTERVAL);

        this.on('click', {
            alertIconSelector: this.onAlertIconClicked
        });

        this.on(document, 'alertHasBeenUpdated', this.getAlertCount);
        //this.on(document, 'archiveTreatmentSuccess', this.getAlertCount);
    });
}

module.exports = flight.component(
    WithChildren,
    HeaderPanel
);
