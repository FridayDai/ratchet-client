package com.xplusz.ratchet

import grails.converters.JSON

class TreatmentController extends BaseController {

    def beforeInterceptor = [action: this.&auth]

    def treatmentService

    def index() {
        def patientId = params?.patientId
        def medicalRecordId = params?.medicalRecordId
        def treatmentId = params?.treatmentId
        def clientId = params?.clientId
        def status = params?.status
        Long surgeryTime = null

        if (params?.surgeryTime != "null") {
            surgeryTime = Long.valueOf(params?.surgeryTime)
        }
        render view: '/treatment/treatment',
                model: [patientId  : patientId, clientId: clientId, medicalRecordId: medicalRecordId,
                        treatmentId: treatmentId, surgeryTime: surgeryTime, status: status]
    }

    def assignTreatment() {
        def resp = treatmentService.assignTreatmentToExistPatient(request, response, params)
        def medicalRecordId = resp?.medicalRecordId
        def treatmentInfo = treatmentService.getTreatmentInfo(request, response, params)
        def medicalRecordInfo = [medicalRecordId: medicalRecordId,
                                 treatmentInfo  : treatmentInfo
        ]
        render medicalRecordInfo as JSON
    }

    def getTreatments() {
        def resp = treatmentService.getTreatments(request, response, params)
        render resp as JSON
    }

    def updateSurgeryTime() {
        def resp = treatmentService.updateSurgeryTime(request, response, params)
        def result = [resp: resp]
        render result as JSON
    }

    def getTreatmentInfo() {
        def resp = treatmentService.getTreatmentInfo(request, response, params)
        render resp as JSON
    }
}
