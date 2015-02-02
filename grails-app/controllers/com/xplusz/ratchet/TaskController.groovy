package com.xplusz.ratchet

class TaskController extends BaseController {

    def beforeInterceptor = [action: this.&auth]

    def taskService
    def toolService
    def medicalRecordService

    def getTasksAndTools() {
        def clientId = params.clientId
        def patientId = params.patientId
        def medicalRecordId = params.medicalRecordId
        def treatmentId = params.treatmentId

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

        def tools = toolService.getToolsByTreatment(treatmentId)
        render view: 'task', model: [sentTasks: sentTasks, scheduleTasks: scheduleTasks, tools: tools, clientId: clientId, patientId: patientId, medicalRecordId: medicalRecordId]
    }

    def addTaskToMedicalRecord() {
        def result = medicalRecordService.assignTaskToMedicalRecord(params)
//        render g.render(template: "/task/newTaskBox", model: [id: id, description: description, title: title, toolType: toolType, status: status, sendTime: sendTime])
        render(template: "/task/taskBox", model: [task: result])
    }

    def sendTaskEmail() {
        def result = taskService.sendTaskEmailToPatient(params)
        render result
    }


}
