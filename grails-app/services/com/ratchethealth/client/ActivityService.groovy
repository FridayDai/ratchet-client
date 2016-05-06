package com.ratchethealth.client

import grails.converters.JSON

class ActivityService extends RatchetAPIService {

    def grailsApplication

    def getActivities(String token, clientId, activityPagination) {

        def patientId = activityPagination?.patientId
        def start = activityPagination?.start
        def length = activityPagination?.length
        def order = activityPagination?.sortDir ?: "desc"
        def senderId = activityPagination?.senderId

        String getActivityUrl = grailsApplication.config.ratchetv2.server.url.getActivity
        def url = String.format(getActivityUrl, clientId, patientId)
        log.info("Call backend service to get activities with max, offset and senderId, token: ${token}.")

        withGet(token, url) { req ->
            def resp = req
                    .queryString("max", length)
                    .queryString("offset", start)
                    .queryString("order", order)
                    .queryString("senderId", senderId)
                    .asString()

            if (resp.status == 200) {
                def result = JSON.parse(resp.body)

                log.info("Get activities success, token: ${token}.")

                [
                    "recordsTotal": result.totalCount,
                    "recordsFiltered": result.totalCount,
                    "data": result.items
                ]
            }
            else {
                handleError(resp)
            }
        }
    }

}
