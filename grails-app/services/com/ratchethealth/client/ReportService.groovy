package com.ratchethealth.client

import grails.converters.JSON

class ReportService  extends RatchetAPIService{
    def grailsApplication

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
}
