package com.ratchethealth.client

import grails.converters.JSON

class TreatmentController extends BaseController {

    def beforeInterceptor = [action: this.&auth]

    def treatmentService

    def index() {
        def patientId = params?.patientId
        def medicalRecordId = params?.medicalRecordId
        def treatmentId = params?.treatmentId
        def clientId = params?.clientId
        def archived = params?.archived
        Long surgeryTime = null

        if (params?.surgeryTime != "null") {
            surgeryTime = Long.valueOf(params?.surgeryTime)
        }
        render view: '/treatment/treatment',
                model: [patientId  : patientId, clientId: clientId, medicalRecordId: medicalRecordId,
                        treatmentId: treatmentId, surgeryTime: surgeryTime, archived: archived]
    }

    def assignTreatment(Treatment treatment) {
        def token = request.session.token
        def resp = treatmentService.assignTreatmentToExistPatient(token, treatment)
        def medicalRecordId = resp?.medicalRecordId
        def treatmentInfo = treatmentService.getTreatmentInfo(token, treatment)
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
        def resp = treatmentService.getTreatments(token, clientId, max, offset, treatmentTitle)
        render resp as JSON
    }

    def updateSurgeryTime() {
        def resp = treatmentService.updateSurgeryTime(request, params)
        def result = [resp: resp]
        render result as JSON
    }

    def archived() {
        def resp = treatmentService.archived(request, params)
        def result = [resp: resp]
        render result as JSON
    }

    def getTreatmentInfo() {
        def resp = treatmentService.getTreatmentInfo(request, params)
        render resp as JSON
    }
}
