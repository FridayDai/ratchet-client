package com.xplusz.ratchet

import com.mashape.unirest.http.Unirest
import grails.converters.JSON

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import java.text.MessageFormat

class SinglePatientService {

    def grailsApplication

    def showSinglePatient(HttpServletRequest request, HttpServletResponse response, patientId) {
        def url = MessageFormat.format(grailsApplication.config.ratchetv2.server.patient.url, patientId)
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
        def url = MessageFormat.format(grailsApplication.config.ratchetv2.server.showMedicalRecords.url, request.session.clientId, patientId)
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
        def url = MessageFormat.format(grailsApplication.config.ratchetv2.server.patient.url, params?.patientId)
        def resp = Unirest.post(url)
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
