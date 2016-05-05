package com.ratchethealth.client

import grails.converters.JSON

class TreatmentController extends BaseController {

    def beforeInterceptor = [action: this.&auth]

    def treatmentService
    def taskService

    def getTreatmentTab() {
        String token = session.token
        def accountId = session.accountId
        def clientId = session.clientId
        def patientId = params?.patientId
        def medicalRecordId = params?.medicalRecordId
        def treatmentId = params?.treatmentId
        def archived = (params?.archived) ?: false
        def PatientEmailStatus = params?.PatientEmailStatus
        def isAdmin = request.session.accountManagement

        def tasks = taskService.getTasks(token, clientId, medicalRecordId)
        def activeTasks = [], closedTasks = [], scheduleTasks = []
        def activeTaskTypeArray = [], closedTaskTypeArray = [], scheduleTaskTypeArray = []
        def taskType

        def surgeryTime = params?.surgeryTime

        if (surgeryTime != "null" || !surgeryTime) {
            surgeryTime = Long.valueOf(surgeryTime)
        } else {
            surgeryTime = null
        }

        for (task in tasks) {
            switch (task?.status) {
                case StatusCodeConstants.TASK_STATUS_SCHEDULE:
                    unionTaskType(task, scheduleTaskTypeArray)
                    scheduleTasks.add(task)
                    continue
                case StatusCodeConstants.TASK_STATUS_PENDING:
                case StatusCodeConstants.TASK_STATUS_OVERDUE:
                    unionTaskType(task, activeTaskTypeArray)
                    activeTasks.add(task)
                    continue
                default:
                    unionTaskType(task, closedTaskTypeArray)
                    //Todo: after api update, need to use taskType
                    if (RatchetConstants.BASE_TOOL_TYPE[task.toolType] == "VOICE" && StatusCodeConstants.TASK_STATUS[task.status] == "complete") {
                        def viewResult = getVoiceResult(patientId, medicalRecordId, task.id)
                        task = task << viewResult
                    }
                    closedTasks.add(task)

            }
        }

        scheduleTasks = scheduleTasks.sort({ a, b -> a["sendTime"] <=> b["sendTime"] })
        activeTasks = activeTasks.sort({ a, b -> b["sendTime"] <=> a["sendTime"] })
        closedTasks = closedTasks.sort({ a, b -> b["sendTime"] <=> a["sendTime"] })

        taskType = [
            activeType  : activeTaskTypeArray.sort { a, b -> a.toLowerCase() <=> b.toLowerCase() },
            closedType  : closedTaskTypeArray.sort { a, b -> a.toLowerCase() <=> b.toLowerCase() },
            scheduleType: scheduleTaskTypeArray.sort { a, b -> a.toLowerCase() <=> b.toLowerCase() }
        ]

        render view: '/patientDashboard/treatment',
            model: [
                activeTasks       : activeTasks,
                closedTasks       : closedTasks,
                scheduleTasks     : scheduleTasks,
                taskType          : taskType,
                clientId          : clientId,
                patientId         : patientId,
                medicalRecordId   : medicalRecordId,
                treatmentId       : treatmentId,
                archived          : archived,
                PatientEmailStatus: PatientEmailStatus,
                accountId         : accountId,
                surgeryTime       : surgeryTime,
                isAdmin           : isAdmin
            ]
    }

    def assignTreatment(Patient patient) {
        String token = request.session.token
        def clientId = request.session.clientId
        def treatmentId = patient.treatmentId
        def resp = treatmentService.assignTreatmentToExistPatient(token, clientId, patient)
        def medicalRecordId = resp?.medicalRecordId
        def treatmentInfo = treatmentService.getTreatmentInfo(token, clientId, treatmentId)
        def medicalRecordInfo = [medicalRecordId: medicalRecordId,
                                 treatmentInfo  : treatmentInfo
        ]
        render medicalRecordInfo as JSON
    }

    def getTreatments() {
        String token = request.session.token
        def clientId = request.session.clientId
        def max = params?.max
        def offset = params?.offset
        def treatmentTitle = params?.treatmentTitle
        def groupId = params?.groupId
        def showAll = params?.showAll

        def resp = treatmentService.getTreatments(token, clientId, groupId, max, offset, treatmentTitle, showAll)
        render resp as JSON
    }

    def updateSurgeryTime() {
        String token = request.session.token
        def clientId = request.session.clientId
        def medicalRecordId = params?.medicalRecordId
        def patientId = params?.patientId
        def surgeryTime = params?.surgeryTime
        def resp = treatmentService.updateSurgeryTime(token, clientId, medicalRecordId, patientId, surgeryTime)
        def result = [resp: resp]
        render result as JSON
    }

    def archived() {
        String token = request.session.token
        def clientId = request.session.clientId
        def medicalRecordId = params?.medicalRecordId
        def patientId = params?.patientId
        def resp = treatmentService.archiveTreatment(token, clientId, medicalRecordId, patientId)
        def result = [resp: resp]
        render result as JSON
    }

    def getTreatmentInfo() {
        String token = request.session.token
        def clientId = params?.clientId
        def treatmentId = params?.treatmentId
        def resp = treatmentService.getTreatmentInfo(token, clientId, treatmentId)
        render resp as JSON
    }

    def getTasksInTreatment() {
        def token = request.session.token
        def treatmentId = params?.treatmentId

        def resp = treatmentService.getTasksInTreatment(token, treatmentId, 100)

        render resp as JSON
    }

    def addAdhocTasks() {
        def token = request.session.token
        def clientId = request.session.clientId
        def patientId = params?.patientId
        def medicalRecordId = params?.medicalRecordId
        def toolIds = params?.toolIds
        def scheduleTime = params?.scheduleTime

        def resp = treatmentService.addAdhocTasks(token, clientId, patientId, medicalRecordId, toolIds, scheduleTime)
        render resp as JSON
    }

    def deleteTreatment() {
        def token = request.session.token
        def clientId = request.session.clientId
        def patientId = params?.patientId
        def medicalRecordId = params?.medicalRecordId

        def resp = treatmentService.deleteTreatment(token, clientId, patientId, medicalRecordId)
        def result = [resp: resp]
        render result as JSON
    }

    def getTreatmentAvailableYears() {
        def token = request.session.token
        def clientId = request.session?.clientId
        def treatmentId = params?.treatmentId

        def resp = treatmentService.getTreatmentAvailableYears(token, clientId, treatmentId)

        render resp as JSON
    }

    private static unionTaskType(task, typeArray) {
        //Todo: we need defined taskType in api!
        if(RatchetConstants.BASE_TOOL_TYPE[task?.toolType] == "VOICE") {
            task.taskFilterType = RatchetConstants.TOOL_NAME_VOICE_CALL
        } else if (RatchetConstants.BASE_TOOL_TYPE[task?.toolType] == "BASIC") {
            task.taskFilterType = task.title
        } else {
            task.taskFilterType = RatchetConstants.TOOL_TYPE[task.testId]
        }

        if (!typeArray.contains(task.taskFilterType)) {
            typeArray.add(task.taskFilterType)
        }
    }

    private getVoiceResult(patientId, medicalRecordId, taskId) {
        def token = request.session.token
        def clientId = request.session.clientId
        def resp = taskService.viewVoiceResult(token, clientId, patientId, medicalRecordId, taskId)
        return resp
    }
}
