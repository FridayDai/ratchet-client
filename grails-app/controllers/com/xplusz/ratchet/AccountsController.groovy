package com.xplusz.ratchet

import grails.converters.JSON

class AccountsController {

    def accountService

    def index() {
        render view: 'accounts'
    }

    def getAccounts() {
        def resp = accountService.getAccounts(request, response, params);
        render resp as JSON
    }

    def getSingleAccount() {
        def accountId = params.id
        def accountInfo = accountService.getSingleAccount(request, response, accountId)
        render (view: '/accounts/singleAccount', model: [accountInfo: accountInfo])
    }

    def createAccount() {
        def resp = accountService.createAccount(request, response, params)
        render resp as JSON
    }

}
