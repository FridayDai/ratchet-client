package com.ratchethealth.client

import grails.converters.JSON

class SinglePatientController extends BaseController {

    def beforeInterceptor = [action: this.&auth]
    def singlePatientService
    def invitationService

    static allowedMethods = [getSinglePatient: ['GET'], updateSinglePatient: ['POST']]

    def getSinglePatient() {
        String token = request.session.token
        def clientId = request.session.clientId
        def patientId = params?.patientId
        def patientInfo = singlePatientService.showSinglePatient(token, patientId)

        if (!patientInfo.email) {
            patientInfo.email = ''
        }

        def treatmentLimit = grailsApplication.config.ratchetv2.server.patientTreatmentLimit
        def medicalRecords = singlePatientService.showMedialRecords(token, clientId, patientId)
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

    def updateSinglePatient(Patient patient) {
        String token = request.session.token
        def resp = singlePatientService.updateSinglePatient(token, patient)
        def status = [resp: resp]
        render status as JSON
    }


    def checkPatientExist() {
        String token = request.session.token
        def identify = params?.identify
        def data = singlePatientService.checkPatientId(token, identify)
        render data as JSON
    }

    def checkPatientEmailExist() {
        String token = request.session.token
        def clientId = request.session.clientId
        def email = params?.email
        def data = singlePatientService.checkPatientEmail(token, clientId, email)
        render data as String
    }

    def invitePatient() {
        invitationService.invitePatient(session.token, params.id)
        render true
    }

    def deletePatient() {
        singlePatientService.deletePatient(session.token, params.id)

        render status: 200
    }
}
