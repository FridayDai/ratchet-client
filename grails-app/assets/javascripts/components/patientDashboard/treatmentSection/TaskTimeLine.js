function TaskTimeLineT() {
    this.attributes({
        taskTimeLineSelector: '#task-list-wrap',
        absoluteDateSelector:'.item-absolute-date '
    });

    this.hideTimeLine = function () {
        var absoluteDate = this.select('absoluteDateSelector');
        this.select('taskTimeLineSelector').removeClass('tasks-time-line');

        if(!absoluteDate.hasClass('hidden')) {
            absoluteDate.addClass('hidden');
        }
    };

    this.checkAbsoluteEventArrow = function() {
        var visible = $('.box-item:visible');
        var first = visible.first();
        var last = visible.last();

        if(first.find('.short-event-title').length) {
            first.find('.short-event-title-wrap').removeClass('short-title-wrap-before');
        }

        if(last.find('.short-event-title').length) {
            last.find('.short-event-title-wrap').removeClass('short-title-wrap-after');
        }
    };

    this.showTimeLine = function () {
        var timeLine = this.select('taskTimeLineSelector');
        if(!timeLine.hasClass('tasks-time-line')){
            timeLine.addClass('tasks-time-line');
        }

        this.select('absoluteDateSelector').removeClass('hidden');
        this.checkAbsoluteEventArrow();
    };

    this.checkTimeLine = function () {
        var medicalRecordId = this.filter.currentMedicalRecordId;
        var status = this.filter.taskStatus;
        var alert = this.filter.alert;

        var absoluteEvent = _.find($('.box-item:visible'), function (item) {
            return $(item).data('isAbsolute');
        });

        if(medicalRecordId && status === 'ALL' && !alert && absoluteEvent) {
            this.showTimeLine();
        } else {
            this.hideTimeLine();
        }
    };
}

module.exports = TaskTimeLineT;

