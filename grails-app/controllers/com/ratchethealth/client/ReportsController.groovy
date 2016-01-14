package com.ratchethealth.client

import grails.converters.JSON

class ReportsController extends BaseController {

    def beforeInterceptor = [action: this.&auth]

    def reportService

    // Task Completion Reports
    def renderTaskCompletionReport() {
        render view: 'taskCompletion'
    }

    def updateTaskCompletionReport() {
        String token = request.session.token
        def clientId = request.session.clientId
        def providerId  = params.providerId

        def conversion = reportService.taskCompletionConversion(token, clientId, providerId)
        render conversion as JSON
    }

}
