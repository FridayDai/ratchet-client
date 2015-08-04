require('jValidate');
require('jForm');

var flight = require('flight');
var withFormDialog = require('../common/withFormDialog');

function assistMeFormDialog() {
    /* jshint validthis:true */

    this.attributes({});

    this.options({
        title: 'ASSIST ME',
        height: 300,
        width: 800,
        buttons: {
            'Send': this.onSendButtonClicked
        }
    });

    this.onSendButtonClicked = function () {
        if (this.formEl.valid()) {
            this.submitForm()
        }
    };

    this.submitForm = function () {
        this.formEl.ajaxSubmit({
            data: {
                browser: window.navigator.userAgent,
                url: window.location.href
            },
            success: _.bind(this.formSuccess, this)
            //error: _.bind(this.serverErrorHandler, this),
            //complete: _.bind(this.resetSubmitBtnState, this)
        });
    };

    this.formSuccess = function () {
        RC.common.showMsg({
            msg: RC.constants.sendAssistMessageSuccess
        });
    };

    this.onShow = function () {
        this.dialogEl.dialog('open');
    };

    this.after('initialize', function () {
        this.on(document, 'showAssistMeDialog', this.onShow)
    });
}

module.exports = flight.component(withFormDialog, assistMeFormDialog);
