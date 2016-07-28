var moment = require('moment');

var URLs = require('../../constants/Urls');

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
        'No active alerts',
    '</div>'
].join('');

var ALERT_LIST_TEMPLATE = [
    '<div class="alert-list hidden">',
    '</div>'
].join('');

var ALERT_LIST_ITEM_TEMPLATE = [
    '<div class="alert-list-item">',
        '<a href="/patients/{2}">',
            '<span class="alert-message"><span class="patient-name">{0} {1}</span> {3}</span>',
            '<span class="alert-time">{4}</span>',
        '</a>',
    '</div>'
].join('');

var ALERT_TYPE_MESSAGE_MAPPING = {
    'VOICE_CALL_FOLLOW_UP': 'has a phone call request',
    'RISK_ASSESSMENT_AND_PREDICTION_TOOL': 'is indicated high risk by the risk assessment tool',
    'PATIENT_FOLLOW_UP_TOOL': 'requires post-op assistance',
    'DISCHARGE_PLAN': 'needs discharge plan confirmed',
    'SNF': 'SNF stay needs follow up',
    'EMAIL_BOUNCED': 'has undeliverable email',
    'EVENT_EXPIRED': 'did not respond to {0}'
};

var $node, _host;

function hideAlertPopup() {
    $node.hide();
}

function showLoadingMask() {
    var $loadingMask = $node.find('.alert-popup-load-mask');

    if ($loadingMask.length > 0) {
        $loadingMask.show();
    } else {
        $node.find('.alert-popup-body').append(LOADING_MASK_TEMPLATE);
    }
}

function hideLoadingMask() {
    $node.find('.alert-popup-load-mask').hide();
}

function showNoNewAlert() {
    var $noNewAlert = $node.find('.no-new-alert');

    if ($noNewAlert.length > 0) {
        $noNewAlert.show();
    } else {
        $node.find('.alert-popup-body').append(NO_NEW_ALERT_TEMPLATE);
    }
}

function hideNoNewAlert() {
    $node.find('.no-new-alert').hide();
}

function getAlertTimeLabel(timestamp) {
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
}

function showAlertList(items) {
    var $alertList = $node.find('.alert-list');

    if ($alertList.length > 0) {
        $alertList.show();
    } else {
        $alertList = $node.find('.alert-popup-body').append(ALERT_LIST_TEMPLATE);
    }

    $alertList.empty();
    _.each(items, function (item) {
        $alertList.append(ALERT_LIST_ITEM_TEMPLATE.format(
            item.firstName,
            item.lastName,
            item.patientId,
            ALERT_TYPE_MESSAGE_MAPPING[item.type].format(item.eventTitle),
            getAlertTimeLabel(item.dateCreated)
        ));
    });
}

function hideAlertList() {
    $node.find('.alert-list').hide();
}

function getAlerts() {
    $.ajax({
        url:URLs.GET_ALERTS,
        data: {
            max: 99,
            timestamp: (new Date()).getTime()
        },
        method: 'GET',
        dropProcess: true
    })
        .done(function (data) {
            var count = data.totalCount;

            if (data.enableAlert) {
                _host.showAlertIcon(count);

                if (count === 0) {
                    showNoNewAlert();
                    hideAlertList();
                } else {
                    hideNoNewAlert();
                    showAlertList(data.items);
                }
            } else {
                _host.hideAlertIcon();
            }

            hideLoadingMask();
        });
}

module.exports = {
    init: function($item, host) {
        if (!$node) {
            _host = host;
            $node = $(ALERT_POPUP_TEMPLATE).insertAfter($item);
        }

        return this;
    },

    show: function() {
        $node.show();
        $('html').click(hideAlertPopup);
        showLoadingMask();
        getAlerts();
    },

    hide: function() {
        $node.hide();
        $('html').off('click', hideAlertPopup);
    },

    toggle: function() {
        this[$node.is(':visible') ? 'hide' : 'show'].call();
    }
};

