package com.xplusz.ratchet

import grails.converters.JSON

class TeamController extends BaseController {

    def beforeInterceptor = [action: this.&auth]
    def treatmentService

    def showMedicalCares() {
        def medicalRecordId = params?.medicalRecordId
        def clientId = params?.clientId
        def patientId = params?.patientId
        render(view: "/team/team", model: [medicalRecordId: medicalRecordId, clientId: clientId, patientId: patientId])
    }

    def getCareTeam() {
        def medicalRecordId = params?.medicalRecordId
        def careTeams = treatmentService.getCareTeam(request, response, medicalRecordId)
        render careTeams as JSON
    }

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
}
