package com.ratchethealth.client

import grails.converters.JSON
import org.joda.time.DateTimeZone
import org.joda.time.DateTime
import org.joda.time.Days


class PatientDashboardController extends BaseController {

    def beforeInterceptor = [action: this.&auth]
    def patientDashboardService
    def invitationService
    def caregiverService
    def groupService
    def activityService
    def taskService

    static allowedMethods = [getSinglePatient: ['GET'], updateSinglePatient: ['POST']]

    def getSinglePatient() {
        String token = request.session.token

        def patientId = params?.patientId
        def clientId = request.session.clientId

        def patientInfo = patientDashboardService.showSinglePatient(token, patientId)
        def hasActiveTasks = patientDashboardService.hasActiveTasks(token, clientId, patientId)

        if (!patientInfo.email) {
            patientInfo.email = ''
        }

        def num = patientInfo?.phoneNumber
        def phoneNumber

        if (num) {
            def length = num.length()
            def subNumber = num
            def isUS = num.charAt(0)
            def space = ' '

            if (isUS == '1') {
                subNumber = num.substring(1, length)
                length = subNumber.length()
            }
            if (length > 6) {
                phoneNumber = String.format("%s-%s-%s", subNumber.substring(0, 3), subNumber.substring(3, 6),
                        subNumber.substring(6, length))
            } else if (length > 3) {
                phoneNumber = String.format("%s-%s-%s", subNumber.substring(0, 3), subNumber.substring(3, length))
            }
            if (isUS == '1') {
                phoneNumber = String.format("%s%s%s", isUS, space, phoneNumber)
            }
        } else {
            phoneNumber = null
        }

        render(view: '/patientDashboard/patientDashboard', model: [
                patientInfo   : patientInfo,
                phoneNumber   : phoneNumber,
                AccountIsAdmin: request.session.accountManagement,
                hasActiveTasks: hasActiveTasks
        ])
    }

    def updateSinglePatient(Patient patient) {
        String token = request.session.token
        def resp = patientDashboardService.updateSinglePatient(token, patient)
        def status = [resp: resp]
        render status as JSON
    }


    def checkPatientExist() {
        String token = request.session.token
        def identify = params?.identify
        def data = patientDashboardService.checkPatientId(token, identify)
        render data as JSON
    }

    def checkPatientEmailExist() {
        String token = request.session.token
        def clientId = request.session.clientId
        def email = params?.email
        def data = patientDashboardService.checkPatientEmail(token, clientId, email)
        render data as String
    }

    def invitePatient() {
        invitationService.invitePatient(session.token, params.id)
        render true
    }

    def deletePatient() {
        patientDashboardService.deletePatient(session.token, params.id)

        render status: 200
    }

    def getTreatmentListTab() {
        String token = request.session.token

        def patientId = params?.patientId
        def PatientEmailStatus = params?.PatientEmailStatus
        def clientId = request.session.clientId

        def medicalRecords = patientDashboardService.showMedialRecords(token, clientId, patientId)

//        medicalRecords.items.sort { a, b -> a.archived <=> b.archived }

        def combinedList = combinedAllTreatmentToTasks(patientId, medicalRecords.items)

        render(view: '/patientDashboard/treatmentSection', model: [
                patientId         : patientId,
                clientId          : clientId,
                PatientEmailStatus: PatientEmailStatus,
                medicalRecords    : combinedList.medicalRecords,
                combinedTasks     : combinedList.combinedTasks,
                totalCount        : medicalRecords.totalCount
        ])
    }

    def notifyTasks() {
        String token = request.session.token
        def clientId = request.session.clientId
        def patientId = params?.patientId
        def resp = patientDashboardService.sendNotifyRequest(token, clientId, patientId)
        render resp as JSON
    }

    def getInClinicCode() {
        String token = request.session.token
        def clientId = request.session.clientId
        def patientId = params?.patientId
        def resp = patientDashboardService.generateInClinicCode(token, clientId, patientId)
        render resp as JSON
    }

    def hasActiveTasks() {
        String token = request.session.token
        def clientId = request.session.clientId
        def patientId = params?.patientId

        def resp = patientDashboardService.hasActiveTasks(token, clientId, patientId)

        render(['hasActiveTasks': resp] as JSON)
    }

