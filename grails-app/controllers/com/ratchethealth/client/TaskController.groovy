package com.ratchethealth.client

import grails.converters.JSON

class TaskController extends BaseController {

    def beforeInterceptor = [action: this.&auth]

    def taskService
    def alertService

    def sendTaskEmail() {
        def token = request.session.token
        def clientId = request.session.clientId
        def patientId = params?.patientId
        def medicalRecordId = params?.medicalRecordId
        def taskId = params?.taskId
        def resp = taskService.sendTaskEmailToPatient(token, clientId, patientId, medicalRecordId, taskId)
        render resp
    }

    def getTaskResult() {
        def token = request.session.token
        def clientId = request.session.clientId
        def patientId = params?.patientId
        def medicalRecordId = params?.medicalRecordId
        def taskId = params?.taskId

        def (result, view) = getTaskResultAndView(token, clientId, patientId, medicalRecordId, taskId)

        def mixedResult = result.mixedResult ? JSON.parse(result.mixedResult) : null

        render view: view, model: [Task: result, mixedResult: mixedResult, patientId: patientId, medicalRecordId: medicalRecordId, taskId: taskId]
    }

    def downloadPDF() {
        def token = request.session.token
        def clientId = request.session.clientId
        def patientId = params?.patientId
        def medicalRecordId = params?.medicalRecordId
        def taskId = params?.taskId
        def lastName = params.lastName
        def toolName = params.toolName
        def birthday = params.birthday
        if (birthday == 'null') {
            birthday = null
        }

        def (result, view) = getTaskResultAndView(token, clientId, patientId, medicalRecordId, taskId)

        def mixedResult = result.mixedResult ? JSON.parse(result.mixedResult) : null

        render(filename: "${lastName}_${result.patientId.replaceAll("\\s+", "")}_${birthday ? (birthday + '_') : ''}${toolName}_${taskId}"
            .replaceAll(/[\s+\.,]/, "_").replaceAll(/_+/, '_') + '.pdf',
                view: view,
                model: [Task: result, mixedResult: mixedResult, 'download': true],
                marginLeft: 2,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 2,
                headerSpacing: 0
        )
    }

    def getTaskResultAndView(token, clientId, patientId, medicalRecordId, taskId) {
        def result = taskService.getResult(token, clientId, patientId, medicalRecordId, taskId)

        def view = ''

        switch (RatchetConstants.TOOL_TYPE[result.type]) {
            case RatchetConstants.TOOL_NAME_ODI:
            case RatchetConstants.TOOL_NAME_NDI:
                view = '/taskResult/ODILike'
                break

            case RatchetConstants.TOOL_NAME_PAIN_CHART_REFERENCE_BACK:
                view = '/taskResult/painChartBack'
                break

            case RatchetConstants.TOOL_NAME_PAIN_CHART_REFERENCE_NECK:
                view = '/taskResult/painChartNeck'
                break

            case RatchetConstants.TOOL_NAME_NEW_PATIENT_QUESTIONNAIRE:
                view = '/taskResult/newPatientQuestionnaire'
                break
            case RatchetConstants.TOOL_NAME_RETURN_PATIENT_QUESTIONNAIRE:
                view = '/taskResult/returnPatientQuestionnaire'
                break
            case RatchetConstants.TOOL_NAME_KOOS_JR:
            case RatchetConstants.TOOL_NAME_HOOS_JR:
                view = '/taskResult/KOOSJRlike'
                break

            case RatchetConstants.TOOL_NAME_PROMIS:
                view = '/taskResult/promis'
                break

            case RatchetConstants.TOOL_NAME_RISK_ASSESSMENT_QUESTIONNAIRE:
                view = '/taskResult/raq'
                break

            default:
                render status: 404
                return
        }

        [result, view]
    }

    def deleteTask() {
        def token = request.session.token
        def clientId = request.session.clientId
        def patientId = params?.patientId
        def medicalRecordId = params?.medicalRecordId
        def taskId = params?.taskId
        def resp = taskService.deleteTask(token, clientId, patientId, medicalRecordId, taskId)
        render resp
    }

    def callVoiceTask() {
        def token = request.session.token
        def clientId = request.session.clientId
        def patientId = params?.patientId
        def medicalRecordId = params?.medicalRecordId
        def taskId = params?.taskId
        def resp = taskService.voiceCall(token, clientId, patientId, medicalRecordId, taskId)
        render resp
    }

    def updateAlertInTask() {
        def token = request.session.token
        def clientId = request.session.clientId
        def staffId = session?.accountId
        def alertId = params?.alertId
        def status = params?.status?.toInteger() > 0
        def resp = alertService.updateAlertStatus(token, clientId, staffId, alertId, status)
        render resp
    }

    def completeUserToolTask() {
        def token = request.session.token
        def clientId = request.session.clientId
        def patientId = params.patientId
        def taskId = params.taskId
        def choice = params.choice
        taskService.answerUserTask(token, clientId, patientId, taskId, choice)
        render choice as JSON
    }

}
