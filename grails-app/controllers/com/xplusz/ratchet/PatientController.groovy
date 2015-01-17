package com.xplusz.ratchet

import grails.converters.JSON

class PatientController extends BaseController {

    //    def beforeInterceptor = [action: this.&auth]

    def patientService

    def index() {
        render view: '/patient/patientList'
    }

    def getPatients() {
        def data = patientService.loadPatients(params)
        render data as JSON
    }


    def showActivity() {
        def teamData = patientService.loadCareTeam()
        def giverData = patientService.loadCareGiver()
        render(view: "/patient/patientTeam", model: [teams: teamData, givers: giverData])
    }

    def getActivities() {
        def data = patientService.loadActivities(params)
        render data as JSON
    }
}
