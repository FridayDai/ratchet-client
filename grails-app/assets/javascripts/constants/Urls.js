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

    //Bulk import
    GET_BULK_IMPORT_LOOKUP: '/patients/bulk-import/lookup',
    DOWNLOAD_BULK_IMPORT_ERROR_FILE: '/patients/bulk-import/download-errors',
    SAVE_BULK_IMPORT_DATA: '/patients/bulk-import/save',

    //Patient detail
    PAGE_PATIENT_DETAIL: '/patients/{0}',

    SECTION_TREATMENT_TAB: '/patients/{0}/treatment?clientId={1}' +
    '&medicalRecordId={2}&treatmentId={3}&surgeryTime={4}&PatientEmailStatus={5}&_={6}',

    INVITE_PATIENT: '/patients/{0}/invite',

    //Treatment
    GET_TREATMENT_CODE: '/treatments/{0}/generateCode',
    UPDATE_SURGERY_DATE: '/patients/{0}/surgery-time/{1}/{2}',
    ARCHIVE_TREATMENT: '/patients/{0}/records/{1}/archived',
    NOTIFY_TREATMENT_TASKS: '/patients/{0}/treatments/{1}/notify',
    ADD_AD_HOC_TASKS: '/patients/{0}/treatments/{1}/add-ad-hoc-tasks',

    //Tasks
    SEND_NOTIFY_EMAIL: '/patients/{0}/treatments/{1}/task/{2}/send-mail',
    GET_AVAILABLE_TASKS: '/treatments/{0}/available-tasks',
    DELETE_TASK: '/patients/{0}/treatments/{1}/task/{2}/delete',

    //Team
    GET_EMERGENCY_CONTACT_LIST: '/patients/{0}/emergency-contact?medicalRecordId={1}',
    ADD_EMERGENCY_CONTACT: '/patients/{0}/emergency-contact?medicalRecordId={1}',
    UPDATE_EMERGENCY_CONTACT: '/patients/{0}/emergency-contact/update',
    DELETE_EMERGENCY_CONTACT: '/patients/{0}/{1}/emergency-contact/{2}',
    UPDATE_GROUP_PROVIDER_CONTACT: '/patients/{0}/group-and-provider/update?medicalRecordId={1}',
    CHECK_EMERGENCY_CONTACT_EMAIL: '/patients/{0}/emergency-contact/check-email',

    //Activity
    GET_ACTIVITIES: '/patients/{0}/activities?clientId={1}&medicalRecordId={2}',

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

    //Report
    PROVIDER_AVERAGE_OVERVIEW: '/reports/overview/provider-average',
    GET_TASK_COMPLETION:'/reports/conversion'
};
