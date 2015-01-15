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
        render view: "/patient/patientTeam"
    }

    def getActivities() {
        def data = patientService.loadActivities(params)
        render data as JSON
    }

    def getCareTeam(){
        def data = patientService.loadCareTeam()
        render data as JSON
    }

    def getCareGiver(){
        def data = patientService.loadCareGiver()
        render data as JSON
    }
}
