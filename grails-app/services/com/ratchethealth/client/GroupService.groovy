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

    def getGroups(params) {
        def start = params?.start
        def length = params?.length
        def group1 = new Group("G111", "rainier", "jan 19,2015", "11")
        def group2 = new Group("G222", "proliance", "jan 19,2015", "22")
        def data = [group1, group2]
        def map = [:]
        map.put(start, start)
        map.put(length, length)
        map.put("recordsTotal", 2)
        map.put("recordsFiltered", 2)
        map.put("data", data)
        return map
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
                return result.items
            } else {
                def message = result?.error?.errorMessage
                throw new ApiReturnException(resp.status, message)
            }
        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }
    }
}
