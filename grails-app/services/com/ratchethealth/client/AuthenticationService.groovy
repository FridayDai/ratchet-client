package com.ratchethealth.client

import com.ratchethealth.client.exceptions.AccountValidationException
import com.ratchethealth.client.exceptions.ApiIpBlockException
import grails.converters.JSON


class AuthenticationService extends RatchetAPIService {

    /** dependency injection for grailsApplication */
    def grailsApplication

    def messageSource

    /**
     * Authenticate against backend. when login, authenticate will be needed. It used username and password to call
     * ratchet-v2-server restAPI login.
     *
     * @param request
     * @param response
     * @param params
     *
     * @return the authenticated status and errorMessage which restAPI returned.
     */

    def authenticate(String token, email, password) {

        if (!(email && password)) {
            def errorMessage = messageSource.getMessage("security.errors.login.missParams", null, Locale.default)
            throw new AccountValidationException(errorMessage)
        }

        def url = grailsApplication.config.ratchetv2.server.url.login
        log.info("Call backend service to authenticate with email, password, clientPlatform and clientType, token: ${token}.")

        withPost(url) { req ->

            def resp = req
                    .field("email", email)
                    .field("password", password)
                    .field("clientPlatform", grailsApplication.config.ratchetv2.server.clientPlatform)
                    .field("clientType", grailsApplication.config.ratchetv2.server.clientType)
                    .asString()

            def result = null
            if (resp?.body) {
                try {
                    result = JSON.parse(resp.body)
                } catch (Exception e) {
                    log.error("JSON parse failed" + e)
                    throw new AccountValidationException('');
                }
            }

            if (resp.status == 200) {

                def data = [
                        authenticated: true,
                        result       : result
                ]
                log.info("Authenticate success, token: ${token}")
                return data
            }

            if (resp.status == 506) {
                throw new ApiIpBlockException()
            } else if (resp.status == 401 && result?.error?.errorID == 403) {
                def seconds = result?.error?.errorMessage

                def errorMessage = messageSource.getMessage("security.errors.login.rateLimit", null, Locale.default)

                if (seconds) {
                    seconds = seconds as int
                    throw new AccountValidationException(errorMessage, seconds)
                } else {
                    throw new AccountValidationException(errorMessage)
                }
            } else {
                def errorMessage = result?.error?.errorMessage ?: ''
                throw new AccountValidationException(errorMessage)
            }
        }
    }

    /**
     * Logout user, Here is two step. Step one is call ratchet-v2-server restAPI logout and check returned status .
     * Step two ,session in local needs to be invalidate.
     *
     * @param request
     * @param response
     */
    def logout(String token) {

        if (!token) {
            log.error("There is no token.")
            return false
        }

        String url = grailsApplication.config.ratchetv2.server.url.logout
        log.info("Call backend service to logout, token: ${token}.")

        withPost(token, url) { req ->
            def resp = req.asString()

            if (resp.status == 200) {
                log.info("Logout success, token: ${token}")
                return true
            } else {
                handleError(resp)
            }
        }
    }
}
