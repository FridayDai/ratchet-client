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


    def handleApiResourceAccessException(ApiResourceAccessException e) {
        flash.message = e.message
        render view: '/error/error503'
    }

    def handleApiAjaxReturnErrorException(ApiAjaxReturnErrorException e) {
        def status = e.statusId ? e.statusId : 500
        def message = e.message ? e.message : g.message(code: 'default.error.500.message')
        render status: status, text:  message
    }

    def handleApiAjaxAccessException(ApiAjaxAccessException e) {
        def message = e.message ? e.message : g.message(code: 'default.error.500.message')
        render status: '400', text:  message
    }

    def handleApiReturnErrorException(ApiReturnErrorException e) {
        flash.message = e.message
        render view: '/error/error400'
    }

    def handleException(Exception e) {
       log.error(e.message)
    }
}
