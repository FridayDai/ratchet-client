package com.ratchethealth.client

import com.ratchethealth.client.exceptions.ApiReturnException


class BulkImportService extends RatchetAPIService {
    def grailsApplication
    def messageSource

    def uploadPatients(String token, clientId, importFile) {
        String uploadUrl = grailsApplication.config.ratchetv2.server.url.uploadPatient
        def url = String.format(uploadUrl, clientId)

        log.info("Call backend service to bulk import patient, token: ${token}.")
        File tempFile = File.createTempFile("error_csv", ".csv")
        importFile.transferTo(tempFile)

        withPost(token, url) { req ->
            def resp = req
                    .header("accept", "application/json")
                    .field("file", tempFile)
                    .field("fileName", importFile.fileItem.fileName)
                    .asString()

            if (resp.status == 200) {
                def result = parseRespBody(resp)

                log.info("Bulk import patient success, token: ${token}")

                ["data": result.items]
            } else if (resp.status == 209) {
                throw new ApiReturnException(resp.status, '')
            }
            else {
                handleError(resp)
            }
        }
    }


    def lookup(String token, clientId, bulkPagination) {

        def start = bulkPagination?.start
        def length = bulkPagination?.length
        def title = bulkPagination?.title
        def sortDir = bulkPagination?.sortDir
        def sortField = bulkPagination?.sortField

        String lookupUrl = grailsApplication.config.ratchetv2.server.url.lookup
        def url = String.format(lookupUrl, clientId)

        log.info("Call backend service to lookup with max, offset and title, token: ${token}.")
        withPost(token, url) { req ->
            def resp = req
                    .field("max", length)
                    .field("offset", start)
                    .field("title", title)
                    .field("sorted", sortField)
                    .field("order", sortDir)
                    .asString()

            if (resp.status == 200) {
                def result = parseRespBody(resp)

                log.info("Lookup success, token: ${token}")

                [
                    "recordsTotal": result.totalCount,
                    "recordsFiltered": result.totalCount,
                    "data": result.items
                ]
            }
            else {
                handleError(resp)
            }
        }
    }

    def downloadErrors(String token, clientId) {

        String errorUrl = grailsApplication.config.ratchetv2.server.url.downloadErrors
        def url = String.format(errorUrl, clientId)

        log.info("Call backend service to get bulk import patient error file link, token: ${token}.")

        withGet(token, url) { req ->
            def resp = req
                    .asString()

            if (resp.status == 200) {
                def result = parseRespBody(resp)
                log.info("Get bulk import patient error file link success, token: ${token}")
                def errorPath = result?.errorFilePath
                return  errorPath
            }
            else {
                handleError(resp)
            }

        }
    }


    def savePatients(String token, clientId, bulkList) {
        String savePatientsUrl = grailsApplication.config.ratchetv2.server.url.savePatient
        def url = String.format(savePatientsUrl, clientId)

        log.info("Call backend service to save patients with bulkList, token: ${token}.")
        withPost(token, url) { req ->
            def resp = req
                    .field("bulkList", bulkList)
                    .asString()

            if (resp.status == 200) {
                def map = [:]
                log.info("Save patient success, token: ${token}")
                return map
            }
            else {
                handleError(resp)
            }
        }
    }
}

