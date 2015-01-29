package com.xplusz.ratchet

import grails.converters.JSON

class TreatmentController extends BaseController {

    def beforeInterceptor = [action: this.&auth]

    def treatmentService

    def index() {
        def medicalRecordId = params.medicalRecordId
        def clientId = params.clientId
        def patientId = params.patientId
        render(view: '/treatment/treatment',
                model: [medicalRecordId: medicalRecordId, clientId: clientId, patientId: patientId])
    }

    def assignTreatment() {
        def resp = treatmentService.assignTreatmentToPatient(request, response, params)
        def treatmentInfo = treatmentService.getTreatmentInfo(request, response, params)
        render treatmentInfo as JSON
    }

    def getTreatments() {
        def resp = treatmentService.getTreatments(request, response, params)
        render resp as JSON
    }
}
