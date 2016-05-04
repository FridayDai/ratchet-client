package com.ratchethealth.client

import grails.converters.JSON

class ActivityController extends BaseController{

    def activityService

    def beforeInterceptor = [action: this.&auth]

    def index() {
        def archived = params?.archived
        if (archived==null)
        {
            archived = false
        }
        def patientId = params?.patientId
        def medicalRecordId = params?.medicalRecordId
        def clientId = params?.clientId

        render(view: '/patientDashboard/activities', model: [patientId: patientId, medicalRecordId: medicalRecordId, clientId: clientId, archived: archived])
    }

    def getActivities(ActivityFilterFields activityPagination) {
        def data = activityService.getActivities(session.token, activityPagination)
        render data as JSON
    }
}
