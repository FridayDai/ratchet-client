package com.xplusz.ratchet

import grails.converters.JSON

class TaskController extends BaseController {

    def beforeInterceptor = [action: this.&auth]

    def taskService
    def toolService
    def medicalRecordService

    def getTasksAndTools() {
        def clientId = params.clientId
        def patientId = params.patientId
        def medicalRecordId = params.medicalRecordId
//        def treatmentId = params.treatmentId

        def tasks = medicalRecordService.showTasksByMedicalRecord(clientId, medicalRecordId)
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

//        def tools = toolService.getToolsByTreatment(treatmentId)
//        def otherScores = "neck:4, arm:5"
        render view: 'task', model: [sentTasks: sentTasks, scheduleTasks: scheduleTasks, clientId: clientId, patientId: patientId, medicalRecordId: medicalRecordId]
    }

    def addTaskToMedicalRecord() {
        def result = medicalRecordService.assignTaskToMedicalRecord(params)
        render(template: "/task/taskBox", model: [task: result])
    }

    def sendTaskEmail() {
        def resp = taskService.sendTaskEmailToPatient(params)
        render resp as JSON
    }


}
