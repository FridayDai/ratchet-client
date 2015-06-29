package com.ratchethealth.client

import grails.converters.JSON

class AccountsController extends BaseController {

    def beforeInterceptor = [action: this.&auth, except: ['confirmCode', 'confirmPassword', 'getForgotPassword', 'forgotPassword', 'resetPassword', 'confirmResetPassword']]

    static allowedMethods = [getAccounts: ['GET'], getSingleAccount: ['GET'], addAccount: ['POST'], updateAccount: ['POST']]

    def accountService

    def getAccounts() {
        if (request.isXhr()) {
            def resp = accountService.getAccounts(request, params);
            render resp as JSON
        } else {
            params.start = RatchetConstants.DEFAULT_PAGE_OFFSET
            params.length = RatchetConstants.DEFAULT_PAGE_SIZE
            def accountList = accountService.getAccounts(request, params)
            render(view: 'accounts', model: [accountList: accountList, pagesize: params.length])
        }
    }

    def addAccount() {
        def resp = accountService.createAccount(request, params)
        def result = [resp: resp]
        render result as JSON
    }

    def getSingleAccount() {
        def accountId = params?.id
        def accountInfo = accountService.getSingleAccount(request, accountId)
        render(view: '/accounts/singleAccount', model: [accountInfo: accountInfo])
    }

    def updateAccount() {
        def resp = accountService.updateAccount(request, params)
        def result = [resp: resp]
        render result as JSON
    }


    def inviteAccount() {
        Integer accountId = params.int("accountId")
        def resp = accountService.inviteAccount(request, accountId)
        def result = [resp: resp]
        render result as JSON
    }

//
//    def updatePassword() {
//        def resp = accountService.updatePassword(request, response, params)
//        def result = [resp: resp]
//        render result as JSON
//    }

    def confirmCode() {
        def code = params?.code
        def resp = accountService.confirmCode(request, code)
        if (resp) {
            if (resp.hasProfile == true) {
                redirect(uri: '/login')
            } else if (resp.error?.errorId == 412) {
                render view: '/error/invitationExpired'
            } else {
                render(view: "/accounts/activateAccount", model: [staff: resp, code: code])
            }
        } else {
            render view: '/error/error404'
        }

    }

    def confirmPassword() {
        def resp = accountService.activateStaff(request, params)
        if (resp == true) {
            redirect(uri: '/login')
        } else {
            render view: '/error/error404'
        }
    }

    def getForgotPassword() {
        render view: '/forgotPassword/forgotPassword'
    }

    def forgotPassword() {
        accountService.askForResetPassword(request, params.email, "client")
        render view: '/forgotPassword/resettingIntroduction', model: [email: params.email]
    }

    def resetPassword() {
        def code = params?.code
        def resp = accountService.validPasswordCode(request, code)

        if (resp == 200) {
            render view: '/forgotPassword/resetPassword', model: [code: code]
        } else if (resp.error?.errorId == 412) {
            render view: '/error/passwordLinkExpired'
        }
    }

    def confirmResetPassword() {
        def resp = accountService.resetPassword(request, params)
        if (resp) {
            render view: '/login/login'
        }
    }

    def deactivateAccount() {
        Integer accountId = params.int("accountId")
        def resp = accountService.deactivateAccount(request, accountId)
        def result = [resp: resp]
        render result as JSON
    }

    def activateAccount() {
        Integer accountId = params.int("accountId")
        def resp = accountService.activateAccount(request, accountId)
        def result = [resp: resp]
        render result as JSON
    }

    def checkAccountEmail() {
        def data = accountService.checkEmail(request, params)
        render data as JSON
    }

}
