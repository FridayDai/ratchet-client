module.exports = {
    UPDATE_MAINTENANCE: '/announcement/close?announcementLastUpdated={0}',

    //Patients
    PAGE_PATIENTS: '/patients',
    GET_PATIENTS: '/patients',
    GET_TREATMENTS: '/treatments',
    GET_TREATMENT_DETAIL: '/treatments/{0}',
    GET_PROVIDER: '/staffs',
    GET_MY_GROUPS: '/accounts/TODO/groups',
    CHECK_PATIENT_EMAIL: '/patients/check-email',
    CHECK_PATIENT_ID: '/patients/check-id',
    NOTIFY_REQUEST: '/patients/{0}/notify',
    GET_IN_CLINIC_CODE: '/patients/{0}/in-clinic/code',
    PATIENT_HAS_ACTIVE_TASK: '/patients/{0}/has-active-tasks',

    //Bulk import
    GET_BULK_IMPORT_LOOKUP: '/patients/bulk-import/lookup',
    DOWNLOAD_BULK_IMPORT_ERROR_FILE: '/patients/bulk-import/download-errors',
    SAVE_BULK_IMPORT_DATA: '/patients/bulk-import/save',

    //Patient detail
    PAGE_PATIENT_DETAIL: '/patients/{0}',

    SECTION_TREATMENT_TAB: '/patients/{0}/getTreatmentTab?clientId={1}' +
    '&medicalRecordId={2}&treatmentId={3}&surgeryTime={4}&PatientEmailStatus={5}&archived={6}&_={7}',

    INVITE_PATIENT: '/patients/{0}/invite',

    //Treatment
    UPDATE_SURGERY_DATE: '/patients/{0}/surgery-time/{1}/{2}',
    ARCHIVE_TREATMENT: '/patients/{0}/records/{1}/archived',
    ADD_AD_HOC_TASKS: '/patients/{0}/treatments/{1}/add-ad-hoc-tasks',
    DELETE_TREATMENT: '/patients/{0}/treatments/{1}/delete',
    GET_TREATMENT_AVAILABLE_YEARS: '/treatments/{0}/available-years',

    //Tasks
    SEND_NOTIFY_EMAIL: '/patients/{0}/treatments/{1}/task/{2}/send-mail',
    GET_AVAILABLE_TASKS: '/treatments/{0}/available-tasks',
    DELETE_TASK: '/patients/{0}/treatments/{1}/task/{2}/delete',
    CALL_TASK: '/patients/{0}/treatments/{1}/task/{2}/voice-call',
    RESOLVE_VOICE_TASK: '/patients/{0}/treatments/{1}/task/{2}/attention/resolve',

    //Caregiver
    GET_CARE_GIVER_LIST: '/patients/{0}/caregivers',
    ADD_CAREGIVER: '/patients/{0}/caregivers',
    UPDATE_CAREGIVER: '/patients/{0}/caregivers/{1}/update',
    DELETE_CAREGIVER: '/patients/{0}/caregivers/{1}/delete',
    CHECK_CAREGIVER_EMAIL: '/patients/{0}/caregivers/check-email',

    //Report
    GET_INDIVIDUAL_REPORT: '/patients/{0}/tools/{1}/report',
    GET_PATIENT_TOOLS: '/patients/{0}/tools/',

    //Activity
    GET_ACTIVITIES: '/patients/{0}/activities',

    //Accounts
    PAGE_ACCOUNTS: '/accounts',
    GET_ACCOUNTS: '/accounts',
    CHECK_ACCOUNT_EMAIL: '/accounts/check-email',
    CHECK_ACCOUNT_NPI: '/accounts/check-npi',
    GET_ALL_GROUPS: '/groups',
    ACCOUNT_INVITE_AGAIN: '/accounts/{0}/invite',
    ACCOUNT_ACTIVATE: '/accounts/{0}/activate',
    ACCOUNT_DEACTIVATE: '/accounts/{0}/deactivate',

    //Account detail
    PAGE_ACCOUNT_DETAIL: '/accounts/{0}',

    //Profile
    UPDATE_PASSWORD: "/profile/{0}/",

    //Groups
    GET_GROUPS: '/groups',
    UPDATE_GROUP: '/groups/{0}',
    DELETE_GROUP: "/groups/delete",
    GET_PATIENT_GROUP: "/patients/{0}/groups",
    DELETE_PATIENT_GROUP: "/patients/{0}/groups/{1}",

    //Report
    PROVIDER_AVERAGE_OVERVIEW: '/reports/outcome/provider-average',
    GET_TASK_COMPLETION:'/reports/conversion'
};
