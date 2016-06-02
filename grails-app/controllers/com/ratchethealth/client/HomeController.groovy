package com.ratchethealth.client

import grails.converters.JSON

class HomeController extends BaseController {

    def alertService

    def beforeInterceptor = [action: this.&auth, except: ['termsOfService', 'privacyPolicy']]
    def index() {
        render view: '/home/home'
    }

    def termsOfService() {
        render view: '/termsOfService/termsOfService'
    }

    def privacyPolicy() {
        render view: '/privacyPolicy/privacyPolicy'
    }

    def closeAnnouncement() {
        session.announcementLastUpdated = params.announcementLastUpdated

        render status: 200
    }

    def getAlertNotification(AlertFilterFields filterFields) {
        def token = session?.token
        def clientId = session?.clientId
        def staffId = session?.accountId

        def result = alertService.getAlert(token, clientId, staffId, filterFields)

        render result as JSON
    }
}
