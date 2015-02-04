package com.xplusz.ratchet

class StatusCodeConstants {

    //Staff type
    public static final String[] STAFF_TYPE_LIST =
            ["ANESTHESIOLOGIST", "MEDICAL ASSISTANT", "MANAGEMENT", "NURSE", "PHYSICAL THERAPISTS", "PRIMARY PHYSICIAN", "SCHEDULER", "SURGEON"]

    //CareGiver relation type
    public static final String[] CAREGIVER_RELATION =
            ["OFFSPRING", "SPOUSE"]

    //CareGiver status
    public static final String[] CAREGIVER_STATUS =
            ["INVITED", "NORMAL", "UNINVITED"]
    
    // Task status
    public static final Integer TASK_STATUS_NEW = 1
    public static final Integer TASK_STATUS_OVERDUE = 2
    public static final Integer TASK_STATUS_SCHEDULE = 3
    public static final Integer TASK_STATUS_PENDING = 4
    public static final Integer TASK_STATUS_COMPLETE = 5

    public static final String[] TASK_STATUS = 
            ["undefined", "new", "overdue", "schedule", "pending", "complete"]
    
    // Tool type
    public static final String[] TOOL_TYPE = 
            ["undefined", "outcome", "basic", "outcome", "outcome", "outcome"]

    //Account constants
    public static final String[] ACCOUNT_STATUS = ["Uninvited", "Invited", "Activated"]
    public static final String ACCOUNT_DOCTOR = "Dr."
    public static final String[] ACCOUNT_ROLE =
            ["Anesthesiologist", "Medical Assistant", "Management", "Nurse", "Physical therapists (PTs)", "Primary Physican", "Scheduler", "Surgeon"]
    public static final String ACCOUNT_PATIENTS_M = "Patients Management"
    public static final String ACCOUNT_ACCOUNTS_M = "Accounts Management"
}
