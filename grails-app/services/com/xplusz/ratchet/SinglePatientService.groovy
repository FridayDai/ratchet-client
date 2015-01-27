package com.xplusz.ratchet

import com.mashape.unirest.http.Unirest
import exceptions.AccountValidationException
import grails.converters.JSON

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class SinglePatientService {

    def grailsApplication

    def showSinglePatient(HttpServletRequest request, HttpServletResponse response, patientId) {
        def url = grailsApplication.config.ratchetv2.server.singlePatient.url + '/' + patientId
        def resp = Unirest.get(url)
                .asString()
        def result = JSON.parse(resp.body)

        if (resp.status == 200) {
            return result
        }
    }

    def showMedialRecords(HttpServletRequest request, HttpServletResponse response, patientId) {
        def url = grailsApplication.config.ratchetv2.server.showMedicalRecords.url + '/' + patientId
        def resp = Unirest.get(url)
                .asString()
        def result = JSON.parse(resp.body)

        if (resp.status == 200) {
            return result
        }
    }

    def updateSinglePatient(HttpServletRequest request, HttpServletResponse response, params) {
        def url = grailsApplication.config.ratchetv2.server.singlePatient.url + '/' + params.emid
        def resp = Unirest.put(url)
                .field("email", params.email)
                .field("firstName", params.firstName)
                .field("lastName", params.lastName)
                .field("phoneNumber", params.phoneNum)
                .asString()

        if (resp.status == 200) {
            return resp.status
        }
    }
}
