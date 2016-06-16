require('momentTZ');

var flight = require('flight');
var URLs = require('../../constants/Urls');

var moment = require('moment');

var ALERT_POPUP_TEMPLATE = [
    '<div class="alert-popup hidden">',
        '<div class="alert-popup-header">',
            'Alerts',
        '</div>',
        '<div class="alert-popup-body">',
        '</div>',
    '</div>'
].join('');

var LOADING_MASK_TEMPLATE = [
    '<div class="alert-popup-load-mask">',
        '<i class="fa fa-refresh fa-spin fa-2x fa-fw"></i>',
    '</div>'
].join('');

var NO_NEW_ALERT_TEMPLATE = [
    '<div class="no-new-alert">',
        '<i class="fa fa-bell-slash-o fa-2x no-new-alert-icon"></i>',
        'No New Alert.',
    '</div>'
].join('');

var ALERT_LIST_TEMPLATE = [
    '<div class="alert-list hidden">',
    '</div>'
].join('');

var ALERT_LIST_ITEM_TEMPLATE = [
    '<div class="alert-list-item">',
        '<span class="alert-message"><a href="/patients/{2}">{0} {1}</a> {3}</span>',
        '<span class="alert-time">{4}</span>',
    '</div>'
].join('');

var ALERT_TYPE_MESSAGE_MAPPING = {
    'VOICE_CALL_FOLLOW_UP': 'has a phone call request',
    'RISK_ASSESSMENT_AND_PREDICTION_TOOL': 'is indicated high risk by the risk assessment tool',
    'PATIENT_FOLLOW_UP_TOOL': 'requires post-op assistance',
    'EMAIL_BOUNCED': 'has undelivered email'
};


function HeaderPanel() {
    this.attributes({
        alertIconSelector: '.alert-icon',
        alertBadgeSelector: '.alert-icon .badge'
    });

    this.initAlertPopup = function () {
        this.$alertPopup = $(ALERT_POPUP_TEMPLATE).insertAfter(this.select('alertIconSelector').next());
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

        if (this.$alertPopup.is(':visible')) {
            this.$alertPopup.hide();
            $('html').off('click', this.hideAlertPopupBind);
        } else {
            this.$alertPopup.show();
            $('html').click(this.hideAlertPopupBind);
            this.showLoadingMask();
            this.getAlerts();
        }
    };

    this.hideAlertPopup = function () {
        if (this.$alertPopup.is(':visible')) {
            this.$alertPopup.hide();
            $('html').off('click', this.hideAlertPopupBind);
        }
    };

    this.getAlertCount = function () {
        var me = this;

        $.ajax({
            url:URLs.GET_ALERT_COUNT,
            method: 'GET',
            dropProcess: true
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

    this.showLoadingMask = function () {
        var $loadingMask = this.$alertPopup.find('.alert-popup-load-mask');

        if ($loadingMask.length > 0) {
            $loadingMask.show();
        } else {
            this.$alertPopup.find('.alert-popup-body').append(LOADING_MASK_TEMPLATE);
        }
    };

    this.hideLoadingMask = function () {
        this.$alertPopup.find('.alert-popup-load-mask').hide();
    };

    this.showNoNewAlert = function () {
        var $noNewAlert = this.$alertPopup.find('.no-new-alert');

        if ($noNewAlert.length > 0) {
            $noNewAlert.show();
        } else {
            this.$alertPopup.find('.alert-popup-body').append(NO_NEW_ALERT_TEMPLATE);
        }
    };

    this.hideNoNewAlert = function () {
        this.$alertPopup.find('.no-new-alert').hide();
    };

    this.showAlertList = function (items) {
        var me = this;
        var $alertList = this.$alertPopup.find('.alert-list');

        if ($alertList.length > 0) {
            $alertList.show();
        } else {
            $alertList = this.$alertPopup.find('.alert-popup-body').append(ALERT_LIST_TEMPLATE);
        }

        $alertList.empty();
        _.each(items, function (item) {
            $alertList.append(ALERT_LIST_ITEM_TEMPLATE.format(
                item.firstName,
                item.lastName,
                item.patientId,
                ALERT_TYPE_MESSAGE_MAPPING[item.type],
                me.getAlertTimeLabel(item.dateCreated)
            ));
        });
    };

    this.hideAlertList = function () {
        this.$alertPopup.find('.alert-list').hide();
    };

    this.getAlertTimeLabel = function (timestamp) {
        return moment(timestamp)
            .tz('America/Vancouver')
            .calendar(moment().tz('America/Vancouver'), {
                sameDay: '[Today at] h:mm a',
                nextDay: 'MMM D [at] h:mm a',
                nextWeek: 'MMM D [at] h:mm a',
                lastDay: '[Yesterday at] h:mm a',
                lastWeek: 'MMM D [at] h:mm a',
                sameElse: 'MMM D [at] h:mm a'
            });
    };

    this.getAlerts = function () {
        var me = this;

        $.ajax({
            url:URLs.GET_ALERTS,
            data: {
                max: 99
            },
            method: 'GET',
            dropProcess: true
        })
            .done(function (data) {
                var count = data.totalCount;

                if (data.enableAlert) {
                    me.showAlertIcon(count);

                    if (count === 0) {
                        me.showNoNewAlert();
                        me.hideAlertList();
                    } else {
                        me.hideNoNewAlert();
                        me.showAlertList(data.items);
                    }
                } else {
                    me.hideAlertIcon();
                }

                me.hideLoadingMask();
            });
    };

    this.after('initialize', function () {
        this.getAlertCount();

        this.initAlertPopup();

        setInterval(_.bind(this.getAlertCount, this), 120000);

        this.hideAlertPopupBind = _.bind(this.hideAlertPopup, this);

        this.on('click', {
            alertIconSelector: this.onAlertIconClicked
        });

        this.on(document, 'alertHasBeenResolved', this.getAlertCount);
    });
}

module.exports = flight.component(HeaderPanel);
