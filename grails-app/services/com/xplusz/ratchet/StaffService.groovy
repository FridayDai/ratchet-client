package com.xplusz.ratchet

import com.mashape.unirest.http.Unirest
import com.xplusz.ratchet.exceptions.AccountValidationException
import grails.converters.JSON
import grails.transaction.Transactional

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Transactional
class StaffService {

    /** dependency injection for grailsApplication */
    def grailsApplication

    def messageSource

    def getStaffs(HttpServletRequest request, HttpServletResponse response, params) {
        def max = params?.max
        def offset = params?.offset
        def type = params?.type

        def url = grailsApplication.config.ratchetv2.server.staffs.url
        def resp = Unirest.get(url)
                .queryString("max", max)
                .queryString("offset", offset)
                .queryString("clientId", request.session.clientId)
                .queryString("type", type)
                .asString()

        def result = JSON.parse(resp.body)

        if (resp.status == 200) {
            return result.items
        } else {
            return false
        }

    }
}
