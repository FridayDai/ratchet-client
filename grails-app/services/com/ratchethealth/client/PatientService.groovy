package com.ratchethealth.client

import grails.converters.JSON


class PatientService extends RatchetAPIService {
    def grailsApplication
    def messageSource

    def addPatients(String token, clientId, patient) {
        def id = patient?.id
        def patientId = patient?.patientId
        def firstName = patient?.firstName
        def lastName = patient?.lastName
        def phoneNumber = patient?.phoneNumber
        def email = patient?.email
        def profilePhoto = patient?.profilePhoto
        def treatmentId = patient?.treatmentId
        def surgeonId = patient?.staffId
        def surgeryTime = patient?.surgeryTime
        def ecFirstName = patient?.ecFirstName
        def ecLastName = patient?.ecLastName
        def relationship = patient?.relationship
        def ecEmail = patient?.ecEmail
        def groupId = patient?.groupId

        String addPatientsUrl = grailsApplication.config.ratchetv2.server.url.assignTreatments
        def url = String.format(addPatientsUrl, clientId)

        log.info("Call backend service to add patient with clientId and patient info, token: ${token}.")
        withPost(token, url) { req ->
            def resp = req
                    .field("id", id)
                    .field("patientId", patientId)
                    .field("firstName", firstName)
                    .field("lastName", lastName)
                    .field("phoneNumber", phoneNumber)
                    .field("email", email)
                    .field("profilePhoto", profilePhoto)
                    .field("treatmentId", treatmentId)
                    .field("surgeonId", surgeonId)
                    .field("surgeryTime", surgeryTime)
                    .field("ecFirstName", ecFirstName)
                    .field("ecLastName", ecLastName)
                    .field("relationship", relationship)
                    .field("ecEmail", ecEmail)
                    .field("groupId", groupId)
                    .asString()

            if (resp.status == 201) {
                def result = JSON.parse(resp.body)
                def map = [:]
                map.put("id", result.id)
                log.info("Add patient success, token: ${token}")
                return map
            }
            else {
                handleError(resp)
            }
        }
    }

    def loadPatients(String token, clientId, patientPagination) {
        def start = patientPagination?.start
        def length = patientPagination?.length
        def patientType = patientPagination?.patientType
        def treatmentId = patientPagination?.treatmentId
        def surgeonId = patientPagination?.surgeonId
        def patientIdOrName = patientPagination?.patientIdOrName
        def sortDir = patientPagination?.sortDir
        def sortFiled = patientPagination?.sortField
        def emailStatus = patientPagination?.emailStatus

        def url = grailsApplication.config.ratchetv2.server.url.patients
        log.info("Call backend service to get patients with max, offset and clientId, token: ${token}.")
        withGet(token, url) { req ->
            def resp = req
                    .queryString("max", length)
                    .queryString("offset", start)
                    .queryString("clientId", clientId)
                    .queryString("patientType", patientType)
                    .queryString("treatmentId", treatmentId)
                    .queryString("surgeonId", surgeonId)
                    .queryString("patientIdOrName", patientIdOrName)
                    .queryString("emailStatus", emailStatus)
                    .queryString("order", sortDir)
                    .queryString("sorted", sortFiled)
                    .asString()

            if (resp.status == 200) {
                def result = JSON.parse(resp.body)
                def map = [:]

                map.put("recordsTotal", result.totalCount)
                map.put("recordsFiltered", result.totalCount)
                map.put("data", result.items)

                log.info("Get patients success, token: ${token}")
                return map
            }
            else {
                handleError(resp)
            }
        }
    }
}
