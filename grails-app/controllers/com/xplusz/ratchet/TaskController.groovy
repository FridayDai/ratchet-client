package com.xplusz.ratchet

class TaskController extends BaseController {

    def beforeInterceptor = [action: this.&auth]

    def taskService
    def toolService
    def medicalRecordService

    def index() {
        def patientId = params.patientId
        def treatmentId = params.treatmentId
        def medicalRecordId = params.medicalRecordId
        redirect(uri: '/patients/'+patientId+'/treatments/'+treatmentId+'/'+medicalRecordId+'/tasks')
//        redirect(uri: '/patients/x12345/treatments/3/31/tasks');
    }

    def getTasksAndTools() {
        def patientId = params.patientId
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
        render view: 'task', model: [sentTasks: sentTasks, scheduleTasks:scheduleTasks, tools: tools, patientId: patientId, medicalRecordId: medicalRecordId]
    }

    def addTaskToMedicalRecord() {
        def result = medicalRecordService.assignTaskToMedicalRecord(params)
        def id = result.id
        def toolType = StatusCodeConstants.TOOL_TYPE[result.toolType]
        def status = StatusCodeConstants.TASK_STATUS[result.status]
        def description = result.description
        def title = result.title
        def sendTime = result.sendTime

        render g.render(template: "/task/newTaskBox", model: [id: id, description: description, title: title, toolType: toolType, status: status, sendTime: sendTime])
    }

}
