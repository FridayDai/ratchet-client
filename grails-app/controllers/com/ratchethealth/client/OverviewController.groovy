package com.ratchethealth.client

import grails.converters.JSON

class OverviewController {

//    def beforeInterceptor = [action: this.&auth]

    def activityService

    def getActivities() {
        def data = activityService.getActivities(request, response, params)
        render data as JSON
    }
}
