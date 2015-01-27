package com.xplusz.ratchet

class TaskController extends BaseController {

    def beforeInterceptor = [action: this.&auth]

    def taskService
    def toolService
    def medicalRecordService

    def index() {
        redirect(uri: '/patients/x12345/treatments/3/21/tasks');
    }

//    def getTasks() {
//        def tasks = taskService.loadTasks()
//        def taskOverdue = []
//        def taskNew = []
//        def taskFuture = []
//        def taskCompleted = []
//        for (task in tasks) {
//            if (task.status == "overdue") {
//                taskOverdue.add(task)
//                continue
//            }
//            if (task.status == "new") {
//                taskNew.add(task)
//                continue
//            }
//            if (task.status == "future") {
//                taskFuture.add(task)
//                continue
//            }
//            if (task.status == "complete") {
//                taskCompleted.add(task)
//            }
//
//        }
//        render view: 'task', model: [taskOverdue: taskOverdue, taskNew: taskNew, taskFuture: taskFuture, taskCompleted: taskCompleted]
//    }

    def getTasksAndTools() {
        def patientId = params.patientId
        def medicalRecordId = params.medicalRecordId
        def treatmentId = params.treatmentId

        def tasks = medicalRecordService.showTasksByMedicalRecord(medicalRecordId)
        def sentTasks = []
        def scheduleTasks = []
        for (task in tasks) {
            if (isSent) {
                sentTasks.add(task)
                continue
            }
            if (notsent) {
                scheduleTasks.add(task)
            }
        }

        def tools = toolService.getToolsByTreatment(treatmentId)
        render view: 'task', model: [sentTasks: sentTasks, scheduleTasks:scheduleTasks, tools: tools]
    }

    def addTaskToMedicalRecord() {
        def result = medicalRecordService.assignTaskToMedicalRecord(params)
        return result
    }
}
