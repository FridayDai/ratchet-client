package com.xplusz.ratchet

class AccountsController {

    def accountService

    def getAllAccounts() {
        def accounts = accountService.loadAccounts();
        render view: 'accounts', model: [accounts: accounts]
    }
}
