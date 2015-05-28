package com.ratchethealth.client

import grails.converters.JSON

class AssistController extends BaseController {

    def beforeInterceptor = [action: this.&auth]

    def assistService

    def addAssist() {
        def resp = assistService.addAssist(request, params)
        render resp as JSON
    }
}
