package com.ratchethealth.client

import grails.converters.JSON

class StaffController extends BaseController {

    def beforeInterceptor = [action: this.&auth]
    def staffService

    def getStaff() {
        def resp = staffService.getStaffs(request, response, params)
        render resp as JSON
    }
}
