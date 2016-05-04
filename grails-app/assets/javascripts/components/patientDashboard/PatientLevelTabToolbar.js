var flight = require('flight');

var URLs = require('../../constants/Urls');
var STRINGs = require('../../constants/Strings');
var Notifications = require('../common/Notification');

var ACTIVE_TASKS_STATUS_EVENTS = [
    'addTreatmentSuccess',
    'deleteTreatmentSuccess',
    'editSurgeryDateSuccess',
    'archiveTreatmentSuccess',
    'deleteTaskSuccessful',
    'addTasksSuccess'
];

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

    this.onActiveTasksStatusUpdate = function () {
        var me = this;

        $.ajax({
            url: URLs.PATIENT_HAS_ACTIVE_TASK.format(this.ids.patientId)
        }).done(function (data) {
            me.updateButtonsStatus(data.hasActiveTasks);
        });
    };

    this.updateButtonsStatus = function (hasActiveTasks) {
        var $notify = this.select('notifyButtonSelector');
        var $generateCode = this.select('generateCodeButtonSelector');

        if (hasActiveTasks) {
            $notify.removeClass('not-available');
            $generateCode.removeClass('not-available');
        } else {
            if (!$notify.hasClass('not-available')) {
                $notify.addClass('not-available');
            }

            if (!$generateCode.hasClass('not-available')) {
                $generateCode.addClass('not-available');
            }
        }
    };

    this.onPatientLevelTabBeforeLoad = function (e, data) {
        var $notify = this.select('notifyButtonSelector');
        var $generateCode = this.select('generateCodeButtonSelector');

        if (data.type === 'Treatment') {
            $notify.show();
            $generateCode.show();
        } else {
            $notify.hide();
            $generateCode.hide();
        }
    };

    this.after('initialize', function () {
        var me = this;

        this.initIds();

        this.on('click', {
            notifyButtonSelector: this.onNotifyButtonClicked,
            generateCodeButtonSelector: this.onGenerateCodeButtonClicked
        });

        _.each(ACTIVE_TASKS_STATUS_EVENTS, function(event) {
            me.on(document, event, me.onActiveTasksStatusUpdate);
        });

        this.on(document, 'patientLevelTabBeforeLoad', this.onPatientLevelTabBeforeLoad)
    });
}

module.exports = flight.component(PatientLevelTabToolbar);
