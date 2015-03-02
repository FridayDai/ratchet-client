package com.xplusz.ratchet

import grails.converters.JSON

class SinglePatientController extends BaseController {

    def beforeInterceptor = [action: this.&auth]
    def singlePatientService
    def invitationService

    def showPatient() {
        def patientId = params?.id
        def patientInfo = singlePatientService.showSinglePatient(request, response, patientId)
        def num = patientInfo?.phoneNumber
        def length = num.length()
        def phoneNumber
        def treatmentLimit = grailsApplication.config.ratchetv2.server.patientTreatmentLimit
        if (length > 6) {
            phoneNumber = String.format("%s-%s-%s", num.substring(0, 3), num.substring(3, 6),
                    num.substring(6, length));
        } else if (length > 3) {
            phoneNumber = String.format("%s-%s-%s", num.substring(0, 3), num.substring(3, length));
        }
        def medicalRecords = singlePatientService.showMedialRecords(request, response, patientId)
        render(view: '/singlePatient/singlePatient', model: [patientInfo   : patientInfo,
                                                             medicalRecords: medicalRecords, phoneNumber: phoneNumber, treatmentLimit: treatmentLimit])
    }

    def updatePatient() {
        def resp = singlePatientService.updateSinglePatient(request, response, params)
        def status = [resp: resp]
        render status as JSON
    }

    def invitePatient() {
        invitationService.invitePatient(params.id)
    }
}
