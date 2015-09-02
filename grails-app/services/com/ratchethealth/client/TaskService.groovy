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
}
