package com.xplusz.ratchet

class ActivityController {

    def index() {
        def patientId = params.patientId
        def medicalRecordId = params.medicalRecordId
        def clientId = params.clientId
        render(view: '/activity/activity', model: [patientId: patientId, medicalRecordId: medicalRecordId, clientId: clientId])
    }
}
