package com.xplusz.ratchet

import com.mashape.unirest.http.Unirest

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
}
