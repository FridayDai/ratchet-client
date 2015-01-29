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
<<<<<<< HEAD
        def id = resp.id
        def doctor = resp.doctor
        def firstName = resp.firstName
        def lastName = resp.lastName
        def email = resp.email
        def staffType = resp.staffType

        render g.render(template: "/team/careTeamTemplate", model: [id: id, doctor: doctor, firstName: firstName, lastName: lastName, email: email, staffType: staffType])
    }

    def addCareGiver() {
        def resp = treatmentService.addCareGiver(request, response, params)
        def id = resp.id
        def relationShip = resp.relationShip
        def firstName = resp.firstName
        def lastName = resp.lastName
        def email = resp.email
        def status = resp.status

        render g.render(template: "/team/careGiverTemplate", model: [id: id, relationShip: relationShip, firstName: firstName, lastName: lastName, email: email, status: status])
=======
        render resp as JSON
    }

    def addCareGiver(){
        def resp = treatmentService.addCareGiver(request, response, params)
        render resp as JSON
>>>>>>> fcad99ec844203b5d3ab3fadcc62182b05927f48
    }
}
