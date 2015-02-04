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
        def draw = params?.draw
        def length = params?.length

        def url = grailsApplication.config.ratchetv2.server.staffs.url
        def resp = Unirest.get(url)
                .queryString("max", length)
                .queryString("offset", draw - 1)
                .queryString("clientId", request.session.clientId)
                .asString()

        def result = JSON.parse(resp.body)

        if (resp.status == 200) {
            def map = [:]

            map.put("data", result.items)
            return map
        } else {
            return false
        }

    }

    def getSingleAccount(HttpServletRequest request, HttpServletResponse response, accountId) {

        def url = MessageFormat.format(grailsApplication.config.ratchetv2.server.getAccount.url, accountId)
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

        def url = grailsApplication.config.ratchetv2.server.staffs.url
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

    def inviteAccount(HttpServletRequest request, HttpServletResponse response, accountId) {
        def url = MessageFormat.format(grailsApplication.config.ratchetv2.server.inviteStaff.url, accountId)
        def resp = Unirest.get(url)
                .asString()

        if (resp.status == 200) {
            return true
        }

    }

    def updateAccount(HttpServletRequest request, HttpServletResponse response, params) {
        def url = MessageFormat.format(grailsApplication.config.ratchetv2.server.getAccount.url, params?.accountId)
        def resp = Unirest.post(url)
                .field("clientId",request.session.clientId)
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

}
