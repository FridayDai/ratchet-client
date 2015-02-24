package com.xplusz.ratchet

class ProfileController extends BaseController {

    def beforeInterceptor = [action: this.&auth, except: ['confirmCode', 'confirmPassword']]

    def accountService

    def getProfile() {
        def accountId = params?.accountId
        def accountProfile = accountService.getSingleAccount(accountId)
        render(view: '/accounts/profile', model: [accountInfo: accountProfile])
    }
}
