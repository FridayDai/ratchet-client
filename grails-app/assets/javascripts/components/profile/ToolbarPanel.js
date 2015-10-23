var flight = require('flight');

function ToolbarPanel() {
    this.attributes({
        changePasswordButton: '#changePassword'
    });

    this.onChangePasswordClicked = function (e) {
        e.preventDefault();

        this.trigger('showChangePasswordFormDialog', this.select('changePasswordButton').data("accountId"));
    };

    this.after('initialize', function () {
        this.on('click', {
            changePasswordButton: this.onChangePasswordClicked
        });
    });
}

module.exports = flight.component(ToolbarPanel);
