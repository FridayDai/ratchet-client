package com.ratchethealth.client

import com.mashape.unirest.http.Unirest
import com.mashape.unirest.http.exceptions.UnirestException
import com.ratchethealth.client.exceptions.ApiAccessException
import com.ratchethealth.client.exceptions.ApiReturnException
import grails.converters.JSON
import org.apache.commons.lang.StringUtils
import org.springframework.web.multipart.MultipartFile
import org.springframework.web.multipart.MultipartHttpServletRequest

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class PatientService {
    /** dependency injection for grailsApplication */
    def grailsApplication
    def messageSource

    def addPatients(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiAccessException, ApiReturnException {
        def patientId = params?.patientId
        def firstName = params?.firstName
        def lastName = params?.lastName
        def phoneNumber = params?.phoneNumber
        def email = params?.email
        def profilePhoto = params?.profilePhoto
        def treatmentId = params?.treatmentId
        def surgeonId = params?.staffId
        def surgeryTime = params?.surgeryTime
        def ecFirstName = params?.ecFirstName
        def ecLastName = params?.ecLastName
        def relationship = params?.relationship
        def ecEmail = params?.ecEmail
        def groupId = params?.groupId

        String addPatientsUrl = grailsApplication.config.ratchetv2.server.url.assignTreatments
        def url = String.format(addPatientsUrl, request.session.clientId)

        try {
            log.info("Call backend service to add patient with clientId and patient info, token: ${request.session.token}.")
            def resp = Unirest.post(url)
                    .header("X-Auth-Token", request.session.token)
                    .field("patientId", patientId)
                    .field("clientId", request.session.clientId)
                    .field("firstName", firstName)
                    .field("lastName", lastName)
                    .field("phoneNumber", phoneNumber)
                    .field("email", email)
                    .field("profilePhoto", profilePhoto)
                    .field("treatmentId", treatmentId)
                    .field("surgeonId", surgeonId)
                    .field("surgeryTime", surgeryTime)
                    .field("ecFirstName", ecFirstName)
                    .field("ecLastName", ecLastName)
                    .field("relationship", relationship)
                    .field("ecEmail", ecEmail)
                    .field("groupId",groupId)
                    .asString()
            def result = JSON.parse(resp.body)

            if (resp.status == 201) {
                def map = [:]
                map.put("id", result.id)
                log.info("Add patient success, token: ${request.session.token}")
                return map
            } else {
                def message = result?.error?.errorMessage
                throw new ApiReturnException(resp.status, message)
            }
        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }

    }

    def savePatients(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiAccessException, ApiReturnException {
        def bulkList = JSON.parse(params.bulkList)


        String savePatientsUrl = grailsApplication.config.ratchetv2.server.url.savePatient
        def url = String.format(savePatientsUrl, request.session.clientId)

        try {
            log.info("Call backend service to save patients with bulkList, token: ${request.session.token}.")
            def resp = Unirest.post(url)
                    .header("X-Auth-Token", request.session.token)
                    .field("bulkList", bulkList)
                    .asString()

            if (resp.status == 200) {
                def map = [:]
                log.info("Save patient success, token: ${request.session.token}")
                return map
            } else {
                def message = result?.error?.errorMessage
                throw new ApiReturnException(resp.status, message)
            }
        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }

    }

    def loadPatients(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiAccessException, ApiReturnException {

        def start = params?.start
        def length = params?.length
        def order = params?.order
        def columns = params?.columns
        def search = params?.search
        def draw = params?.draw
        def patientType = params?.patientType
        def treatmentId = params?.treatmentId
        def surgeonId = params?.surgeonId
        def patientIdOrName = params?.patientIdOrName

        def url = grailsApplication.config.ratchetv2.server.url.patients
        try {
            log.info("Call backend service to get patients with max, offset and clientId, token: ${request.session.token}.")
            def resp = Unirest.get(url)
                    .header("X-Auth-Token", request.session.token)
                    .queryString("max", length)
                    .queryString("offset", start)
                    .queryString("clientId", request.session.clientId)
                    .queryString("patientType", patientType)
                    .queryString("treatmentId", treatmentId)
                    .queryString("surgeonId", surgeonId)
                    .queryString("patientIdOrName", patientIdOrName)
                    .asString()

            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                def map = [:]

                map.put(start, start)
                map.put(length, length)
                map.put(order, order)
                map.put(columns, columns)
                map.put(search, search)
                map.put(draw, draw)
                map.put("recordsTotal", result.totalCount)
                map.put("recordsFiltered", result.totalCount)
                map.put("data", result.items)

                log.info("Get patients success, token: ${request.session.token}")
                return map
            } else {
                def message = result?.error?.errorMessage
                throw new ApiReturnException(resp.status, message)
            }
        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }
    }

    def uploadPatients(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiAccessException, ApiReturnException {

        def file = params.file
        String uploadUrl = grailsApplication.config.ratchetv2.server.url.uploadPatient
        def url = String.format(uploadUrl, request.session.clientId)

        try {
            log.info("Call backend service to bulk import patient, token: ${request.session.token}.")
            File tempFile = File.createTempFile("error_csv", ".csv")
            file.transferTo(tempFile)

            def resp = Unirest.post(url)
                    .header("X-Auth-Token", request.session.token)
                    .header("accept", "application/json")
                    .field("file", tempFile)
                    .field("fileName", file.fileItem.fileName)
                    .asString()

            if (resp.status != 209) {
                def result = JSON.parse(resp.body)
            }

            if (resp.status == 200) {
                def map = [:]
                map.put("data", result.items)
                log.info("Bulk import patient success, token: ${request.session.token}")
                return map
            } else if (resp.status == 209){
                throw new ApiReturnException(resp.status, '')
            } else {
                def message = result?.error?.errorMessage
                throw new ApiReturnException(resp.status, message)
            }
        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }
    }


    def lookup(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiAccessException, ApiReturnException {

        def start = params?.start
        def length = params?.length
        def order = params?.order
        def columns = params?.columns
        def search = params?.search
        def draw = params?.draw
        def title = params?.title

        String lookupUrl = grailsApplication.config.ratchetv2.server.url.lookup
        def url = String.format(lookupUrl, request.session.clientId)
        try {
            log.info("Call backend service to lookup with max, offset and title, token: ${request.session.token}.")
            def resp = Unirest.post(url)
                    .header("X-Auth-Token", request.session.token)
                    .field("max", length)
                    .field("offset", start)
                    .field("title", title)
                    .asString()

            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                def map = [:]

                map.put(start, start)
                map.put(length, length)
                map.put(order, order)
                map.put(columns, columns)
                map.put(search, search)
                map.put(draw, draw)
                map.put("recordsTotal", result.totalCount)
                map.put("recordsFiltered", result.totalCount)
                map.put("data", result.items)

                log.info("Lookup success, token: ${request.session.token}")
                return map
            } else {
                def message = result?.error?.errorMessage
                throw new ApiReturnException(resp.status, message)
            }
        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }
    }

    def downloadErrors(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiAccessException, ApiReturnException {

        String errorUrl = grailsApplication.config.ratchetv2.server.url.downloadErrors
        def url = String.format(errorUrl, request.session.clientId)

        try {
            log.info("Call backend service to get bulk import patient error file link, token: ${request.session.token}.")

            def resp = Unirest.get(url)
                    .header("X-Auth-Token", request.session.token)
                    .asString()

            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                log.info("Get bulk import patient error file link success, token: ${request.session.token}")
                return result?.errorFilePath
            } else {
                def message = result?.error?.errorMessage
                throw new ApiReturnException(resp.status, message)
            }
        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }
    }
}
