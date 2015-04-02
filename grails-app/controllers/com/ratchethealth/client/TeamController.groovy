package com.ratchethealth.client

import grails.converters.JSON

class TeamController extends BaseController {

    def beforeInterceptor = [action: this.&auth]
    def treatmentService

    def showMedicalCares() {
        def medicalRecordId = params?.medicalRecordId
        def clientId = params?.clientId
        def patientId = params?.patientId
        def archived = params?.archived
        if (archived==null)
        {
            archived = false
        }
        def surgeons = treatmentService.getCareTeam(request, response, medicalRecordId)
        render(view: "/team/team", model: [surgeons: surgeons, medicalRecordId: medicalRecordId, clientId: clientId, patientId: patientId, archived: archived])
    }

//    def getCareTeam() {
//        def medicalRecordId = params?.medicalRecordId
//        def careTeams = treatmentService.getCareTeam(request, response, medicalRecordId)
//        render careTeams as JSON
//    }

    def getCareGiver() {
        def medicalRecordId = params?.medicalRecordId
        def careGivers = treatmentService.getCareGiver(request, response, medicalRecordId)
        render careGivers as JSON
    }

    def deleteCareTeam() {
        def resp = treatmentService.deleteCareTeam(request, response, params)
        def result = [resp: resp]
        render result as JSON
    }

    def deleteCareGiver() {
        def resp = treatmentService.deleteCareGiver(request, response, params)
        def result = [resp: resp]
        render result as JSON
    }

    def addCareTeam() {
        def medicalRecordId = params?.medicalRecordId
        def clientId = params?.clientId
        def patientId = params?.patientId
        def resp = treatmentService.addCareTeam(request, response, params)
        def result = [resp: resp, medicalRecordId: medicalRecordId]
        render result as JSON
    }

    def addCareGiver() {
        def medicalRecordId = params?.medicalRecordId
        def clientId = params?.clientId
        def patientId = params?.patientId
        def resp = treatmentService.addCareGiver(request, response, params)
        def result = [resp: resp, medicalRecordId: medicalRecordId]
        render result as JSON
    }

    def updateCareGiver() {
        def resp = treatmentService.updateCareGiver(request, response, params)
        def result = [resp: resp]
        render result as JSON
    }

    def updateCareTeamSurgeon(){
        def resp = treatmentService.updateCareTeamSurgeon(request, response, params)
        render resp as JSON
    }

}
