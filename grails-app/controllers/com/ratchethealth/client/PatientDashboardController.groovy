package com.ratchethealth.client

import grails.converters.JSON

class PatientDashboardController extends BaseController {

    def beforeInterceptor = [action: this.&auth]
    def patientDashboardService
    def invitationService
    def caregiverService
    def groupService

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
                patientInfo: patientInfo,
                phoneNumber: phoneNumber,
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

    def getPatientReportTab() {
        def medicalRecordId = params?.medicalRecordId
        def treatmentId = params?.treatmentId
        def clientId = params?.clientId
        def patientId = params?.patientId
        def archived = params?.archived
        if (archived == null || archived == '') {
            archived = false
        }

        render(
            view: "/patientDashboard/report",
            model: [
                treatmentId: treatmentId,
                medicalRecordId: medicalRecordId,
                clientId: clientId,
                patientId: patientId,
                archived: archived
            ]
        )
    }

    def getTreatmentListTab() {
        String token = request.session.token

        def patientId = params?.patientId
        def PatientEmailStatus = params?.PatientEmailStatus
        def clientId = request.session.clientId

        def treatmentLimit = grailsApplication.config.ratchetv2.server.patientTreatmentLimit
        def medicalRecords = patientDashboardService.showMedialRecords(token, clientId, patientId)

        medicalRecords.items.sort { a, b -> a.archived <=> b.archived }

        render(view: '/patientDashboard/treatmentList',  model: [
            patientId: patientId,
            clientId: clientId,
            PatientEmailStatus: PatientEmailStatus,
            medicalRecords: medicalRecords,
            treatmentLimit: treatmentLimit
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

        render (['hasActiveTasks': resp] as JSON)
    }

    def getReportTab() {
        render(view: '/patientDashboard/report')
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
            patientId: patientId,
            clientId: clientId,
            caregiverList: caregiverList
        ])
    }

    def getActivitiesTab() {
        render(view: '/patientDashboard/activities')
    }
}
