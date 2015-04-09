package com.ratchethealth.client

import com.mashape.unirest.http.Unirest
import com.mashape.unirest.http.exceptions.UnirestException
import com.ratchethealth.client.exceptions.ApiAccessException
import com.ratchethealth.client.exceptions.ApiReturnException
import grails.converters.JSON

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

        String addPatientsUrl = grailsApplication.config.ratchetv2.server.url.assignTreatments
        def url = String.format(addPatientsUrl, request.session.clientId)

        try {
            log.info("Call backend service to add patient with clientId and patient info, token: ${request.session.token}.")
            def resp = Unirest.post(url)
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

    def getGroups(HttpServletRequest request, HttpServletResponse response)
            throws ApiAccessException, ApiReturnException {

        def url = grailsApplication.config.ratchetv2.server.url.getGroups
        try {
            log.info("Call backend service to get groups with clientId, token: ${request.session.token}.")
            def resp = Unirest.get(url)
                    .queryString("clientId", request.session.clientId)
                    .asString()

            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                return result
            } else {
                def message = result?.error?.errorMessage
                throw new ApiReturnException(resp.status, message)
            }
        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }
    }


}
