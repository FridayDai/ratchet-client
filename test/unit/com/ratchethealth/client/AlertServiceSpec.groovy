package com.ratchethealth.client

import com.mashape.unirest.request.GetRequest
import com.ratchethealth.client.exceptions.ApiReturnException
import grails.test.mixin.TestFor
import groovy.json.JsonBuilder
import org.codehaus.groovy.grails.web.util.WebUtils
import spock.lang.Specification

@TestFor(AlertService)
class AlertServiceSpec extends Specification {
    def setupSpec() {
        WebUtils.metaClass.'static'.retrieveGrailsWebRequest = { ->
            return null
        }
    }

    def "test getAlert with success result"() {
        given:
        def jBuilder = new JsonBuilder()
        jBuilder {
            totalCount 2
            items 1, 2
        }

        GetRequest.metaClass.asString = { ->
            return [
                status: 200,
                body  : jBuilder.toString()
            ]
        }

        when:
        def result = service.getAlert('token', 1 , 2, new AlertFilterFields())

        then:
        result.totalCount == 2
        result.items == [1, 2]
    }

    def "test getAlert without successful result"() {
        given:
        GetRequest.metaClass.asString = { ->
            return [
                status: 400,
                body  : "body"
            ]
        }

        when:
        service.getAlert('token', 1 , 2, new AlertFilterFields())

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }
}
