package com.xplusz.ratchet

import com.mashape.unirest.http.Unirest
import grails.converters.JSON
import grails.transaction.Transactional

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Transactional
class AuthenticationService {

    def grailsApplication

    /**
     * Authenticate against backend
     *
     * @param request
     * @param response
     * @param params
     */

    def authenticate(HttpServletRequest request, HttpServletResponse response, params) {
        def username = params.username
        def password = params.password
        if (!(username && password)) {
            return false;
        }
        def url = grailsApplication.config.ratchetv2.server.login.url

        def resp = Unirest.post(url)
                .field("username", username)
                .field("password", password)
                .asString()
        def result = JSON.parse(resp.body)

        def data
        if (resp?.status == 200) {
            request.session.uid = result.sessionId
            request.session.identifier = UUID.randomUUID().toString()
            data = [
                    authenticated: true,
            ]
        } else {
            data = [
                    authenticated: false,
                    errorId      : result.error.errorId,
                    errorMessage : result.error.errorMessage
            ]

        }

        return data
    }

    /**
     * Logout user
     *
     * @param request
     * @param response
     */
    def logout(request, response) {
        def session = request.session
        def uid = session?.uid

        def url = grailsApplication.config.ratchetv2.server.logout.url

        def resp = Unirest.get(url)
                .queryString("sessionId", "${uid}")
                .asString()

        if (!uid || resp.status != 200) {
            log.warn("No user login in the session.")
            return false
        }
        log.info("Logout $uid")
        session.invalidate()
        return true
    }
}
