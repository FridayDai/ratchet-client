package com.ratchethealth.client

import com.mashape.unirest.http.Unirest
import com.mashape.unirest.http.exceptions.UnirestException
import com.ratchethealth.client.exceptions.ApiAccessException
import com.ratchethealth.client.exceptions.ApiReturnException
import grails.converters.JSON

import javax.servlet.http.HttpServletRequest

class TreatmentService extends RatchetClientService {

    def grailsApplication
    def messageSource

    def getTreatments(String token, clientId, max, offset, treatmentTitle)
            throws ApiAccessException, ApiReturnException {

        String getTreatmentsUrl = grailsApplication.config.ratchetv2.server.url.getTreatments
        def url = String.format(getTreatmentsUrl, clientId)

        log.info("Call backend service to get treatments with max, offset and treatmetnTitle, token: ${token}.")
        withGet(token, url) { req ->
            def resp = req
                    .queryString("max", max)
                    .queryString("offset", offset)
                    .queryString("treatmentTitle", treatmentTitle)
                    .asString()

            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                log.info("Get treatments success, token: ${token}")
                def items = result.items
                return [resp, items]
            }

            [resp, null]
        }
    }

    def assignTreatmentToExistPatient(String token, treatment) {

        String assignTreatmentToExistPatientUrl = grailsApplication.config.ratchetv2.server.url.assignTreatmentToExistPatient
        def url = String.format(assignTreatmentToExistPatientUrl, treatment?.clientId, treatment?.patientId)

        log.info("Call backend service to assign treatment to exist patient with treatmentId, surgeonId, surgeryTime and emergency contact info, token: ${token}.")
        withPost(token, url) { req ->
            def resp = req
                    .field("treatmentId", treatment?.treatmentId)
                    .field("surgeonId", treatment?.staffIds)
                    .field("surgeryTime", treatment?.surgeryTime)
                    .field("ecFirstName", treatment?.ecFirstName)
                    .field("ecLastName", treatment?.ecLastName)
                    .field("relationship", treatment?.relationship)
                    .field("ecEmail", treatment?.ecEmail)
                    .field("groupId", treatment?.groupId)
                    .asString()

            def result = JSON.parse(resp.body)

            if (resp.status == 201) {
                log.info("Assign treatment to exist patient success, token: ${token}")
                return [resp, result]
            }

            [resp, null]
        }
    }

    def getTreatmentInfo(String token, treatment) {

        String getTreatmentInfoUrl = grailsApplication.config.ratchetv2.server.url.getTreatmentInfo
        def url = String.format(getTreatmentInfoUrl, treatment?.clientId, treatment?.treatmentId)

        log.info("Call backend service to get treatment info, token: ${token}.")
        withGet(token, url) { req ->
            def resp = req
                    .asString()

            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                log.info("Get treatment info success, token:${token}")
                return [resp, result]
            }

            [resp, null]
        }

    }

    def getCareTeam(request, medicalRecordId)
            throws ApiAccessException, ApiReturnException {

        def url = grailsApplication.config.ratchetv2.server.url.showMedicalCares
        try {
            log.info("Call backend service to get care team with type and medicalRecordId, token: ${request.session.token}.")
            def resp = Unirest.get(url)
                    .header("X-Auth-Token", request.session.token)
                    .queryString("type", grailsApplication.config.ratchetv2.server.careTeamType)
                    .queryString("medicalRecordId", medicalRecordId)
                    .asString()
            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                log.info("Get care team success, token:${request.session.token}")
                return result.items
            } else {
                def message = result?.error?.errorMessage
                throw new ApiReturnException(resp.status, message)
            }
        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }
    }

    def getCareGiver(HttpServletRequest request, medicalRecordId)
            throws ApiAccessException, ApiReturnException {

        def url = grailsApplication.config.ratchetv2.server.url.showMedicalCares

        try {
            log.info("Call backend service to get care giver with type and medicalRecordId, token: ${request.session.token}.")
            def resp = Unirest.get(url)
                    .header("X-Auth-Token", request.session.token)
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
                throw new ApiReturnException(resp.status, message)
            }
        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }

    }

    def deleteCareGiver(HttpServletRequest request, params)
            throws ApiAccessException, ApiReturnException {

        String deleteCareGiverUrl = grailsApplication.config.ratchetv2.server.url.deleteCareGiver
        def url = String.format(deleteCareGiverUrl, params?.medicalRecordId, params?.emergencyContactId)

        try {
            log.info("Call backend service to delete care giver, token: ${request.session.token}.")
            def resp = Unirest.delete(url)
                    .header("X-Auth-Token", request.session.token)
                    .asString()

            if (resp.status == 204) {
                log.info("Delete care giver success, token: ${request.session.token}")
                return true
            } else {
                def result = JSON.parse(resp.body)
                def message = result?.error?.errorMessage
                throw new ApiReturnException(resp.status, message)
            }
        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }
    }

    def addCareGiver(HttpServletRequest request, params)
            throws ApiAccessException, ApiReturnException {

        def url = grailsApplication.config.ratchetv2.server.url.showMedicalCares

        try {
            log.info("Call backend service to add care giver with medicalRecordId and emergency contact info, token: ${request.session.token}.")
            def resp = Unirest.post(url)
                    .header("X-Auth-Token", request.session.token)
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
                throw new ApiReturnException(resp.status, message)
            }
        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }

    }

    def updateSurgeryTime(HttpServletRequest request, params)
            throws ApiAccessException, ApiReturnException {

        String updateSurgeryTimeUrl = grailsApplication.config.ratchetv2.server.url.updateSurgeryTime
        def url = String.format(updateSurgeryTimeUrl, request.session.clientId, params?.patientId, params?.medicalRecordId)

        try {
            log.info("Call backend service to update surgery date, token: ${request.session.token}.")
            def resp = Unirest.post(url)
                    .header("X-Auth-Token", request.session.token)
                    .field("surgeryTime", params?.surgeryTime)
                    .asString()

            if (resp.status == 200) {
                log.info("Update surgery date success, token: ${request.session.token}")
                return true
            } else {
                def result = JSON.parse(resp.body)
                def message = result?.error?.errorMessage
                throw new ApiReturnException(resp.status, message)
            }
        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }
    }

    def archived(HttpServletRequest request, params)
            throws ApiAccessException, ApiReturnException {

        String archivedUrl = grailsApplication.config.ratchetv2.server.url.archived
        def url = String.format(archivedUrl, request.session.clientId, params?.patientId, params?.medicalRecordId)

        try {
            log.info("Call backend service to archive medical record, token: ${request.session.token}.")
            def resp = Unirest.post(url)
                    .header("X-Auth-Token", request.session.token)
                    .asString()

            if (resp.status == 200) {
                log.info("Archive medical record success, token: ${request.session.token}")
                return true
            } else {
                def result = JSON.parse(resp.body)
                def message = result?.error?.errorMessage
                throw new ApiReturnException(resp.status, message)
            }
        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }

    }

    def updateCareGiver(HttpServletRequest request, params)
            throws ApiAccessException, ApiReturnException {

        String updateCareGiverUrl = grailsApplication.config.ratchetv2.server.url.deleteCareGiver
        def url = String.format(updateCareGiverUrl, params?.medicalRecordId, params?.careGiverId)

        try {
            log.info("Call backend service to update care giver with emergency contact info, token: ${request.session.token}.")
            def resp = Unirest.post(url)
                    .header("X-Auth-Token", request.session.token)
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
                throw new ApiReturnException(resp.status, message)
            }
        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }

    }

    def updateCareTeamSurgeon(HttpServletRequest request, params)
            throws ApiAccessException, ApiReturnException {

        String updateCareTeamSurgeonUrl = grailsApplication.config.ratchetv2.server.url.updateCareTeam
        def url = String.format(updateCareTeamSurgeonUrl, params?.medicalRecordId, params?.staffId, params?.groupId)

        try {
            log.info("Call backend service to update care team surgeon, token: ${request.session.token}.")
            def resp = Unirest.post(url)
                    .header("X-Auth-Token", request.session.token)
                    .asString()

            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                log.info("Update care team surgeon success, token: ${request.session.token}")
                return result
            } else {
                def message = result?.error?.errorMessage
                throw new ApiReturnException(resp.status, message)
            }
        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }
    }
}
