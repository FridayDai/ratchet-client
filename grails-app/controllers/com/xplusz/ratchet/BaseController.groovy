package com.xplusz.ratchet

import com.mashape.unirest.http.Unirest
import com.xplusz.ratchet.exceptions.ApiResourceAccessException
import com.xplusz.ratchet.exceptions.ApiAjaxAccessException

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
        render view: '/pages/error503'
    }

    def handleApiAjaxAccessException(ApiAjaxAccessException e) {
        render status: '403', model:  e.message
    }

    def handleException(Exception e) {
       log.error(e.message)
    }
}
