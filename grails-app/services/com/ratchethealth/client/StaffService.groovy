package com.ratchethealth.client

import org.codehaus.groovy.grails.web.json.JSONObject

class StaffService extends RatchetAPIService {

    def grailsApplication
    def messageSource

    def getStaffs(String token, clientId, staff) {
        def max = staff?.max
        def offset = staff?.offset
        def type = staff?.type
        def name = staff?.name
        def groupId = staff?.groupId

        log.info("Call backend service to get staffs with max, offset, clientId, type and name, token: ${token}.")
        def url = grailsApplication.config.ratchetv2.server.url.staffs
        withGet(token, url) { req ->
            def resp = req
                    .queryString("max", max)
                    .queryString("offset", offset)
                    .queryString("clientId", clientId)
                    .queryString("type", type)
                    .queryString("name", name)
                    .queryString("groupId", groupId)
                    .asString()

            if (resp.status == 200) {
                def result = parseRespBody(resp)
                log.info("Get staffs success, token: ${token}")
                def items = result.items
                return items
            }
            else {
                handleError(resp)
            }
        }
    }

    def configs(String token, configKey, configValue) {
        def url = grailsApplication.config.ratchetv2.server.url.configs

        JSONObject obj = new JSONObject();
        obj.put( configKey, configValue);

        withPost(token, url) { req ->
            def resp = req
                    .field("configKey", configKey)
                    .field("configValue", configValue)
                    .asString()

            if(resp.status == 200) {
                log.info("update user's configs success, token: ${token}")
                return obj
            } else {
                handleError(resp)
            }
        }
    }
}
