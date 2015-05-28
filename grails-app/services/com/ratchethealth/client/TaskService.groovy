package com.ratchethealth.client

import com.mashape.unirest.http.Unirest
import com.mashape.unirest.http.exceptions.UnirestException
import com.ratchethealth.client.exceptions.ApiAccessException
import com.ratchethealth.client.exceptions.ApiReturnException
import grails.converters.JSON

import javax.servlet.http.HttpServletRequest

class TaskService {

    /** dependency injection for grailsApplication */
    def grailsApplication

    def messageSource

    def getOverdueTasks(HttpServletRequest request, params)
            throws ApiAccessException, ApiReturnException {

        def max = params?.max
        def offset = params?.offset
        def patientId = params?.patientId
        def medicalRecordId = params?.medicalRecordId

        String getOverdueTasksUrl = grailsApplication.config.ratchetv2.server.url.getOverdueTask
        def url = String.format(getOverdueTasksUrl, patientId, medicalRecordId)

        try {
            log.info("Call backend service to get overdue tasks with max and offset, token: ${request.session.token}.")
            def resp = Unirest.get(url)
                    .header("X-Auth-Token", request.session.token)
                    .queryString("max", max)
                    .queryString("offset", offset)
                    .asString()

            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                log.info("Get overdue tasks success, token: ${request.session.token}")
                return result.items
            } else {
                def message = result?.error?.errorMessage
                throw new ApiReturnException(resp.status, message)
            }
        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }

    }

    def sendTaskEmailToPatient(HttpServletRequest request, params)
            throws ApiAccessException, ApiReturnException {

        def clientId = request.session.clientId
        String sendTaskEmailUrl = grailsApplication.config.ratchetv2.server.url.task.sendEmail
        def url = String.format(sendTaskEmailUrl, clientId, params.patientId, params.medicalRecordId, params.taskId)

        try {
            log.info("Call backend service to send task email to patient, token: ${request.session.token}.")
            def resp = Unirest.get(url)
                    .header("X-Auth-Token", request.session.token)
                    .asString()

            if (resp.status == 200) {
                log.info("Send task email to patient success, token: ${request.session.token}")
                return true
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
