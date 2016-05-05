package com.ratchethealth.client

import grails.converters.JSON

class CaregiverController extends BaseController {

    def beforeInterceptor = [action: this.&auth]
    def caregiverService

    static allowedMethods = [getCaregiver: ['GET'], addCaregiver: ['POST']]

    def getCaregivers(CaregiverFilterFields filterFields) {
        String token = request.session.token
        def clientId = request.session.clientId
        def patientId = params?.patientId

        def resp = caregiverService.getCaregiver(token, clientId, patientId, filterFields)
        render ([data: resp] as JSON)
    }

    def addCaregiver(Caregiver caregiver) {
        String token = request.session.token
        def clientId = request.session.clientId
        def patientId = params?.patientId

        def resp = caregiverService.addCaregiver(token, clientId, patientId, caregiver)

        render ([resp: resp] as JSON)
    }

    def updateCaregiver(Caregiver caregiver) {
        String token = request.session.token
        def clientId = request.session.clientId
        def patientId = params?.patientId

        def resp = caregiverService.updateCaregiver(token, clientId, patientId, caregiver)
        def result = [resp: resp]
        render result as JSON
    }

    def deleteCaregiver() {
        String token = request.session.token
        def clientId = request.session.clientId
        def patientId = params?.patientId
        def caregiverId = params?.caregiverId

        def resp = caregiverService.deleteCaregiver(token, clientId, patientId, caregiverId)
        render ([resp: resp] as JSON)
    }

    def checkCaregiverEmail() {
        String token = session.token
        def clientId = request.session.clientId
        def patientId = params?.patientId
        def email = params?.email

        def data = caregiverService.checkEmailForCaregiver(token, clientId, patientId, email)
        render data as JSON
    }

}
