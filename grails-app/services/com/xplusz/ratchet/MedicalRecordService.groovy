package com.xplusz.ratchet

import com.mashape.unirest.http.Unirest
import com.mashape.unirest.http.exceptions.UnirestException
import com.xplusz.ratchet.exceptions.ApiAjaxAccessException
import com.xplusz.ratchet.exceptions.ApiResourceAccessException
import grails.converters.JSON
import java.text.MessageFormat


class MedicalRecordService {

    /** dependency injection for grailsApplication */
    def grailsApplication

    def showTasksByMedicalRecord(medicalRecordId) throws ApiResourceAccessException {

        def url = MessageFormat.format(grailsApplication.config.ratchetv2.server.medicalRecord.tasks.url, medicalRecordId)

        try {
            def resp = Unirest.get(url)
                    .asString()
            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                return result
            }

        } catch (UnirestException e) {
            log.error(e.message)
            throw new ApiResourceAccessException(e.message)
        }


    }

    def assignTaskToMedicalRecord(params) throws ApiAjaxAccessException {
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

            def args = [params.patientId, params.medicalRecordId].toArray()
            def url = MessageFormat.format(grailsApplication.config.ratchetv2.server.medicalRecord.assignTask.url, args)

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
