package com.xplusz.ratchet

import com.mashape.unirest.http.Unirest
import com.xplusz.ratchet.exceptions.AccountValidationException
import grails.converters.JSON
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import java.text.MessageFormat

class AccountService {

    def grailsApplication

    def getAccounts(HttpServletRequest request, HttpServletResponse response, params) {
        def start = params?.start
        def length = params?.length
        def name = params?.name

        def url = grailsApplication.config.ratchetv2.server.url.staffs
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
            map.put("data", result.items)
            return map
        } else {
            return false
        }

    }

    def getSingleAccount(accountId) {

        String getSingleAccountUrl = grailsApplication.config.ratchetv2.server.url.getAccount

        def url =  String.format(getSingleAccountUrl, accountId)

        def resp = Unirest.get(url)
                .asString()
        def result = JSON.parse(resp.body)

        if (resp.status == 200) {
            return result
        } else {
            return false
        }
    }

    def createAccount(HttpServletRequest request, HttpServletResponse response, params) {
        def firstName = params?.firstName
        def lastName = params?.lastName
        def email = params?.email
        def type = params?.type
        def isPatientManagement = params?.isPatientManagement
        def isAccountManagement = params?.isAccountManagement
        def isDoctor = params?.isDoctor

        def url = grailsApplication.config.ratchetv2.server.url.staffs
        def resp = Unirest.post(url)
                .field("clientId", request.session.clientId)
                .field("firstName", firstName)
                .field("lastName", lastName)
                .field("email", email)
                .field("type", type)
                .field("patientManagement", isPatientManagement)
                .field("accountManagement", isAccountManagement)
                .field("doctor", isDoctor)
                .asString()

        if (resp.status == 201) {
            return true
        }
    }

    def inviteAccount(HttpServletRequest request, HttpServletResponse response, Integer accountId) {

        String inviteAccountUrl = grailsApplication.config.ratchetv2.server.url.inviteStaff
        def url = String.format(inviteAccountUrl, accountId)
        def resp = Unirest.get(url)
                .asString()

        if (resp.status == 200) {
            return true
        }

    }

    def updateAccount(HttpServletRequest request, HttpServletResponse response, params) {

        def updateAccountUrl = grailsApplication.config.ratchetv2.server.url.getAccount
        Integer accountId = params.int("accountId")
        def url = String.format(updateAccountUrl, accountId)


        def resp = Unirest.post(url)
                .field("clientId", request.session.clientId)
                .field("email", params?.email)
                .field("firstName", params?.firstName)
                .field("lastName", params?.lastName)
                .field("type", params?.type)
                .field("doctor", params?.doctor)
                .field("patientManagement", params?.patientManagement)
                .field("accountManagement", params?.accountManagement)
                .asString()

        if (resp.status == 200) {
            return true
        }
    }

    def updatePassword(HttpServletRequest request, HttpServletResponse response, params) {

        def url = grailsApplication.config.ratchetv2.server.url.updatePassword
        def resp = Unirest.post(url)
                .field("oldPassword", params?.oldPassword)
                .field("password", params?.password)
                .field("confirmPassword", params?.confirmPassword)
                .asString()

        if (resp.status == 200) {
            return true
        }
    }

    def confirmCode(HttpServletRequest request, HttpServletResponse response, code) {

        String confirmCodeUrl = grailsApplication.config.ratchetv2.server.url.confirmCode
        def url = String.format(confirmCodeUrl, code)
        def resp = Unirest.post(url)
                .asString()

        def result = JSON.parse(resp.body)

        if (resp.status == 200) {
            return result
        } else {
            return
        }

    }

    def activateStaff(HttpServletRequest request, HttpServletResponse response, params) {

        def url = grailsApplication.config.ratchetv2.server.url.activateStaff
        def resp = Unirest.post(url)
                .field("code", params?.code)
                .field("hasProfile", params?.hasProfile)
                .field("password", params?.password)
                .field("confirmPassword", params?.confirmPassword)
                .asString()

        if (resp.status == 200) {
            return true
        } else {
            return false
        }
    }
}
