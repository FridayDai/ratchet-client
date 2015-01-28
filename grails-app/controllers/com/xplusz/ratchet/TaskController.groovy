package com.xplusz.ratchet

import com.alibaba.fastjson.JSONObject


class TaskController extends BaseController {

    def beforeInterceptor = [action: this.&auth]

    def taskService
    def toolService
    def medicalRecordService

    def index() {
//        def patientId = params.patientId
//        def treatmentId = params.treatmentId
//        def medicalRecordId = params.medicalRecordId
//        redirect(uri: '/patients/patientId/treatments/treatmentId/medicalRecordId/tasks')
        redirect(uri: '/patients/x12345/treatments/3/21/tasks');
    }

    def getTasksAndTools() {
//        def patientId = params.patientId
        def medicalRecordId = params.medicalRecordId
        def treatmentId = params.treatmentId

        def tasks = medicalRecordService.showTasksByMedicalRecord(medicalRecordId)
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
        render view: 'task', model: [sentTasks: sentTasks, scheduleTasks:scheduleTasks, tools: tools]
    }

    def addTaskToMedicalRecord() {
        def result = medicalRecordService.assignTaskToMedicalRecord(params)
        return result
    }
}
