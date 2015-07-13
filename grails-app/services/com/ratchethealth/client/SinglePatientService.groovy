package com.ratchethealth.client

import grails.converters.JSON

class SinglePatientService extends RatchetAPIService {

    def grailsApplication

    def showSinglePatient(String token, patientId) {

        String showSinglePatientUrl = grailsApplication.config.ratchetv2.server.url.patient
        def url = String.format(showSinglePatientUrl, patientId)

        log.info("Call backend service to show single patient, token: ${token}.")
        withGet(token, url) { req ->
            def resp = req
                    .asString()
            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                log.info("Show single patient success, token: ${token}")
                return result
            }
            else {
                handleError(resp)
            }
        }
    }

    def showMedialRecords(String token, clientId, patientId) {
        String showMedialRecordsUrl = grailsApplication.config.ratchetv2.server.url.showMedicalRecords
        def url = String.format(showMedialRecordsUrl, clientId, patientId)

        log.info("Call backend service to show medical record, token: ${token}.")
        withGet(token, url) { req ->
            def resp = req
                    .asString()

            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                log.info("Show medical records success, token: ${token}")
                return result
            }
            else {
                handleError(resp)
            }
        }
    }

    def updateSinglePatient(String token, patient) {
        String updateSinglePatientUrl = grailsApplication.config.ratchetv2.server.url.patient
        def url = String.format(updateSinglePatientUrl, patient?.patientId)

        log.info("Call backend service to update single patient with clientId and patient info, token: ${token}.")
        withPost(token, url) { req ->
            def resp = req
                    .field("clientId", patient?.clientId)
                    .field("patientId", patient?.id)
                    .field("email", patient?.email)
                    .field("firstName", patient?.firstName)
                    .field("lastName", patient?.lastName)
                    .field("phoneNumber", patient?.phoneNumber)
                    .asString()

            if (resp.status == 200) {
                log.info("Update single patient success, token: ${token}")
                def status = resp.status
                return status
            }
            else {
                handleError(resp)
            }
        }
    }

    def checkPatientId(String token, patientId) {
        String showPatientUrl = grailsApplication.config.ratchetv2.server.url.showPatient
        def url = String.format(showPatientUrl, patientId)

        log.info("Call backend service to get patient info with patientId token: ${token}.")
        withGet(token, url) { req ->
            def resp = req
                    .asString()

            if (resp.status == 200) {
                log.info("get patient info success, token: ${token}")
                def result = JSON.parse(resp.body)
                return [resp, result]
            } else if (resp.status == 404) {
                log.info("get patient info failed, haven't this patientId, token: ${token}")
                def check = [check: "false"]
                return check
            }
            else {
                handleError(resp)
            }
        }
    }

    def checkPatientEmail(String token, clientId, email) {
        def url = grailsApplication.config.ratchetv2.server.url.checkPatientEmail

        log.info("Call backend service to check patient email, token: ${token}.")
        withPost(token, url) { req ->
            def resp = req
                    .field("clientId", clientId)
                    .field("email", email)
                    .asString()

            if (resp.status == 200) {
                log.info("this patient email already exist, token: ${token}")
                def result = JSON.parse(resp.body)
                return [resp, result]
            } else if (resp.status == 404) {
                log.info("this patient email doesn't exist, token: ${token}")
                def check = [check: "false"]
                return check
            }
            else {
                handleError(resp)
            }
        }
    }

}
