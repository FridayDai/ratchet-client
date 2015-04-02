package com.ratchethealth.client

import com.mashape.unirest.http.Unirest
import com.mashape.unirest.http.exceptions.UnirestException
import com.ratchethealth.client.exceptions.ApiAccessException
import com.ratchethealth.client.exceptions.ApiReturnException
import grails.converters.JSON

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class MedicalRecordService {

    /** dependency injection for grailsApplication */
    def grailsApplication

    def showTasksByMedicalRecord(HttpServletRequest request, HttpServletResponse response, clientId, medicalRecordId)
            throws ApiAccessException, ApiReturnException {

        String showTasksUrl = grailsApplication.config.ratchetv2.server.url.medicalRecord.tasks
        def url = String.format(showTasksUrl, clientId, medicalRecordId)

        try {
            log.info("Call backend service to show tasks by medical record, token: ${request.session.token}.")
            def resp = Unirest.get(url)
                    .asString()
            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                log.info("Get tasks success by medical record, token: ${request.session.token}")
                return result
            } else {
                def message = result?.error?.errorMessage
                throw new ApiReturnException(resp.status, message)
            }

        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }
    }

    def assignTaskToMedicalRecord(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiAccessException {

        String assignTaskUrl = grailsApplication.config.ratchetv2.server.url.medicalRecord.assignTask
        def url = String.format(assignTaskUrl, params.clientId, params.patientId, params.medicalRecordId)

        try {
            log.info("Call backend service to assign task to medical record with toolId, status, sendTime and remindTime, token: ${request.session.token}.")
            def toolId = params.toolId
            def status = params.status
            def requireCompletion = params.requireCompletion
            def sendTime, remindTime
            if (status == StatusCodeConstants.TASK_FUTURE) {
                sendTime = params.sendMillionSeconds
            } else {
                sendTime = new Date().getTime()
            }

            if (requireCompletion) {
                remindTime = params.remindMillionSeconds
            } else {
                remindTime = null
            }

            def resp = Unirest.post(url)
                    .field("tool.id", toolId)
                    .field("status", status)
                    .field("sendTime", sendTime)
                    .field("remindTime", remindTime)
                    .asString()

            def result = JSON.parse(resp.body)
            if (resp.status == 200) {
                log.info("Assign task to medical record success, token: ${request.session.token}")
                return result
            } else {
                return false
            }
        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }

    }

}
