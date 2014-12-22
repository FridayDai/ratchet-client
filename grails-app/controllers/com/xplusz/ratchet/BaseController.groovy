package com.xplusz.ratchet
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
        if (!session.uid) {
            redirect(uri: "/login")
            return false
        } else {
            return true
        }
    }
}