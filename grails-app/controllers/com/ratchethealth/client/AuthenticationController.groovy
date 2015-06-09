package com.ratchethealth.client

import com.ratchethealth.client.exceptions.AccountValidationException

/**
 * Authentication controller for login/logout
 *
 */
class AuthenticationController extends BaseController {

    static allowedMethods = [login: ['POST', 'GET'], logout: ['GET']]

    def beforeInterceptor = [action: this.&auth, except: ['login']]

    def authenticationService

    def login() {
        if (request.method == "GET") {
            render(view: '/login/login')
        } else if (request.method == "POST") {
            params?.email = params?.email.toLowerCase();
            def resp = authenticationService.authenticate(request, params)

            if (resp?.authenticated) {
                redirect(uri: '/')
            }

        }
    }

    /**
     * Handle logout.
     * @return
     */
    def logout() {
        def resp = authenticationService.logout(request)
        if (resp) {
            redirect(uri: '/login')
        } else {
            log.warn("logout failed")
        }
    }

    /**
     * handle AccountValidationException, when Exception happened, it should be back to login.
     * @param request
     * @param response
     * @param params
     * @return
     */

    def handleAccountValidationException(AccountValidationException e) {
        def time

        if (e.limitSeconds) {
            time = e.limitSeconds
        } else {
            time = null
        }

        def msg = e.getMessage()
        render(view: '/login/login', model: [errorMsg: msg, rateLimit: time])

    }

}
