package com.ratchethealth.client

import grails.converters.JSON

class TaskService extends RatchetAPIService{

    def grailsApplication
    def messageSource

    def getTasks(String token, clientId, medicalRecordId) {

        String showTasksUrl = grailsApplication.config.ratchetv2.server.url.medicalRecord.tasks
        def url = String.format(showTasksUrl, clientId, medicalRecordId)

        log.info("Call backend service to show tasks by medical record, token: ${token}.")

        withGet(token, url) { req ->
            def resp = req
                    .asString()

            if (resp.status == 200) {
                def result = JSON.parse(resp.body)
                log.info("Get tasks success by medical record, token: ${token}")
                return result
            }
            else {
                handleError(resp)
            }
        }
    }

    def sendTaskEmailToPatient(String token, clientId, patientId, medicalRecordId, taskId) {

        String sendTaskEmailUrl = grailsApplication.config.ratchetv2.server.url.task.sendEmail
        def url = String.format(sendTaskEmailUrl, clientId, patientId, medicalRecordId, taskId)

        log.info("Call backend service to send task email to patient, token: ${token}.")
        withGet(token, url) { req ->
            def resp = req
                    .asString()

            if (resp.status == 200) {
                log.info("Send task email to patient success, token: ${token}")
                return true
            }
            else {
                handleError(resp)
            }
        }
    }

    def getResult(String token, clientId, patientId, medicalRecordId, taskId) {
        String getTaskResultUrl = grailsApplication.config.ratchetv2.server.url.task.getResult
        def url = String.format(getTaskResultUrl, clientId, patientId, medicalRecordId, taskId)

        log.info("Call backend service to get task result, token: ${token}.")
        withGet(token, url) { req ->
            def resp = req
                    .asString()

            if (resp.status == 200) {
                log.info("Get task result success, token: ${token}")

                JSON.parse(resp.body)
            }
            else {
                handleError(resp)
            }
        }
    }

    def deleteTask(String token, clientId, patientId, medicalRecordId, taskId) {
        String deleteTaskUrl = grailsApplication.config.ratchetv2.server.url.task.delete
        def url = String.format(deleteTaskUrl, clientId, patientId, medicalRecordId, taskId)

        log.info("Call backend service to delete a task, token: ${token}.")
        withDelete(token, url) { req ->
            def resp = req.asString()

            if (resp.status == 204) {
                log.info("delete a task success, token: ${token}.")
                return true
            } else {
                handleError(resp)
            }
        }
    }

    def voiceCall(String token, clientId, patientId, medicalRecordId, taskId) {
        String voiceTaskUrl = grailsApplication.config.ratchetv2.server.url.task.callVoice
        def url = String.format(voiceTaskUrl, clientId, patientId, medicalRecordId, taskId)

        log.info("Call backend service to call voice task, token: ${token}.")
        withPost(token, url) { req ->
            def resp = req.asString()

            if (resp.status == 200) {
                log.info("Call voice task success, token: ${token}.")
                return true
            } else {
                handleError(resp)
            }
        }
    }

    def viewVoiceResult(String token, clientId, patientId, medicalRecordId, taskId) {
        String voiceTaskUrl = grailsApplication.config.ratchetv2.server.url.task.callVoice
        def url = String.format(voiceTaskUrl, clientId, patientId, medicalRecordId, taskId)

        log.info("Call backend service to view voice result task, token: ${token}.")
        withGet(token, url) { req ->
            def resp = req
                    .asString()

            if (resp.status == 200) {
                log.info("Get task result success, token: ${token}")

                JSON.parse(resp.body)
            }
            else {
                handleError(resp)
            }
        }
    }

    def resolveAttention(String token, clientId, patientId, medicalRecordId, taskId) {
        String resolveVoiceUrl = grailsApplication.config.ratchetv2.server.url.task.resolveVoice
        def url = String.format(resolveVoiceUrl, clientId, patientId, medicalRecordId, taskId)

        log.info("Call backend service to get task result, token: ${token}.")
        withGet(token, url) { req ->
            def resp = req
                    .asString()

            if (resp.status == 200) {
                log.info("Get task result success, token: ${token}")
                return true
            }
            else {
                handleError(resp)
            }
        }
    }
}
