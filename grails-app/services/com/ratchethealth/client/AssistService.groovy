package com.ratchethealth.client

import com.mashape.unirest.http.Unirest
import com.mashape.unirest.http.exceptions.UnirestException
import com.ratchethealth.client.exceptions.ApiAccessException
import com.ratchethealth.client.exceptions.ApiReturnException
import grails.converters.JSON

import javax.servlet.http.HttpServletRequest

class AssistService {
    /** dependency injection for grailsApplication */
    def grailsApplication
    def messageSource

    def addAssist(HttpServletRequest request, params)
            throws ApiAccessException, ApiReturnException {

        def title = params?.title
        def desc = params?.desc
        def browser = params?.browser
        def url = params?.url

        def staffId = request.session.accountId
        def clientId = request.session.clientId
        def session = request.session.token

        def type = 'Client Staff'

        String addAssistUrl = grailsApplication.config.ratchetv2.server.url.addAssist
        def formattedUrl = String.format(addAssistUrl, clientId)

        try {
            log.info("Call backend service to add assist with user and client info, token: ${request.session.token}.")
            def resp = Unirest.post(formattedUrl)
                    .header("X-Auth-Token", request.session.token)
                    .field("title", title)
                    .field("desc", desc)
                    .field("browser", browser)
                    .field("staffId", staffId)
                    .field("clientId", clientId)
                    .field("session", session)
                    .field("url", url)
                    .field("type", type)
                    .asString()
            def result = JSON.parse(resp.body)

            if (resp.status == 201) {
                def map = [:]
                map.put("status", "ok")
                log.info("Add assist success, token: ${request.session.token}.")
                return map
            } else {
                def message = result?.error?.errorMessage
                throw new ApiReturnException(resp.status, message)
            }
        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }
    }
}
