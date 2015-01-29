package com.xplusz.ratchet

import grails.converters.JSON

class PatientsController extends BaseController {


    def beforeInterceptor = [action: this.&auth]

    def patientService

    static allowedMethods = [getPatients: ['GET'], addPatient: ['GET', 'POST']]

    def index() {
        render view: '/patients/patientList'
    }

    def getPatients() {
        def resp = patientService.loadPatients(request, response, params)
        render resp as JSON
    }

    def addPatient() {
        def resp = patientService.addPatients(request, response, params)
        render resp as JSON
    }

    def showActivity() {
        def teamData = patientService.loadCareTeam()
        def giverData = patientService.loadCareGiver()
        render(view: "/patients/patientTeam", model: [teams: teamData, givers: giverData])
    }

    def getActivities() {
        def data = patientService.loadActivities(params)
        render data as JSON
    }
}