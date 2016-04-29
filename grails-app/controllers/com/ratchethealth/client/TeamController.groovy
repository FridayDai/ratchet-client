package com.ratchethealth.client

import grails.converters.JSON

class TeamController extends BaseController {

    def beforeInterceptor = [action: this.&auth]
    def teamService

    static allowedMethods = [getCareGiver: ['GET'], addCareGiver: ['POST']]

    def getTeam() {
        String token = request.session.token
        def treatmentId = params?.treatmentId
        def medicalRecordId = params?.medicalRecordId
        def clientId = params?.clientId
        def patientId = params?.patientId
        def archived = params?.archived
        if (archived == null || archived == '') {
            archived = false
        }
        def surgeons = teamService.getCareTeam(token, medicalRecordId)
        render(view: "/singlePatient/team", model: [
            surgeons: surgeons,
            treatmentId: treatmentId,
            medicalRecordId: medicalRecordId,
            clientId: clientId,
            patientId: patientId,
            archived: archived
        ])
    }

    def getCareGiver(CareGiverFilterFields filterFields) {
        String token = request.session.token
        def clientId = request.session.clientId
        def patientId = params?.patientId

        if (request.isXhr()) {
            def resp = teamService.getCareGiver(token, clientId, patientId, filterFields)
            render resp as JSON
        } else {
            filterFields.start = RatchetConstants.DEFAULT_PAGE_OFFSET
            filterFields.length = RatchetConstants.DEFAULT_PAGE_SIZE

            def patientList = teamService.getCareGiver(token, clientId, patientId, filterFields)
            render(view: '/patients/patientList', model: [patientList: patientList, pagesize: patientPagination.length])
        }
    }

    def addCareGiver(CareGiver careGiver) {
        String token = request.session.token
        def medicalRecordId = careGiver?.medicalRecordId
        def resp = teamService.addCareGiver(token, careGiver)
        def result = [resp: resp, medicalRecordId: medicalRecordId]
        render result as JSON
    }

    def updateCareGiver(CareGiver careGiver) {
        String token = request.session.token
        def resp = teamService.updateCareGiver(token, careGiver)
        def result = [resp: resp]
        render result as JSON
    }

    def deleteCareGiver() {
        String token = request.session.token
        def medicalRecordId = params?.medicalRecordId
        def emergencyContactId = params?.emergencyContactId
        def resp = teamService.deleteCareGiver(token, medicalRecordId, emergencyContactId)
        def result = [resp: resp]
        render result as JSON
    }


    def updateCareTeamSurgeon() {
        String token = request.session.token
        def medicalRecordId = params?.medicalRecordId
        def staffId = params?.staffId
        def groupId = params?.groupId
        def resp = teamService.updateCareTeamSurgeon(token, medicalRecordId, staffId, groupId)
        render resp as JSON
    }

    def checkCareGiverEmail() {
        String token = session.token
        def medicalRecordId = params?.medicalRecordId
        def email = params?.email
        def data = teamService.checkEmailForCareGiver(token, medicalRecordId, email)
        render data as JSON
    }

}
