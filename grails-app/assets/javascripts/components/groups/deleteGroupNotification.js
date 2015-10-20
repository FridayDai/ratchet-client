
Notifications.confirm({
    title: 'DELETE EMERGENCY CONTACT',
    message: 'Are you sure you want to remove the current emergency contact?'
}, {
    buttons: [
        {
            text: 'Yes',
            'class': 'btn-agree',
            click: function () {
                // Warning dialog close
                $(this).dialog("close");

                me.deleteEmergencyContact($row, careGiverId);
            }
        }, {
            text: 'Cancel',
            click: function () {
                $(this).dialog("close");
            }
        }
    ]
});
