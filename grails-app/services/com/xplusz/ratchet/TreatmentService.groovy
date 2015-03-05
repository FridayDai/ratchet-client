package com.xplusz.ratchet

import com.mashape.unirest.http.Unirest
import com.mashape.unirest.http.exceptions.UnirestException
import com.xplusz.ratchet.exceptions.ApiAjaxAccessException
import com.xplusz.ratchet.exceptions.ApiAjaxReturnErrorException
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

        String getTreatmentsUrl = grailsApplication.config.ratchetv2.server.url.getTreatments
        def url = String.format(getTreatmentsUrl, request.session.clientId)

        def resp = Unirest.get(url)
                .queryString("max", max)
                .queryString("offset", offset)
                .asString()

        def result = JSON.parse(resp.body)

        if (resp.status == 200) {
            return result.items
        }

    }

    def assignTreatmentToExistPatient(HttpServletRequest request, HttpServletResponse response, params) {

        String assignTreatmentToExistPatientUrl = grailsApplication.config.ratchetv2.server.url.assignTreatmentToExistPatient
        def url = String.format(assignTreatmentToExistPatientUrl, params?.clientId, params?.patientId)


        def resp = Unirest.post(url)
                .field("treatmentId", params?.treatmentId)
                .field("surgeonId", params?.staffIds)
                .field("surgeryTime", params?.surgeryTime)
                .field("ecFirstName", params?.ecFirstName)
                .field("ecLastName", params?.ecLastName)
                .field("relationship", params?.relationship)
                .field("ecEmail", params?.ecEmail)
                .asString()
        def result = JSON.parse(resp.body)
        if (resp.status == 201) {
            return result
        } else {
            return false
        }
    }

    def getTreatmentInfo(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiAjaxAccessException, ApiAjaxReturnErrorException {

        String getTreatmentInfoUrl = grailsApplication.config.ratchetv2.server.url.getTreatmentInfo
        def url = String.format(getTreatmentInfoUrl, params?.clientId, params?.treatmentId)

        try {
            def resp = Unirest.get(url)
                    .asString()

            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                return result
            } else {
                def message = result?.error?.errorMessage
                throw new ApiAjaxReturnErrorException(message, resp.status)
            }
        } catch (UnirestException e) {
            log.error(e.message)
            throw new ApiAjaxAccessException()
        }

    }

    def getCareTeam(HttpServletRequest request, HttpServletResponse response, medicalRecordId) {

        def url = grailsApplication.config.ratchetv2.server.url.showMedicalCares
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

        def url = grailsApplication.config.ratchetv2.server.url.showMedicalCares
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

        String deleteCareTeamUrl = grailsApplication.config.ratchetv2.server.url.deleteCareTeam
        def url = String.format(deleteCareTeamUrl, params?.medicalRecordId, params?.careTeamId)

        def resp = Unirest.delete(url)
                .asString()

        if (resp.status == 204) {
            return true
        } else {
            return false
        }
    }

    def deleteCareGiver(HttpServletRequest request, HttpServletResponse response, params) {

        String deleteCareGiverUrl = grailsApplication.config.ratchetv2.server.url.deleteCareGiver
        def url = String.format(deleteCareGiverUrl, params?.medicalRecordId, params?.careGiverId)

        def resp = Unirest.delete(url)
                .asString()

        if (resp.status == 204) {
            return true
        } else {
            return false
        }
    }

    def addCareTeam(HttpServletRequest request, HttpServletResponse response, params) {

        def url = grailsApplication.config.ratchetv2.server.url.showMedicalCares
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

        def url = grailsApplication.config.ratchetv2.server.url.showMedicalCares
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

        String updateSurgeryTimeUrl = grailsApplication.config.ratchetv2.server.url.updateSurgeryTime
        def url = String.format(updateSurgeryTimeUrl, params?.clientId, params?.patientId, params?.medicalRecordId)

        def resp = Unirest.post(url)
                .field("surgeryTime", params?.surgeryTime)
                .asString()

        if (resp.status == 200) {
            return true
        }
    }

    def archived (HttpServletRequest request, HttpServletResponse response, params) {

        String archivedUrl = grailsApplication.config.ratchetv2.server.url.archived
        def url = String.format(archivedUrl, params?.clientId, params?.patientId, params?.medicalRecordId)

        def resp = Unirest.post(url)
                .asString()

        if (resp.status == 200) {
            return true
        }
    }

    def updateCareGiver(HttpServletRequest request, HttpServletResponse response, params) {

        String updateCareGiverUrl = grailsApplication.config.ratchetv2.server.url.deleteCareGiver
        def url = String.format(updateCareGiverUrl, params?.medicalRecordId, params?.careGiverId)

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

    def updateCareTeamSurgeon(HttpServletRequest request, HttpServletResponse response, params) {

        String updateCareTeamSurgeonUrl = grailsApplication.config.ratchetv2.server.url.deleteCareTeam
        def url = String.format(updateCareTeamSurgeonUrl, params?.medicalRecordId, params?.staffId)

        def resp = Unirest.post(url)
                .asString()

        def result = JSON.parse(resp.body)
        if (resp.status == 200) {
            return result
        } else {
            return false
        }
    }
}
