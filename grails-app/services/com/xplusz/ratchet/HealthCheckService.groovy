package com.xplusz.ratchet

import com.mashape.unirest.http.Unirest

class HealthCheckService {

    def grailsApplication

    def checkHealth() {

        URL baseUrl = new URL(grailsApplication.config.ratchetv2.server.url.base)
        def url = baseUrl.toString() - baseUrl.path + grailsApplication.config.ratchetv2.server.url.healthCheck
        def resp = Unirest.get(url)
                .asString()
        return resp
    }
}
