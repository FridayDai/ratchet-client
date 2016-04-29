var flight = require('flight');

var URLs = require('../../constants/Urls');
var STRINGs = require('../../constants/Strings');
var Notifications = require('../common/Notification');

function PatientLevelTabToolbar() {
    this.attributes({
        notifyButtonSelector: '.notify-button',
        generateCodeButtonSelector: '.get-code-button'
    });

    this.initIds = function() {
        this.ids = {
            patientId: this.$node.data('patientId')
        };
    };

    this.onNotifyButtonClicked = function() {
        $.ajax({
            url: URLs.NOTIFY_REQUEST.format(this.ids.patientId)
        }).done(function () {
            Notifications.showFadeOutMsg(
                STRINGs.SEND_NOTIFY_TASKS_SUCCESS
            );
        });
    };

    this.onGenerateCodeButtonClicked = function (e) {
        e.preventDefault();

        this.trigger('showGenerateCodeDialog', {
            patientId: this.ids.patientId
        });
    };

    this.after('initialize', function () {
        this.initIds();

        this.on('click', {
            notifyButtonSelector: this.onNotifyButtonClicked,
            generateCodeButtonSelector: this.onGenerateCodeButtonClicked
        });
    });
}

module.exports = flight.component(PatientLevelTabToolbar);
