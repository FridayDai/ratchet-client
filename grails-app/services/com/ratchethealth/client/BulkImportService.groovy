package com.ratchethealth.client

import com.ratchethealth.client.exceptions.ApiReturnException
import grails.converters.JSON


class BulkImportService extends RatchetClientService {
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

            def result

            if (resp.status != 209) {
                result = JSON.parse(resp.body)
            }

            if (resp.status == 200) {
                def map = [:]
                map.put("data", result.items)
                log.info("Bulk import patient success, token: ${token}")
                return [resp, map]
            } else if (resp.status == 209) {
                throw new ApiReturnException(resp.status, '')
            }
            [resp, null]
        }
    }


    def lookup(String token, clientId, bulkPagination) {

        def start = bulkPagination?.start
        def length = bulkPagination?.length
        def columns = bulkPagination?.columns
        def search = bulkPagination?.search
        def draw = bulkPagination?.draw
        def title = bulkPagination?.title
        def order = bulkPagination?.order
        def sort = bulkPagination?.sort

        String lookupUrl = grailsApplication.config.ratchetv2.server.url.lookup
        def url = String.format(lookupUrl, clientId)

        log.info("Call backend service to lookup with max, offset and title, token: ${token}.")
        withPost(token, url) { req ->
            def resp = req
                    .field("max", length)
                    .field("offset", start)
                    .field("title", title)
                    .field("sorted", sort)
                    .field("order", order)
                    .asString()

            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                def map = [:]

                map.put(start, start)
                map.put(length, length)
                map.put(order, order)
                map.put(columns, columns)
                map.put(search, search)
                map.put(draw, draw)
                map.put("recordsTotal", result.totalCount)
                map.put("recordsFiltered", result.totalCount)
                map.put("data", result.items)

                log.info("Lookup success, token: ${token}")
                return [resp, map]
            }
            [resp, null]
        }
    }

    def downloadErrors(String token, clientId) {

        String errorUrl = grailsApplication.config.ratchetv2.server.url.downloadErrors
        def url = String.format(errorUrl, clientId)

        log.info("Call backend service to get bulk import patient error file link, token: ${token}.")

        withGet(token, url) { req ->
            def resp = req
                    .asString()

            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                log.info("Get bulk import patient error file link success, token: ${token}")
                def errorPath = result?.errorFilePath
                return [resp, errorPath]
            }
            [resp, null]

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
                return [resp, map]
            }

            [resp, null]
        }
    }
}

