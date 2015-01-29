package com.xplusz.ratchet

import grails.converters.JSON

class TeamController extends BaseController {

    def beforeInterceptor = [action: this.&auth]
    def treatmentService

    def showMedicalCares() {
        def medicalRecordId = params.medicalRecordId
        def clientId = params.clientId
        def patientId = params.patientId
        def careTeams = treatmentService.getCareTeam(request, response, medicalRecordId)
        def careGivers = treatmentService.getCareGiver(request, response, medicalRecordId)
        render(view: "/team/team", model: [careTeams      : careTeams, careGivers: careGivers,
                                           medicalRecordId: medicalRecordId, clientId: clientId, patientId: patientId])
    }

    def deleteCareTeam() {
        def resp = treatmentService.deleteCareTeam(request, response, params)
        render resp as JSON
    }

    def deleteCareGiver() {
        def resp = treatmentService.deleteCareGiver(request, response, params)
        render resp as JSON
    }

    def addCareTeam() {
        def resp = treatmentService.addCareTeam(request, response, params)
        render resp as JSON
    }

    def addCareGiver(){
        def resp = treatmentService.addCareGiver(request, response, params)
        render resp as JSON
    }
}
