package com.xplusz.ratchet

import com.mashape.unirest.http.Unirest
import com.mashape.unirest.http.exceptions.UnirestException
import com.xplusz.ratchet.exceptions.ApiAccessException
import com.xplusz.ratchet.exceptions.ApiReturnException
import grails.converters.JSON
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class AccountService {

    def grailsApplication

    def getAccounts(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiAccessException, ApiReturnException {
        def start = params?.start
        def length = params?.length
        def name = params?.name

        def url = grailsApplication.config.ratchetv2.server.url.staffs

        try {
            def resp = Unirest.get(url)
                    .queryString("max", length)
                    .queryString("offset", start)
                    .queryString("name", name)
                    .queryString("clientId", request.session.clientId)
                    .asString()

            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                def map = [:]
                map.put(start, start)
                map.put(length, length)
                map.put("recordsTotal", result.totalCount)
                map.put("recordsFiltered", result.totalCount)
                map.put("data", result.items)
                log.info("Get accounts success, token: ${request.session.token}.")
                return map
            } else {
                def message = result?.error?.errorMessage
                throw new ApiReturnException(resp.status, message)
            }
        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }


    }

    def getSingleAccount(HttpServletRequest request, HttpServletResponse response, accountId)
            throws ApiAccessException, ApiReturnException {

        String getSingleAccountUrl = grailsApplication.config.ratchetv2.server.url.getAccount

        def url = String.format(getSingleAccountUrl, accountId)

        try {
            def resp = Unirest.get(url)
                    .asString()
            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                log.info("Get single account success, token: ${request.session.token}.")
                return result
            } else {
                def message = result?.error?.errorMessage
                throw new ApiReturnException(resp.status, message)
            }
        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }
    }

    def createAccount(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiAccessException, ApiReturnException {
        def firstName = params?.firstName
        def lastName = params?.lastName
        def email = params?.email
        def type = params?.type
        def isAccountManagement = params?.isAccountManagement
        def isDoctor = params?.isDoctor

        def url = grailsApplication.config.ratchetv2.server.url.staffs

        try {
            def resp = Unirest.post(url)
                    .field("clientId", request.session.clientId)
                    .field("firstName", firstName)
                    .field("lastName", lastName)
                    .field("email", email)
                    .field("type", type)
                    .field("patientManagement", "true")
                    .field("accountManagement", isAccountManagement)
                    .field("doctor", isDoctor)
                    .asString()

            if (resp.status == 201) {
                log.info("Create account success, token: ${request.session.token}.")
                return JSON.parse(resp.body)
            } else {
                def result = JSON.parse(resp.body)
                def message = result?.error?.errorMessage
                throw new ApiReturnException(resp.status, message)
            }
        } catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }

    }

    def inviteAccount(HttpServletRequest request, HttpServletResponse response, Integer accountId)
            throws ApiAccessException, ApiReturnException {

        String inviteAccountUrl = grailsApplication.config.ratchetv2.server.url.inviteStaff
        def url = String.format(inviteAccountUrl, accountId)
        try {
            def resp = Unirest.get(url)
                    .asString()

            if (resp.status == 200) {
                log.info("Invite account success, token: ${request.session.token}.")
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

    def updateAccount(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiAccessException, ApiReturnException {

        def updateAccountUrl = grailsApplication.config.ratchetv2.server.url.getAccount
        Integer accountId = params.int("accountId")
        def url = String.format(updateAccountUrl, accountId)

        try {
            def resp = Unirest.post(url)
                    .field("clientId", request.session.clientId)
                    .field("email", params?.email)
                    .field("firstName", params?.firstName)
                    .field("lastName", params?.lastName)
                    .field("type", params?.type)
                    .field("doctor", params?.doctor)
                    .field("accountManagement", params?.accountManagement)
                    .asString()

            if (resp.status == 200) {
                log.info("Update account success, token: ${request.session.token}.")
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

    def updatePassword(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiAccessException, ApiReturnException {

        def url = grailsApplication.config.ratchetv2.server.url.updatePassword

        try {
            def resp = Unirest.post(url)
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

    def confirmCode(HttpServletRequest request, HttpServletResponse response, code)
            throws ApiAccessException {

        String confirmCodeUrl = grailsApplication.config.ratchetv2.server.url.confirmCode
        def url = String.format(confirmCodeUrl, code)

        try {
            def resp = Unirest.post(url)
                    .asString()

            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                log.info("Confirm code success, token: ${request.session.token}.")
                return result
            } else {
                return false
            }
        }
        catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }
    }

    def activateStaff(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiAccessException {

        def url = grailsApplication.config.ratchetv2.server.url.activeStaff

        try {
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

    def askForResetPassword(HttpServletRequest request, HttpServletResponse response, email, clientType)
            throws ApiAccessException {
        def url = grailsApplication.config.ratchetv2.server.url.password.reset

        try {
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

    def resetPassword(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiAccessException, ApiReturnException {
        def url = grailsApplication.config.ratchetv2.server.url.password.confirm

        try {
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

    def validPasswordCode(HttpServletRequest request, HttpServletResponse response, code)
            throws ApiAccessException, ApiReturnException {
        def url = grailsApplication.config.ratchetv2.server.url.password.restCheck

        try {
            def resp = Unirest.get(url)
                    .queryString("code", code)
                    .asString()

            if (resp.status == 200) {
                log.info("Valid password success, token: ${request.session.token}.")
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

    def deactivateAccount(HttpServletRequest request, HttpServletResponse response, accountId)
            throws ApiAccessException, ApiReturnException {

        String deactivateStaff = grailsApplication.config.ratchetv2.server.url.deactivateStaff

        def url = String.format(deactivateStaff, accountId)

        try {
            def resp = Unirest.get(url)
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

    def activateAccount(HttpServletRequest request, HttpServletResponse response, accountId)
            throws ApiAccessException, ApiReturnException {

        String activateStaff = grailsApplication.config.ratchetv2.server.url.activateStaff

        def url = String.format(activateStaff, accountId)

        try {
            def resp = Unirest.get(url)
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
}
