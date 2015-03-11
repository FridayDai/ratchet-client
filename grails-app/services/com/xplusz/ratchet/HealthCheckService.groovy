package com.xplusz.ratchet

import com.mashape.unirest.http.Unirest
import com.mashape.unirest.http.exceptions.UnirestException
import com.xplusz.ratchet.exceptions.ApiResourceAccessException

class HealthCheckService {

    def grailsApplication

    def checkHealth() throws ApiResourceAccessException {
        def url = grailsApplication.config.ratchetv2.server.url.healthCheck

        try {
            def resp = Unirest.get(url)
                    .asString()
            return resp

        } catch (UnirestException e) {
            log.error(e.message)
            throw new ApiResourceAccessException(e.message)
        }
    }
}
