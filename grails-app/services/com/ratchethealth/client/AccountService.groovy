package com.ratchethealth.client

import com.mashape.unirest.http.Unirest
import com.mashape.unirest.http.exceptions.UnirestException
import com.ratchethealth.client.exceptions.ApiAccessException
import com.ratchethealth.client.exceptions.ApiReturnException
import grails.converters.JSON
import javax.servlet.http.HttpServletRequest

class AccountService extends RatchetClientService {

    def grailsApplication

    def getAccounts(String token, clientId, AccountPagination accountPagination) {
        def start = accountPagination?.start
        def length = accountPagination?.length
        def name = accountPagination?.name
        def sort = accountPagination?.sort
        def order = accountPagination?.order

        def url = grailsApplication.config.ratchetv2.server.url.staffs
        log.info("Call backend service to get accounts with start, length, name and clientId, token: ${token}.")

        withGet(token, url) { req ->
            def resp = req
                    .queryString("max", length)
                    .queryString("offset", start)
                    .queryString("name", name)
                    .queryString("clientId", clientId)
                    .queryString("sorted", sort)
                    .queryString("order", order)
                    .asString()

            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                def map = [:]
                map.put(start, start)
                map.put(length, length)
                map.put("recordsTotal", result.totalCount)
                map.put("recordsFiltered", result.totalCount)
                map.put("data", result.items)
                log.info("Get accounts success, token: ${token}.")
                return [resp, map]
            }

            [resp, null]

        }

    }

    def getSingleAccount(token, accountId) {

        String getSingleAccountUrl = grailsApplication.config.ratchetv2.server.url.getAccount
        def url = String.format(getSingleAccountUrl, accountId)
        log.info("Call backend service to get sinle account, token: ${token}.")

        withGet(token, url) { req ->
            def resp = req
                    .asString()

            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                log.info("Get single account success, token: ${token}.")
                return [resp, result]
            }

            [resp, null]
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

            def result = JSON.parse(resp.body)

            if (resp.status == 201) {
                log.info("Create account success, token: ${token}.")
                return [resp, result]
            }

            [resp, null]
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
                return [resp, true]
            }

            [resp, null]
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
        Integer accountId = account.accountId.toInteger()
        def url = String.format(updateAccountUrl, accountId)
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

            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                log.info("Update account success, token: ${token}.")

                return [resp, result]
            }

            [resp, null]
        }
    }

    def updatePassword(HttpServletRequest request, params)
            throws ApiAccessException, ApiReturnException {

        def url = grailsApplication.config.ratchetv2.server.url.updatePassword

        try {
            log.info("Call backend service to update password with old and new password, token: ${request.session.token}.")
            def resp = Unirest.post(url)
                    .header("X-Auth-Token", request.session.token)
                    .field("oldPassword", params?.oldPassword)
                    .field("password", params?.password)
                    .field("confirmPassword", params?.confirmPassword)
                    .asString()

            if (resp.status == 200) {
                log.info("Update password success, token: ${request.session.token}.")
                return true
            } else {
                def result = JSON.parse(resp.body)
                def message = result?.error?.errorMessage
                throw new ApiReturnException(resp.status, message)
            }
        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }
    }

    def confirmCode(HttpServletRequest request, code)
            throws ApiAccessException {

        String confirmCodeUrl = grailsApplication.config.ratchetv2.server.url.confirmCode
        def url = String.format(confirmCodeUrl, code)

        try {
            log.info("Call backend service to confirm code, token: ${request.session.token}.")
            def resp = Unirest.post(url)
                    .asString()

            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                log.info("Confirm code success, token: ${request.session.token}.")
                return result
            } else if (resp.status == 412) {
                log.info("Invitation link is expired,token:${request.session.token}.")
                return result
            } else {
                return false
            }
        }
        catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }
    }

    def activateStaff(HttpServletRequest request, params)
            throws ApiAccessException {

        def url = grailsApplication.config.ratchetv2.server.url.activeStaff

        try {
            log.info("Call backend service to get accounts with code and password, token: ${request.session.token}.")
            def resp = Unirest.post(url)
                    .field("code", params?.code)
                    .field("hasProfile", params?.hasProfile)
                    .field("password", params?.password)
                    .field("confirmPassword", params?.confirmPassword)
                    .asString()

            if (resp.status == 200) {
                log.info("Active staff success, token: ${request.session.token}.")
                return true
            } else {
                return false
            }
        }
        catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }

    }

    def askForResetPassword(HttpServletRequest request, email, clientType)
            throws ApiAccessException {
        def url = grailsApplication.config.ratchetv2.server.url.password.reset

        try {
            log.info("Call backend service to ask for reset password with email and client type, token: ${request.session.token}.")
            def resp = Unirest.post(url)
                    .field("email", email)
                    .field("clientType", clientType)
                    .asString()

            log.info("Ask for reset password success, token: ${request.session.token}.")
            return resp

        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }


    }

    def resetPassword(HttpServletRequest request, params)
            throws ApiAccessException, ApiReturnException {
        def url = grailsApplication.config.ratchetv2.server.url.password.confirm

        try {
            log.info("Call backend service to reset password with code and password, token: ${request.session.token}.")
            def resp = Unirest.post(url)
                    .field("code", params?.code)
                    .field("password", params?.newPassword)
                    .field("confirmPassword", params?.confirmPassword)
                    .asString()

            if (resp.status == 200) {
                log.info("Reset password success, token: ${request.session.token}.")
                return true
            } else {
                def result = JSON.parse(resp.body)
                def message = result?.error?.errorMessage
                throw new ApiReturnException(resp.status, message)
            }

        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }
    }

    def validPasswordCode(HttpServletRequest request, code)
            throws ApiAccessException, ApiReturnException {
        def url = grailsApplication.config.ratchetv2.server.url.password.restCheck

        try {
            log.info("Call backend service to valid password code, token: ${request.session.token}.")
            def resp = Unirest.get(url)
                    .queryString("code", code)
                    .asString()

            if (resp.status == 200) {
                log.info("Valid password code success, token: ${request.session.token}.")
                return resp.status
            } else if (resp.status == 412) {
                def result = JSON.parse(resp.body)
                log.info("Reset password link is expired,token:${request.session.token}.")
                return result
            } else {
                def result = JSON.parse(resp.body)
                def message = result?.error?.errorMessage
                throw new ApiReturnException(resp.status, message)
            }

        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }
    }

    def deactivateAccount(HttpServletRequest request, accountId)
            throws ApiAccessException, ApiReturnException {

        String deactivateStaff = grailsApplication.config.ratchetv2.server.url.deactivateStaff

        def url = String.format(deactivateStaff, accountId)

        try {
            log.info("Call backend service to deactivate account, token: ${request.session.token}.")
            def resp = Unirest.get(url)
                    .header("X-Auth-Token", request.session.token)
                    .asString()

            if (resp.status == 200) {
                log.info("Deactivate password success, token: ${request.session.token}.")
                return true
            } else {
                def result = JSON.parse(resp.body)
                def message = result?.error?.errorMessage
                throw new ApiReturnException(resp.status, message)
            }
        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }
    }

    def activateAccount(HttpServletRequest request, accountId)
            throws ApiAccessException, ApiReturnException {

        String activateStaff = grailsApplication.config.ratchetv2.server.url.activateStaff

        def url = String.format(activateStaff, accountId)

        try {
            log.info("Call backend service to activate account, token: ${request.session.token}.")
            def resp = Unirest.get(url)
                    .header("X-Auth-Token", request.session.token)
                    .asString()

            if (resp.status == 200) {
                log.info("Activate password success, token: ${request.session.token}.")
                return true
            } else {
                def result = JSON.parse(resp.body)
                def message = result?.error?.errorMessage
                throw new ApiReturnException(resp.status, message)
            }
        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }
    }

    def checkEmail(HttpServletRequest request, params)
            throws ApiAccessException, ApiReturnException {

        def url = grailsApplication.config.ratchetv2.server.url.checkAccountEmail

        try {
            log.info("Call backend service to check account email, token: ${request.session.token}.")
            def resp = Unirest.post(url)
                    .header("X-Auth-Token", request.session.token)
//                    .field("clientId", request.session.clientId)
                    .field("email", params?.email)
                    .asString()

            if (resp.status == 200) {
                log.info("this account email already exist, token: ${request.session.token}")
                return [check: "true"]
            } else if (resp.status == 404) {
                log.info("this account email doesn't exist, token: ${request.session.token}")
                return [check: "false"]
            } else {
                def result = JSON.parse(resp.body)
                def message = result?.error?.errorMessage
                throw new ApiReturnException(resp.status, message)
            }
        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }
    }
}
