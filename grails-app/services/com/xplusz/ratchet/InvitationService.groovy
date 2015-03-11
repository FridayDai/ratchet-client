package com.xplusz.ratchet

import com.mashape.unirest.http.Unirest
import com.mashape.unirest.http.exceptions.UnirestException
import com.xplusz.ratchet.exceptions.ApiAjaxAccessException
import com.xplusz.ratchet.exceptions.ApiAjaxReturnErrorException
import grails.converters.JSON

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


class InvitationService {

    /** dependency injection for grailsApplication */
    def grailsApplication

    def invitePatient(HttpServletRequest request, HttpServletResponse response, id)
            throws ApiAjaxAccessException, ApiAjaxReturnErrorException {

        String invitePatientUrl = grailsApplication.config.ratchetv2.server.url.invitePatient
        def url = String.format(invitePatientUrl, id)

        try {
            def resp = Unirest.get(url)
                    .asString()
            if (resp.status == 200) {
                log.info("Invite patient success, token: ${request.session.token}")
                return true
            } else {
                def result = JSON.parse(resp.body)
                def message = result?.error?.errorMessage
                throw new ApiAjaxReturnErrorException(message, resp.status)
            }

        } catch (UnirestException e) {
            throw new ApiAjaxAccessException(e.message)
        }
    }

}
