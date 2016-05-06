package com.ratchethealth.client

import grails.converters.JSON

class ReportController extends BaseController {
    def beforeInterceptor = [action: this.&auth]

    def reportService

    static String PROMIS_TOTLE_TYPE = 'Total Result'
    static String FNS_TOTLE_TYPE = 'total'

    def getOutcomePage() {
        render(view: '/report/outcome')
    }

    def getProviderAverageOverview() {
        String token = request.session.token
        def clientId = request.session.clientId
        def treatmentId = params?.treatmentId as long
        def toolId = params?.toolId as long
        def providerId = params?.providerId as long
        def year = params?.year as int
        def showAll = false

        if (providerId == -1 as long) {
            providerId = null
            showAll = true
        }

        def resp = reportService.getProviderAverageOnOverview(token, clientId, treatmentId, toolId, providerId, showAll, year)

        updateReportResp(resp)

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

    def getIndividualReport() {
        String token = request.session.token
        def clientId = request.session.clientId
        def patientId = params?.patientId as long
        def baseToolId = params?.baseToolId as long

        def resp = reportService.getIndividualReport(token, clientId, patientId, baseToolId)

        updateReportResp(resp)

        render resp as JSON
    }

    def updateReportResp(resp) {
        if (resp?.dataSet) {
            if (resp.toolType == 14) {
                // Hard code to remove 'total result' in PROMIS
                resp.dataSet.removeAll { it.type == PROMIS_TOTLE_TYPE }
            } else if (resp.toolType == 10) {
                // Hard code to replace 'total' with dataSet in FNS
                resp.items = (resp.dataSet.find { it.type == FNS_TOTLE_TYPE }).items
                resp.remove('dataSet')
            }
        }
    }

    def getPatientTools() {
        def token = request.session.token
        def clientId = request.session.clientId
        def patientId = params?.patientId as long

        def resp = reportService.getPatientTools(token, clientId, patientId)

        render resp as JSON
    }
}
