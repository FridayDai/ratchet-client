package com.ratchethealth.client

import grails.converters.JSON
import groovy.json.JsonOutput

class GroupService extends RatchetAPIService {

    def grailsApplication

    def showGroupsList(String token, clientId, groupPagination) {
        def start = groupPagination?.start
        def length = groupPagination?.length
        def name = groupPagination?.name
        def sort = groupPagination?.sortField ?: "dateCreated"
        def order = groupPagination?.sortDir ?: "desc"

        String showGroupsUrl = grailsApplication.config.ratchetv2.server.url.showGroups
        def url = String.format(showGroupsUrl, clientId)
        log.info("Call backend service to get groups list with start, length, name and clientId, token: ${token}.")

        withGet(token, url) { req ->
            def resp = req
                    .queryString("max", length)
                    .queryString("offset", start)
                    .queryString("groupName", name)
                    .queryString("sorted", sort)
                    .queryString("order", order)
                    .asString()

            if (resp.status == 200) {
                def result = JSON.parse(resp.body)
                def map = [:]
                map.put(start, start)
                map.put(length, length)
                map.put("recordsTotal", result.totalCount)
                map.put("recordsFiltered", result.totalCount)
                map.put("data", result.items)
                log.info("Get groups success, token: ${token}.")
                return map
            } else {
                handleError(resp)
            }
        }

    }

    def createGroup(String token, clientId, name) {

        String createGroupUrl = grailsApplication.config.ratchetv2.server.url.createGroup
        def url = String.format(createGroupUrl, clientId)
        log.info("Call backend service to create group with name and clientId, token: ${token}.")

        withPost(token, url) { req ->
            def resp = req
                    .field("name", name)
                    .asString()

            if (resp.status == 201) {
                log.info("create groups success, token: ${token}.")
                def result = JSON.parse(resp.body)

                return result
            } else {
                handleError(resp)
            }
        }

    }

    def updateGroup(String token, clientId, name, groupId) {

        String updateGroupUrl = grailsApplication.config.ratchetv2.server.url.updateGroup
        def url = String.format(updateGroupUrl, clientId, groupId)

        log.info("Call backend service to update group with name and clientId, token: ${token}.")

        withPost(token, url) { req ->
            def resp = req
                    .field("name", name)
                    .asString()

            if (resp.status == 200) {
                log.info("update group success, token: ${token}.")
                return true
            } else {
                handleError(resp)
            }
        }

    }

    def deleteGroup(String token, clientId, groupId) {

        String deleteGroupUrl = grailsApplication.config.ratchetv2.server.url.deleteGroup
        def url = String.format(deleteGroupUrl, clientId, groupId)
        log.info("Call backend service to delete a group with groupId and clientId, token: ${token}.")

        withDelete(token, url) { req ->
            def resp = req.asString()

            if (resp.status == 204) {
                log.info("delete a group success, token: ${token}.")
                return true
            } else {
                handleError(resp)
            }
        }

    }

    def updateTreatmentsOnGroup(String token, clientId, groupId, treatmentIds) {
        String updateTreatmentsOnGroupUrl = grailsApplication.config.ratchetv2.server.url.updateTreatmentsOnGroup
        def url = String.format(updateTreatmentsOnGroupUrl, clientId, groupId)
        log.info("Call backend service to attach treatments to a group with groupId and clientId, token: ${token}.")

        withPost(token, url) { req ->
            def resp = req.body(JsonOutput.toJson([
                treatmentIds: treatmentIds?.split(',')
            ])).asJson()

            if (resp.status == 200) {
                log.info("attach treatments to a group success, token: ${token}.")

                true
            } else {
                handleError(resp)
            }
        }
    }

    def getStaffGroups(String token, clientId, name) {

        String getStaffGroupsUrl = grailsApplication.config.ratchetv2.server.url.getStaffGroups
        def url = String.format(getStaffGroupsUrl, clientId)
        log.info("Call backend service to get groups with clientId, token: ${token}.")

        withGet(token, url) { req ->
            def resp = req
                    .queryString("groupName", name)
                    .asString()

            if (resp.status == 200) {
                log.info("Get groups success, token: ${token}")
                return JSON.parse(resp.body)
            } else {
                handleError(resp)
            }
        }

    }
}
