package com.xplusz.ratchet

import com.mashape.unirest.http.Unirest
import com.mashape.unirest.http.exceptions.UnirestException
import com.xplusz.ratchet.exceptions.ApiAjaxAccessException
import com.xplusz.ratchet.exceptions.ApiResourceAccessException
import com.xplusz.ratchet.exceptions.ApiReturnErrorException
import grails.converters.JSON
import java.text.MessageFormat


class MedicalRecordService {

    /** dependency injection for grailsApplication */
    def grailsApplication

    def showTasksByMedicalRecord(clientId, medicalRecordId) throws ApiResourceAccessException, ApiReturnErrorException {

        String showTasksUrl = grailsApplication.config.ratchetv2.server.url.medicalRecord.tasks
        def url = String.format(showTasksUrl, clientId, medicalRecordId)

        try {
            def resp = Unirest.get(url)
                    .asString()
            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                return result
            } else {
                def message = result?.error?.errorMessage
                throw new ApiReturnErrorException(message, resp.status)
            }

        } catch (UnirestException e) {
            log.error(e.message)
            throw new ApiResourceAccessException(e.message)
        }


    }

    def assignTaskToMedicalRecord(params) throws ApiAjaxAccessException {

        String assignTaskUrl = grailsApplication.config.ratchetv2.server.url.medicalRecord.assignTask
        def url = String.format(assignTaskUrl, params.clientId, params.patientId, params.medicalRecordId)

        try {
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
                return result
            } else {
                return false
            }
        } catch (UnirestException e) {
            log.error(e.message)
            throw new ApiAjaxAccessException(e.message)
        }

    }

}
