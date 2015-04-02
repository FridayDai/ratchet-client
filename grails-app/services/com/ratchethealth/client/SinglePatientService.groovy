package com.ratchethealth.client

import com.mashape.unirest.http.Unirest
import com.mashape.unirest.http.exceptions.UnirestException
import com.ratchethealth.client.exceptions.ApiAccessException
import com.ratchethealth.client.exceptions.ApiReturnException
import grails.converters.JSON

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class SinglePatientService {

    def grailsApplication

    def showSinglePatient(HttpServletRequest request, HttpServletResponse response, patientId)
            throws ApiAccessException, ApiReturnException {

        String showSinglePatientUrl = grailsApplication.config.ratchetv2.server.url.patient
        def url = String.format(showSinglePatientUrl, patientId)

        try {
            log.info("Call backend service to show single patient, token: ${request.session.token}.")
            def resp = Unirest.get(url)
                    .asString()
            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                log.info("Show single patient success, token: ${request.session.token}")
                return result
            } else {
                def message = result?.error?.errorMessage
                throw new ApiReturnException(resp.status, message)
            }
        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }
    }

    def showMedialRecords(HttpServletRequest request, HttpServletResponse response, patientId)
            throws ApiAccessException, ApiReturnException {

        String showMedialRecordsUrl = grailsApplication.config.ratchetv2.server.url.showMedicalRecords
        def url = String.format(showMedialRecordsUrl, request.session.clientId, patientId)

        try {
            log.info("Call backend service to show medical record, token: ${request.session.token}.")
            def resp = Unirest.get(url)
                    .asString()
            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                log.info("Show medical records success, token: ${request.session.token}")
                return result
            } else {
                def message = result?.error?.errorMessage
                throw new ApiReturnException(resp.status, message)
            }
        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }
    }

    def updateSinglePatient(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiAccessException, ApiReturnException {
        String updateSinglePatientUrl = grailsApplication.config.ratchetv2.server.url.patient
        def url = String.format(updateSinglePatientUrl, params?.patientId)

        try {
            log.info("Call backend service to update single patient with clientId and patient info, token: ${request.session.token}.")
            def resp = Unirest.post(url)
                    .field("clientId", params?.clientId)
                    .field("patientId", params?.id)
                    .field("email", params?.email)
                    .field("firstName", params?.firstName)
                    .field("lastName", params?.lastName)
                    .field("phoneNumber", params?.phoneNumber)
                    .asString()

            if (resp.status == 200) {
                log.info("Update single patient success, token: ${request.session.token}")
                return resp.status
            } else {
                def result = JSON.parse(resp.body)
                def message = result?.error?.errorMessage
                throw new ApiReturnException(resp.status, message)
            }
        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }
    }
}
