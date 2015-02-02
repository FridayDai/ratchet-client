package com.xplusz.ratchet

import com.mashape.unirest.http.Unirest
import com.mashape.unirest.http.exceptions.UnirestException
import com.xplusz.ratchet.exceptions.ApiResourceAccessException
import grails.converters.JSON

import java.text.MessageFormat


class ToolService {

    /** dependency injection for grailsApplication */
    def grailsApplication

    def messageSource

    def getToolsByTreatment(treatmentId) throws ApiResourceAccessException {

        try {
            def url = MessageFormat.format(grailsApplication.config.ratchetv2.server.tools.loadToolByTreatment.url, treatmentId)
            def resp = Unirest.get(url)
                    .asString()
            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                return result
            }
        } catch (UnirestException e) {
            log.error(e.message)
            throw new ApiResourceAccessException(e.message)
        }
    }
}
