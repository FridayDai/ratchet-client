package com.xplusz.ratchet

import com.mashape.unirest.http.Unirest
import com.mashape.unirest.http.exceptions.UnirestException
import com.xplusz.ratchet.exceptions.ApiAjaxAccessException
import com.xplusz.ratchet.exceptions.ApiAjaxReturnErrorException
import com.xplusz.ratchet.exceptions.ApiResourceAccessException
import com.xplusz.ratchet.exceptions.ApiReturnErrorException
import grails.converters.JSON

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import java.text.MessageFormat

class TaskService {

    /** dependency injection for grailsApplication */
    def grailsApplication

    def messageSource

    def getOverdueTasks(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiResourceAccessException, ApiReturnErrorException {

        def max = params?.max
        def offset = params?.offset
        def patientId = params?.patientId
        def medicalRecordId = params?.medicalRecordId

        String getOverdueTasksUrl = grailsApplication.config.ratchetv2.server.url.getOverdueTask
        def url = String.format(getOverdueTasksUrl, patientId, medicalRecordId)

        try {
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
                throw new ApiReturnErrorException(message, resp.status)
            }
        } catch (UnirestException e) {
            throw new ApiResourceAccessException(e.message)
        }

    }

    def sendTaskEmailToPatient(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiAjaxAccessException, ApiAjaxReturnErrorException {

        String sendTaskEmailUrl = grailsApplication.config.ratchetv2.server.url.task.sendEmail
        def url = String.format(sendTaskEmailUrl, params.clientId, params.patientId, params.medicalRecordId, params.taskId)

        try {
            def resp = Unirest.get(url)
                    .asString()

            if (resp.status == 200) {
                log.info("Send task email to patient success, token: ${request.session.token}")
                return true
            } else {
                def result = JSON.parse(resp.body)
                def message = result?.error?.errorMessage
                throw new ApiAjaxReturnErrorException(message, resp.status)
            }

        } catch (UnirestException e) {
            throw new ApiAjaxAccessException(e.message)
        }
    }
}
