package com.xplusz.ratchet

import grails.converters.JSON

class TreatmentController extends BaseController {

    def beforeInterceptor = [action: this.&auth]

    def treatmentService

    def index() {
        def patientId = params.patientId
        def medicalRecordId = params.medicalRecordId
        def treatmentId = params.treatmentId
        def clientId = params.clientId
        render view: '/treatment/treatment', model: [patientId: patientId, clientId: clientId,  medicalRecordId: medicalRecordId, treatmentId: treatmentId]
        
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