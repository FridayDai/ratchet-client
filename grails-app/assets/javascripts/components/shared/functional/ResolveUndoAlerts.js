var URLs = require('../../../constants/Urls');

function ResolveUndoAlerts() {
    this.onResolveButtonClicked = function (e) {
        var $button = $(e.target).closest('.resolve-link');
        var $alertBar = $button.closest('.alert-bar');
        var alertId = $alertBar.data('alertId');
        var me = this;

        var dfd = $.Deferred();

        $alertBar.data('alertDtd', dfd);

        dfd.done(function () {
            $alertBar.hide();
        });

        if (!$button.hasClass('checked')) {
            $button.addClass('checked');

            this.updateAlertTask(alertId, 1, function () {
                $button.removeClass('checked');
                $alertBar.addClass('undo');
                me.trigger('alertHasBeenUpdated', {
                    isResolved: true
                });

                setTimeout(function () {
                    dfd.resolve();
                }, 30000);
            });
        }
    };

    this.onUndoButtonClicked = function (e) {
        var $button = $(e.target).closest('.undo-link');
        var $alertBar = $button.closest('.alert-bar');
        var alertId = $alertBar.data('alertId');
        var dfd = $alertBar.data('alertDtd');
        var me = this;

        if (!$button.hasClass('checked')) {
            $button.addClass('checked');

            this.updateAlertTask(alertId, 0, function () {
                $button.removeClass('checked');
                $alertBar.removeClass('undo');
                dfd.reject();

                me.trigger('alertHasBeenUpdated', {
                    isResolved: false
                });
            });
        }
    };

    this.updateAlertTask = function (alertId, status, callback) {
        $.ajax({
            url: URLs.UPDATE_ALERTS.format(alertId),
            type: "POST",
            data: {
                status: status
            },
            success: function () {
                if (_.isFunction(callback)) {
                    callback();
                }
            }
        });
    };

    this.after('initialize', function () {

    });
}

module.exports = ResolveUndoAlerts;

