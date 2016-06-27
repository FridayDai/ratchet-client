package com.ratchethealth.client

class ReportService extends RatchetAPIService {

    def grailsApplication

    def getProviderAverageOnOverview(String token, clientId, treatmentId, toolId, providerId, showAll, year) {

        def url = grailsApplication.config.ratchetv2.server.url.providerAverage

        log.info("Call backend service to get provider average data for report overview, token: ${token}.")
        withPost(token, url) { req ->
            def resp = req
                .field("clientId", clientId)
                .field("treatmentId", treatmentId)
                .field("toolId", toolId)
                .field("providerId", providerId)
                .field("surgeryYear", year)
                .field("showAll", showAll)
                .asString()

            if (resp.status == 200) {
                log.info("Get provider average data for report overview success, token: ${token}")

                parseRespBody(resp)
            }
            else {
                handleError(resp)
            }
        }
    }

    def taskCompletionConversion(String token, clientId, providerId, baseToolId, year) {
        def url = grailsApplication.config.ratchetv2.server.url.taskConversion

        log.info("Call backend service to get task completion conversion report, token: ${token}.")
        withPost(token, url) { req ->
            def resp = req
                .field("clientId", clientId)
                .field("providerId", providerId)
                .field("baseToolId", baseToolId)
                .field("surgeryDate", year)
                .asString()

            if (resp.status == 200) {
                log.info("Get task completion conversion success, token: ${token}")

                parseRespBody(resp)
            }
            else {
                handleError(resp)
            }
        }
    }

    def getIndividualReport(String token, clientId, patientId, baseToolId) {

        def tempUrl = grailsApplication.config.ratchetv2.server.url.individualReport
        String url = String.format(tempUrl, clientId, patientId, baseToolId)

        log.info("Call backend service to get report for individual patient, token: ${token}.")
        withGet(token, url) { req ->
            def resp = req.asString()

            if (resp.status == 200) {
                log.info("Get report for individual patient success, token: ${token}")

                parseRespBody(resp)
            }
            else {
                handleError(resp)
            }
        }
    }

    def getClientTools(String token, clientId) {
        log.info("Call backend service to get client tools, token: ${token}.")

        String url = String.format(grailsApplication.config.ratchetv2.server.url.getClientTools, clientId)

        withGet(token, url) { req ->
            def resp = req.asString()

            if (resp.status == 200) {
                log.info("Get client tools success, token: ${token}")

                parseRespBody(resp)
            } else {
                handleError(resp)
            }
        }
    }

    def getPatientTools(String token, clientId, patientId) {
        log.info("Call backend service to get patient tools, token: ${token}.")

        String getPatientToolsUrl = grailsApplication.config.ratchetv2.server.url.getPatientTools
        String url = String.format(getPatientToolsUrl, clientId, patientId)

        withGet(token, url) { req ->
            def resp = req.asString()

            if (resp.status == 200) {
                log.info("Get patient tools success, token: ${token}")

                parseRespBody(resp)
            } else {
                handleError(resp)
            }
        }
    }
}
