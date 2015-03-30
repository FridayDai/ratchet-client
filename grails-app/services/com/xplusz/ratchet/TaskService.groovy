package com.xplusz.ratchet

import com.mashape.unirest.http.Unirest
import com.mashape.unirest.http.exceptions.UnirestException
import com.xplusz.ratchet.exceptions.ApiAccessException
import com.xplusz.ratchet.exceptions.ApiReturnException
import grails.converters.JSON

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import java.text.MessageFormat

class TaskService {

    /** dependency injection for grailsApplication */
    def grailsApplication

    def messageSource

    def getOverdueTasks(HttpServletRequest request, HttpServletResponse response, params)
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

    def sendTaskEmailToPatient(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiAccessException, ApiReturnException {

        String sendTaskEmailUrl = grailsApplication.config.ratchetv2.server.url.task.sendEmail
        def url = String.format(sendTaskEmailUrl, params.clientId, params.patientId, params.medicalRecordId, params.taskId)

        try {
            log.info("Call backend service to send task email to patient, token: ${request.session.token}.")
            def resp = Unirest.get(url)
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
