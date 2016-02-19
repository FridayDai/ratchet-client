module.exports = {
     EMERGENCY_CONTACT_RELATIONSHIP: [
        {label: "Parent", value: 1},
        {label: "Spouse", value: 2},
        {label: "Child",  value: 3},
        {label: "Friend", value: 4},
        {label: "Other",  value: 5}
    ],

    BIRTHDAY_MONTH: [
        {label: "Jan", value: 0},
        {label: "Feb", value: 1},
        {label: "Mar", value: 2},
        {label: "Apr", value: 3},
        {label: "May", value: 4},
        {label: "Jun", value: 5},
        {label: "Jul", value: 6},
        {label: "Aug", value: 7},
        {label: "Sep", value: 8},
        {label: "Oct", value: 9},
        {label: "Nov", value: 10},
        {label: "Dec", value: 11}
    ],

    EMERGENCY_CONTACT_RELATIONSHIP_MAP : {
        1: 'Parent',
        2: 'Spouse',
        3: 'Child',
        4: 'Friend',
        5: 'Other'
    },

    EMERGENCY_CONTACT_RELATIONSHIP_REVERSE_MAP : {
        'parent': 1,
        'spouse': 2,
        'child': 3,
        'friend': 4,
        'other': 5
    },

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
        5: 'undelivered'
    },

    EMAIL_STATUS_FILTER: [
        {label: "Verified", value: 3},
        {label: "Unverified", value: 2},
        {label: "Not Available", value: 4},
        {label: "Undelivered", value: 5}
    ],

    ACCOUNT_TYPE: {
        PROVIDER: 9,
        NON_PROVIDER: 10
    },

    SCORE_TYPE: {
        'SYMPTOMS': 'Symptoms',
        'PAIN': 'Pain',
        'ADL': 'ADL',
        'SPORT_REC': 'Sports/Rec',
        'QOL': 'QOL',
        'neck': 'Neck',
        'arm': 'Arm',
        'back': 'Back',
        'leg': 'Leg',
        'STIFFNESS': 'Stiffness',
        'Physical': 'Physical',
        'Mental': 'Mental'
    },

    DATE_FORMAT: [
        'MM-DD-YYYY',
        'MM/DD/YYYY',
        'M-D-YYYY',
        'M/D/YYYY',
        'MMMM D, YYYY'
    ]
};
