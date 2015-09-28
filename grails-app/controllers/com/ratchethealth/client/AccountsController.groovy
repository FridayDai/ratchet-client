package com.ratchethealth.client

import grails.converters.JSON

class AccountsController extends BaseController {

    def beforeInterceptor = [action: this.&auth, except: ['confirmCode', 'confirmPassword', 'getForgotPassword', 'forgotPassword', 'resetPassword', 'confirmResetPassword']]

    static allowedMethods = [getAccounts: ['GET'], getSingleAccount: ['GET'], addAccount: ['POST'], updateAccount: ['POST']]

    def accountService
    def invitationService

    def getAccounts(AccountPagination accountPagination) {
        String token = session.token
        def clientId = session.clientId

        if (request.isXhr()) {
            def resp = accountService.getAccounts(token, clientId, accountPagination)
            render resp as JSON
        } else {
            accountPagination.start = RatchetConstants.DEFAULT_PAGE_OFFSET
            accountPagination.length = RatchetConstants.DEFAULT_PAGE_SIZE
            accountPagination.sortField = 'id'
            accountPagination.sortDir = 'desc'

            def accountList = accountService.getAccounts(token, clientId, accountPagination)
            render(view: 'accounts', model: [accountList: accountList, pagesize: accountPagination.length])
        }
    }

    def addAccount(Account account) {
        def resp = accountService.createAccount(session.token, session.clientId, account)
        def result = [resp: resp]
        render result as JSON
    }

    def getSingleAccount() {
        def accountId = params?.id
        def accountInfo = accountService.getSingleAccount(session.token, accountId)
        render(view: '/accounts/singleAccount', model: [accountInfo: accountInfo])
    }

    def updateAccount(Account account) {
        def resp = accountService.updateAccount(session.token, session.clientId, account)

        if (account.accountId == session.accountId) {
            session.firstName = resp.firstName
            session.lastName = resp.lastName
            session.accountManagement = resp.accountManagement
        }

        def result = [resp: true]
        render result as JSON
    }

    def inviteAccount() {
        Long accountId = params?.accountId as long
        def resp = invitationService.inviteAccount(session.token, accountId)
        def result = [resp: resp]
        render result as JSON
    }

    def confirmCode() {
        def code = params?.code
        def resp = accountService.confirmCode(session.token, code)
        if (resp.hasProfile == true) {
            redirect(uri: '/login')
        } else if (resp.error?.errorId == 412) {
            render view: '/error/invitationExpired'
        } else {
            render(view: "/accounts/activateAccount", model: [staff: resp, code: code])
        }

    }

    def confirmPassword() {
        def code = params?.code
        def hasProfile = params?.hasProfile
        def password = params?.password
        def confirmPassword = params?.confirmPassword
        def email = params?.email

        accountService.activateStaff(session.token, code, hasProfile, password, confirmPassword)

        redirect(uri: "/login?email=${email}")
    }

    def getForgotPassword() {
        render view: '/forgotPassword/forgotPassword'
    }

    def forgotPassword() {
        accountService.askForResetPassword(session.token, params.email, "client")
        render view: '/forgotPassword/resettingIntroduction', model: [email: params.email]
    }

    def resetPassword() {
        def code = params?.code
        def resp = accountService.validPasswordCode(session.token, code)

        if (resp == 200) {
            render view: '/forgotPassword/resetPassword', model: [code: code]
        } else if (resp.error?.errorId == 412) {
            render view: '/error/passwordLinkExpired'
        }
    }

    def confirmResetPassword() {
        def code = params?.code
        def newPassword = params?.newPassword
        def confirmPassword = params?.confirmPassword
        def resp = accountService.resetPassword(session.token, code, newPassword, confirmPassword)
        if (resp) {
            render view: '/login/login'
        }
    }

    def deactivateAccount() {
        Long accountId = params?.accountId as long
        def resp = accountService.deactivateAccount(session.token, accountId)
        def result = [resp: resp]
        render result as JSON
    }

    def activateAccount() {
        Long accountId = params?.accountId as long
        def resp = accountService.activateAccount(session.token, accountId)
        def result = [resp: resp]
        render result as JSON
    }

    def checkAccountEmail() {
        def data = accountService.checkEmail(session.token, params?.email)
        render data as JSON
    }

}
