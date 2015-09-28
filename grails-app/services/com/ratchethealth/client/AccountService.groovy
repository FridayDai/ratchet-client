package com.ratchethealth.client

import grails.converters.JSON

class AccountService extends RatchetAPIService {

    def grailsApplication

    def getAccounts(String token, clientId, AccountPagination accountPagination) {
        def start = accountPagination?.start
        def length = accountPagination?.length
        def name = accountPagination?.name
        def sortField = accountPagination?.sortField
        def sortDir = accountPagination?.sortDir

        def url = grailsApplication.config.ratchetv2.server.url.staffs
        log.info("Call backend service to get accounts with start, length, name and clientId, token: ${token}.")

        withGet(token, url) { req ->
            def resp = req
                    .queryString("max", length)
                    .queryString("offset", start)
                    .queryString("name", name)
                    .queryString("clientId", clientId)
                    .queryString("sorted", sortField)
                    .queryString("order", sortDir)
                    .asString()

            if (resp.status == 200) {
                def result = JSON.parse(resp.body)
                log.info("Get accounts success, token: ${token}.")

                [
                    'start': start,
                    'length': length,
                    'recordsTotal': result.totalCount,
                    'recordsFiltered': result.totalCount,
                    'data': result.items
                ]
            } else {
                handleError(resp)
            }
        }
    }

    def getSingleAccount(token, accountId) {

        String getSingleAccountUrl = grailsApplication.config.ratchetv2.server.url.getAccount
        def url = String.format(getSingleAccountUrl, accountId)
        log.info("Call backend service to get sinle account, token: ${token}.")

        withGet(token, url) { req ->
            def resp = req
                    .asString()

            if (resp.status == 200) {
                def result = JSON.parse(resp.body)
                log.info("Get single account success, token: ${token}.")
                return result
            } else {
                handleError(resp)
            }
        }

    }

    def createAccount(String token, clientId, Account account) {
        def firstName = account?.firstName
        def lastName = account?.lastName
        def email = account?.email
        def type = account?.type
        def accountManagement = account?.accountManagement
        def doctor = account?.doctor
        def groupId = account?.groupId

        def url = grailsApplication.config.ratchetv2.server.url.staffs
        log.info("Call backend service to add a new account with clientId and account personal info, token: ${token}.")

        withPost(token, url) { req ->
            def resp = req
                    .field("clientId", clientId)
                    .field("firstName", firstName)
                    .field("lastName", lastName)
                    .field("email", email)
                    .field("type", type)
                    .field("patientManagement", "true")
                    .field("accountManagement", accountManagement)
                    .field("doctor", doctor)
                    .field("groupIds", groupId)
                    .asString()

            if (resp.status == 201) {
                def result = JSON.parse(resp.body)
                log.info("Create account success, token: ${token}.")
                return result
            } else {
                handleError(resp)
            }
        }

    }

    def updateAccount(String token, clientId, Account account) {

        def firstName = account?.firstName
        def lastName = account?.lastName
        def email = account?.email
        def type = account?.type
        def accountManagement = account?.accountManagement
        def doctor = account?.doctor
        def groupId = account?.groupId

        def updateAccountUrl = grailsApplication.config.ratchetv2.server.url.getAccount
        def url = String.format(updateAccountUrl, account?.accountId)
        log.info("Call backend service to update account with clientId and account info, token: ${token}.")


        withPost(token, url) { req ->
            def resp = req
                    .field("clientId", clientId)
                    .field("email", email)
                    .field("firstName", firstName)
                    .field("lastName", lastName)
                    .field("type", type)
                    .field("doctor", doctor)
                    .field("accountManagement", accountManagement)
                    .field("groupIds", groupId)
                    .asString()

            if (resp.status == 200) {
                def result = JSON.parse(resp.body)
                log.info("Update account success, token: ${token}.")
                return result
            } else {
                handleError(resp)
            }
        }
    }

    def updatePassword(String token, oldPassword, password, confirmPassword) {

        def url = grailsApplication.config.ratchetv2.server.url.updatePassword
        log.info("Call backend service to update password with old and new password, token: ${token}.")

        withPost(token, url) { req ->
            def resp = req
                    .field("oldPassword", oldPassword)
                    .field("password", password)
                    .field("confirmPassword", confirmPassword)
                    .asString()

            if (resp.status == 200) {
                log.info("Update password success, token: ${token}.")
                return resp.status
            }
            if (resp.status == 400) {
                log.info("Update password fail, token: ${token}.")
                return resp.status
            } else {
                handleError(resp)
            }
        }
    }

