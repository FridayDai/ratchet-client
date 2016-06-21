package com.ratchethealth.client

class AlertService extends RatchetAPIService {

    def grailsApplication

    def getStaffAlert(token, clientId, staffId, AlertFilterFields filterFields) {
        String getAlertUrl = grailsApplication.config.ratchetv2.server.url.staffAlerts
        def url = String.format(getAlertUrl, clientId, staffId)
        log.info("Call backend service to get staff alert, token: ${token}.")

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
                log.info("Get staff alerts success, token: ${token}.")

                parseRespBody(resp)
            } else {
                handleError(resp)
            }
        }
    }

    def updateStaffAlertStatus(token, clientId, staffId, alertId, status) {
        String updateAlertUrl = grailsApplication.config.ratchetv2.server.url.updateStaffAlertStatus
        def url = String.format(updateAlertUrl, clientId, staffId, alertId)
        log.info("Call backend service to resolve/undo staff alert, token: ${token}.")

        withPost(token, url) { req ->
            def resp = req
                    .field("status", status)
                    .asString()

            if (resp.status == 200) {
                log.info("resolve/undo staff alert success, token: ${token}.")
                return true
            } else {
                handleError(resp)
            }
        }
    }

    def getPatientAlerts(token, clientId, patientId, type = null) {
        String getPatientAlertUrl = grailsApplication.config.ratchetv2.server.url.patientAlerts
        def url = String.format(getPatientAlertUrl, clientId, patientId)
        log.info("Call backend service to get patient alert, token: ${token}.")

        withGet(token, url) { req ->
            def resp = req
                    .queryString("type", type)
                    .asString()

            if (resp.status == 200) {
                log.info("Get patient alerts success, token: ${token}.")

                parseRespBody(resp)
            } else {
                handleError(resp)
            }

        }
    }
}
