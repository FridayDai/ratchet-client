package com.ratchethealth.client

import grails.converters.JSON

class TeamService extends RatchetAPIService {

    def grailsApplication
    def messageSource

    def getCareTeam(String token, medicalRecordId) {
        def url = grailsApplication.config.ratchetv2.server.url.showMedicalCares

        log.info("Call backend service to get care team with type and medicalRecordId, token: ${token}.")
        withGet(token, url) { req ->
            def resp = req
                    .queryString("type", grailsApplication.config.ratchetv2.server.careTeamType)
                    .queryString("medicalRecordId", medicalRecordId)
                    .asString()

            if (resp.status == 200) {
                def result = JSON.parse(resp.body)
                log.info("Get care team success, token:${token}")
                def items = result.items
                return items
            }
            else {
                handleError(resp)
            }
        }
    }

    def getCareGiver(String token, clientId, patientId, filterFields) {
        def careGiverUrl = grailsApplication.config.ratchetv2.server.url.caregivers
        def url = String.format(careGiverUrl, clientId, patientId)

        log.info("Call backend service to get care giver, token: ${token}.")
        withGet(token, url) { req ->
            def resp = req.asString()

            if (resp.status == 200) {
                def result = JSON.parse(resp.body)
                def map = [:]
                map.put("data", result.items)
                log.info("Get care giver success, token: ${token}")
                return map
            }
            else {
                handleError(resp)
            }
        }
    }

    def deleteCareGiver(String token, medicalRecordId, emergencyContactId) {
        String deleteCareGiverUrl = grailsApplication.config.ratchetv2.server.url.deleteCareGiver
        def url = String.format(deleteCareGiverUrl, medicalRecordId, emergencyContactId)

        log.info("Call backend service to delete care giver, token: ${token}.")
        withDelete(token, url) { req ->
            def resp = req
                    .asString()

            if (resp.status == 204) {
                log.info("Delete care giver success, token: ${token}")
                return true
            }
            else {
                handleError(resp)
            }
        }
    }

    def addCareGiver(String token, careGiver) {

        def url = grailsApplication.config.ratchetv2.server.url.showMedicalCares

        log.info("Call backend service to add care giver with medicalRecordId and emergency contact info, token: ${token}.")
        withPost(token, url) { req ->
            def resp = req
                    .field("medicalRecordId", careGiver?.medicalRecordId)
                    .field("type", grailsApplication.config.ratchetv2.server.careGiverType)
                    .field("email", careGiver?.email)
                    .field("firstName", careGiver?.firstName)
                    .field("lastName", careGiver?.lastName)
                    .field("relationShip", careGiver?.relationship)
                    .asString()

            if (resp.status == 200) {
                log.info("Add care giver success, token: ${token}")
                return true
            }
            else {
                handleError(resp)
            }
        }
    }

    def updateCareGiver(String token, careGiver) {

        String updateCareGiverUrl = grailsApplication.config.ratchetv2.server.url.deleteCareGiver
        def url = String.format(updateCareGiverUrl, careGiver?.medicalRecordId, careGiver?.careGiverId)

        log.info("Call backend service to update care giver with emergency contact info, token: ${token}.")
        withPost(token, url) { req ->
            def resp = req
                    .field("email", careGiver?.email)
                    .field("firstName", careGiver?.firstName)
                    .field("lastName", careGiver?.lastName)
                    .field("relationShip", careGiver?.relationship)
                    .asString()

            if (resp.status == 200) {
                log.info("Update care giver success, token: ${token}")
                return true
            }
            else {
                handleError(resp)
            }
        }
    }

    def updateCareTeamSurgeon(String token, medicalRecordId, staffId, groupId) {

        String updateCareTeamSurgeonUrl = grailsApplication.config.ratchetv2.server.url.updateCareTeam
        def url = String.format(updateCareTeamSurgeonUrl, medicalRecordId, staffId, groupId)

        log.info("Call backend service to update care team surgeon, token: ${token}.")
        withPost(token, url) { req ->
            def resp = req
                    .asString()

            if (resp.status == 200) {
                def result = JSON.parse(resp.body)
                log.info("Update care team surgeon success, token: ${token}")
                return result
            }
            else {
                handleError(resp)
            }
        }
    }

    def checkEmailForCareGiver(String token, medicalRecordId, String email) {

        String emailUrl = grailsApplication.config.ratchetv2.server.url.checkCareGiverEmail
        def url = String.format(emailUrl, medicalRecordId)

        log.info("Call backend service to check careGiver email, token: ${token}.")
        withGet(token, url) { req ->
            def resp = req
                    .queryString("email", email.toLowerCase())
                    .asString()

            if (resp.status == 200) {
                log.info("this careGiver email already exist, token: ${token}")
                return [existed: true]

            } else if (resp.status == 404) {
                log.info("this careGiver email doesn't exist, token: ${token}")
                return [existed: false]
            }
            else {
                handleError(resp)
            }
        }
    }
}
