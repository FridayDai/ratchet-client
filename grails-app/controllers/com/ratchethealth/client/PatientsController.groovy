package com.ratchethealth.client

import com.mashape.unirest.http.exceptions.UnirestException
import com.ratchethealth.client.exceptions.ApiAccessException
import com.ratchethealth.client.exceptions.ApiReturnException
import grails.converters.JSON

class PatientsController extends BaseController {
    def beforeInterceptor = [action: this.&auth]

    def patientService
    def bulkImportService

    static allowedMethods = [getPatients: ['GET'], addPatient: ['POST']]

    def getPatients(PatientPagination patientPagination) {
        String token = request.session.token
        def clientId = request.session.clientId

        if (request.isXhr()) {
            def resp = patientService.loadPatients(token, clientId, patientPagination)
            render resp as JSON
        } else {
            patientPagination.start = RatchetConstants.DEFAULT_PAGE_OFFSET
            patientPagination.length = RatchetConstants.DEFAULT_PAGE_SIZE
            patientPagination.sortField = 'patientId'
            patientPagination.sortDir = 'desc'

            def patientList = patientService.loadPatients(token, clientId, patientPagination)
            render(view: '/patients/patientList', model: [patientList: patientList, pagesize: patientPagination.length])
        }
    }

    def addPatient(Patient patient) {
        String token = request.session.token
        def clientId = request.session.clientId
        def resp = patientService.addPatients(token, clientId, patient)
        render resp as JSON
    }

    def lookup(BulkPagination bulkPagination) {
        String token = request.session.token
        def clientId = request.session.clientId
        def resp = bulkImportService.lookup(token, clientId, bulkPagination)
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
        String token = request.session.token
        def clientId = request.session.clientId
        def importFile = params?.file
        def data = bulkImportService.uploadPatients(token, clientId, importFile)
        render data as JSON
    }

    def savePatients() {
        String token = request.session.token
        def clientId = request.session.clientId
        def bulkList = JSON.parse(params?.bulkList)
        def resp = bulkImportService.savePatients(token, clientId, bulkList)
        render resp as JSON
    }


    def downloadErrors() {
        String token = request.session.token
        def clientId = request.session.clientId
        def errorFilePath = bulkImportService.downloadErrors(token, clientId)

        if (errorFilePath) {
            redirect url: errorFilePath
        }
    }
}
