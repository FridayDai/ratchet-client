package com.ratchethealth.client

import com.mashape.unirest.request.GetRequest
import com.mashape.unirest.request.body.MultipartBody
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

    def "test getStaffAlert with success result"() {
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
        def result = service.getStaffAlert('token', 1 , 2, new AlertFilterFields())

        then:
        result.totalCount == 2
        result.items == [1, 2]
    }

    def "test getStaffAlert without successful result"() {
        given:
        GetRequest.metaClass.asString = { ->
            return [
                status: 400,
                body  : "body"
            ]
        }

        when:
        service.getStaffAlert('token', 1 , 2, new AlertFilterFields())

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }

    def "test updateStaffAlertStatus with successful result"() {
        given:
        def jBuilder = new JsonBuilder()
        jBuilder {
            id 1
        }

        MultipartBody.metaClass.asString = { ->
            return [
                status: 200,
                body  : jBuilder.toString()
            ]
        }

        when:
        def result = service.updateStaffAlertStatus('token', 1, 2, 3, 'resolve')

        then:
        result == true
    }

    def "test updateStaffAlertStatus without successful result"() {
        given:
        MultipartBody.metaClass.asString = { ->
            return [
                status: 400,
                body  : "body"
            ]
        }

        when:
        service.updateStaffAlertStatus('token', 1, 2, 3, 'resolve')

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }

    def "test getPatientAlerts with success result"() {
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
        def result = service.getPatientAlerts('token', 1 , 2)

        then:
        result.totalCount == 2
        result.items == [1, 2]
    }

    def "test getPatientAlerts without successful result"() {
        given:
        GetRequest.metaClass.asString = { ->
            return [
                status: 400,
                body  : "body"
            ]
        }

        when:
        service.getPatientAlerts('token', 1 , 2)

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }
}
