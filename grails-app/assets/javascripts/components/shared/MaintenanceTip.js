var flight = require('flight');
var URLs = require('../../constants/Urls');

function MaintenanceTip() {
    this.attributes({
        closeButton: '#maintenance-close'
    });

    this.onClose = function () {
        var announcementLastUpdated = this.$node.data('announcementLastUpdated');

        $.ajax({
            url: URLs.UPDATE_MAINTENANCE.format(announcementLastUpdated),
            dropProcess: true
        });

        this.$node.hide();
    };

    this.after('initialize', function () {
        this.on('click', {
            closeButton: this.onClose
        });
    });
}

module.exports = flight.component(MaintenanceTip);
