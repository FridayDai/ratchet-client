package com.ratchethealth.client

import com.mashape.unirest.http.Unirest
import com.mashape.unirest.http.exceptions.UnirestException
import com.ratchethealth.client.exceptions.ApiAccessException
import com.ratchethealth.client.exceptions.ApiReturnException
import grails.converters.JSON

import javax.servlet.http.HttpServletRequest

class StaffService extends RatchetClientService {

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

            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                log.info("Get staffs success, token: ${token}")
                def items = result.items
                return [resp, items]
            }
            [resp, null]
        }
    }
}
