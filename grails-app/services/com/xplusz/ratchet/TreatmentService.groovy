package com.xplusz.ratchet

import com.mashape.unirest.http.Unirest
import exceptions.AccountValidationException
import grails.converters.JSON
import grails.transaction.Transactional

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Transactional
class TreatmentService {

    /** dependency injection for grailsApplication */
    def grailsApplication

    def messageSource

    def getTreatments (HttpServletRequest request, HttpServletResponse response, params) {
        def max = params?.max
        def offset = params?.offset

        def url = grailsApplication.config.ratchetv2.server.clients.url+""+request.session.clientId+"/treatments/"
        def resp = Unirest.get(url)
                .queryString("max", max)
                .queryString("offset", offset)
                .asString()

        def result = JSON.parse(resp.body)

        if (resp.status == 200) {
            return result.items
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

class TreatmentService {

    def grailsApplication

    def assignTreatmentToPatient(HttpServletRequest request, HttpServletResponse response, params) {
        def url = grailsApplication.config.ratchetv2.server.singlePatient.url + '/' + params.patientId + '/records'
        def resp = Unirest.post(url)
                .field("patientId",params.patientId)
                .field("clientId",params.clientId)
                .field("firstName",params.firstName)
                .field("lastName",params.lastName)
                .field("phoneNumber",params.phoneNum)
                .field("email",params.email)
                .field("treatmentId",3)
                .field("staffIds","20,18")
                .asString()
        def result = JSON.parse(resp.body)

        if (resp.status == 200) {
            return result
        }
    }
}
