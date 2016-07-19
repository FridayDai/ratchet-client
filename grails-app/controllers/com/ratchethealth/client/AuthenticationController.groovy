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

    def login(LoginCommand login) {
        if (request.method == "GET") {
            render(view: '/login/login', model: [
                email: flash?.email,
                errorMsg: flash?.errorMsg,
                rateLimit: flash?.rateLimit
            ])
        } else if (request.method == "POST") {
            if(login.hasErrors()) {
                redirect(uri: "/login")
                return
            }

            def email = login?.email?.toLowerCase()
            def password = login?.password

            flash.email = email

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
                session.groupSize = result.groupSize
                session.isTesting = result.isTesting
                session.enableAlert = result.enableAlert
                if(result.configs) {
                    session.columnArrayConfig = result.configs?.columnArray
                } else {
                    session.columnArrayConfig = null;
                }
            }

            if (resp?.authenticated) {

                if (session.accountManagement == false && session.groupSize == 0) {
                    redirect(uri: '/profile/' + session.accountId)
                } else {
                    redirect(uri: '/')
                }
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

        flash.errorMsg = msg
        flash.rateLimit = time

        redirect(action: 'login')
    }
}
