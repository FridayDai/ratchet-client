var flight = require('flight');
var URLs = require('../../../constants/Urls');
var STRINGs = require('../../../constants/Strings');
var Notifications = require('../../common/Notification');

var CheckArchivedWindowSize = require('../../shared/functional/CheckArchivedWindowSize');

function TaskSection() {
    flight.compose.mixin(this, [
        CheckArchivedWindowSize
    ]);

    this.attributes({
        contentSelector: '.content',

        notifyButtonSelector: '.btn-notify.task-email',
        taskInfoHiddenSelector: '.task-info-hidden',
        noActiveItemLabelSelector: '.no-active-item'
    });

    this.setBasicIds = function () {
        var $taskInfoHidden = this.select('taskInfoHiddenSelector');

        if (!this.patientId) {
            this.patientId = $taskInfoHidden.data('patientId');
            this.medicalRecordId = $taskInfoHidden.data('medicalRecordId');
        }
    };

    //this.onNotifyButtonClicked = function (e) {
    //    var taskId = $(e.target).data('taskId');
    //
    //    $.ajax({
    //        url: URLs.SEND_NOTIFY_EMAIL.format(this.patientId, this.medicalRecordId, taskId)
    //    }).done(function () {
    //        Notifications.showFadeOutMsg(STRINGs.SEND_NOTIFY_EMAIL_SUCCESS);
    //    });
    //};

    this.checkActiveItemStatus = function () {
        if (this.select('noActiveItemLabelSelector').length >= 1) {
            this.trigger('noActiveTask');
        }
    };

    this.onEmailStatusUpdated = function () {
        this.select('notifyButtonSelector').hide();
    };

    this.after('initialize', function () {
        this.setBasicIds();
        this.checkActiveItemStatus();

        //this.on('click', {
        //    notifyButtonSelector: this.onNotifyButtonClicked
        //});

        this.on(document, 'emailStatusUpdated', this.onEmailStatusUpdated);
    });
}

module.exports = flight.component(TaskSection);
