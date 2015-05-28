package com.ratchethealth.client

import grails.converters.JSON

class SinglePatientController extends BaseController {

    def beforeInterceptor = [action: this.&auth]
    def singlePatientService
    def invitationService

    static allowedMethods = [getSinglePatient: ['GET'], updateSinglePatient: ['POST']]

    def getSinglePatient() {
        def patientId = params?.patientId
        def patientInfo = singlePatientService.showSinglePatient(request, patientId)
        def treatmentLimit = grailsApplication.config.ratchetv2.server.patientTreatmentLimit
        def medicalRecords = singlePatientService.showMedialRecords(request, patientId)
        def num = patientInfo?.phoneNumber
        def length = num.length()
        def phoneNumber
        def subNumber = num
        def isUS = num.charAt(0)
        def space = ' '

        if (isUS == '1') {
            subNumber = num.substring(1, length)
            length = subNumber.length()
        }
        if (length > 6) {
            phoneNumber = String.format("%s-%s-%s", subNumber.substring(0, 3), subNumber.substring(3, 6),
                    subNumber.substring(6, length))
        } else if (length > 3) {
            phoneNumber = String.format("%s-%s-%s", subNumber.substring(0, 3), subNumber.substring(3, length))
        }
        if (isUS == '1') {
            phoneNumber = String.format("%s%s%s", isUS, space, phoneNumber)
        }

        render(view: '/singlePatient/singlePatient', model: [patientInfo   : patientInfo,
                                                             medicalRecords: medicalRecords, phoneNumber: phoneNumber, treatmentLimit: treatmentLimit])
    }

    def updateSinglePatient() {
        def resp = singlePatientService.updateSinglePatient(request, params)
        def status = [resp: resp]
        render status as JSON
    }

    def invitePatient() {
        invitationService.invitePatient(request, params.id)
        render true
    }
}
