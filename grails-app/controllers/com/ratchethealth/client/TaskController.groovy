package com.ratchethealth.client

class TaskController extends BaseController {

    def beforeInterceptor = [action: this.&auth]

    def taskService

    def getTasksAndTools() {
        String token = session.token
        def clientId = session.clientId
        def patientId = params?.patientId
        def medicalRecordId = params?.medicalRecordId
        def archived = params?.archived
        if (archived == null) {
            archived = false
        }

        def tasks = taskService.getTasks(token, clientId, medicalRecordId)
        def sentTasks = []
        def scheduleTasks = []
        for (task in tasks) {
            if (task?.isSent) {
                sentTasks.add(task)
            } else {
                scheduleTasks.add(task)
            }
        }

        scheduleTasks = scheduleTasks.sort({ a, b -> a["sendTime"] <=> b["sendTime"] })
        sentTasks = sentTasks.sort({ a, b -> b["sendTime"] <=> a["sendTime"] })

        render view: 'task', model: [sentTasks: sentTasks, scheduleTasks: scheduleTasks, clientId: clientId, patientId: patientId, medicalRecordId: medicalRecordId, archived: archived]
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
}
