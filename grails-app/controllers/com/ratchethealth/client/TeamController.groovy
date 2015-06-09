package com.ratchethealth.client

import grails.converters.JSON

class TeamController extends BaseController {

    def beforeInterceptor = [action: this.&auth]
    def treatmentService

    static allowedMethods = [getCareGiver: ['GET'], addCareGiver: ['POST']]

    def getTeam() {
        def medicalRecordId = params?.medicalRecordId
        def clientId = params?.clientId
        def patientId = params?.patientId
        def archived = params?.archived
        if (archived == null) {
            archived = false
        }
        def surgeons = treatmentService.getCareTeam(request, medicalRecordId)
        render(view: "/team/team", model: [surgeons: surgeons, medicalRecordId: medicalRecordId, clientId: clientId, patientId: patientId, archived: archived])
    }

    def getCareGiver() {
        def medicalRecordId = params?.medicalRecordId
        def careGivers = treatmentService.getCareGiver(request, medicalRecordId)
        render careGivers as JSON
    }

    def addCareGiver() {
        def medicalRecordId = params?.medicalRecordId
        def resp = treatmentService.addCareGiver(request, params)
        def result = [resp: resp, medicalRecordId: medicalRecordId]
        render result as JSON
    }

    def updateCareGiver() {
        def resp = treatmentService.updateCareGiver(request, params)
        def result = [resp: resp]
        render result as JSON
    }

    def deleteCareGiver() {
        def resp = treatmentService.deleteCareGiver(request, params)
        def result = [resp: resp]
        render result as JSON
    }


    def updateCareTeamSurgeon() {
        def resp = treatmentService.updateCareTeamSurgeon(request, params)
        render resp as JSON
    }

}
