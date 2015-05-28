package com.ratchethealth.client

import com.mashape.unirest.http.exceptions.UnirestException
import com.ratchethealth.client.exceptions.ApiAccessException
import com.ratchethealth.client.exceptions.ApiReturnException
import grails.converters.JSON

class PatientsController extends BaseController {


    def beforeInterceptor = [action: this.&auth]

    def patientService
    def singlePatientService

    static allowedMethods = [getPatients: ['GET'], addPatient: ['POST']]

    def getPatients() {
        if (request.isXhr()) {
            def resp = patientService.loadPatients(request, params)
            render resp as JSON
        } else {
            params.start = RatchetConstants.DEFAULT_PAGE_OFFSET
            params.length = RatchetConstants.DEFAULT_PAGE_SIZE
            def patientList = patientService.loadPatients(request, params)
            render(view: '/patients/patientList', model: [patientList: patientList, pagesize: params.length])
        }
    }

    def addPatient() {
        def resp = patientService.addPatients(request, params)
        render resp as JSON
    }

    def lookup() {
        def resp = patientService.lookup(request, params)
        render resp as JSON
    }

    def downloadFile() {
        try {
            def root = this.servletContext.getRealPath("/")
            def file = new File("${root}/bulk-patient-import-sample.csv")
            if (file.exists()) {
                response.setContentType("file-mime-type")
                response.setHeader("Content-disposition", "attachment;filename=${file.name}")
                response.outputStream << file.text
                response.outputStream.flush()
            } else {
                def message = "File is not exist!"
                throw new ApiReturnException(message)
            }
        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }
    }

    def uploadFile() {
        def data = patientService.uploadPatients(request, params)
        render data as JSON
    }

    def savePatients() {
        def resp = patientService.savePatients(request, params)
        render resp as JSON
    }

    def checkPatientExist() {
        def data = singlePatientService.showPatientByPatientId(request, params)
        render data as JSON
    }

    def checkPatientEmailExist() {
        def data = singlePatientService.checkPatientEmail(request, params)
        render data as JSON
    }

    def downloadErrors() {
        def errorFilePath = patientService.downloadErrors(request)

        if (errorFilePath) {
            redirect url: errorFilePath
        }
    }
}
