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
        def isEmailBlank = params?.isEmailBlank == 'true'

        def tasks = taskService.getTasks(token, clientId, medicalRecordId)
        def activeTasks = [], closedTasks = [], scheduleTasks = []
        for (task in tasks) {
            switch (task?.status) {
                case StatusCodeConstants.TASK_STATUS_SCHEDULE :
                    scheduleTasks.add(task)
                    continue
                case StatusCodeConstants.TASK_STATUS_PENDING :
                case StatusCodeConstants.TASK_STATUS_OVERDUE :
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
                activeTasks: activeTasks,
                closedTasks: closedTasks,
                scheduleTasks: scheduleTasks,
                clientId: clientId,
                patientId: patientId,
                medicalRecordId: medicalRecordId,
                archived: archived,
                isEmailBlank: isEmailBlank
            ]
    }

    def sendTaskEmail() {
        def token = request.session.token
        def clientId = request.session.clientId
        def patientId = params?.patientId
        def medicalRecordId = params?.medicalRecordId
        def taskId = params?.taskId
        def resp = taskService.sendTaskEmailToPatient(token, clientId, patientId, medicalRecordId, taskId)
        render resp as JSON
    }
}
