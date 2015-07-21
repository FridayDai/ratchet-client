package com.ratchethealth.client

import grails.converters.JSON

class AssistController extends BaseController {

    def beforeInterceptor = [action: this.&auth]

    def assistService

    def addAssist(Assist assist) {
        def resp = assistService.addAssist(session.token, session.accountId, session.clientId, assist)
        render resp as JSON
    }
}
