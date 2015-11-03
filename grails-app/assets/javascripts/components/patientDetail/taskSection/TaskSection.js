var flight = require('flight');
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
        this.on(document, 'emailStatusUpdated', this.onEmailStatusUpdated);
    });
}

module.exports = flight.component(TaskSection);
