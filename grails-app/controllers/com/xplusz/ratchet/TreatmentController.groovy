package com.xplusz.ratchet

import grails.converters.JSON

class TreatmentController extends BaseController {

    def beforeInterceptor = [action: this.&auth]

    def treatmentService

    def index() {
        render view: '/treatment/treatment'
    }

    def assignTreatment() {
        def resp = treatmentService.assignTreatmentToPatient(request, response, params)

    }

    def getTreatments() {
        def resp = treatmentService.getTreatments(request, response, params)
        render resp as JSON
    }
}
