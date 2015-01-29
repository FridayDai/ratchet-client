package com.xplusz.ratchet

import com.mashape.unirest.http.Unirest
import exceptions.AccountValidationException
import grails.converters.JSON
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class AccountService {

    def grailsApplication

    def getAccounts(HttpServletRequest request, HttpServletResponse response, params) {
        def draw = params?.draw
        def length = params?.length

        def url = grailsApplication.config.ratchetv2.server.staffs.url
        def resp = Unirest.get(url)
                .queryString("max", length)
                .queryString("offset", draw-1)
                .queryString("clientId", request.session.clientId)
                .asString()

        def result = JSON.parse(resp.body)

        if (resp.status == 200) {
            def map = [:]

            map.put("data", result.items)
            return map
        }

        if (resp.status == 400) {
            return false
        }

        if (resp.status == 403) {
            def rateLimit = result?.error?.errorMessage
            Integer[] args = [rateLimit]
            def errorMessage = messageSource.getMessage("security.errors.login.rateLimit", args, Locale.default)
            throw new AccountValidationException(errorMessage, rateLimit)


        } else {
            def errorMessage = result?.error?.errorMessage
            throw new AccountValidationException(errorMessage)

        }
    }

    def getSingleAccount(HttpServletRequest request, HttpServletResponse response, accountId) {

        def url = grailsApplication.config.ratchetv2.server.staffs.url + accountId
        def resp = Unirest.get(url)
                .asString()
        def result = JSON.parse(resp.body)

        if (resp.status == 200) {
            return result
        }
    }

    def createAccount(HttpServletRequest request, HttpServletResponse response, params) {
        def clientId = params?.clientId
        def firstName = params?.firstName
        def lastName = params?.lastName
        def email = params?.email
        def type = params?.type
        def isPatientManagement = params?.isPatientManagement
        def isAccountManagement = params?.isAccountManagement
        def isDoctor = params?.isDoctor

        def url = grailsApplication.config.ratchetv2.server.staffs.url
        def resp = Unirest.post(url)
                    .field("clientId", clientId)
                    .field("firstName", firstName)
                    .field("lastName", lastName)
                    .field("email", email)
                    .field("type", type)
                    .field("patientManagement", isPatientManagement)
                    .field("accountManagement", isAccountManagement)
                    .field("doctor", isDoctor)
                    .asString()

        if(resp.status == 201) {
            return true
        }
    }

}
