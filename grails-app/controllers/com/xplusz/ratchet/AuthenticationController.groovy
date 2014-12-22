package com.xplusz.ratchet

import exceptions.AccountValidationException

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
            authenticationService.authenticate(request,response,params)
//            authenticate()
            redirect(uri: '/')
        }
    }

    /**
     * Handle logout.
     * @return
     */
    def logout() {
        if (!authenticationService.logout(request, response)) {
            log.warn("logout failed")
        }
        redirect(uri: '/login')
    }

    /**
     * handle AccountValidationException, when Exception happened, it should be back to login.
     * @param request
     * @param response
     * @param params
     * @return
     */

    def handleAccountValidationException(AccountValidationException e) {
        def msg = e.getMessage()
        render(view: '/login/login', model: [errorMsg: msg])

    }

}