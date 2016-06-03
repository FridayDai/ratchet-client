package com.ratchethealth.client

class TreatmentService extends RatchetAPIService {

    def grailsApplication
    def messageSource

    def getTreatments(String token, clientId, groupId, max, offset, treatmentTitle, showAll) {

        String getTreatmentsUrl = grailsApplication.config.ratchetv2.server.url.getTreatments
        def url = String.format(getTreatmentsUrl, clientId)

        log.info("Call backend service to get treatments with max, offset and treatmetnTitle, token: ${token}.")
        withGet(token, url) { req ->
            def resp = req
                    .queryString("max", max)
                    .queryString("offset", offset)
                    .queryString("groupId", groupId)
                    .queryString("treatmentTitle", treatmentTitle)
                    .queryString("showAll", showAll)
                    .asString()

            if (resp.status == 200) {
                def result = parseRespBody(resp)
                log.info("Get treatments success, token: ${token}")
                def items = result.items
                return items
            }
            else {
                handleError(resp)
            }
        }
    }

    def assignTreatmentToExistPatient(String token, clientId, patient) {

        String assignTreatmentUrl = grailsApplication.config.ratchetv2.server.url.assignTreatments
        def url = String.format(assignTreatmentUrl, clientId)

        log.info("Call backend service to assign treatment to exist patient, token: ${token}.")
        withPost(token, url) { req ->
            def resp = req
                    .field("id", patient?.patientId)
                    .field("patientId", patient?.id)
                    .field("firstName", patient?.firstName)
                    .field("lastName", patient?.lastName)
                    .field("phoneNumber", patient?.phoneNumber)
                    .field("email", patient?.email)
                    .field("birthday", patient?.birthdayValue)
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

            if (resp.status == 201) {
                log.info("Assign treatment to exist patient success, token: ${token}")

                parseRespBody(resp)
            }
            else {
                handleError(resp)
            }
        }
    }

    def getTreatmentInfo(String token, clientId, treatmentId) {

        String getTreatmentInfoUrl = grailsApplication.config.ratchetv2.server.url.getTreatmentInfo
        def url = String.format(getTreatmentInfoUrl, clientId, treatmentId)

        log.info("Call backend service to get treatment info, token: ${token}.")
        withGet(token, url) { req ->
            def resp = req
                    .asString()

            if (resp.status == 200) {
                log.info("Get treatment info success, token:${token}")

                parseRespBody(resp)
            } else {
                handleError(resp)
            }
        }
    }

    def updateSurgeryTime(String token, clientId, medicalRecordId, patientId, providerId, surgeryTime) {

        String updateSurgeryTimeUrl = grailsApplication.config.ratchetv2.server.url.updateSurgeryTime
        def url = String.format(updateSurgeryTimeUrl, clientId, patientId, medicalRecordId)

        log.info("Call backend service to update surgery date, token: ${token}.")
        withPost(token, url) { req ->
            def resp = req
                    .field("surgeryTime", surgeryTime)
                    .field("providerId", providerId)
                    .asString()

            if (resp.status == 200) {
                log.info("Update surgery date success, token: ${token}")
                return true
            } else {
                handleError(resp)
            }
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
                return true
            } else {
                handleError(resp)
            }
        }
    }

    def getTasksInTreatment(String token, treatmentId, max) {
        log.info("Call backend service to get tasks in treatment, token: ${token}.")

        String getAvailableTaskUrl = grailsApplication.config.ratchetv2.server.url.getToolsOfTreatment
        String url = String.format(getAvailableTaskUrl, treatmentId)

        withGet(token, url) { req ->
            def resp = req
                    .queryString("max", max)
                    .asString()

            if (resp.status == 200) {
                log.info("Get tasks in treatment success, token: ${token}")

                parseRespBody(resp)
            } else {
                handleError(resp)
            }
        }
    }

    def addAdhocTasks(token, clientId, patientId, medicalRecordId, toolIds, scheduleTime, providerId) {
        log.info("Call backend service to add ad-hoc tasks to treatment, token: ${token}.")

        String getAvailableTaskUrl = grailsApplication.config.ratchetv2.server.url.adhocTasksToTreatment
        String url = String.format(getAvailableTaskUrl, clientId, patientId, medicalRecordId)

        withPost(token, url) { req ->
            def resp = req
                    .field("toolIds", toolIds)
                    .field("scheduleTime", scheduleTime)
                    .field("providerId", providerId)
                    .asString()

            if (resp.status == 201) {
                log.info("Get tasks add ad-hoc tasks to treatment, token: ${token}")

                parseRespBody(resp)
            } else {
                handleError(resp)
            }
        }
    }

    def deleteTreatment(token, clientId, patientId, medicalRecordId) {
        String deleteTreatmentUrl = grailsApplication.config.ratchetv2.server.url.deleteTreatment
        def url = String.format(deleteTreatmentUrl, clientId, patientId, medicalRecordId)

        log.info("Call backend service to delete a treatment, token: ${token}.")
        withDelete(token, url) { req ->
            def resp = req.asString()

            if (resp.status == 204) {
                log.info("delete a treatment success, token: ${token}.")

                true
            } else {
                handleError(resp)
            }
        }
    }

    def getTreatmentAvailableYears(String token, clientId, treatmentId) {
        log.info("Call backend service to get treatment available years, token: ${token}.")

        String getAvailableTaskUrl = grailsApplication.config.ratchetv2.server.url.getTreatmentAvailabelYears

        withGet(token, getAvailableTaskUrl) { req ->
            def resp = req
                .queryString("clientId", clientId)
                .queryString("treatmentId", treatmentId)
                .asString()

            if (resp.status == 200) {
                log.info("Get treatment available years success, token: ${token}")

                parseRespBody(resp)
            } else {
                handleError(resp)
            }
        }
    }
}
