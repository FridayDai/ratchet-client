package com.xplusz.ratchet

class ActivityController {

    def index() {
        def patientId = params.patientId
        def medicalRecordId = params.medicalRecordId
        render(view: '/activity/activity', model: [patientId: patientId, medicalRecordId: medicalRecordId])
    }
}
