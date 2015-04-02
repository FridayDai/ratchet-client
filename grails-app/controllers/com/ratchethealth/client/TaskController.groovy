package com.ratchethealth.client

class TaskController extends BaseController {

    def beforeInterceptor = [action: this.&auth]

    def taskService
    def toolService
    def medicalRecordService

    def getTasksAndTools() {
        def clientId = params?.clientId
        def patientId = params?.patientId
        def medicalRecordId = params?.medicalRecordId
        def archived = params?.archived
        if (archived == null) {
            archived = false
        }
//        def treatmentId = params.treatmentId

        def tasks = medicalRecordService.showTasksByMedicalRecord(request, response, clientId, medicalRecordId)
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
        render view: 'task', model: [sentTasks: sentTasks, scheduleTasks: scheduleTasks, clientId: clientId, patientId: patientId, medicalRecordId: medicalRecordId, archived: archived]
    }

    def addTaskToMedicalRecord() {
        def result = medicalRecordService.assignTaskToMedicalRecord(request, response, params)
        render(template: "/task/taskBox", model: [task: result])
    }

    def sendTaskEmail() {
        def resp = taskService.sendTaskEmailToPatient(request, response, params)
        render resp
    }


}
