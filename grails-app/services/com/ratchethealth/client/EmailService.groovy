package com.ratchethealth.client

class EmailService extends RatchetAPIService {
    def grailsApplication

    def unsubscribeEmail(String token, code, patientId) {
        String unsubscribeUrl = grailsApplication.config.ratchetv2.server.url.email.unsubscribeEmail

        def url = String.format(unsubscribeUrl, patientId)

        log.info("Call backend service to unsubscribe patient's email, token: ${token}.")
        withPost(token, url) { req ->
            def resp = req
                    .field("subscribe", false)
                    .field("code", code)
                    .asString()

            if (resp.status == 200) {
                log.info("unsubscribe patient's email success, token: ${token}")
                true
            } else {
                handleError(resp)
            }
        }
    }
}
