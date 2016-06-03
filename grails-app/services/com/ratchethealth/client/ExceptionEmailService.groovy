package com.ratchethealth.client

import com.mashape.unirest.http.Unirest

class ExceptionEmailService extends RatchetAPIService {
    def grailsApplication

    def sendExceptionEmail(stackTrace, email) {

        def url = grailsApplication.config.ratchetv2.server.url.stackTraceEmail
        log.info("call backend service to send Uncaught Exception Email")

        def token = Unirest.setDefaultHeader("X-Anonymous-Token", grailsApplication.config.ratchet.api.anonymous.token)

        withPost(token, url){ req->
            def resp = req
                    .field("stackTrace", stackTrace)
                    .field("email",email)
                    .field("clientType", grailsApplication.config.ratchetv2.server.clientType)
                    .asString()

            if(resp.status == 200){
                log.info("send Uncaught Exception Email success")
                return true
            }else{
                log.info("send Uncaught Exception Email fail")
                return false
            }
        }
    }
}
