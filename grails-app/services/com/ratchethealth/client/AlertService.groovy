package com.ratchethealth.client

class AlertService extends RatchetAPIService {

    def grailsApplication

    def getAlert(token, clientId, staffId, AlertFilterFields filterFields) {
        String getAlertUrl = grailsApplication.config.ratchetv2.server.url.alerts
        def url = String.format(getAlertUrl, clientId, staffId)
        log.info("Call backend service to get alert, token: ${token}.")

        withGet(token, url) { req ->
            def resp = req
                .queryString("max", filterFields.max)
                .queryString("offset", filterFields.offset)
                .queryString("order", filterFields.order)
                .queryString("sorted", filterFields.sorted)
                .queryString("isResolved", filterFields.isResolved)
                .queryString("isCount", filterFields.isCount)
                .asString()

            if (resp.status == 200) {
                log.info("Get alerts success, token: ${token}.")

                parseRespBody(resp)
            }
            else {
                handleError(resp)
            }
        }
    }

    def updateAlertStatus(token, clientId, staffId, alertId, status) {
        String updateAlertUrl = grailsApplication.config.ratchetv2.server.url.updateAlertStatus
        def url = String.format(updateAlertUrl, clientId, staffId, alertId)
        log.info("Call backend service to resolve/undo alert, token: ${token}.")

        withPost(token, url) { req ->
            def resp = req
                    .field("status", status)
                    .asString()

            if (resp.status == 200) {
                log.info("resolve/undo alert success, token: ${token}.")
                return true
            } else {
                handleError(resp)
            }
        }
    }
}
