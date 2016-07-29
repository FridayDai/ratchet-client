package com.ratchethealth.client

import grails.converters.JSON

class StaffController extends BaseController {

    def beforeInterceptor = [action: this.&auth]
    def staffService

    def getStaff(Staff staff) {
        String token = request.session.token
        def clientId = request.session.clientId
        def resp = staffService.getStaffs(token, clientId, staff)
        render resp as JSON
    }

    def updateConfigs(){
        String token = request.session.token
        def configKey = params?.configKey
        def configValue = params?.configValue

        session.columnArrayConfig = configValue

        def resp = staffService.configs(token, configKey, configValue)
        render resp as JSON
    }
}