    def getReportTab() {
        def clientId = request.session.clientId
        def patientId = params?.patientId

        render(
                view: "/patientDashboard/report",
                model: [
                        clientId : clientId,
                        patientId: patientId
                ]
        )
    }

    def getGroupTab() {
        String token = request.session.token
        def patientId = params?.patientId
        def clientId = request.session.clientId

        def groupList = groupService.getGroupsPatientBelongsTo(token, clientId, patientId)

        render(view: '/patientDashboard/group', model: [
                patientId: patientId,
                clientId : clientId,
                groupList: groupList
        ])
    }

    def getCaregiverTab() {
        String token = request.session.token
        def patientId = params?.patientId
        def clientId = request.session.clientId

        def caregiverList = caregiverService.getCaregiver(token, clientId, patientId, null)

        render(view: '/patientDashboard/caregiver', model: [
                patientId    : patientId,
                clientId     : clientId,
                caregiverList: caregiverList
        ])
    }

    def getActivitiesTab(ActivityFilterFields activityPagination) {
        activityPagination.start = RatchetConstants.DEFAULT_PAGE_OFFSET
        activityPagination.length = RatchetConstants.DEFAULT_SUB_PAGE_SIZE

        def clientId = session.clientId
        def activities = activityService.getActivities(session.token, clientId, activityPagination)

        render(view: '/patientDashboard/activities', model: [patientId: activityPagination.patientId, activities: activities, pagesize: activityPagination.length])
    }

    def getPatientActivities(ActivityFilterFields activityPagination) {
        def clientId = session.clientId
        def data = activityService.getActivities(session.token, clientId, activityPagination)
        render data as JSON
    }

    def combinedAllTreatmentToTasks(patientId, treatments) {
        def combinedTasks = []
        def medicalRecords = []
        def today = new Date().time
        def numberMap = ('A'..'Z').collect();
        def i = 0;

        for (treatment in treatments) {

            def absoluteEventTimestamp = treatment.absoluteEventTimestamp

            def treatmentProperty = [
                    archived: treatment.archived,
                    id: treatment.id,
                    treatmentId: treatment.treatmentId,
                    title: treatment.title,
                    tmpTitle: treatment.tmpTitle,
                    absoluteEventTimestamp: absoluteEventTimestamp,
                    indicator: i < 26 ? numberMap[i++] : '*'
            ]

            medicalRecords << treatmentProperty

            if (absoluteEventTimestamp) {
                DateTimeZone vancouver = DateTimeZone.forID('America/Vancouver');
                DateTime start = new DateTime(absoluteEventTimestamp, vancouver)
                DateTime end = new DateTime(today, vancouver)
                def days = Days.daysBetween(start, end).getDays()

                def status = days == 0 ? StatusCodeConstants.TASK_STATUS_PENDING :
                        days > 0 ? StatusCodeConstants.TASK_STATUS_COMPLETE : StatusCodeConstants.TASK_STATUS_SCHEDULE

                combinedTasks << [
                        itemType         : 'surgery',
                        sendTime         : absoluteEventTimestamp,
                        title            : 'Surgery',
                        status           : status,
                        treatmentProperty: treatmentProperty
                ]
            }

            for (task in treatment.tasks) {
                task.treatmentProperty = treatmentProperty

                if (RatchetConstants.BASE_TOOL_TYPE[task.toolType] == "VOICE" && StatusCodeConstants.TASK_STATUS[task.status] == "complete") {
                    def viewResult = getVoiceResult(patientId, treatment.id, task.id)
                    task << viewResult
                }

                combinedTasks << task
            }
        }

        combinedTasks << [
                itemType: 'today',
                sendTime: today
        ]

        return [combinedTasks : combinedTasks.sort({ a, b -> a["sendTime"] <=> b["sendTime"] }),
                medicalRecords: medicalRecords]
    }

    private getVoiceResult(patientId, medicalRecordId, taskId) {
        def token = request.session.token
        def clientId = request.session.clientId
        def resp = taskService.viewVoiceResult(token, clientId, patientId, medicalRecordId, taskId)
        return resp
    }
}
