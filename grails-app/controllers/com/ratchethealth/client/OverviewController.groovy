package com.ratchethealth.client

import grails.converters.JSON

class OverviewController {

//    def beforeInterceptor = [action: this.&auth]

    def activityService
    def taskService

    def index() {
        def activityInfo = activityService.getActivity(request, response, params)
        def overdueTask = taskService.getOverdueTasks(request, response, params)
        render(view: '/overview/overview', model: [activityInfo: activityInfo, overdueTask: overdueTask])
    }

    def getActivities() {
        def data = activityService.getActivities(request, response, params)
        render data as JSON
    }
}
