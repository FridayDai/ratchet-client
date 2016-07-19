module.exports = {
     CAREGIVER_RELATIONSHIP: [
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

    CAREGIVER_RELATIONSHIP_MAP : {
        1: 'Parent',
        2: 'Spouse',
        3: 'Child',
        4: 'Friend',
        5: 'Other'
    },

    CAREGIVER_RELATIONSHIP_REVERSE_MAP : {
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
        1: 'UNVERIFIED',
        2: 'UNVERIFIED',
        3: '',
        4: 'Not Available',
        5: 'UNDELIVERABLE',
        6: 'DECLINED'
    },

    EMAIL_STATUS_FILTER: [
        {label: "Verified", value: 3},
        {label: "Unverified", value: 2},
        {label: "Not Available", value: 4},
        {label: "Undeliverable", value: 5},
        {label: "Declined", value: 6}
    ],

    TREATMENT_STATUS_FILTER: [
        {label: "Pre-Op", value: 1},
        {label: "Post-Op 0-3 days", value: 2},
        {label: "Post-Op 0-90 days", value: 3},
        {label: "Post-Op 90 days +", value: 4}
    ],

    TASK_STATUS_FILTER: [
        {label: "Overdue", value: 2},
        {label: "Pending", value: 4},
        {label: "Scheduled", value: 3},
        {label: "Expired", value: 6},
        {label: "Completed", value: 5}
    ],

    HUMAN_GENDER: [
        {label: "Unspecified", value: 'Unspecified'},
        {label: "Male", value: 'Male', iconClass: 'gender-male'},
        {label: "Female", value: 'Female', iconClass: 'gender-female'}
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
        'shoulder': 'Shoulder',
        'back': 'Back',
        'leg': 'Leg',
        'buttock': 'Buttock',
        'STIFFNESS': 'Stiffness',
        'Physical': 'Physical',
        'Mental': 'Mental'
    },

    DATE_FORMAT: [
        'MM-DD-YYYY',
        'MM/DD/YYYY',
        'M-D-YYYY',
        'M/D/YYYY',
        'MMMM D, YYYY',
        'MMM D, YYYY'
    ],

    DATE_TIME_FORMAT: [
        'MM-DD-YYYY h:mm A',
        'MM-DD-YYYY HH:mm',
        'MM/DD/YYYY h:mm A',
        'MM/DD/YYYY HH:mm',
        'M-D-YYYY h:mm A',
        'M-D-YYYY HH:mm',
        'M/D/YYYY h:mm A',
        'M/D/YYYY HH:mm',
        'MMMM D, YYYY h:mm A',
        'MMMM D, YYYY HH:mm',
        'MMM D, YYYY h:mm A',
        'MMM D, YYYY HH:mm'
    ],

    TOOL_TYPE_DASH: 1,
    TOOL_TYPE_ODI: 2,
    TOOL_TYPE_NDI: 3,
    TOOL_TYPE_NRS_BACK: 4,
    TOOL_TYPE_NRS_NECK: 5,
    TOOL_TYPE_QUICK_DASH: 6,
    TOOL_TYPE_KOOS: 7,
    TOOL_TYPE_HOOS: 8,
    TOOL_TYPE_HARRIS_HIP_SCORE: 9,
    TOOL_TYPE_FAIRLEY_NASAL_SYMPTOM: 10,
    TOOL_TYPE_PAIN_CHART_REFERENCE_NECK: 11,
    TOOL_TYPE_PAIN_CHART_REFERENCE_BACK: 12,
    TOOL_TYPE_NEW_PATIENT_QUESTIONNAIRE: 13,
    TOOL_TYPE_PROMIS: 14,
    TOOL_TYPE_RETURN_PATIENT_QUESTIONNAIRE: 17,
    TOOL_TYPE_KOOS_JR: 15,
    TOOL_TYPE_HOOS_JR: 1000,

    REPORT_CHART_SETTING: {
        1: {
            maxScore: 100,
            scoreAt: 'SIMPLE',
            pace: 10
        },
        2: {
            maxScore: 100,
            scoreAt: 'SIMPLE',
            pace: 10
        },
        3: {
            maxScore: 100,
            scoreAt: 'SIMPLE',
            pace: 10
        },
        4: {
            maxScore: 10,
            type: ['Back', 'Leg'],
            pace: 1
        },
        5: {
            maxScore: 10,
            type: ['Neck', 'Arm'],
            pace: 1
        },
        6: {
            maxScore: 100,
            scoreAt: 'SIMPLE',
            pace: 10
        },
        7: {
            maxScore: 100,
            type: ['Symptoms', 'Pain', 'ADL', 'Sports/Rec', 'QOL'],
            pace: 10
        },
        8: {
            maxScore: 100,
            type: ['Symptoms', 'Pain', 'ADL', 'Sports/Rec', 'QOL'],
            pace: 10
        },
        9: {
            maxScore: 100,
            scoreAt: 'SIMPLE',
            pace: 10
        },
        10: {
            maxScore: 60,
            scoreAt: 'total',
            pace: 10
        },
        11: {
            maxScore: 10,
            type: ['Neck', 'Shoulder', 'Arm'],
            pace: 1
        },
        12: {
            maxScore: 10,
            type: ['Back', 'Buttock', 'Leg'],
            pace: 1
        },
        14: {
            maxScore: 20,
            type: ['Physical', 'Mental'],
            pace: 5
        },
        15: {
            maxScore: 100,
            type: ['Stiffness', 'Pain', 'ADL'],
            pace: 10
        },
        1000: {
            maxScore: 100,
            type: ['Pain', 'ADL'],
            pace: 10
        }
    }
};
