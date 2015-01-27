package com.xplusz.ratchet

import com.mashape.unirest.http.Unirest
import grails.converters.JSON


class ToolService {

    /** dependency injection for grailsApplication */
    def grailsApplication

    def messageSource

    def getToolsByTreatment(treatmentId) {

//        def loadPageDataException = new loadPageDataException()
        def url = grailsApplication.config.ratchetv2.server.tools.loadToolByTreatment.url
        def resp = Unirest.get(url)
                .queryString("treatmentId", treatmentId)
                .asString()
        def result = JSON.parse(resp.body)

        if (resp.status == 200) {
            return result
        }
//        else {
//            throw loadPageDataException
//        }

    }
}
