module.exports = {
    PAGE_PATIENT_DETAIL: '/patients/{0}',

    SECTION_TREATMENT_TAB: '/patients/{0}/treatment?clientId={1}' +
        '&medicalRecordId={2}&treatmentId={3}&surgeryTime={4}&_={5}',

    UPDATE_MAINTENANCE: '/announcement/close?announcementLastUpdated={0}',
    GET_PATIENTS: '/patients',
    GET_TREATMENTS: '/treatments',
    GET_TREATMENT_DETAIL: '/treatments/{0}',
    GET_PROVIDER: '/staffs',
    GET_MY_GROUPS: '/accounts/TODO/groups',
    CHECK_PATIENT_EMAIL: '/patients/check-email',
    CHECK_PATIENT_ID: '/patients/check-id',
    GET_BULK_IMPORT_LOOKUP: '/patients/bulk-import/lookup',
    DOWNLOAD_BULK_IMPORT_ERROR_FILE: '/patients/bulk-import/download-errors',
    SAVE_BULK_IMPORT_DATA: '/patients/bulk-import/save',
    INVITE_PATIENT: '/patients/{0}/invite',
    GET_TREATMENT_CODE: '/treatments/{0}/generateCode',
    UPDATE_SURGERY_DATE: '/patients/{0}/surgery-time/{1}/{2}',
    ARCHIVE_TREATMENT: '/patients/{0}/records/{1}/archived'
};
