package com.ratchethealth.client

import com.mashape.unirest.http.Unirest
import com.mashape.unirest.http.exceptions.UnirestException
import com.ratchethealth.client.exceptions.ApiAccessException
import com.ratchethealth.client.exceptions.ApiReturnException
import grails.converters.JSON

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class GroupService {

    def grailsApplication

    def showGroupsList(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiAccessException, ApiReturnException {
        def start = params?.start
        def length = params?.length
        def name = params?.name

        String showGroupsUrl = grailsApplication.config.ratchetv2.server.url.showGroups
        def url = String.format(showGroupsUrl, request.session.clientId)

        try {
            log.info("Call backend service to get groups list with start, length, name and clientId, token: ${request.session.token}.")
            def resp = Unirest.get(url)
                    .queryString("max", length)
                    .queryString("offset", start)
                    .queryString("name", name)
                    .asString()

            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                def map = [:]
                map.put(start, start)
                map.put(length, length)
                map.put("recordsTotal", result.totalCount)
                map.put("recordsFiltered", result.totalCount)
                map.put("data", result.items)
                log.info("Get groups success, token: ${request.session.token}.")
                return map
            } else {
                def message = result?.error?.errorMessage
                throw new ApiReturnException(resp.status, message)
            }
        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }


    }

    def createGroup(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiAccessException, ApiReturnException {

        def name = params?.name
        String createGroupUrl = grailsApplication.config.ratchetv2.server.url.createGroup
        def url = String.format(createGroupUrl, request.session.clientId)

        try {
            log.info("Call backend service to create group with name and clientId, token: ${request.session.token}.")
            def resp = Unirest.post(url)
                    .field("name", name)
                    .asString()

            def result = JSON.parse(resp.body)

            if (resp.status == 201) {
                log.info("create groups success, token: ${request.session.token}.")
                return result
            } else {
                def message = result?.error?.errorMessage
                throw new ApiReturnException(resp.status, message)
            }
        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }


    }

    def updateGroup(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiAccessException, ApiReturnException {

        def name = params?.name
        def groupId = params?.groupId
        String updateGroupUrl = grailsApplication.config.ratchetv2.server.url.updateGroup
        def url = String.format(updateGroupUrl, request.session.clientId, groupId)

        try {
            log.info("Call backend service to update group with name and clientId, token: ${request.session.token}.")
            def resp = Unirest.post(url)
                    .field("name", name)
                    .asString()

            if (resp.status == 200) {
                log.info("update group success, token: ${request.session.token}.")
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

    def showGroup(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiAccessException, ApiReturnException {

        def groupId = params?.groupId
        String showGroupUrl = grailsApplication.config.ratchetv2.server.url.showGroup
        def url = String.format(showGroupUrl, request.session.clientId, groupId)

        try {
            log.info("Call backend service to show a group with groupId and clientId, token: ${request.session.token}.")
            def resp = Unirest.get(url)
                    .asString()

            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                log.info("show a group success, token: ${request.session.token}.")
                return result
            } else {
                def message = result?.error?.errorMessage
                throw new ApiReturnException(resp.status, message)
            }
        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }

    }

    def deleteGroup(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiAccessException, ApiReturnException {

        def groupId = params?.groupId
        String deleteGroupUrl = grailsApplication.config.ratchetv2.server.url.deleteGroup
        def url = String.format(deleteGroupUrl, request.session.clientId, groupId)

        try {
            log.info("Call backend service to delete a group with groupId and clientId, token: ${request.session.token}.")
            def resp = Unirest.delete(url)
                    .asString()

            if (resp.status == 204) {
                log.info("delete a group success, token: ${request.session.token}.")
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

    def getStaffGroups(HttpServletRequest request, HttpServletResponse response)
            throws ApiAccessException, ApiReturnException {

        String getStaffGroupsUrl = grailsApplication.config.ratchetv2.server.url.getStaffGroups
        def url = String.format(getStaffGroupsUrl, request.session.clientId)
        try {
            log.info("Call backend service to get groups with clientId, token: ${request.session.token}.")
            def resp = Unirest.get(url)
                    .asString()

            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
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
