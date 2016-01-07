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

    //1.DASH 2.ODI 3.NDI 4.NRS-BACK 5.NRS-NECK 6.QuickDASH 7.KOOS 8.HOOS
    // 9.Harris Hip Score 10.Fairley Nasal Symptom 11.Pain Chart Reference - Neck
    // 12.Pain Chart Reference - Neck 13.New Patient Questionnaire Tool 14.Return Patient Questionnaire Tool
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
            17: TOOL_NAME_RETURN_PATIENT_QUESTIONNAIRE
    ]

    //Task type which hasn't task score.
    public static Integer[] TOOL_TYPE_NO_SCORE = [11, 12, 13, 17]

    public static final String[] PAIN_FREQUENCY = [
            "Never",
            "Monthly",
            "Weekly",
            "Daily",
            "Hourly",
            "Constant"
    ]
}
