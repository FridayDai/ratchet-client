package com.ratchethealth.client

import com.mashape.unirest.http.Unirest
import com.ratchethealth.client.exceptions.ApiAccessException
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
        } else {
            Unirest.setDefaultHeader("X-Auth-Token", session.token)
            return true
        }
    }

    static afterInterceptor = { model ->
        //TO-DO: add logic here to determin maintenance mode

        def announcement = [:]
        announcement.id = 1
        announcement.announcement = "The system will be down for maintenance on Wed, Jan 21 2016-15:00 PST. Sorry for the inconvenience!"
        announcement.status = "not_active"
        announcement.background = "red"
        announcement.timeCreated = "12:00"

        model.announcement = announcement
    }

    def handleApiAccessException(ApiAccessException e) {
        log.error("API Access exception: ${e.message},stack trace: ${e.getStackTrace()}, token: ${session.token}.")
        def status = 500
        def message = e.message ? e.message : g.message(code: 'default.error.500.message')
        if (request.isXhr()) {
            render status: status, text: message
        } else {
            render view: '/error/error404'
        }
    }

    def handleApiReturnException(ApiReturnException e) {
        log.error("API return exception: ${e.message},stack trace: ${e.getStackTrace()}, token: ${session.token}.")
        def status = e.statusId ? e.statusId : 500
        def message = e.message ? e.message : g.message(code: 'default.error.500.message')
        if (request.isXhr()) {
            render status: status, text: message
        } else if (e.statusId == 403) {
            render view: '/login/login'
        } else {
            render view: '/error/error404'
        }
    }

    def handleException(Exception e) {
        log.error("Exception: ${e.message},stack trace: ${e.getStackTrace()}, token: ${session.token}.")
    }
}
