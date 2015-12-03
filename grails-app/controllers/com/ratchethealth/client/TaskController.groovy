package com.ratchethealth.client

import grails.converters.JSON

class TaskController extends BaseController {

    def beforeInterceptor = [action: this.&auth]

    def taskService

    def getTasks() {
        String token = session.token
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
                        PatientEmailStatus: PatientEmailStatus
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
        request.session.setAttribute('patientId', patientId)
        request.session.setAttribute('medicalRecordId', medicalRecordId)
        request.session.setAttribute('taskId', taskId)

        def result = taskService.getResult(token, clientId, patientId, medicalRecordId, taskId)

        def view = ''
        if (RatchetConstants.TOOL_TYPE[result.type] == RatchetConstants.TOOL_NAME_ODI) {
            view = '/taskResult/ODILike'
        } else if (RatchetConstants.TOOL_TYPE[result.type] == RatchetConstants.TOOL_NAME_PAIN_CHART_REFERENCE_NECK) {
            view = '/taskResult/painChartNeck'
        } else if (RatchetConstants.TOOL_TYPE[result.type] == RatchetConstants.TOOL_NAME_PAIN_CHART_REFERENCE_BACK) {
            view = '/taskResult/painChartBack'
        } else {
            render status: 404
            return
        }
        def mixedResult = result.mixedResult ? JSON.parse(result.mixedResult) : null

        render view: view, model: [
                Task       : result,
                mixedResult: mixedResult
        ]
    }

    def downloadPDF() {
        def token = request.session.token
        def clientId = request.session.clientId
        def patientId = request.session.patientId
        def medicalRecordId = request.session.medicalRecordId
        def taskId = request.session.taskId

        def result = taskService.getResult(token, clientId, patientId, medicalRecordId, taskId)

        def view = ''
        if (RatchetConstants.TOOL_TYPE[result.type] == RatchetConstants.TOOL_NAME_ODI) {
            view = '/taskResult/ODILike'
        } else {
            render status: 404
            return
        }

        render( filename: "${patientId}_${taskId}.pdf",
                view: view,
                model: [Task: result,
                        'download' : true],
                marginLeft: 2,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 2,
                headerSpacing: 0
        )
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
}
