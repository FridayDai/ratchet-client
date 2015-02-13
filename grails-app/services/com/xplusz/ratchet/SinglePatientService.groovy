package com.xplusz.ratchet

import com.mashape.unirest.http.Unirest
import com.mashape.unirest.http.exceptions.UnirestException
import com.xplusz.ratchet.exceptions.ApiResourceAccessException
import com.xplusz.ratchet.exceptions.ApiReturnErrorException
import grails.converters.JSON

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import java.text.MessageFormat

class SinglePatientService {

    def grailsApplication

    def showSinglePatient(HttpServletRequest request, HttpServletResponse response, patientId)
            throws ApiResourceAccessException, ApiReturnErrorException {

        String showSinglePatientUrl = grailsApplication.config.ratchetv2.server.url.patient
        def url = String.format(showSinglePatientUrl, patientId)

        try {
            def resp = Unirest.get(url)
                    .asString()
            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                return result
            } else {
                def message = result?.error?.errorMessage
                throw new ApiReturnErrorException(message)
            }
        } catch (UnirestException e) {
            log.error(e.message)
            throw new ApiResourceAccessException(e.message)
        }
    }

    def showMedialRecords(HttpServletRequest request, HttpServletResponse response, patientId)
            throws ApiResourceAccessException, ApiReturnErrorException {

        String showMedialRecordsUrl = grailsApplication.config.ratchetv2.server.url.showMedicalRecords
        def url = String.format(showMedialRecordsUrl, request.session.clientId, patientId)

        try {
            def resp = Unirest.get(url)
                    .asString()
            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                return result
            } else {
                def message = result?.error?.errorMessage
                throw new ApiReturnErrorException(message)
            }
        } catch (UnirestException e) {
            log.error(e.message)
            throw new ApiResourceAccessException(e.message)
        }
    }

    def updateSinglePatient(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiResourceAccessException, ApiReturnErrorException {
        String updateSinglePatientUrl = grailsApplication.config.ratchetv2.server.url.patient
        def url = String.format(showMedialRecordsUrl, params?.patientId)

        try {
            def resp = Unirest.post(url)
                    .field("clientId", params?.clientId)
                    .field("patientId", params?.id)
                    .field("email", params?.email)
                    .field("firstName", params?.firstName)
                    .field("lastName", params?.lastName)
                    .field("phoneNumber", params?.phoneNum)
                    .asString()

            if (resp.status == 200) {
                return resp.status
            } else {
                def message = result?.error?.errorMessage
                throw new ApiReturnErrorException(message)
            }
        } catch (UnirestException e) {
            log.error(e.message)
            throw new ApiResourceAccessException(e.message)
        }

    }
}
