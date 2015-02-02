package com.xplusz.ratchet

import grails.converters.JSON

class SinglePatientController extends BaseController {

    def beforeInterceptor = [action: this.&auth]
    def singlePatientService

    def showPatient() {
        def patientId = params?.id
        def patientInfo = singlePatientService.showSinglePatient(request, response, patientId)
        def medicalRecords = singlePatientService.showMedialRecords(request, response, patientId)
        render(view: '/singlePatient/singlePatient', model: [patientInfo: patientInfo, medicalRecords: medicalRecords])
    }

    def updatePatient() {
        def resp = singlePatientService.updateSinglePatient(request, response, params)
        def status = [resp: resp]
        render status as JSON
    }
}
