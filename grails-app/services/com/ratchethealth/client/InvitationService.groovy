package com.ratchethealth.client



class InvitationService extends RatchetAPIService {

    /** dependency injection for grailsApplication */
    def grailsApplication

    def invitePatient(String token, id) {

        String invitePatientUrl = grailsApplication.config.ratchetv2.server.url.invitePatient
        def url = String.format(invitePatientUrl, id)

        withGet(token, url) { req ->
            def resp = req.asString()

            if (resp.status == 200) {
                log.info("Invite patient success, token: ${token}")
                return true
            }
            else {
                handleError(resp)
            }
        }

    }

    def inviteAccount(String token, accountId) {

        String inviteAccountUrl = grailsApplication.config.ratchetv2.server.url.inviteStaff
        def url = String.format(inviteAccountUrl, accountId)
        log.info("Call backend service to invite account, token: ${token}.")

        withGet(token, url) { req ->
            def resp = req
                    .asString()

            if (resp.status == 200) {
                log.info("Invite account success, token: ${token}.")
                return true
            }
            else {
                handleError(resp)
            }
        }

    }

}
