package com.ratchethealth.client

import grails.converters.JSON

class ReportController extends BaseController {
    def beforeInterceptor = [action: this.&auth]

    def reportService

    def getOverviewPage() {
        render(view: '/report/overview')
    }

    def getProviderAverageOverview() {
        String token = request.session.token
        def clientId = request.session.clientId
        def treatmentId = params?.treatmentId as long
        def toolId = params?.toolId as long
        def providerId = params?.providerId as long
        def year = params?.year as int
        def resp = reportService.getProviderAverageOnOverview(token, clientId, treatmentId, toolId, providerId, year)
        render resp as JSON
    }

    def renderTaskCompletionReport() {
        render view: '/report/taskCompletion'
    }

    def updateTaskCompletionReport() {
        String token = request.session.token
        def clientId = request.session.clientId
        def providerId  = params.providerId

        def conversion = reportService.taskCompletionConversion(token, clientId, providerId)
        render conversion as JSON
    }
}
