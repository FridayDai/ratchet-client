package com.ratchethealth.client

import com.mashape.unirest.http.Unirest
import com.mashape.unirest.http.exceptions.UnirestException
import com.ratchethealth.client.exceptions.ApiAccessException
import com.ratchethealth.client.exceptions.ApiReturnException
import grails.converters.JSON

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class StaffService {

    /** dependency injection for grailsApplication */
    def grailsApplication

    def messageSource

    def getStaffs(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiAccessException, ApiReturnException {
        def max = params?.max
        def offset = params?.offset
        def type = params?.type
        def name = params?.name
        def groupId = params?.groupId

        try {
            log.info("Call backend service to get staffs with max, offset, clientId, type and name, token: ${request.session.token}.")
            def url = grailsApplication.config.ratchetv2.server.url.staffs
            def resp = Unirest.get(url)
                    .queryString("max", max)
                    .queryString("offset", offset)
                    .queryString("clientId", request.session.clientId)
                    .queryString("type", type)
                    .queryString("name", name)
                    .queryString("groupId", groupId)
                    .asString()

            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                log.info("Get staffs success, token: ${request.session.token}")
                return result.items
            } else {
                def message = result?.error?.errorMessage
                throw new ApiReturnException(resp.status, message)
            }
        }
        catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }
    }
}
