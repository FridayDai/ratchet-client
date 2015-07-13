package com.ratchethealth.client

import grails.converters.JSON

class TreatmentService extends RatchetClientService {

    def grailsApplication
    def messageSource

    def getTreatments(String token, clientId, max, offset, treatmentTitle) {

        String getTreatmentsUrl = grailsApplication.config.ratchetv2.server.url.getTreatments
        def url = String.format(getTreatmentsUrl, clientId)

        log.info("Call backend service to get treatments with max, offset and treatmetnTitle, token: ${token}.")
        withGet(token, url) { req ->
            def resp = req
                    .queryString("max", max)
                    .queryString("offset", offset)
                    .queryString("treatmentTitle", treatmentTitle)
                    .asString()

            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                log.info("Get treatments success, token: ${token}")
                def items = result.items
                return [resp, items]
            }

            [resp, null]
        }
    }

    def assignTreatmentToExistPatient(String token, clientId, patient) {

        String assignTreatmentUrl = grailsApplication.config.ratchetv2.server.url.assignTreatments
        def url = String.format(assignTreatmentUrl, clientId)

        log.info("Call backend service to assign treatment to exist patient with treatmentId, surgeonId, surgeryTime and emergency contact info, token: ${token}.")
        withPost(token, url) { req ->
            def resp = req
                    .field("id", patient?.patientId)
                    .field("patientId", patient?.id)
                    .field("firstName", patient?.firstName)
                    .field("lastName", patient?.lastName)
                    .field("phoneNumber", patient?.phoneNumber)
                    .field("email", patient?.email)
                    .field("profilePhoto", patient?.profilePhoto)
                    .field("treatmentId", patient?.treatmentId)
                    .field("surgeonId", patient?.staffId)
                    .field("surgeryTime", patient?.surgeryTime)
                    .field("ecFirstName", patient?.ecFirstName)
                    .field("ecLastName", patient?.ecLastName)
                    .field("relationship", patient?.relationship)
                    .field("ecEmail", patient?.ecEmail)
                    .field("groupId", patient?.groupId)
                    .asString()

            def result = JSON.parse(resp.body)

            if (resp.status == 201) {
                log.info("Assign treatment to exist patient success, token: ${token}")
                return [resp, result]
            }

            [resp, null]
        }
    }

    def getTreatmentInfo(String token, clientId, treatmentId) {

        String getTreatmentInfoUrl = grailsApplication.config.ratchetv2.server.url.getTreatmentInfo
        def url = String.format(getTreatmentInfoUrl, clientId, treatmentId)

        log.info("Call backend service to get treatment info, token: ${token}.")
        withGet(token, url) { req ->
            def resp = req
                    .asString()

            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                log.info("Get treatment info success, token:${token}")
                return [resp, result]
            }

            [resp, null]
        }
    }

    def updateSurgeryTime(String token, clientId, medicalRecordId, patientId, surgeryTime) {

        String updateSurgeryTimeUrl = grailsApplication.config.ratchetv2.server.url.updateSurgeryTime
        def url = String.format(updateSurgeryTimeUrl, clientId, patientId, medicalRecordId)

        log.info("Call backend service to update surgery date, token: ${token}.")
        withPost(token, url) { req ->
            def resp = req
                    .field("surgeryTime", surgeryTime)
                    .asString()

            if (resp.status == 200) {
                log.info("Update surgery date success, token: ${token}")
                return [resp, true]
            }
            [resp, null]
        }
    }

    def archiveTreatment(String token, clientId, medicalRecordId, patientId) {
        String archivedUrl = grailsApplication.config.ratchetv2.server.url.archived
        def url = String.format(archivedUrl, clientId, patientId, medicalRecordId)

        log.info("Call backend service to archive medical record, token: ${token}.")
        withPost(token, url) { req ->
            def resp = req
                    .asString()

            if (resp.status == 200) {
                log.info("Archive medical record success, token: ${token}")
                return [resp, true]
            }
            [resp, null]
        }
    }
}
