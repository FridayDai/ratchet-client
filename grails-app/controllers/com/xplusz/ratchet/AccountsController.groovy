package com.xplusz.ratchet

import grails.converters.JSON

class AccountsController extends BaseController {

    def beforeInterceptor = [action: this.&auth, except: ['confirmCode', 'confirmPassword']]

    def accountService

    def index() {
        render view: 'accounts'
    }

    def getAccounts() {
        def resp = accountService.getAccounts(request, response, params);
        render resp as JSON
    }

    def getSingleAccount() {
        def accountId = params?.id
        def accountInfo = accountService.getSingleAccount(request, response, accountId)
        render(view: '/accounts/singleAccount', model: [accountInfo: accountInfo])
    }

    def createAccount() {
        def resp = accountService.createAccount(request, response, params)
        def result = [resp: resp]
        render result as JSON
    }

    def inviteAccount() {
        Integer accountId = params.int("accountId")
        def resp = accountService.inviteAccount(request, response, accountId)
        def result = [resp: resp]
        render result as JSON
    }

    def updateAccount() {
        def resp = accountService.updateAccount(request, response, params)
        def result = [resp: resp]
        render result as JSON
    }

    def getProfile() {
        def accountId = params?.accountId
        def accountProfile = accountService.getSingleAccount(accountId)
        render(view: '/accounts/profile', model: [accountInfo: accountProfile])
    }

    def updatePassword() {
        def resp = accountService.updatePassword(request, response, params)
        def result = [resp: resp]
        render result as JSON
    }

    def confirmCode() {
        def code = params?.code
        def resp = accountService.confirmCode(request, response, code)
        if (resp) {
            if (resp.hasProfile == true) {
                redirect(uri: '/login')
            } else {
                render(view: "/accounts/activateAccount", model: [staff: resp, code: code])
            }
        } else {
//            flash.message = "Code is invalid."
            render view: '/error/error404'
        }

    }

    def confirmPassword() {
        def resp = accountService.activateStaff(request, response, params)
        if (resp == true) {
            redirect(uri: '/login')
        } else {
//            flash.message = "Staff is not exist."
            render view: '/error/error404'
        }
    }
}
