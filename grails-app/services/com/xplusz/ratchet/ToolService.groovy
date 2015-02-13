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

            String getToolsByTreatmentUrl = grailsApplication.config.ratchetv2.server.tools.url.loadToolByTreatment
            def url = String.format(getToolsByTreatmentUrl, treatmentId)

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
