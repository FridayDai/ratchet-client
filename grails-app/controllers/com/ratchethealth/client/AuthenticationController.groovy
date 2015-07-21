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

            def email = params?.email.toLowerCase()
            def password = params?.password
            def resp = authenticationService.authenticate(session.token, email, password)
            def result = resp?.result

            if (result) {
                session.token = result.token
                session.accountId = result.id
                session.clientId = result.clientId
                session.clientPortalName = result.clientPortalName
                session.clientName = result.clientName
                session.firstName = result.firstName
                session.lastName = result.lastName
                session.email = email
                session.patientManagement = result.patientManagement
                session.accountManagement = result.accountManagement
                session.isDoctor = result.doctor
            }

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
        def resp = authenticationService.logout(session.token)
        if (resp) {
            session.invalidate()
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
