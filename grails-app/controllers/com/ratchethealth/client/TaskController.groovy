package com.ratchethealth.client

import grails.converters.JSON

class TaskController extends BaseController {

    def beforeInterceptor = [action: this.&auth]

    def taskService

    def getTasks() {
        String token = session.token
        def accountId = session.accountId
        def clientId = session.clientId
        def patientId = params?.patientId
        def medicalRecordId = params?.medicalRecordId
        def archived = (params?.archived) ?: false
        def PatientEmailStatus = params?.PatientEmailStatus

        def tasks = taskService.getTasks(token, clientId, medicalRecordId)
        def activeTasks = [], closedTasks = [], scheduleTasks = []

        for (task in tasks) {
            switch (task?.status) {
                case StatusCodeConstants.TASK_STATUS_SCHEDULE:
                    scheduleTasks.add(task)
                    continue
                case StatusCodeConstants.TASK_STATUS_PENDING:
                case StatusCodeConstants.TASK_STATUS_OVERDUE:
                    activeTasks.add(task)
                    continue
                default:
                    //Todo: after api update, need to use taskType
                    if (RatchetConstants.BASE_TOOL_TYPE[task.toolType] == "VOICE") {
                        def viewResult = getVoiceResult(patientId, medicalRecordId, task.id)
                        task = task << viewResult
                    }
                    closedTasks.add(task)
            }
        }

        scheduleTasks = scheduleTasks.sort({ a, b -> a["sendTime"] <=> b["sendTime"] })
        activeTasks = activeTasks.sort({ a, b -> b["sendTime"] <=> a["sendTime"] })
        closedTasks = closedTasks.sort({ a, b -> b["sendTime"] <=> a["sendTime"] })


        render view: '/singlePatient/task',
                model: [
                        activeTasks       : activeTasks,
                        closedTasks       : closedTasks,
                        scheduleTasks     : scheduleTasks,
                        clientId          : clientId,
                        patientId         : patientId,
                        medicalRecordId   : medicalRecordId,
                        archived          : archived,
                        PatientEmailStatus: PatientEmailStatus,
                        accountId         : accountId
                ]
    }

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

        render(filename: "${lastName}_${result.patientId.replaceAll("\\s+", "")}_${birthday ? (birthday + '_') : ''}${toolName.replaceAll(" ", "_")}_${taskId}.pdf",
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

    def resolveVoiceTask() {
        def token = request.session.token
        def clientId = request.session.clientId
        def patientId = params?.patientId
        def medicalRecordId = params?.medicalRecordId
        def taskId = params?.taskId
        def resp = taskService.resolveAttention(token, clientId, patientId, medicalRecordId, taskId)
        render resp
    }

    private getVoiceResult(patientId, medicalRecordId, taskId) {
        def token = request.session.token
        def clientId = request.session.clientId
        def resp = taskService.viewVoiceResult(token, clientId, patientId, medicalRecordId, taskId)
        return resp
    }
}
