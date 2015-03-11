package com.xplusz.ratchet

import com.mashape.unirest.http.Unirest
import com.xplusz.ratchet.exceptions.ApiAjaxReturnErrorException
import com.xplusz.ratchet.exceptions.ApiResourceAccessException
import com.xplusz.ratchet.exceptions.ApiAjaxAccessException
import com.xplusz.ratchet.exceptions.ApiReturnErrorException

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
        model.maintenance = 'false'
    }

    def handleApiResourceAccessException(ApiResourceAccessException e) {
        log.error("API resource access exception: ${e.message}, token: ${session.token}.")
        flash.message = e.message
        render view: '/error/error404'
    }

    def handleApiAjaxReturnErrorException(ApiAjaxReturnErrorException e) {
        log.error("API ajax return error exception: ${e.message}, token: ${session.token}.")
        def status = e.statusId ? e.statusId : 500
        def message = e.message ? e.message : g.message(code: 'default.error.500.message')
        render status: status, text: message
    }

    def handleApiAjaxAccessException(ApiAjaxAccessException e) {
        log.error("API ajax access exception: ${e.message}, token: ${session.token}.")
        def message = e.message ? e.message : g.message(code: 'default.error.500.message')
        render status: '400', text: message
    }

    def handleApiReturnErrorException(ApiReturnErrorException e) {
        log.error("API return error exception: ${e.message}, token: ${session.token}.")
        flash.message = e.message
//        if (e.statusId == 401) {
//            render view: '/error/error404'
//        }
        if (e.statusId == 403) {
            render view: '/login/login'
        } else {
            render view: '/error/error404'
        }
    }

    def handleException(Exception e) {
        log.error("Exception: ${e.message}, token: ${session.token}.")
    }
}
