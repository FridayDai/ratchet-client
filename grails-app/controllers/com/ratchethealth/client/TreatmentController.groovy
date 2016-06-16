package com.ratchethealth.client

import grails.converters.JSON

class TreatmentController extends BaseController {

    def beforeInterceptor = [action: this.&auth]

    def treatmentService

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

    def updateEventTime() {
        String token = request.session.token
        def clientId = request.session.clientId
        def medicalRecordId = params?.medicalRecordId
        def patientId = params?.patientId
        def absoluteEventTimestamp = params?.absoluteEventTimestamp
        def providerId = params?.providerId

        def resp = treatmentService.updateEventTime(token, clientId, medicalRecordId, patientId, providerId, absoluteEventTimestamp)
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
        def providerId = params?.providerId

        def resp = treatmentService.addAdhocTasks(token, clientId, patientId, medicalRecordId, toolIds, scheduleTime, providerId)
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

}
