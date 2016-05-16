package com.ratchethealth.client

class ExceptionEmailService extends RatchetAPIService {
    def grailsApplication

    def sendExceptionEmail(stackTrace, email) {

        def url = grailsApplication.config.ratchetv2.server.url.email
        log.info("call backend service to send Uncaught Exception Email")

        withPost(grailsApplication.config.ratchet.api.anonymous.token, url){ req->
            def resp = req
                    .field("stackTrace", stackTrace)
                    .field("email",email)
                    .field("clientType", grailsApplication.config.ratchetv2.server.clientType)
                    .asString()

            if(resp.status == 200){
                log.info("send Uncaught Exception Email success")
            }else{
                log.info("send Uncaught Exception Email fail")
            }
        }
    }
}
