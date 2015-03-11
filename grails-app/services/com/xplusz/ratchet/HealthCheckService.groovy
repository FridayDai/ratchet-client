package com.xplusz.ratchet

import com.mashape.unirest.http.Unirest

class HealthCheckService {

    def grailsApplication

    def checkHealth() {

        def url = grailsApplication.config.ratchetv2.server.url.healthCheck
        def resp = Unirest.get(url)
                .asString()
        return resp
    }
}
