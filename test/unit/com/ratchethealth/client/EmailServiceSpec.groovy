package com.ratchethealth.client

import com.mashape.unirest.request.body.MultipartBody
import com.ratchethealth.client.exceptions.ApiReturnException
import grails.test.mixin.TestFor
import groovy.json.JsonBuilder
import org.codehaus.groovy.grails.web.util.WebUtils
import spock.lang.Specification

@TestFor(EmailService)
class EmailServiceSpec extends Specification {
    def setupSpec() {
        WebUtils.metaClass.'static'.retrieveGrailsWebRequest = { ->
            return null
        }
    }

    def "test unsubscribe patient's email with successful result"() {
        given:
        def jBuilder = new JsonBuilder()
        jBuilder {
            unsubscribe true
        }

        MultipartBody.metaClass.asString = { ->
            return [
                    status: 200,
                    body  : jBuilder.toString()
            ]
        }

        when:
        def result = service.unsubscribeEmail('token', 1, 1)

        then:
        result == true
    }

    def "test unsubscribe patient's email without successful result"() {
        given:
        MultipartBody.metaClass.asString = { ->
            return [
                    status: 400,
                    body  : "body"
            ]
        }

        when:
        service.unsubscribeEmail('token', 1, 1)

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }
}
