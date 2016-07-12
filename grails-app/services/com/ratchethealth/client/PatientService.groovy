package com.ratchethealth.client

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
        def gender = patient?.genderValue?.toUpperCase()
        def profilePhoto = patient?.profilePhoto
        def treatmentId = patient?.treatmentId
        def surgeonId = patient?.staffId
        def absoluteEventTimestamp = patient?.absoluteEventTimestamp
        def ecFirstName = patient?.ecFirstName
        def ecLastName = patient?.ecLastName
        def relationship = patient?.relationship
        def ecEmail = patient?.ecEmail
        def groupId = patient?.groupId
        def birthday = patient?.birthdayValue
        def isUnSubscribed = patient?.emailStatus

        if (isUnSubscribed == "decline") {
            isUnSubscribed = true;
        } else {
            isUnSubscribed = false;
        }

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
                    .field("birthday", birthday)
                    .field("gender", gender)
                    .field("profilePhoto", profilePhoto)
                    .field("treatmentId", treatmentId)
                    .field("surgeonId", surgeonId)
                    .field("absoluteEventTimestamp", absoluteEventTimestamp)
                    .field("ecFirstName", ecFirstName)
                    .field("ecLastName", ecLastName)
                    .field("relationship", relationship)
                    .field("ecEmail", ecEmail)
                    .field("groupId", groupId)
                    .field("isUnSubscribed", isUnSubscribed)
                    .asString()

            if (resp.status == 201) {
                def result = parseRespBody(resp)

                log.info("Add patient success, token: ${token}")

                return ["id": result.id]
            } else {
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
        def activeTreatmentOnly = patientPagination?.activeTreatmentOnly
        def treatmentStatus = patientPagination?.treatmentStatus
        def taskStatus = patientPagination?.taskStatus

        def url = grailsApplication.config.ratchetv2.server.url.patients
        log.info("Call backend service to get patients with max, offset and clientId, token: ${token}.")

        def queryStrings = [
                'max'                : length,
                'offset'             : start,
                "clientId"           : clientId,
                "patientType"        : patientType,
                "treatmentId"        : treatmentId,
                "surgeonId"          : surgeonId,
                "patientIdOrName"    : patientIdOrName,
                "emailStatus"        : emailStatus,
                "order"              : sortDir,
                "sorted"             : sortFiled,
                "treatmentStatus"    : treatmentStatus,
                "activeTreatmentOnly": activeTreatmentOnly,
                "taskStatus"         : taskStatus
        ];

        if (queryStrings.taskStatus == 0) {
            queryStrings.taskStatus = null;
        }

        queryStrings = queryStrings.findAll { key, value -> value != null }

        withGet(token, url) { req ->
            def resp = req
                    .queryString(queryStrings)
                    .asString()

            if (resp.status == 200) {
                def result = parseRespBody(resp)

                log.info("Get patients success, token: ${token}")

                [
                        "recordsTotal"   : result.totalCount,
                        "recordsFiltered": result.totalCount,
                        "data"           : result.items
                ]
            } else {
                handleError(resp)
            }
        }
    }

    def configs(String token, configKey, configValue) {
        def url = grailsApplication.config.ratchetv2.server.url.configs

        withPost(token, url) { req ->
            def resp = req
                    .field("configKey", configKey)
                    .field("configValue", configValue)
                    .asString()

            if(resp == 200) {
                log.info("update user's configs success, token: ${token}")
            }
        }
    }
}
