package com.ratchethealth.client

class ActivityController extends BaseController{

    def beforeInterceptor = [action: this.&auth]

    def index() {
        def archived = params?.archived
        if (archived==null)
        {
            archived = false
        }
        def patientId = params?.patientId
        def medicalRecordId = params?.medicalRecordId
        def clientId = params?.clientId

        render(view: '/activity/activity', model: [patientId: patientId, medicalRecordId: medicalRecordId, clientId: clientId, archived: archived])
    }
}
