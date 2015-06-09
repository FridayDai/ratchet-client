package com.ratchethealth.client

import grails.converters.JSON

class OverviewController {

//    def beforeInterceptor = [action: this.&auth]

    def activityService

    def getActivities() {
        def data = activityService.getActivities(request, params)
        render data as JSON
    }
}
