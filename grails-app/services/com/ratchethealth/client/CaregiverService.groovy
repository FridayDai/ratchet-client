package com.ratchethealth.client

import grails.converters.JSON

class CaregiverService extends RatchetAPIService {

    def grailsApplication
    def messageSource

    def getCaregiver(String token, clientId, patientId, filterFields) {
        def caregiverUrl = grailsApplication.config.ratchetv2.server.url.caregivers
        def url = String.format(caregiverUrl, clientId, patientId)

        def sortDir = filterFields?.sortDir
        def sortFiled = filterFields?.sortField

        log.info("Call backend service to get care giver, token: ${token}.")
        withGet(token, url) { req ->
            def resp = req
                .queryString("sorted", sortFiled)
                .queryString("order", sortDir)
                .asString()


            if (resp.status == 200) {
                log.info("Get care giver success, token: ${token}")

                JSON.parse(resp.body)
            }
            else {
                handleError(resp)
            }
        }
    }

    def addCaregiver(String token, clientId, patientId, caregiver) {
        def caregiverUrl = grailsApplication.config.ratchetv2.server.url.caregivers
        def url = String.format(caregiverUrl, clientId, patientId)

        log.info("Call backend service to add care giver info, token: ${token}.")
        withPost(token, url) { req ->
            def resp = req
                    .field("email", caregiver?.email)
                    .field("firstName", caregiver?.firstName)
                    .field("lastName", caregiver?.lastName)
                    .field("relationShip", caregiver?.relationship)
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

    def updateCaregiver(String token, clientId, patientId, caregiver) {

        String updateCaregiverUrl = grailsApplication.config.ratchetv2.server.url.caregiver
        def url = String.format(updateCaregiverUrl, clientId, patientId, caregiver?.caregiverId)

        log.info("Call backend service to update care giver info, token: ${token}.")
        withPost(token, url) { req ->
            def resp = req
                    .field("email", caregiver?.email)
                    .field("firstName", caregiver?.firstName)
                    .field("lastName", caregiver?.lastName)
                    .field("relationShip", caregiver?.relationship)
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

    def deleteCaregiver(String token, clientId, patientId, caregiverId) {
        String deleteCaregiverUrl = grailsApplication.config.ratchetv2.server.url.caregiver
        def url = String.format(deleteCaregiverUrl, clientId, patientId, caregiverId)

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

    def checkEmailForCaregiver(String token, clientId, patientId, String email) {

        String emailUrl = grailsApplication.config.ratchetv2.server.url.checkCaregiverEmail
        def url = String.format(emailUrl, clientId, patientId)

        log.info("Call backend service to check caregiver email, token: ${token}.")
        withGet(token, url) { req ->
            def resp = req
                    .queryString("email", email.toLowerCase())
                    .asString()

            if (resp.status == 200) {
                log.info("this caregiver email already exist, token: ${token}")
                return [existed: true]

            } else if (resp.status == 404) {
                log.info("this caregiver email doesn't exist, token: ${token}")
                return [existed: false]
            }
            else {
                handleError(resp)
            }
        }
    }
}
