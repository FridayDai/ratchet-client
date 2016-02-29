package com.ratchethealth.client

class RatchetConstants {
    // Table
    public static final DEFAULT_PAGE_SIZE = 20
    public static final DEFAULT_PAGE_OFFSET = 0


    public static final String TOOL_NAME_DASH = 'DASH';
    public static final String TOOL_NAME_ODI = 'ODI';
    public static final String TOOL_NAME_NDI = 'NDI';
    public static final String TOOL_NAME_NRS_BACK = 'NRS-BACK';
    public static final String TOOL_NAME_NRS_NECK = 'NRS-NECK';
    public static final String TOOL_NAME_QUICK_DASH = 'QuickDASH';
    public static final String TOOL_NAME_KOOS = 'KOOS';
    public static final String TOOL_NAME_HOOS = 'HOOS';
    public static final String TOOL_NAME_HARRIS_HIP_SCORE = 'Harris Hip Score';
    public static final String TOOL_NAME_FAIRLEY_NASAL_SYMPTOM = 'Fairley Nasal Symptom';
    public static final String TOOL_NAME_PAIN_CHART_REFERENCE_NECK = 'Pain Chart Reference - Neck';
    public static final String TOOL_NAME_PAIN_CHART_REFERENCE_BACK = 'Pain Chart Reference - Back';
    public static final String TOOL_NAME_NEW_PATIENT_QUESTIONNAIRE = 'New Patient Questionnaire';
    public static final String TOOL_NAME_RETURN_PATIENT_QUESTIONNAIRE = 'Return Patient Questionnaire';
    public static final String TOOL_NAME_KOOS_JR = 'KOSS, JR.';
    public static final String TOOL_NAME_HOOS_JR = 'HOSS, JR.';
    public static final String TOOL_NAME_PROMIS = 'promis';

    public static final Map TOOL_TYPE = [
            1 : TOOL_NAME_DASH,
            2 : TOOL_NAME_ODI,
            3 : TOOL_NAME_NDI,
            4 : TOOL_NAME_NRS_BACK,
            5 : TOOL_NAME_NRS_NECK,
            6 : TOOL_NAME_QUICK_DASH,
            7 : TOOL_NAME_KOOS,
            8 : TOOL_NAME_HOOS,
            9 : TOOL_NAME_HARRIS_HIP_SCORE,
            10: TOOL_NAME_FAIRLEY_NASAL_SYMPTOM,
            11: TOOL_NAME_PAIN_CHART_REFERENCE_NECK,
            12: TOOL_NAME_PAIN_CHART_REFERENCE_BACK,
            13: TOOL_NAME_NEW_PATIENT_QUESTIONNAIRE,
            14: TOOL_NAME_PROMIS,
            17: TOOL_NAME_RETURN_PATIENT_QUESTIONNAIRE,
            15: TOOL_NAME_KOOS_JR,
            1000: TOOL_NAME_HOOS_JR,
            
    ]

    //Task type which hasn't task score.
    public static Integer[] TOOL_TYPE_NO_SCORE = [11, 12, 13, 17]

    //Task type which has multiple task score
    public static Integer[] TOOL_TYPE_MULTIPLE_SCORE = [4, 5, 7, 8, 10, 14, 15, 1000]

    //Task type that has view result.
    public static Integer[] TOOL_TYPE_HAS_VIEW_RESULT = [2, 3, 11, 12, 13, 14, 15, 17, 1000]

    //Task type mixedResult(score and view result).
    public static Integer[] TOOL_TYPE_MiXED_RESULT = [11, 12]

    //For pain neck and pain back.
    public static final String[] PAIN_FREQUENCY = [
            "Never",
            "Monthly",
            "Weekly",
            "Daily",
            "Hourly",
            "Constant"
    ]
}
