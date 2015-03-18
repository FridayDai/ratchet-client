package com.xplusz.ratchet

import com.mashape.unirest.http.Unirest
import com.mashape.unirest.http.exceptions.UnirestException
import com.xplusz.ratchet.exceptions.ApiAccessException
import com.xplusz.ratchet.exceptions.ApiReturnException
import grails.converters.JSON

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import java.text.MessageFormat


class AssistService {
    /** dependency injection for grailsApplication */
    def grailsApplication
    def messageSource

    def addAssist(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiAccessException, ApiReturnException {

        def title = params?.title
        def desc = params?.desc
        def name = params?.name
        def email = request.session.email
        def clientId = request.session.clientId

        String addAssistUrl = grailsApplication.config.ratchetv2.server.url.addAssist
        def url = String.format(addAssistUrl, clientId)

        try {
            def resp = Unirest.post(url)
                    .field("title", title)
                    .field("desc", desc)
                    .field("name", name)
                    .field("email", email)
                    .field("clientId", clientId)
                    .asString()
            def result = JSON.parse(resp.body)

            if (resp.status == 201) {
                def map = [:]
                map.put("status", "ok")
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
