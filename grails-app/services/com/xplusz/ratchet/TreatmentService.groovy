package com.xplusz.ratchet

import com.mashape.unirest.http.Unirest
import grails.converters.JSON
import grails.transaction.Transactional

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import java.text.MessageFormat

@Transactional
class TreatmentService {

    /** dependency injection for grailsApplication */
    def grailsApplication

    def messageSource

    def getTreatments(HttpServletRequest request, HttpServletResponse response, params) {
        def max = params?.max
        def offset = params?.offset

        def url = MessageFormat.format(grailsApplication.config.ratchetv2.server.getTreatments.url, request.session.clientId)
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

        def url = MessageFormat.format(grailsApplication.config.ratchetv2.server.assignTreatments.url, params?.clientId)
        def resp = Unirest.post(url)
                .field("patientId", params?.id)
                .field("clientId", params?.clientId)
                .field("firstName", params?.firstName)
                .field("lastName", params?.lastName)
                .field("phoneNumber", params?.phoneNum)
                .field("email", params?.email)
                .field("treatmentId", params?.treatmentId)
                .field("surgeonId", params?.staffIds)
                .field("surgeryTime", params?.surgeryTime)
                .field("ecFirstName", params?.ecFirstName)
                .field("ecLastName", params?.ecLastName)
                .field("relationship", params?.relationship)
                .field("ecEmail", params?.ecEmail)
                .asString()
//                .field("primaryStaffId", params?.primaryStaffId)
        def result = JSON.parse(resp.body)
        if (resp.status == 201) {
            return result
        } else {
            return false
        }
    }

    def getTreatmentInfo(HttpServletRequest request, HttpServletResponse response, params) {

        def url = MessageFormat.format(grailsApplication.config.ratchetv2.server.getTreatmentInfo.url,
                params?.clientId, params?.treatmentId)
        def resp = Unirest.get(url)
                .asString()

        def result = JSON.parse(resp.body)

        if (resp.status == 200) {
            return result
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
        } else {
            return false
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
            def map = [:]

            map.put("data", result.items)
            return map
        } else {
            return false
        }
    }

    def deleteCareTeam(HttpServletRequest request, HttpServletResponse response, params) {

        def url = MessageFormat.format(grailsApplication.config.ratchetv2.server.deleteCareTeam.url,
                params?.medicalRecordId, params?.careTeamId)
        def resp = Unirest.delete(url)
                .asString()

        if (resp.status == 204) {
            return true
        } else {
            return false
        }
    }

    def deleteCareGiver(HttpServletRequest request, HttpServletResponse response, params) {

        def url = MessageFormat.format(grailsApplication.config.ratchetv2.server.deleteCareGiver.url,
                params?.medicalRecordId, params?.careGiverId)
        def resp = Unirest.delete(url)
                .asString()

        if (resp.status == 204) {
            return true
        } else {
            return false
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
            return true
        } else {
            return false
        }
    }

    def addCareGiver(HttpServletRequest request, HttpServletResponse response, params) {

        def url = grailsApplication.config.ratchetv2.server.showMedicalCares.url
        def resp = Unirest.post(url)
                .field("medicalRecordId", params?.medicalRecordId)
                .field("type", grailsApplication.config.ratchetv2.server.careGiverType)
                .field("email", params?.email)
                .field("firstName", params?.firstName)
                .field("lastName", params?.lastName)
                .field("relationShip", params?.relationship)
                .asString()
        def result = JSON.parse(resp.body)

        if (resp.status == 200) {
            return true
        } else {
            return false
        }
    }

    def updateSurgeryTime(HttpServletRequest request, HttpServletResponse response, params) {

        def url = MessageFormat.format(grailsApplication.config.ratchetv2.server.updateSurgeryTime.url,
                params?.clientId, params?.patientId, params?.medicalRecordId)
        def resp = Unirest.post(url)
                .field("surgeryTime", params?.surgeryTime)
                .asString()

        if (resp.status == 200) {
            return true
        }
    }

    def updateCareGiver(HttpServletRequest request, HttpServletResponse response, params) {

        def url = MessageFormat.format(grailsApplication.config.ratchetv2.server.deleteCareGiver.url,
                params?.medicalRecordId, params?.careGiverId)
        def resp = Unirest.post(url)
                .field("email", params?.email)
                .field("firstName", params?.firstName)
                .field("lastName", params?.lastName)
                .field("relationShip", params?.relationship)
                .asString()

        if (resp.status == 200) {
            return true
        }
    }
}
