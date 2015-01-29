package com.xplusz.ratchet

import com.mashape.unirest.http.Unirest
import grails.converters.JSON
import grails.transaction.Transactional

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Transactional
class TreatmentService {

    /** dependency injection for grailsApplication */
    def grailsApplication

    def messageSource

    def getTreatments(HttpServletRequest request, HttpServletResponse response, params) {
        def max = params?.max
        def offset = params?.offset

        def url = grailsApplication.config.ratchetv2.server.clients.url + "" + request.session.clientId + "/treatments/"
        def resp = Unirest.get(url)
                .queryString("max", max)
                .queryString("offset", offset)
                .asString()

        def result = JSON.parse(resp.body)

        if (resp.status == 200) {
            return result.items
        }

    }

    def assignTreatmentToPatient(HttpServletRequest request, HttpServletResponse response, params) {
        def url = grailsApplication.config.ratchetv2.server.patients.url + params?.patientId + '/records'
        def resp = Unirest.post(url)
                .field("patientId", params?.patientId)
                .field("clientId", params?.clientId)
                .field("firstName", params?.firstName)
                .field("lastName", params?.lastName)
                .field("phoneNumber", params?.phoneNum)
                .field("email", params?.email)
                .field("treatmentId", params?.treatmentId)
                .field("primaryStaffId", params?.primaryStaffId)
                .field("staffIds", params?.staffIds)
                .asString()

        if (resp.status == 201) {
            return true
        }
    }

    def getTreatmentInfo(HttpServletRequest request, HttpServletResponse response, params) {
        def url = grailsApplication.config.ratchetv2.server.clients.url + params?.clientId + '/treatments' + params?.patientId
        def resp = Unirest.get(url)
                .asString()

        def result = JSON.parse(resp.body)

        if (resp.status == 200) {
            return result.items
        }
    }

    def getCareTeam(HttpServletRequest request, HttpServletResponse response, medicalRecordId) {
        def url = grailsApplication.config.ratchetv2.server.showMedicalCares.url
        def resp = Unirest.get(url)
                .queryString("type", grailsApplication.config.ratchetv2.server.careTeamType)
                .queryString("medicalRecordId", medicalRecordId)
                .asString()
        def result = JSON.parse(resp.body)

        if (resp.status == 200) {
            return result.items
        }
    }

    def getCareGiver(HttpServletRequest request, HttpServletResponse response, medicalRecordId) {
        def url = grailsApplication.config.ratchetv2.server.showMedicalCares.url
        def resp = Unirest.get(url)
                .queryString("type", grailsApplication.config.ratchetv2.server.careGiverType)
                .queryString("medicalRecordId", medicalRecordId)
                .asString()
        def result = JSON.parse(resp.body)

        if (resp.status == 200) {
            return result.items
        }
    }

    def deleteCareTeam(HttpServletRequest request, HttpServletResponse response, params) {
        def url = grailsApplication.config.ratchetv2.server.deleteMedicalCares.url + params?.medicalRecordId + '/careteam/' + params?.careTeamId
        def resp = Unirest.delete(url)
                .asString()

        if (resp.status == 204) {
            return true
        }
    }

    def deleteCareGiver(HttpServletRequest request, HttpServletResponse response, params) {
        def url = grailsApplication.config.ratchetv2.server.deleteMedicalCares.url + params?.medicalRecordId + '/caregiver/' + params?.careGiverId
        def resp = Unirest.delete(url)
                .asString()

        if (resp.status == 204) {
            return true
        }
    }

    def addCareTeam(HttpServletRequest request, HttpServletResponse response, params) {
        def url = grailsApplication.config.ratchetv2.server.showMedicalCares.url
        def resp = Unirest.post(url)
                .field("medicalRecordId", params?.medicalRecordId)
                .field("type", grailsApplication.config.ratchetv2.server.careTeamType)
                .field("staffId", params?.staffId)
                .asString()

        def result = JSON.parse(resp.body)

        if (resp.status == 200) {
            return result
        }
    }

    def addCareGiver(HttpServletRequest request, HttpServletResponse response, params) {
        def url = grailsApplication.config.ratchetv2.server.showMedicalCares.url
        def resp = Unirest.post(url)
                .field("medicalRecordId", params?.medicalRecordId)
                .field("type", grailsApplication.config.ratchetv2.server.careGiverType)
                .field("email", params?.email)
                .field("relationShip", params?.relationship)
                .asString()
        def result = JSON.parse(resp.body)

        if (resp.status == 200) {
            return result
        }
    }
}
