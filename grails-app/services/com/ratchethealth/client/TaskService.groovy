package com.ratchethealth.client

import groovy.json.JsonBuilder

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
                log.info("Get tasks success by medical record, token: ${token}")

                parseRespBody(resp)
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

                parseRespBody(resp)
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

                parseRespBody(resp)
            }
            else {
                handleError(resp)
            }
        }
    }

    def answerUserTask(String token, clientId, patientId, taskId, answer) {
        String userTaskUrl = grailsApplication.config.ratchetv2.server.url.task.answerUserTask
        def url = String.format(userTaskUrl, clientId, patientId, taskId)

        log.info("Call backend service to answer user task, token: ${token}.")
        answer = new JsonBuilder(answer).toString()


        withPost(token, url) { req ->
            def resp = req.body(answer).asJson()

            if (resp.status == 201) {
                log.info("Answer user task success, token: ${token}.")
                return true
            } else {
                handleError(resp)
            }
        }
    }
}
