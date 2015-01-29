package com.xplusz.ratchet

import grails.converters.JSON

class AccountsController {

    def accountService

    def index() {
        render view: 'accounts'
    }

    def getAllAccounts() {
        def data = accountService.loadAccounts(params);
        render data as JSON
    }

    def getAccount() {
        render view: 'singleAccount'
    }
}
