package com.ratchethealth.client

class StatusCodeConstants {

    //Staff type
    public static final Integer STAFF_TYPE_SURGEON = 8
    public static final String[] STAFF_TYPE_LIST =
            ["ANESTHESIOLOGIST", "MEDICAL ASSISTANT", "MANAGEMENT", "NURSE", "PHYSICAL THERAPISTS", "PRIMARY PHYSICIAN", "SCHEDULER", "SURGEON"]

    //patient status
//    public static final String[] PATIENT_STATUS =
//            ["undefined", "invited", "normal", "uninvited", "deactive", "UNCONFIRMED_TO_INVITED"]

    //CareGiver relation type
    public static final String[] CAREGIVER_RELATION =
            ["OFFSPRING", "SPOUSE"]

    //CareGiver status
//    public static final String[] CAREGIVER_STATUS =
//            ["INVITED", "NORMAL", "UNINVITED"]

    // Task status
    public static final Integer TASK_STATUS_NEW = 1
    public static final Integer TASK_STATUS_OVERDUE = 2
    public static final Integer TASK_STATUS_SCHEDULE = 3
    public static final Integer TASK_STATUS_PENDING = 4
    public static final Integer TASK_STATUS_COMPLETE = 5
    public static final Integer TASK_STATUS_EXPIRED = 6

    public static final String[] TASK_STATUS =
            ["undefined", "new", "overdue", "schedule", "pending", "complete", "expired"]
    public static final Map TASK_OOS_SCORE = [
            "SYMPTOMS": "Symptoms",
            "PAIN": "Pain",
            "ADL": "ADL",
            "SPORT_REC": "Sport/Rec",
            "QOL": "QOL"
    ]
    public static final Map TASK_FAIRLEY_NASAL_SCORE_LABEL = [
        "total": "Total Result",
        "antibiotics": "Antibiotics"
    ]

    public static final Map TASK_OOS_JR_SCORE_LABEL = [
            "STIFFNESS": "Stiffness",
            "PAIN": "Pain",
            "ADL": "ADL"
    ]

    //Account constants
    public static final String ACCOUNT_DOCTOR = "Dr."
    public static final String[] ACCOUNT_ROLE =
            ["Anesthesiologist", "Medical Assistant", "Management", "Nurse", "Physical therapists (PTs)", "Primary Physican", "Scheduler", "Surgeon", "Yes", "No"]
    public static final String ACCOUNT_PATIENTS_M = "Patient Management"
    public static final String ACCOUNT_ACCOUNTS_M = "Administrator"

    // BE status is ACTIVE (1), INACTIVE (2)
    public static final String[] STAFF_STATUS = ["ACTIVE", "INACTIVE"]

    //common status
    // BE status is UNINVITED (1), INVITED (2), VERIFIED(3), NO_EMAIL(4), BOUNCED(5)
    public static final String[] EMAIL_STATUS =
            ["UNINVITED", "INVITED", "VERIFIED", "NO_EMAIL", "BOUNCED"]
}
