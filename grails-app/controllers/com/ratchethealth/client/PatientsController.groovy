package com.ratchethealth.client

import grails.converters.JSON

class PatientsController extends BaseController {


    def beforeInterceptor = [action: this.&auth]

    def patientService
    def singlePatientService

    static allowedMethods = [getPatients: ['GET'], addPatient: ['GET', 'POST']]

    def index() {
        params.start = RatchetConstants.DEFAULT_PAGE_OFFSET
        params.length = RatchetConstants.DEFAULT_PAGE_SIZE
        def patientList = patientService.loadPatients(request, response, params)
        render(view: '/patients/patientList', model: [patientList: patientList, pagesize: params.length])
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

    def checkPatientExist() {
        def data = singlePatientService.showPatientByPatientId(request, response, params)
        render data as JSON
    }
}
