package com.ratchethealth.client

import grails.converters.JSON

class SinglePatientController extends BaseController {

    def beforeInterceptor = [action: this.&auth]
    def singlePatientService
    def invitationService
    def teamService

    static allowedMethods = [getSinglePatient: ['GET'], updateSinglePatient: ['POST']]

    def getSinglePatient() {
        String token = request.session.token

        def patientId = params?.patientId
        def clientId = request.session.clientId

        def patientInfo = singlePatientService.showSinglePatient(token, patientId)
        def hasActiveTasks = singlePatientService.hasActiveTasks(token, clientId, patientId)

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

        render(view: '/singlePatient/singlePatient', model: [
                patientInfo   : patientInfo,
                phoneNumber: phoneNumber,
                AccountIsAdmin: request.session.accountManagement,
                hasActiveTasks: hasActiveTasks
        ])
    }

    def updateSinglePatient(Patient patient) {
        String token = request.session.token
        def resp = singlePatientService.updateSinglePatient(token, patient)
        def status = [resp: resp]
        render status as JSON
    }


    def checkPatientExist() {
        String token = request.session.token
        def identify = params?.identify
        def data = singlePatientService.checkPatientId(token, identify)
        render data as JSON
    }

    def checkPatientEmailExist() {
        String token = request.session.token
        def clientId = request.session.clientId
        def email = params?.email
        def data = singlePatientService.checkPatientEmail(token, clientId, email)
        render data as String
    }

    def invitePatient() {
        invitationService.invitePatient(session.token, params.id)
        render true
    }

    def deletePatient() {
        singlePatientService.deletePatient(session.token, params.id)

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
            view: "/singlePatient/report",
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
        def medicalRecords = singlePatientService.showMedialRecords(token, clientId, patientId)

        medicalRecords.items.sort { a, b -> a.archived <=> b.archived }

        render(view: '/singlePatient/treatmentList',  model: [
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
        def resp = singlePatientService.sendNotifyRequest(token, clientId, patientId)
        render resp as JSON
    }

    def getInClinicCode() {
        String token = request.session.token
        def clientId = request.session.clientId
        def patientId = params?.patientId
        def resp = singlePatientService.generateInClinicCode(token, clientId, patientId)
        render resp as JSON
    }

    def hasActiveTasks() {
        String token = request.session.token
        def clientId = request.session.clientId
        def patientId = params?.patientId

        def resp = singlePatientService.hasActiveTasks(token, clientId, patientId)

        render (['hasActiveTasks': resp] as JSON)
    }

    def getReportTab() {
        render(view: '/singlePatient/report')
    }

    def getGroupTab() {
        render(view: '/singlePatient/group')
    }

    def getCareGiverTab() {
        String token = request.session.token
        def patientId = params?.patientId
        def clientId = request.session.clientId

        def careGiverList = teamService.getCareGiver(token, clientId, patientId, null)

        render(view: '/singlePatient/careGiver', model: [
            patientId: patientId,
            clientId: clientId,
            careGiverList: careGiverList
        ])
    }

    def getActivitiesTab() {
        render(view: '/singlePatient/activities')
    }
}
