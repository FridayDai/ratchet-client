package com.ratchethealth.client

class AssistService extends RatchetAPIService {

    /** dependency injection for grailsApplication */
    def grailsApplication

    def addAssist(String token, staffId, clientId, assist) {

        def title = assist?.title
        def desc = assist?.desc
        def browser = assist?.browser
        def url = assist?.url
        def type = 'Client Staff'

        String addAssistUrl = grailsApplication.config.ratchetv2.server.url.addAssist
        def formattedUrl = String.format(addAssistUrl, clientId)

        log.info("Call backend service to add assist with user and client info, token: ${token}.")
        withPost(token, formattedUrl) { req ->
            def resp = req
                    .field("title", title)
                    .field("desc", desc)
                    .field("browser", browser)
                    .field("staffId", staffId)
                    .field("clientId", clientId)
                    .field("session", token)
                    .field("url", url)
                    .field("type", type)
                    .asString()

            if (resp.status == 201) {
                def map = [:]
                map.put("status", "ok")
                log.info("Add assist success, token: ${token}.")
                return map
            }
            else {
                handleError(resp)
            }
        }

    }
}
