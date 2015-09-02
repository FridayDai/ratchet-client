module.exports = {
     EMERGENCY_CONTACT_RELATIONSHIP: [
        {label: "Parent", value: 1},
        {label: "Spouse", value: 2},
        {label: "Child",  value: 3},
        {label: "Friend", value: 4},
        {label: "Other",  value: 5}
    ],

    BULK_IMPORT_TYPE: {
        1: 'Treatment',
        2: 'Group',
        3: 'Provider'
    },

    // BE status: UNINVITED (1), INVITED (2), VERIFIED(3), NO_EMAIL(4), BOUNCED(5)
    EMAIL_STATUS: {
        1: 'unverified',
        2: 'unverified',
        3: '',
        4: 'Not Available',
        5: 'nonexistent'
    },

    EMAIL_STATUS_FILTER: [
        {label: "Verified", value: 3},
        {label: "Unverified", value: 2},
        {label: "Not Available", value: 4},
        {label: "Nonexistent", value: 5},
    ]
};
