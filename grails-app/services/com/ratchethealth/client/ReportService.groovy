package com.ratchethealth.client

import grails.converters.JSON

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

                JSON.parse(resp.body)
            }
            else {
                handleError(resp)
            }
        }
    }

    def taskCompletionConversion(String token, clientId, providerId) {
        def url = grailsApplication.config.ratchetv2.server.url.taskConversion

        log.info("Call backend service to get task completion conversion report, token: ${token}.")
        withPost(token, url) { req ->
            def resp = req
                .field("clientId", clientId)
                .field("providerId", providerId)
                .asString()

            if (resp.status == 200) {
                def result = JSON.parse(resp.body)
                log.info("Get task completion conversion success, token: ${token}")
                return result
            }
            else {
                handleError(resp)
            }
        }
    }

    def getIndividualReport(String token, clientId, patientId, medicalRecordId, baseToolId) {

        def tempUrl = grailsApplication.config.ratchetv2.server.url.individualReport
        String url = String.format(tempUrl, clientId, medicalRecordId, baseToolId, patientId)

        log.info("Call backend service to get report for individual patient, token: ${token}.")
        withPost(token, url) { req ->
            def resp = req.asString()

            if (resp.status == 200) {
                log.info("Get report for individual patient success, token: ${token}")

                JSON.parse(resp.body)
            }
            else {
                handleError(resp)
            }
        }
    }
}
