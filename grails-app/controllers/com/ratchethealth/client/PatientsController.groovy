package com.ratchethealth.client

import com.mashape.unirest.http.exceptions.UnirestException
import com.ratchethealth.client.exceptions.ApiAccessException
import com.ratchethealth.client.exceptions.ApiReturnException
import grails.converters.JSON
import grails.web.JSONBuilder
import org.apache.commons.lang.StringUtils
import org.codehaus.groovy.grails.io.support.IOUtils
import org.springframework.web.multipart.MultipartFile
import org.springframework.web.multipart.MultipartHttpServletRequest

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

    def lookup() {
        def resp = patientService.lookup(request, response, params)
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

    def downloadFile() {
        InputStream contentStream
        try {
            def file = new File("grails-app/assets/bulk-patient-import-sample.csv")
            if (file.exists()) {
                response.setHeader("Content-disposition", "attachment;filename=${file.getName()}")
                response.setHeader("Content-Length", "file-size")
                response.setContentType("file-mime-type")
                contentStream = file.newInputStream()
                response.outputStream << contentStream
                webRequest.renderView = false
            } else {
                def message = "File is not exist!"
                throw new ApiReturnException(message)
            }
        } catch (UnirestException e) {
                throw new ApiAccessException(e.message)
        }
        finally {
            IOUtils.closeQuietly(contentStream)
        }
    }

    def uploadFile() {
        def data = patientService.uploadPatients(request, response, params)
        render data as JSON
    }

    def savePatients() {
        def resp = patientService.savePatients(request, response, params)
        render resp as JSON
    }


    def checkPatientEmailExist() {
        def data = singlePatientService.checkPatientEmail(request, response, params)
        render data as JSON
    }
}
