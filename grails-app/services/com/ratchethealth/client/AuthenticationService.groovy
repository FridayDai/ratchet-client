package com.ratchethealth.client

import com.ratchethealth.client.exceptions.AccountValidationException
import grails.converters.JSON


class AuthenticationService extends RatchetClientService {

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
                result = JSON.parse(resp.body)
            }

            if (resp.status == 200) {

                def data = [
                        authenticated: true,
                        result       : result
                ]
                log.info("Authenticate success, token: ${token}")
                return data
            }

            if (resp.status == 403) {
                def rateLimit = result?.error?.errorMessage ?: '3'
                Integer[] args = [rateLimit]
                def errorMessage = messageSource.getMessage("security.errors.login.rateLimit", args, Locale.default)
                throw new AccountValidationException(errorMessage, rateLimit)
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
                }
                else {
                    handleError(resp)
                }
            }
        }
    }
