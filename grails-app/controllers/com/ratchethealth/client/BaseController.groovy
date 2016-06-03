package com.ratchethealth.client

import com.ratchethealth.client.exceptions.ApiAccessException
import com.ratchethealth.client.exceptions.ApiIpBlockException
import com.ratchethealth.client.exceptions.ApiReturnException

/**
 * Base Controller.
 */
class BaseController {

    /**
     *  Verify Permissions. Quick check to see if the current user is logged in. If not, it will redirect to login.
     *
     * @return
     */
    protected auth() {
        if (!session.token) {
            redirect(uri: "/login")
            return false
        }
    }

    def handleApiIpBlockException(ApiIpBlockException e) {
        log.error("API IP block exception: ${e.message},stack trace: ${e.getStackTrace()}, token: ${session.token}.")
        def status = 506
        def message = g.message(code: 'default.error.506.message')
        if (request.isXhr()) {
            render status: status, text: message
        } else {
            flash.errorMsg = message
            redirect(uri: "/login")
        }
    }

    def handleApiAccessException(ApiAccessException e) {
        log.error("API Access exception: ${e.message},stack trace: ${e.getStackTrace()}, token: ${session.token}.")
        def status = 503
        def message = e.message ? e.message : g.message(code: 'default.error.503.message')
        if (request.isXhr()) {
            render status: status, text: message
        } else {
            render view: '/error/error503'
        }
    }

    def handleApiReturnException(ApiReturnException e) {
        log.error("API return exception: ${e.message},stack trace: ${e.getStackTrace()}, token: ${session.token}.")
        def status = e.statusId ? e.statusId : 500
        def message = e.message ? e.message : g.message(code: 'default.error.500.message')
        if (request.isXhr()) {
            render status: status, text: message
        } else if (e.statusId == 401) {
            render view: '/login/login'
        } else {
            render view: '/error/error500'
        }
    }

    def exceptionEmailService

    def handleException(Exception e) {
        log.error("Uncaught_Exception: ${e.message},stack trace: ${e.getStackTrace()}, token: ${session.token}.")

        def email = session.email
        def sw = new StringWriter()
        def pw = new PrintWriter(sw)
        e.printStackTrace(pw)

        exceptionEmailService.sendExceptionEmail(sw.toString(), email)

        def message = g.message(code: 'default.error.500.message')

        if (request.isXhr()) {
            render status: 500, text: message
        } else {
            render view: '/error/error500'
        }
    }
}