    def activateStaff(String token, code, hasProfile, password, confirmPassword) {

        def url = grailsApplication.config.ratchetv2.server.url.activeStaff
        log.info("Call backend service to get accounts with code and password, token: ${token}.")

        withPost(url) { req ->
            def resp = req
                    .field("code", code)
                    .field("hasProfile", hasProfile)
                    .field("password", password)
                    .field("confirmPassword", confirmPassword)
                    .asString()

            if (resp.status == 200) {
                log.info("Active staff success, token: ${token}.")
                return true
            } else {
                handleError(resp)
            }
        }

    }

    def deactivateAccount(String token, accountId) {

        String deactivateStaff = grailsApplication.config.ratchetv2.server.url.deactivateStaff

        def url = String.format(deactivateStaff, accountId)
        log.info("Call backend service to deactivate account, token: ${token}.")

        withGet(token, url) { req ->
            def resp = req
                    .asString()

            if (resp.status == 200) {
                log.info("Deactivate password success, token: ${token}.")
                return true
            } else {
                handleError(resp)
            }
        }
    }

    def activateAccount(String token, accountId) {

        String activateStaff = grailsApplication.config.ratchetv2.server.url.activateStaff

        def url = String.format(activateStaff, accountId)

        log.info("Call backend service to activate account, token: ${token}.")

        withGet(token, url) { req ->
            def resp = req
                    .asString()

            if (resp.status == 200) {
                log.info("Activate password success, token: ${token}.")
                return true
            } else {
                handleError(resp)
            }
        }

    }


    def confirmCode(String token, code) {

        String confirmCodeUrl = grailsApplication.config.ratchetv2.server.url.confirmCode
        def url = String.format(confirmCodeUrl, code)
        log.info("Call backend service to confirm code, token: ${token}.")

        withPost(url) { req ->
            def resp = req
                    .asString()

            if (resp.status == 200) {
                log.info("Confirm code success, token: ${token}.")
                return JSON.parse(resp.body)
            }
            if (resp.status == 412) {
                log.info("Invitation link is expired,token:${token}.")
                return JSON.parse(resp.body)
            } else {
                handleError(resp)
            }
        }

    }

    def askForResetPassword(String token, email, clientType) {
        def url = grailsApplication.config.ratchetv2.server.url.password.reset

        log.info("Call backend service to ask for reset password with email and client type, token: ${token}.")

        withPost(url) { req ->
            def resp = req
                    .field("email", email)
                    .field("clientType", clientType)
                    .asString()

            log.info("Ask for reset password success, token: ${token}.")
            return resp
        }

    }

    def resetPassword(String token, code, newPassword, confirmPassword) {
        def url = grailsApplication.config.ratchetv2.server.url.password.confirm

        log.info("Call backend service to reset password with code and password, token: ${token}.")

        withPost(url) { req ->
            def resp = req
                    .field("code", code)
                    .field("password", newPassword)
                    .field("confirmPassword", confirmPassword)
                    .asString()

            if (resp.status == 200) {
                log.info("Reset password success, token: ${token}.")
                return true
            } else {
                handleError(resp)
            }
        }
    }

    def validPasswordCode(token, code) {
        def url = grailsApplication.config.ratchetv2.server.url.password.restCheck
        log.info("Call backend service to valid password code, token: ${token}.")

        withGet(url) { req ->
            def resp = req
                    .queryString("code", code)
                    .asString()

            if (resp.status == 200) {
                log.info("Valid password code success, token: ${token}.")
                return resp.status
            } else if (resp.status == 412) {
                def result = JSON.parse(resp.body)
                log.info("Reset password link is expired,token:${token}.")
                return result
            } else {
                handleError(resp)
            }
        }

    }


    def checkEmail(token, email) {

        def result
        def url = grailsApplication.config.ratchetv2.server.url.checkAccountEmail
        log.info("Call backend service to check account email, token: ${token}.")

        withPost(token, url) { req ->
            def resp = req
                    .field("email", email)
                    .asString()

            if (resp.status == 200) {
                log.info("this account email already exist, token: ${token}")
                result = [check: "true"]
                return result
            } else if (resp.status == 404) {
                log.info("this account email doesn't exist, token: ${token}")
                result = [check: "false"]
                return result
            } else {
                handleError(resp)
            }
        }

    }
}
