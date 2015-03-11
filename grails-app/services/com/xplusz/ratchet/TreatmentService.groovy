package com.xplusz.ratchet

import com.mashape.unirest.http.Unirest
import com.mashape.unirest.http.exceptions.UnirestException
import com.xplusz.ratchet.exceptions.ApiAjaxAccessException
import com.xplusz.ratchet.exceptions.ApiAjaxReturnErrorException
import com.xplusz.ratchet.exceptions.ApiResourceAccessException
import com.xplusz.ratchet.exceptions.ApiReturnErrorException
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

    def getTreatments(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiAjaxAccessException, ApiAjaxReturnErrorException {
        def max = params?.max
        def offset = params?.offset

        String getTreatmentsUrl = grailsApplication.config.ratchetv2.server.url.getTreatments
        def url = String.format(getTreatmentsUrl, request.session.clientId)

        try {
            def resp = Unirest.get(url)
                    .queryString("max", max)
                    .queryString("offset", offset)
                    .asString()

            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                log.info("Get treatments success, token: ${request.session.token}")
                return result.items
            } else {
                def message = result?.error?.errorMessage
                throw new ApiAjaxReturnErrorException(message, resp.status)
            }
        } catch (UnirestException e) {
            throw new ApiAjaxAccessException(e.message)
        }

    }

    def assignTreatmentToExistPatient(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiAjaxAccessException, ApiAjaxReturnErrorException {

        String assignTreatmentToExistPatientUrl = grailsApplication.config.ratchetv2.server.url.assignTreatmentToExistPatient
        def url = String.format(assignTreatmentToExistPatientUrl, params?.clientId, params?.patientId)

        try {
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
                log.info("Assign treatment to exist patient success, token: ${request.session.token}")
                return result
            } else {
                def message = result?.error?.errorMessage
                throw new ApiAjaxReturnErrorException(message, resp.status)
            }
        } catch (UnirestException e) {
            throw new ApiAjaxAccessException(e.message)
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
                log.info("Get treatment info success, token:${request.session.token}")
                return result
            } else {
                def message = result?.error?.errorMessage
                throw new ApiAjaxReturnErrorException(message, resp.status)
            }
        } catch (UnirestException e) {
            throw new ApiAjaxAccessException(e.message)
        }

    }

    def getCareTeam(HttpServletRequest request, HttpServletResponse response, medicalRecordId)
            throws ApiResourceAccessException, ApiReturnErrorException {

        def url = grailsApplication.config.ratchetv2.server.url.showMedicalCares
        try {
            def resp = Unirest.get(url)
                    .queryString("type", grailsApplication.config.ratchetv2.server.careTeamType)
                    .queryString("medicalRecordId", medicalRecordId)
                    .asString()
            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                log.info("Get care team success, token:${request.session.token}")
                return result.items
            } else {
                def message = result?.error?.errorMessage
                throw new ApiReturnErrorException(message, resp.status)
            }
        } catch (UnirestException e) {
            throw new ApiResourceAccessException(e.message)
        }
    }

    def getCareGiver(HttpServletRequest request, HttpServletResponse response, medicalRecordId)
            throws ApiAjaxAccessException, ApiAjaxReturnErrorException {

        def url = grailsApplication.config.ratchetv2.server.url.showMedicalCares

        try {
            def resp = Unirest.get(url)
                    .queryString("type", grailsApplication.config.ratchetv2.server.careGiverType)
                    .queryString("medicalRecordId", medicalRecordId)
                    .asString()
            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                def map = [:]
                map.put("data", result.items)
                log.info("Get care giver success, token: ${request.session.token}")
                return map
            } else {
                def message = result?.error?.errorMessage
                throw new ApiAjaxReturnErrorException(message, resp.status)
            }
        } catch (UnirestException e) {
            throw new ApiAjaxAccessException(e.message)
        }

    }

    def deleteCareTeam(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiAjaxAccessException, ApiAjaxReturnErrorException {

        String deleteCareTeamUrl = grailsApplication.config.ratchetv2.server.url.deleteCareTeam
        try {
            def url = String.format(deleteCareTeamUrl, params?.medicalRecordId, params?.careTeamId)

            def resp = Unirest.delete(url)
                    .asString()

            if (resp.status == 204) {
                log.info("Delete care team success, token: ${request.session.token}")
                return true
            } else {
                def result = JSON.parse(resp.body)
                def message = result?.error?.errorMessage
                throw new ApiAjaxReturnErrorException(message, resp.status)
            }
        } catch (UnirestException e) {
            throw new ApiAjaxAccessException(e.message)
        }
    }

    def deleteCareGiver(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiAjaxAccessException, ApiAjaxReturnErrorException {

        String deleteCareGiverUrl = grailsApplication.config.ratchetv2.server.url.deleteCareGiver
        def url = String.format(deleteCareGiverUrl, params?.medicalRecordId, params?.careGiverId)

        try {
            def resp = Unirest.delete(url)
                    .asString()

            if (resp.status == 204) {
                log.info("Delete care giver success, token: ${request.session.token}")
                return true
            } else {
                def result = JSON.parse(resp.body)
                def message = result?.error?.errorMessage
                throw new ApiAjaxReturnErrorException(message, resp.status)
            }
        } catch (UnirestException e) {
            throw new ApiAjaxAccessException(e.message)
        }
    }

    def addCareTeam(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiAjaxAccessException, ApiAjaxReturnErrorException {

        def url = grailsApplication.config.ratchetv2.server.url.showMedicalCares

        try {
            def resp = Unirest.post(url)
                    .field("medicalRecordId", params?.medicalRecordId)
                    .field("type", grailsApplication.config.ratchetv2.server.careTeamType)
                    .field("staffId", params?.staffId)
                    .asString()

            if (resp.status == 200) {
                log.info("Add care team success, token: ${request.session.token}")
                return true
            } else {
                def result = JSON.parse(resp.body)
                def message = result?.error?.errorMessage
                throw new ApiAjaxReturnErrorException(message, resp.status)
            }
        } catch (UnirestException e) {
            throw new ApiAjaxAccessException(e.message)
        }
    }

    def addCareGiver(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiAjaxAccessException, ApiAjaxReturnErrorException {

        def url = grailsApplication.config.ratchetv2.server.url.showMedicalCares

        try {
            def resp = Unirest.post(url)
                    .field("medicalRecordId", params?.medicalRecordId)
                    .field("type", grailsApplication.config.ratchetv2.server.careGiverType)
                    .field("email", params?.email)
                    .field("firstName", params?.firstName)
                    .field("lastName", params?.lastName)
                    .field("relationShip", params?.relationship)
                    .asString()

            if (resp.status == 200) {
                log.info("Add care giver success, token: ${request.session.token}")
                return true
            } else {
                def result = JSON.parse(resp.body)
                def message = result?.error?.errorMessage
                throw new ApiAjaxReturnErrorException(message, resp.status)
            }
        } catch (UnirestException e) {
            throw new ApiAjaxAccessException(e.message)
        }

    }

    def updateSurgeryTime(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiAjaxAccessException, ApiAjaxReturnErrorException {

        String updateSurgeryTimeUrl = grailsApplication.config.ratchetv2.server.url.updateSurgeryTime
        def url = String.format(updateSurgeryTimeUrl, params?.clientId, params?.patientId, params?.medicalRecordId)

        try {
            def resp = Unirest.post(url)
                    .field("surgeryTime", params?.surgeryTime)
                    .asString()

            if (resp.status == 200) {
                log.info("Update surgery time success, token: ${request.session.token}")
                return true
            } else {
                def result = JSON.parse(resp.body)
                def message = result?.error?.errorMessage
                throw new ApiAjaxReturnErrorException(message, resp.status)
            }
        } catch (UnirestException e) {
            throw new ApiAjaxAccessException(e.message)
        }
    }

    def archived(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiAjaxAccessException, ApiAjaxReturnErrorException {

        String archivedUrl = grailsApplication.config.ratchetv2.server.url.archived
        def url = String.format(archivedUrl, params?.clientId, params?.patientId, params?.medicalRecordId)

        try {
            def resp = Unirest.post(url)
                    .asString()

            if (resp.status == 200) {
                log.info("Archive medical record success, token: ${request.session.token}")
                return true
            } else {
                def result = JSON.parse(resp.body)
                def message = result?.error?.errorMessage
                throw new ApiAjaxReturnErrorException(message, resp.status)
            }
        } catch (UnirestException e) {
            throw new ApiAjaxAccessException(e.message)
        }

    }

    def updateCareGiver(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiAjaxAccessException, ApiAjaxReturnErrorException {

        String updateCareGiverUrl = grailsApplication.config.ratchetv2.server.url.deleteCareGiver
        def url = String.format(updateCareGiverUrl, params?.medicalRecordId, params?.careGiverId)

        try {
            def resp = Unirest.post(url)
                    .field("email", params?.email)
                    .field("firstName", params?.firstName)
                    .field("lastName", params?.lastName)
                    .field("relationShip", params?.relationship)
                    .asString()

            if (resp.status == 200) {
                log.info("Update care giver success, token: ${request.session.token}")
                return true
            } else {
                def result = JSON.parse(resp.body)
                def message = result?.error?.errorMessage
                throw new ApiAjaxReturnErrorException(message, resp.status)
            }
        } catch (UnirestException e) {
            throw new ApiAjaxAccessException(e.message)
        }

    }

    def updateCareTeamSurgeon(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiAjaxAccessException, ApiAjaxReturnErrorException {

        String updateCareTeamSurgeonUrl = grailsApplication.config.ratchetv2.server.url.deleteCareTeam
        def url = String.format(updateCareTeamSurgeonUrl, params?.medicalRecordId, params?.staffId)

        try {
            def resp = Unirest.post(url)
                    .asString()
            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                log.info("Update care team surgeon success, token: ${request.session.token}")
                return result
            } else {
                def message = result?.error?.errorMessage
                throw new ApiAjaxReturnErrorException(message, resp.status)
            }
        } catch (UnirestException e) {
            throw new ApiAjaxAccessException(e.message)
        }
    }
}
