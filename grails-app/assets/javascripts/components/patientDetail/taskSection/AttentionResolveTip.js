require("jquery-ui-menu");
var URLs = require('../../../constants/Urls');

function attentionResolveTip(){

    this.attributes({
        attentionContentSelector: '.attention',
        resolveButtonSelector: '.resolve'
    });

    this.onResolveButtonClicked = function (e) {
        var $taskBox = $(e.target).closest('.box-item');
        var taskId = $taskBox.get(0).id;
        $.ajax({
            url: URLs.RESOLVE_VOICE_TASK.format(this.patientId, this.medicalRecordId, taskId),
            type: "GET",
            success: function (data) {
                if (data === 'true') {
                    $taskBox.find('.attention').remove();
                }
            }
        });

    };

    this.after('initialize', function () {
        $('.attention-menu').menu({
            position: {my: "top center", at: "right center"}
            //position: {my: "right center", at: "right bottom"}
        });

        this.on('click', {
            resolveButtonSelector: this.onResolveButtonClicked
        });
    });


}

module.exports = attentionResolveTip;

