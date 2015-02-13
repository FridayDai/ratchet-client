package com.xplusz.ratchet

import com.mashape.unirest.http.Unirest
import grails.converters.JSON

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import java.text.MessageFormat

class SinglePatientService {

    def grailsApplication

    def showSinglePatient(HttpServletRequest request, HttpServletResponse response, patientId) {

        String showSinglePatientUrl = grailsApplication.config.ratchetv2.server.url.patient
        def url = String.format(showSinglePatientUrl, patientId)

        def resp = Unirest.get(url)
                .asString()
        def result = JSON.parse(resp.body)

        if (resp.status == 200) {
            return result
        } else {
            return false
        }
    }

    def showMedialRecords(HttpServletRequest request, HttpServletResponse response, patientId) {

        String showMedialRecordsUrl = grailsApplication.config.ratchetv2.server.url.showMedicalRecords
        def url = String.format(showMedialRecordsUrl, request.session.clientId, patientId)

        def resp = Unirest.get(url)
                .asString()
        def result = JSON.parse(resp.body)

        if (resp.status == 200) {
            return result
        } else {
            return false
        }
    }

    def updateSinglePatient(HttpServletRequest request, HttpServletResponse response, params) {
        String updateSinglePatientUrl = grailsApplication.config.ratchetv2.server.url.patient
        def url = String.format(showMedialRecordsUrl, params?.patientId)

        def resp = Unirest.post(url)
                .field("clientId", params?.clientId)
                .field("patientId", params?.id)
                .field("email", params?.email)
                .field("firstName", params?.firstName)
                .field("lastName", params?.lastName)
                .field("phoneNumber", params?.phoneNum)
                .asString()

        if (resp.status == 200) {
            return resp.status
        } else {
            return false
        }
    }
}
