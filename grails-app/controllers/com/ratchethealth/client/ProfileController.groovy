package com.ratchethealth.client

import grails.converters.JSON

class ProfileController extends BaseController {

    def beforeInterceptor = [action: this.&auth]

    def accountService

    static allowedMethods = [getProfile: ['GET'], updatePassword: ['POST']]

    def getProfile() {
        def accountId = params?.accountId
        def accountProfile = accountService.getSingleAccount(session.token, accountId)
        render(view: '/accounts/profile', model: [accountInfo: accountProfile])
    }

    def updatePassword() {
        def resp = accountService.updatePassword(request, params)
        def result = [resp: resp]
        render result as JSON
    }
}
