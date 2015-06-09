package com.ratchethealth.client

import com.mashape.unirest.http.Unirest
import com.mashape.unirest.http.exceptions.UnirestException
import com.ratchethealth.client.exceptions.ApiAccessException
import com.ratchethealth.client.exceptions.ApiReturnException
import grails.converters.JSON

import javax.servlet.http.HttpServletRequest


class InvitationService {

    /** dependency injection for grailsApplication */
    def grailsApplication

    def invitePatient(HttpServletRequest request, id)
            throws ApiAccessException, ApiReturnException {

        String invitePatientUrl = grailsApplication.config.ratchetv2.server.url.invitePatient
        def url = String.format(invitePatientUrl, id)

        try {
            log.info("Call backend service to invite patient, token: ${request.session.token}.")
            def resp = Unirest.get(url)
                    .header("X-Auth-Token", request.session.token)
                    .asString()
            if (resp.status == 200) {
                log.info("Invite patient success, token: ${request.session.token}")
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

}
