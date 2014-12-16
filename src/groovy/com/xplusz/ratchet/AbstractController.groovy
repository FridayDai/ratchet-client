package com.xplusz.ratchet

import grails.converters.JSON

import javax.servlet.http.HttpServletResponse
/**
 * Created by sid on 12/16/14.
 */
class AbstractController {
    /**
     *  Verify Permissions.
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

    protected renderAuthForbiddenResponse(String msg) {
        response.status = HttpServletResponse.SC_FORBIDDEN
        Map data = [
                errorId: HttpServletResponse.SC_FORBIDDEN,
                errorMessage: msg
        ]
        JSON json = new JSON([response:null, error:data])
        json.render(response)
    }
}
