package com.ratchethealth.client

import com.mashape.unirest.request.HttpRequestWithBody
import com.mashape.unirest.request.body.MultipartBody
import com.ratchethealth.client.exceptions.AccountValidationException
import com.ratchethealth.client.exceptions.ApiReturnException
import grails.test.mixin.TestFor
import groovy.json.JsonBuilder
import org.codehaus.groovy.grails.web.util.WebUtils
import spock.lang.Specification

@TestFor(AuthenticationService)
class AuthenticationServiceSpec extends Specification {
    def setupSpec() {
        WebUtils.metaClass.'static'.retrieveGrailsWebRequest = { ->
            return null
        }
    }

    def "test authenticate with successful result"() {
        given:
        def jBuilder = new JsonBuilder()
        jBuilder {
            token 'new token'
        }

        MultipartBody.metaClass.asString = { ->
            return [
                    status: 200,
                    body  : jBuilder.toString()
            ]
        }

        when:
        def result = service.authenticate('token', 'email', 'password')

        then:
        result.result.token == 'new token'
        result.authenticated == true
    }

    def "test authenticate with 403 result"() {
        given:
        service.messageSource = [getMessage: { key, args, locale -> return ("message") }]

        def jBuilder = new JsonBuilder()
        jBuilder {
            error {
                errorMessage 20
                errorID 403
            }
        }

        MultipartBody.metaClass.asString = { ->
            return [
                    status: 401,
                    body  : jBuilder.toString()
            ]
        }

        when:
        service.authenticate('token', 'email', 'password')

        then:
        AccountValidationException e = thrown()
        e.getMessage() == 'message'
        e.limitSeconds == 20
    }

    def "test authenticate with 401 result"() {

        given:
        def jBuilder = new JsonBuilder()
        jBuilder {
            error {
                errorMessage "body"
            }
        }
        MultipartBody.metaClass.asString = { ->
            return [
                    status: 401,
                    body  : jBuilder.toString()
            ]
        }

        when:
        service.authenticate('token', 'email', 'password')

        then:
        AccountValidationException e = thrown()
        e.getMessage() == 'body'
    }

    def "test logout without token"() {
        when:
        def result = service.logout()

        then:
        result == false
    }

    def "test logout with successful result"() {
        given:
        HttpRequestWithBody.metaClass.asString = { ->
            return [
                    status: 200,
                    body  : ''
            ]
        }

        when:
        def result = service.logout('token')

        then:
        result == true
    }

    def "test logout without successful result"() {
        given:
        HttpRequestWithBody.metaClass.asString = { ->
            return [
                    status: 400,
                    body  : "body"
            ]
        }

        when:
        service.logout('token')

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }
}
