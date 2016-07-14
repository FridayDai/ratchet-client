package com.ratchethealth.client

import grails.converters.JSON
import org.codehaus.groovy.grails.web.json.JSONObject

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

    def getConfigs() {
        def configKey = params?.configKey
        def columnArray = session.columnArrayConfig

        JSONObject obj = new JSONObject();
        obj.put(configKey, columnArray);

        render obj as JSON
    }
}
